import { createContext, useEffect, useState } from "react";


import api from "../api/axiosInstance";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

 // AuthProvider.jsx
useEffect(() => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }
  setLoading(false);
}, []);



  const login = async (formData) => {
    try {
      const res = await api.post("/auth/login", formData);

      const {token, user} = res.data;

      localStorage.setItem("token",token);
      localStorage.setItem("user",JSON.stringify(token));

      setUser(user);
      return user;


    } catch (err) {
      console.log(err);
    }

    //Redirect based on role
  };

  console.log(user);

  return (
    <AuthContext.Provider value={{ login, user , loading}}>
      {children}
    </AuthContext.Provider>
  );
};
