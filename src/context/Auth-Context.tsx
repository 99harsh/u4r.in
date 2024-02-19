import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
    isAuthenticated: null,
    checkLogin:()=>{},
    login:()=>{},
    logout:()=>{}
})

const AuthContextProvider = ({children}:any) =>{
    const [authenticated, setIsAuthenticated]:any = useState(null);

    const checkAuthentication = () =>{

        const locals = localStorage.getItem("is_login");
        console.log(locals)
        if(locals != null){
            if(locals == "true"){
                setIsAuthenticated(true);
            }else{
                console.log("SETTING FALSE NOW")
                setIsAuthenticated(false);
            }
        }else{
            console.log("SETTING FALSE");
            setIsAuthenticated(false);
        }
    }

    const login = () =>{
        localStorage.setItem("is_login", "true");
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