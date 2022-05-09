import { createContext, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCFGvZv8BB1xhn7Zvh0ERPiU97EaEIhpOA",
  authDomain: "superchat-c4691.firebaseapp.com",
  projectId: "superchat-c4691",
  storageBucket: "superchat-c4691.appspot.com",
  messagingSenderId: "101741324038",
  appId: "1:101741324038:web:451ed43d456c5808e62087"
};

initializeApp(firebaseConfig);

export const AuthContext = createContext(null);

export const  AuthProvider = ({ children }) => {
    const auth = getAuth();

// states
const [user,setUser]= useState(null);
const [loading, setLoading] =useState(false);
const [error, setError] = useState(false);
const [message, setMessage] = useState("");

// create new user



const createNewUser = async (email, password) => {
  try {
    setError(false);
    setLoading(true);
    if (email === "" || password === ""){
      setError(true);
      setMessage('Todos los campos son requeridos');
      return;
    }
    const newUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
      );
      setUser(newUser.user);
      localStorage.setItem('chat-user',JSON.stringify({ email }));
      setLoading(false);
      setError(false);
    
      return newUser;
  } catch (error) {
    console.error('error creating user',error)
    
    if (error.code === "auth/email-already-in-use"){
      setLoading(false);
      setError(true);
      setMessage('El usuario ya esta registrado');
      
      return;
    }
/*   } finally{
    setLoading(false) */
  }
};

///////////////////////// login user //////////////////////////

const loginUser = async (email, password) => {
  console.log(email,password)
try {
  setError(false);
  setLoading(true);
  if (email === "" || password === ""){
    setError(true);
    setMessage('Todos los campos son requeridos');
    return;
  }
  const signedInUser = await signInWithEmailAndPassword (
    auth,
    email,
    password
    );
    setUser(signedInUser.user);
    localStorage.setItem('chat-user',JSON.stringify({ email }));
    setLoading(false);
    return signedInUser;
  } catch (error) {
      console.log('Email o Password es incorrecto',error)
  } 
/*   finally {
    setLoading(false);
  } */
}

/////////// user persistance  ////////

  const persistUser = () => {

    const userExists = localStorage.getItem("chat-user");
    
    if (userExists){
      const user = JSON.parse(userExists);
      setUser(user);
      return true;
    } else {
      return false;
    }
  };

/////////// sign out user  ////////  
  const signOut = () => {
    localStorage.removeItem('chat-user');
    localStorage.removeItem('chat-name');
  };
  const signOutChat = () => {
    localStorage.removeItem('chat-name');
  };


//////// aculumar usuarios ////////



    return (
    <AuthContext.Provider value={{createNewUser, loading , error , message, loginUser, user, persistUser, signOut, signOutChat}}>
      { children }
    </AuthContext.Provider>);
}