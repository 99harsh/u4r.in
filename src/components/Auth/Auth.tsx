import { useLocation } from "react-router-dom";

import "./Styles.scss";

import Button from "../../constants/Button/Button";

import HeartIcon from '../../assets/icons/heart.svg';
import { useState } from "react";

const Auth = () => {

    const location = useLocation();
    console.log(location.state)
    const [isRegister, setIsRegister] = useState(false);
    return (
        <div className="auth-main-container flex justify-center items-center">
            {
                (location?.state?.action == "Login" || location?.state?.action == undefined) && !isRegister ?
                    <div className="inner-container">
                        <div className='logo-container text-center'>
                            <h1 className='logo'>Small.it</h1>
                        </div>
                        <div className='input-form-container flex flex-col items-center'>
                            <div className='auth-form-container'>
                                <h1 className='auth-label-text'>Login in</h1>
                            </div>
                            <div className="form-container">
                                <div className="input-container flex">
                                    <input type='text' className="input-box" placeholder="someone@example.com" />
                                </div>
                                <div className="input-container flex flex-col">
                                    <input type='password' className="input-box" placeholder="********" />
                                    <div className="forgot-container">
                                        <a href="#" className="forgot-text">Forgot Password?</a>
                                    </div>
                                </div>

                                <div className="input-container text-center">
                                    <Button type='secondary' text='Login' onClick={() => { }} />
                                </div>
                                <div className="input-container register-container text-center">
                                    <span className='register-now-text'>Don't have an account? <a href="#" className="register-now-link">Register Now</a></span>
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
                            <h1 className='logo'>Small.it</h1>
                        </div>
                        <div className='input-form-container flex flex-col items-center'>
                            <div className='auth-form-container'>
                                <h1 className='auth-label-text'>Register</h1>
                            </div>
                            <div className="form-container">
                                <div className="input-container flex">
                                    <input type='text' className="input-box" placeholder="Jon Doe" />
                                </div>
                                <div className="input-container flex">
                                    <input type='text' className="input-box" placeholder="someone@example.com" />
                                </div>
                                <div className="input-container flex flex-col">
                                    <input type='password' className="input-box" placeholder="********" />
                                </div>

                                <div className="input-container text-center">
                                    <Button type='secondary' text='Register' onClick={() => {

                                    }} />
                                </div>
                                <div className="input-container register-container text-center">
                                    <span className='register-now-text'>Already have an account? <a href="#" className="register-now-link">Login</a></span>
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