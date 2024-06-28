import React, { createContext, useState, ReactNode } from "react";
import { Header, SafeKaroUser } from "./constant";

// Define the shape of the context
interface SafeKaroContextType {
  user: SafeKaroUser | null;
  header: Header | null;
  login: (user: SafeKaroUser, header: Header) => void;
  logout: () => void;
}

const SafeKaroContext = createContext<SafeKaroContextType | undefined>({
  user: null,
  header: null,
  login: () => {},
  logout: () => {},
});

const initialUserState: SafeKaroUser = {
  isLoggedIn: false,
  id: "",
  name: "",
  email: "",
  role: "",
  partnerId: "",
  headRMId: "",
  headRM: "",
  // accessToken: "",
  idToken: "",
  // refreshToken: "",
};

const initialHeader: Header = {
  "Content-Type": "application/json",
  "Access-Token": "",
  "Id-Token": "",
  "Refresh-Token": "",
};

const SafekaroProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SafeKaroUser>(initialUserState);
  const [header, setHeader] = useState<Header>(initialHeader);

  const login = (user: any, header: Header) => {
    // Assuming successful login sets the user object
    const loggedInUser: SafeKaroUser = {
      isLoggedIn: true,
      id: user.id,
      name: user.name,
      role: user.role,
      partnerId: user.partnerId,
      headRMId: user.headRMId,
      headRM: user.headRM,
      idToken: user.token,
      email: user.email, // Replace with actual data
    };

    setUser(loggedInUser);
    setHeader({
      "Content-Type": "application/json",
      "Access-Token": header["Access-Token"],
      "Id-Token": header["Id-Token"],
      "Refresh-Token": header["Refresh-Token"],
    });
  };

  const logout = () => {
    setUser(initialUserState);
    setHeader(initialHeader);
  };

  return (
    <SafeKaroContext.Provider value={{ user, header, login, logout }}>
      {children}
    </SafeKaroContext.Provider>
  );
};

export { SafeKaroContext, SafekaroProvider };
