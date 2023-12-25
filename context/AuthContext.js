import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { auth, firestore, storage } from "../config";
import { Alert } from "react-native";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserProfile();
      } else {
        setUser(null);
      }
      // kiểm tra xem Firebase Auth có đang trong quá trình khởi tạo hay không
      setInitializing(false);
    });

    return () => unsubscribe;
  }, []);

  const fetchUserProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const userId = auth.currentUser.uid;
      const userRef = firestore.doc(`users/${userId}`);
      const docSnap = await userRef.get();

      if (docSnap.exists) {
        const userData = docSnap.data();
        setUser(userData);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error getting document:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateUser = useCallback(
    (updates) => {
      if (auth.currentUser) {
        const userRef = firestore.doc(`users/${auth.currentUser.uid}`);
        userRef.update(updates);
        setUser((oldProfile) => ({ ...oldProfile, ...updates }));
        console.log("Updated user: ", user);
      }
    },
    [user]
  );

  const login = useCallback(async (email, password) => {
    setIsLoading(true);
    try {
      const userCredential = await auth.signInWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      console.log(`Login successful ${user.email}`);
    } catch (error) {
      console.log("Login failed: " + error);
      if (error.code === "auth/invalid-email") {
        alert("The email address is not valid.");
      } else if (error.code === "auth/weak-password") {
        alert("The password must be 6 characters long or more.");
      } else if (error.code === "auth/user-not-found") {
        alert(
          "Email not found. Please check your email or register a new account."
        );
      } else if (error.code === "auth/invalid-credential") {
        alert("Invalid credentials. Please check your email and password.");
      } else {
        alert("Login failed! 🥲");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (email, password, firstName, lastName) => {
    setIsLoading(true);
    try {
      const defaultAvatar = await storage.ref("avt.jpg").getDownloadURL();
      await auth.createUserWithEmailAndPassword(email, password);
      await auth.currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: "https://lovem-c1e24.firebaseapp.com",
      });
      await firestore.collection("users").doc(auth.currentUser.uid).set({
        firstName,
        lastName,
        email,
        avatar: defaultAvatar,
      });
      Alert.alert("Register successfully! ", "Verification email sent");
      navigation.navigate("Login");
    } catch (error) {
      console.log("Register failed: " + error);
      // Xử lý lỗi
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await auth.signOut();
      if (user) {
        setUser(null);
      }
      console.log("User logged out");
    } catch (error) {
      console.error("Error logout", error);
    }
  }, []);

  const uploadAvatar = useCallback(async (imageUri) => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const filename = `avatars/avatar_${auth.currentUser.uid}`;
      const storageRef = ref(storage, filename);
      await uploadBytesResumable(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);

      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }, []);

  const uploadImage = useCallback(
    async (imageUri, caption) => {
      try {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const filename = `images/image-${Date.now()}`;

        // Tạo metadata với thông tin người dùng và caption
        const metadata = {
          contentType: "image/jpeg",
          customMetadata: {
            userId: user.id,
            userName: `${user.firstName} ${user.lastName}`,
            timestamp: Date.now().toString(),
            caption: caption, // Thêm caption vào metadata
          },
        };

        // Upload hình ảnh với metadata
        const ref = storage.ref().child(filename);
        await ref.put(blob, metadata);

        const downloadURL = await ref.getDownloadURL();
        return downloadURL;
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    },
    [user]
  );

  const updateUserEmail = useCallback(
    async (newEmail, password) => {
      try {
        if (!newEmail || !password) {
          throw new Error("Please provide both new email and password.");
        }

        const user = auth.currentUser;

        if (!user) {
          throw new Error("User not authenticated.");
        }

        const credential = auth.EmailAuthProvider.credential(
          user.email,
          password
        );

        await user.reauthenticateWithCredential(credential);

        const emailExists = await firestore
          .collection("users")
          .where("email", "==", newEmail)
          .get();

        if (!emailExists.empty) {
          throw new Error(
            "Email is already in use. Please choose another one."
          );
        }

        await user.updateEmail(newEmail);
        updateUser({ email: newEmail });
        return { success: true };
      } catch (error) {
        console.error("Error updating email:", error);
        return { success: false, error };
      }
    },
    [updateUser]
  );


  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
        initializing,
        uploadAvatar,
        uploadImage,
        updateUserEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
