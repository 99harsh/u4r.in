import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
    isAuthenticated: null,
    checkLogin:()=>{},
    login:(auth_token:string, user_name:string)=>{},
    logout:()=>{}
})

const AuthContextProvider = ({children}:any) =>{
    const [authenticated, setIsAuthenticated]:any = useState(null);

    const checkAuthentication = () =>{

        const locals = localStorage.getItem("auth_token");
        if(locals != null){
            if(locals == "true"){
                setIsAuthenticated(true);
            }else{
                setIsAuthenticated(false);
            }
        }else{
            setIsAuthenticated(false);
        }
    }

    const login = (auth_token:string, user_name:string) =>{
        localStorage.setItem("auth_token", auth_token);
        localStorage.setItem("user_name", user_name);
        setIsAuthenticated(true);
    }

    const logout = () =>{
        localStorage.clear();
        setIsAuthenticated(false);
    }


    useEffect(()=>{
        checkAuthentication();
    }, [])

    const value:any = {
        isAuthenticated: authenticated,
        login: login,
        logout: logout,
        checkLogin: checkAuthentication
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider;