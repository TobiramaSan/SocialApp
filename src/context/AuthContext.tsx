import { getCurrentUser } from "@/lib/appwrite/api";
import { IContextType, IUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  chekAuthUser: async () => false as boolean,
};

// const AuthContext = createContext<IContextType>();
const AuthContext = createContext<IContextType>(INITIAL_STATE);

//to wrap the entire provider and grant us access to the context
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  //state for user
  const [user, setUser] = useState<IUser>(INITIAL_USER);

  //state for loading
  const [isLoading, setIsLoading] = useState(false);

  //authentication state
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const navigate = useNavigate();
  //to check the auth user
  const checkAuthUser = async () => {
    try {
      const currrentAccount = await getCurrentUser();

      if (currrentAccount) {
        setUser({
          id: currrentAccount.$id,
          name: currrentAccount.name,
          username: currrentAccount.username,
          email: currrentAccount.email,
          imageUrl: currrentAccount.imageUrl,
          bio: currrentAccount.bio,
        });
        setisAuthenticated(true);

        return true;
      }

      return false;
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }

    //declaring the values
    const value = {
      user,
      setUser,
      isLoading,
      isAuthenticated,
      setisAuthenticated,
      checkAuthUser,
    };
    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  };

  //to call the cheeckAuth function whenever we  relooad our page
  useEffect(() => {
    if (
      localStorage.getItem("cookieFallback") === "[]" ||
      localStorage.getItem("cookieFallback") === null
    )
      navigate("/sign-in");

    checkAuthUser();
  }, []);
};

export default AuthContext;
