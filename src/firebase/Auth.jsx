// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGoDAgEZUAQkBj58-pLFnPgYKNHNcWEzw",
  authDomain: "learn-e-commerce-reactredux.firebaseapp.com",
  projectId: "learn-e-commerce-reactredux",
  storageBucket: "learn-e-commerce-reactredux.appspot.com",
  messagingSenderId: "542816549565",
  appId: "1:542816549565:web:c8edd7d318d0bf5057d5d4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const auth = useProvidAuth();
    return (<AuthContext.Provider value={auth}>
        {children}
    </AuthContext.Provider>)
}

export const useAuth = () => useContext(AuthContext);

function useProvidAuth() {
    const [user, setUser] = useState();

    const signUp = (email, password, displayName) => createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
        updateProfile(user, { displayName });
        setUser(user);
        return user;
    });

    const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
        setUser(user);
        return user;
    });

    const signOutUser = () => signOut(auth).then(() => setUser(null));

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            user ? setUser(user) : setUser(null)
        });
        return () => unsubscribe();
    })

    return {
        signIn, signUp, signOut: signOutUser, user
    }
        
}

export default AuthProvider;