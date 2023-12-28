import React, { createContext, useState, useEffect, useContext } from "react";
import { firestore, auth } from "../config";

const FriendContext = createContext();

export const FriendProvider = ({ children }) => {

  useEffect(() => {}, []);

  const searchUsers = async (keyword) => {
    try {
      const usersRef = firestore.collection("users");
      const searchResults = [];
  
      // Tạo một mảng chứa các truy vấn cho mỗi trường
      const queries = [
        usersRef.where("firstName", ">=", keyword).where("firstName", "<", keyword + '\uf8ff'),
        usersRef.where("lastName", ">=", keyword).where("lastName", "<", keyword + '\uf8ff'),
        usersRef.where("email", ">=", keyword).where("email", "<", keyword + '\uf8ff'),
      ];
  
      const uniqueSearchResults = new Map(); // Sử dụng Map để lưu trữ kết quả duy nhất
  
      // Thực hiện mỗi truy vấn và thêm kết quả vào uniqueSearchResults
      for (const query of queries) {
        const snapshot = await query.get();
        snapshot.forEach((doc) => {
          const userData = doc.data();
          const userInfo = {
            id: doc.id,
            email: userData.email,
            name: userData.firstName + " " + userData.lastName,
            avatar: userData.avatar,
          };
          // Sử dụng ID làm key để loại bỏ các kết quả trùng lặp
          uniqueSearchResults.set(doc.id, userInfo);
        });
      }
  
      // Lấy các giá trị duy nhất từ Map và chuyển thành mảng kết quả cuối cùng
      searchResults.push(...uniqueSearchResults.values());
  
      return searchResults;
    } catch (error) {
      console.error("Error searching users:", error);
      return [];
    }
  };
  

  const sendFriendRequest = async (friendID) => {
    try {
      const currentUser = auth.currentUser;
      const friendshipsRef = firestore.collection("friendships");
  
      // Kiểm tra tồn tại yêu cầu kết bạn giữa hai người dùng
      const existingRequestSnapshot = await friendshipsRef
        .where("user1", "==", currentUser.uid)
        .where("user2", "==", friendID)
        .get();
  
      if (!existingRequestSnapshot.empty) {
        // Nếu đã tồn tại yêu cầu, cập nhật trạng thái của yêu cầu hiện tại thay vì tạo mới
        existingRequestSnapshot.forEach(async (doc) => {
          const requestRef = friendshipsRef.doc(doc.id);
          await requestRef.update({ status: "pending" });
        });
  
        console.log("Friend request updated successfully!");
      } else {
        // Nếu không có yêu cầu tồn tại, tạo yêu cầu mới
        await friendshipsRef.add({
          user1: currentUser.uid,
          user2: friendID,
          status: "pending",
        });
  
        console.log("Friend request sent successfully!");
      }
    } catch (error) {
      console.error("Error sending or updating friend request:", error);
      alert("Error sending or updating friend request!");
    }
  };
  
  const acceptFriendRequest = async (friendshipID) => {
    try {
      const friendshipRef = firestore.collection("friendships").doc(friendshipID);
  
      await firestore.runTransaction(async (transaction) => {
        const friendshipSnapshot = await transaction.get(friendshipRef);
  
        if (friendshipSnapshot.exists) {
          const friendshipData = friendshipSnapshot.data();
  
          if (friendshipData.status === "pending") {
            // Đảm bảo yêu cầu đang ở trạng thái "đang chờ" trước khi chấp nhận
            transaction.update(friendshipRef, { status: "accepted" });
            console.log("Friend request accepted!");
          } else {
            console.error("Friend request is not pending. Cannot accept.");
            alert("Friend request is not pending. Cannot accept.");
          }
        } else {
          console.error("Friend request does not exist.");
          alert("Friend request does not exist.");
        }
      });
    } catch (error) {
      console.error("Error accepting friend request:", error);
    }
  };
  

  const checkRequestSent = async (friendID) => {
    try {
      const currentUser = auth.currentUser;
      const friendshipsRef = firestore.collection("friendships");
  
      // Kiểm tra xem đã có yêu cầu kết bạn nào từ người dùng hiện tại đến friendID chưa
      const existingRequestSnapshot = await friendshipsRef
        .where("user1", "==", currentUser.uid)
        .where("user2", "==", friendID)
        .get();
  
      // Nếu có yêu cầu kết bạn, trả về true
      if (!existingRequestSnapshot.empty) {
        return true;
      }
  
      // Nếu không có yêu cầu kết bạn, trả về false
      return false;
    } catch (error) {
      console.error("Error checking friend request:", error);
      throw error;
    }
  };

  const getSentFriendRequests = async () => {
    try {
      const currentUser = auth.currentUser;
      const friendshipsRef = firestore.collection("friendships");
      const usersRef = firestore.collection("users");
  
      const sentRequestsSnapshot1 = await friendshipsRef
        .where("user1", "==", currentUser.uid)
        .where("status", "==", "pending")
        .get();
  
      const sentRequestsSnapshot2 = await friendshipsRef
        .where("user2", "==", currentUser.uid)
        .where("status", "==", "pending")
        .get();
  
      const sentRequests = [...sentRequestsSnapshot1.docs, ...sentRequestsSnapshot2.docs];
  
      const sentRequestsWithUserInfo = [];
      for (const request of sentRequests) {
        const friendID = request.data().user1 === currentUser.uid ? request.data().user2 : request.data().user1;
        const friendSnapshot = await usersRef.doc(friendID).get();
        const friendData = friendSnapshot.data();
        sentRequestsWithUserInfo.push({
          id: request.id,
          status: request.data().status,
          friend: {
            id: friendSnapshot.id,
            name: friendData.firstName + " " + friendData.lastName,
            avatar: friendData.avatar,
          },
        });
      }
  
      return sentRequestsWithUserInfo;
    } catch (error) {
      console.error("Error getting sent friend requests:", error);
      return [];
    }
  };
  
  const getFriendList = async () => {
    try {
      const currentUser = auth.currentUser;
      const friendshipRef = firestore.collection("friendships");
      const usersRef = firestore.collection("users");
  
      const friendsSnapshot1 = await friendshipRef
        .where("user1", "==", currentUser.uid)
        .where("status", "==", "accepted")
        .get();
  
      const friendsSnapshot2 = await friendshipRef
        .where("user2", "==", currentUser.uid)
        .where("status", "==", "accepted")
        .get();
  
      const friends = [...friendsSnapshot1.docs, ...friendsSnapshot2.docs];
  
      const friendsWithUserInfo = [];
      for (const friend of friends) {
        const friendID = friend.data().user1 === currentUser.uid ? friend.data().user2 : friend.data().user1;
        const friendSnapshot = await usersRef.doc(friendID).get();
        const friendData = friendSnapshot.data();
        friendsWithUserInfo.push({
          id: friend.id,
          status: friend.data().status,
          friend: {
            id: friendSnapshot.id,
            name: friendData.firstName + " " + friendData.lastName,
            avatar: friendData.avatar,
          },
        });
      }
  
      return friendsWithUserInfo;
    } catch (error) {
      console.error("Error getting user's friends:", error);
      throw error;
    }
  };
  
  
  // Hàm xóa bạn bè dựa trên friendID trong danh sách bạn bè
  const deleteFriendOrRequest = async (friendID) => {
    const currentUserID = auth.currentUser.uid;
    if (!currentUserID || !friendID) {
      console.error("Error: currentUserID or friendID is undefined");
      return;
    }

    try {
      const friendshipsRef = firestore.collection("friendships");
      const querySnapshot = await friendshipsRef
        .where("user1", "==", currentUserID)
        .where("user2", "==", friendID)
        .get();

      querySnapshot.forEach(async (doc) => {
        const friendshipRef = friendshipsRef.doc(doc.id);
        await friendshipRef.delete();
      });

      console.log("Friend deleted!");
    } catch (error) {
      console.error("Error deleting friend:", error);
    }
  };

  return (
    <FriendContext.Provider
      value={{
        searchUsers,
        sendFriendRequest,
        acceptFriendRequest,
        checkRequestSent,
        deleteFriendOrRequest,
        getFriendList,
        getSentFriendRequests,
      }}
    >
      {children}
    </FriendContext.Provider>
  );
};

export const useFriend = () => {
  return useContext(FriendContext);
};
