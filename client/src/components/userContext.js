import {createContext, useState} from "react";
 
export const UserContext = createContext({user: undefined, setUser: undefined});
 
export const UserContextProvider = ({children}) => {
  const [user, setUser] = useState({first_name: ""});
 
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
};