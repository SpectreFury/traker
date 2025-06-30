import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
} from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
} from "@react-native-firebase/firestore";

export const useUser = () => {
  const firestore = getFirestore();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  const createUser = async (user: FirebaseAuthTypes.User) => {
    try {
      const q = query(
        collection(firestore, "users"),
        where("uid", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) return;

      await addDoc(collection(firestore, "users"), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
    } catch (error) {
      console.error("Error creating user in Firestore:", error);
    }
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), async (user) => {
      if (user) {
        await createUser(user);
      }

      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    });

    return subscriber;
  }, [initializing]);

  return {
    user,
    initializing,
  };
};
