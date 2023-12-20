import React, { createContext, useState, useEffect, useContext } from "react";
import { firebase } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        fetchUserProfile();
      } else {
        setUser(null);
      }
    });
  
    // Hủy đăng ký lắng nghe khi component unmount
    return () => unsubscribe();
  }, []);
  

const fetchUserProfile = async () => {
      try {
        const userId = firebase.auth().currentUser.uid;
        const userRef = firebase.firestore().collection("users").doc(userId);
        const doc = await userRef.get();
        
        if (doc.exists) {
          const userData = doc.data();
          setUser(userData);
          console.log("User data:", userData); // In ra dữ liệu người dùng
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    };

  const updateUserProfile = (newProfile) => {
    setUser(oldProfile => ({ ...oldProfile, ...newProfile }));
  };
  return (
    <AuthContext.Provider value={{ user, updateUserProfile, }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    return useContext(AuthContext);
  };