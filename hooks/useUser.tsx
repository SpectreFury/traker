import { useState, useEffect } from "react";
import {
  getAuth,
  onAuthStateChanged,
  FirebaseAuthTypes,
} from "@react-native-firebase/auth";

export const useUser = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), (user) => {
      setUser(user);
    });

    if (initializing) {
      setInitializing(false);
    }

    return subscriber;
  }, []);

  return {
    user,
    initializing,
  };
};
