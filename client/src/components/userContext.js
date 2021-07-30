import React, { useState } from "react";
import Cookies from 'universal-cookie';
const cookies = new Cookies();


let userContext = React.createContext();

export default userContext;

export const UserData = ({children}) =>{
    let [focus,setFocus] = useState('dashboard');
    let [sessionToken,setSessionToken] = useState(cookies.get('Login'));
    let [role,setRole] = useState(cookies.get('Role'));
    let [pathname,setPathName] = useState(cookies.get('pathname'));
    let [userName,setuserName] = useState(cookies.get('Name'));
     return <userContext.Provider value={{focus,setFocus,sessionToken,setSessionToken,role,setRole,pathname,setPathName,userName,setuserName}}>
        {children}
    </userContext.Provider>
}
