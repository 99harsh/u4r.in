import { useLocation } from "react-router-dom";

import "./Styles.scss";

import Button from "../../constants/Button/Button";

import HeartIcon from '../../assets/icons/heart.svg';
import { useContext, useState } from "react";
import axios from "axios";
import settings from "../../constants/settings";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth-Context";


const Auth = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext)
    const [isRegister, setIsRegister] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [authFormData, setAuthFormData] = useState({
        full_name: "",
        email: "",
        password: ""
    });

    const [error, setError] = useState({
        full_name: "",
        email: "",
        password: ""
    })
    
    const [disabled, setDisabled] = useState(false)

    const handleInputChange = (input_name:string, text:string) => {
        if(input_name === "full_name"){
            const regex = /^[a-zA-Z ]+$/; 
            if(text.length < 3){
                setError((prevState:any) => ({...prevState, full_name: "Name must be at least 3 characters long."}))
            }else if(text.length > 50){
                setError((prevState:any) => ({...prevState, full_name: "Name cannot exceed 50 characters."}))
            }else if(!regex.test(text)){
                setError((prevState:any) => ({...prevState, full_name: "Numbers and special characters are not allowed."}))
            }else{
                setError((prevState:any) => ({...prevState, full_name: ""}));
            }
        }else if(input_name === 'email'){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(text)){
                setError((prevState:any) => ({...prevState, email: "Please enter valid email address."}))
            }else if(text.length < 3){
                setError((prevState:any) => ({...prevState, email: "Email must be at least 3 characters long."}))
            }else if(text.length > 100){
                setError((prevState:any) => ({...prevState, email: "Email cannot exceed 100 characters."}))
            }
            else{
                setError((prevState:any) => ({...prevState, email: ""}))
            }
        }else if(input_name === "password"){
            if(text.length < 8){
                setError((prevState:any) => ({...prevState, password: "Password must be at least 8 characters long."}))
            }else if(text.length > 20){
                setError((prevState:any) => ({...prevState, password: "Password cannot exceed 50 characters."}))
            }else{
                setError((prevState:any) => ({...prevState, password: ""}));
            }
        }
        setAuthFormData((prevState:any) => ({...prevState, [input_name]: text}));
    }

    const onSubmitHandler = async(action:string) => {
        try{
            setIsLoading(true);
            console.log("called");
            if(action == 'register'){
                const payload = authFormData;
                const {data} = await axios.post(`${settings.appURL}user/register`, payload);
                if(data.status == 200){
                    login(data.data.access_token, data.data.full_name);
                    navigate("/dashboard")
                }else if(data.status == 409){
                    setError((prevState:any) => ({...prevState, email: "Email is already exist."}))
                }else{
                    alert("Something Went Wrong!");
                }
            }else if(action == "login") {
                const payload:any = authFormData;
                delete payload.full_name;
                const {data} = await axios.post(`${settings.appURL}user/login`, payload);
                if(data.status == 200){
                    
                   login(data.data.access_token, data.data.full_name);
                    navigate("/dashboard")
                }else if(data.status == 401){
                    setError((prevState:any) => ({...prevState, password: "Invalid Email/Password"}));
                }else{
                    alert("Something Went Wrong!");
                }
            }
        }catch(error){
            console.log("Error", error);
            alert("Something went wrong!");
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <div className="auth-main-container flex justify-center items-center">
            {
                (location?.state?.action == "Login" || location?.state?.action == undefined) && !isRegister ?
                    <div className="inner-container">
                        <div className='logo-container text-center'>
                            <h1 className='logo'>U4R.in</h1>
                        </div>
                        <div className='input-form-container flex flex-col items-center'>
                            <div className='auth-form-container'>
                                <h1 className='auth-label-text'>Login in</h1>
                            </div>
                            <div className="form-container">
                                <div className="input-container flex flex-col">
                                    <input type='email' className={`input-box ${error.email != "" ? 'danger-input-box': ""}`} placeholder="someone@example.com" value={authFormData.email}  onChange={(e:any) => { handleInputChange('email', e.target.value) }}/>
                                    {
                                        error.email != "" ? 
                                        <span className="text-danger pt-1 pl-1">{error.email}</span>
                                        :"" 
                                    }
                                </div>
                                <div className="input-container flex flex-col">
                                    <input type='password' className={`input-box ${error.password != "" ? 'danger-input-box': ""}`} placeholder="********" value={authFormData.password} onChange={(e:any) => { handleInputChange('password', e.target.value) }} />
                                    {
                                        error.password != "" ? 
                                        <span className="text-danger pt-1 pl-1">{error.password}</span>
                                        :"" 
                                    }
                                    {/* <div className="forgot-container">
                                        <a href="#" className="forgot-text">Forgot Password?</a>
                                    </div> */}
                                </div>

                                <div className="input-container text-center">
                                    <Button type='secondary' text='Login' onClick={() => { onSubmitHandler('login') }}
                                        isLoading={isLoading}
                                        disabled={(error.email != "" || error.password != "" || authFormData.email == "" || authFormData.password == "")}
                                    />
                                </div>
                                <div className="input-container register-container text-center">
                                    <span className='register-now-text'>Don't have an account? <a href="#" className="register-now-link" onClick={()=>{
                                         setIsRegister(true);
                                         setAuthFormData({
                                             full_name: "",
                                             email: "",
                                             password: ""
                                         })
                                         setError({
                                            full_name: "",
                                            email: "",
                                            password: ""
                                        })
                                    }}>Register Now</a></span>
                                </div>
                            </div>

                        </div>
                        <div className='logo-container text-center footer-container'>
                            <h1 className='footer-text flex justify-center items-center'>Made with <img src={HeartIcon} className='heart-icon' /> by Dev Crafted Creations.</h1>
                        </div>

                    </div> : ""
            }
            {
                location?.state?.action == "Register" || isRegister ?
                    <div className="inner-container">
                        <div className='logo-container text-center'>
                            <h1 className='logo'>U4R.in</h1>
                        </div>
                        <div className='input-form-container flex flex-col items-center'>
                            <div className='auth-form-container'>
                                <h1 className='auth-label-text'>Register</h1>
                            </div>
                            <div className="form-container">
                                <div className="input-container flex flex-col">
                                    <input type='text' className={`input-box ${error.full_name != "" ? 'danger-input-box': ""}`} placeholder="Jon Doe" value={authFormData.full_name} onChange={(e:any)=>{ handleInputChange('full_name', e.target.value); }} />
                                    {
                                        error.full_name != "" ? 
                                        <span className="text-danger pt-1 pl-1">{error.full_name}</span>
                                        :"" 
                                    }
                                </div>
                                <div className="input-container flex flex-col">
                                    <input type='text' className={`input-box ${error.email != "" ? 'danger-input-box': ""}`} placeholder="someone@example.com" value={authFormData.email} onChange={((e:any) => { handleInputChange('email', e.target.value) })} />
                                    {
                                        error.email != "" ? 
                                        <span className="text-danger pt-1 pl-1">{error.email}</span>
                                        :"" 
                                    }
                                </div>
                                <div className="input-container flex flex-col">
                                    <input type='password' className={`input-box ${error.password != "" ? 'danger-input-box': ""}`} placeholder="********" value={authFormData.password}  onChange={(e:any)=>{ handleInputChange('password', e.target.value) }} />
                                    {
                                        error.password != "" ? 
                                        <span className="text-danger pt-1 pl-1">{error.password}</span>
                                        :"" 
                                    }
                                </div>

                                <div className="input-container text-center">
                                    <Button type='secondary' text='Register'
                                    disabled={error.email != "" || error.email != "" || error.password != "" || authFormData.full_name == "" || authFormData.email == "" || authFormData.password === ""}
                                    isLoading={isLoading}
                                    onClick={() => {
                                        onSubmitHandler('register')
                                    }} />
                                </div>
                                <div className="input-container register-container text-center">
                                    <span className='register-now-text'>Already have an account? <a href="#" className="register-now-link" onClick={()=>{
                                        setIsRegister(false);
                                        setAuthFormData({
                                            full_name: "",
                                            email: "",
                                            password: ""
                                        });
                                        setError({
                                            full_name: "",
                                            email: "",
                                            password: ""
                                        })
                                    }}>Login</a></span>
                                </div>
                            </div>

                        </div>
                        <div className='logo-container text-center footer-container'>
                            <h1 className='footer-text flex justify-center items-center'>Made with <img src={HeartIcon} className='heart-icon' /> by Dev Crafted Creations.</h1>
                        </div>

                    </div> : ""
            }
        </div>
    )
}

export default Auth;