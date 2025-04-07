import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, deleteUser, EmailAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, reauthenticateWithCredential, reauthenticateWithPopup, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";


export const AuthContext = createContext(null)

const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()

    // console.log(user)

    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUserProfile = (name, photo ) =>{
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
          })
    }

    const sigInGoogle = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }

    const resetPassword= (email)=>{
        return sendPasswordResetEmail(auth, email)
    }

    const reauthenticateAndDeleteUser = (password) => {
        setLoading(true);
      
        const credential = EmailAuthProvider.credential(user.email, password);
      
        return reauthenticateWithCredential(user, credential)
          .then(() => {
            return deleteUser(user);
          })
          .finally(() => {
            setLoading(false);
          });
      };

      const reauthenticatePopupAndDeleteUser = () => {
        setLoading(true);
      
        reauthenticateWithPopup(auth.currentUser, googleProvider)
        .then(() => {
            return deleteUser(user);
          })
          .finally(() => {
            setLoading(false);
          });
      };

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser=>{
            setUser(currentUser)
            if(currentUser){
                axiosPublic.post('jwt', {email:currentUser.email})
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem("access-token", res.data.token)
                    }
                })
            }
            else{
                localStorage.removeItem("access-token")
            }   
            setLoading(false)
        })
        return () => {
            return unsubscribe()
        }
    },[])

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        logOut,
        updateUserProfile,
        sigInGoogle,
        reauthenticateAndDeleteUser,
        resetPassword,
        reauthenticatePopupAndDeleteUser
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;