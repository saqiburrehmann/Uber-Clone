import { createContext } from "react";

// Step 1: Create context object
export const UserDataContext = createContext();

const UserContext = ({ children }) => {
  return <UserDataContext.Provider>{children}</UserDataContext.Provider>;
};

export default UserContext;
