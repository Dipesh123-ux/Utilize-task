"use client";
import { useState, useEffect } from "react";
import Context from "./createContext";
import { loginWithGoogle, getCurrentUser } from "../apis/auth";

const ContextState = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async function () {
      const res = await getCurrentUser();
      if (res) {
        setUser(res);
      }
    })();
  }, []);

  return <Context.Provider value={{ user,setUser }}>{children}</Context.Provider>;
};

export default ContextState;
