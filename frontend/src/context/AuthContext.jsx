import { createContext , useState } from "react";

export const AuthContext = createContext()

export const AuthProvider = ({children})=>{

    const [user, setuser] = useState(null)
    const [token, settoken] = useState(
        localStorage.getItem("token") || null
    )

    const login = (userdata , usertoken)=>{
        setuser(userdata)
        settoken(usertoken)
         settoken(localStorage.setItem("token",usertoken))
    }

    const logout = ()=>{
        setuser(null)
        settoken(null)
        settoken(localStorage.removeItem("token"))
    }

    return (
    <AuthContext.Provider 
      value={{user,token,logout,login}}
    >{children}</AuthContext.Provider>
)
}