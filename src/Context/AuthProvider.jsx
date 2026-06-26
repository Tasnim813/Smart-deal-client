import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase';



const GoogleProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const registerUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const SignInUser=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const Googlelogin=()=>{
        setLoading(true)
        return signInWithPopup(auth,GoogleProvider)
    }
    const LogOutUser=()=>{
        setLoading(true)
        return signOut(auth)
    }

    const UpdateUserProfile=(profile)=>{
        return updateProfile(auth.currentUser,profile)
    }

      // observe user state
    useEffect(()=>{
        const unSubscribed=onAuthStateChanged(auth,(CurrentUser)=>{
            setUser(CurrentUser)
            setLoading(false)

        })
        return()=>{
            unSubscribed()
        }
    },[])


    const authInfo={
        registerUser,
        SignInUser,
        Googlelogin,
        user,
        loading,
        LogOutUser,
        UpdateUserProfile

    }
  
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;