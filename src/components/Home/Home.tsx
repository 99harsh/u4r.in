import './Styles.scss';

import Header from "../../constants/Header/Header";
import Button from '../../constants/Button/Button';
import Footer from '../../constants/Footer/Footer';

import GearIcon from '../../assets/icons/gear.svg';
import LinkIcon from '../../assets/icons/link.svg';
import CopyIcon from '../../assets/icons/clipboard.svg';

import { useState } from 'react';
const Home = () => {

    const [accordionOpen, setAccordionOpen] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const [formData, setFormData] = useState({
        destination_url: "",
        custom_short_url:"",
        source: "web"
    });


    const handleInputChange = (input: string, text:string) =>{
        console.log(input, text)
        setFormData((prevState:any) => ({...prevState, [input]: text}))
    }

    return (
        <div className='home-main-container'>
            <div>
                <Header />
            </div>
            <div className='center-container flex justify-center flex-col items-center'>
                <div className='heading-container'>
                    <h1 className="heading-text">Shorten Your Looooong Links {':)'}</h1>
                </div>
                <div className='flex justify-center text-center'>
                    <h3 className="subheading-text">U4R.in is an efficient and easy-to-use URL shortening service that streamlines your online experience.</h3>
                </div>
                {
                    isCreated ?
                        <>
                            <div className='input-main-container'>
                                <div className='input-inner-container flex flex-row items-center active-text-box'>
                                    <div className='link-logo-container'>
                                        <img src={LinkIcon} className='link-logo' />
                                    </div>
                                    <div className='input-box-container'>
                                        <input className='input-box' placeholder='Enter the link here' value={'https://u4r.in/kerezaman'} />
                                    </div>
                                    <div className='button-container'>
                                        <Button type='success' text='Copy' icon={CopyIcon} onClick={() => { }} />
                                    </div>
                                </div>
                            </div>
                            <div className='switch-container'>
                                <Button type='secondary' text='Generate More' onClick={() => { }} />
                            </div>
                        </>
                        :
                        <>
                            <div className='input-main-container'>
                                <div className='input-inner-container flex flex-row items-center'>
                                    <div className='link-logo-container'>
                                        <img src={LinkIcon} className='link-logo' />
                                    </div>
                                    <div className='input-box-container'>
                                        <input className='input-box' placeholder='Enter the link here' onChange={(text:any)=>{handleInputChange('destination_url', text)}} />
                                    </div>
                                    <div className='button-container'>
                                        <Button type='secondary' text='Shorten Now!'
                                            onClick={() => {

                                            }} />
                                    </div>
                                </div>
                            </div>

                            <div className='switch-container'>

                                <label className="relative inline-flex items-center cursor-pointer pl-3 gear-icon" onClick={() => { setAccordionOpen(!accordionOpen) }}>
                                    <img src={GearIcon} className='gear-icon' />
                                    <span className="ms-1 text-sm font-medium text-gray-900 dark:text-gray-300 settings-text">Settings</span>
                                </label>
                            </div>
                            <div
                                className={`accordian-container grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${accordionOpen
                                    ? "grid-rows-[1fr] opacity-100 mt-2 flex"
                                    : "grid-rows-[0fr] opacity-0"
                                    }`}
                            >
                                <div className="overflow-hidden accordian-inner-container">
                                    <div className='text-center'>
                                        <label className="relative inline-flex items-center cursor-pointer justify-center">
                                            <input type="checkbox" value="" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 generate-text">Generate QR</span>
                                        </label>
                                    </div>
                                    <div className="mt-4 back-half-container flex justify-center items-center">
                                        <div className='inner-backhalf-container'>
                                            <label>Domain</label>
                                            <div className='input domain-container items-center'>
                                                <span className='domain-name'>https://u4r.in</span>
                                                {/* <img src={LockIcon} className='lock-icon'/> */}
                                            </div>
                                        </div>
                                        <div className='inner-backhalf-container'>
                                            <label className='dot'>. </label>
                                            <div className='input text-center'>
                                                <span className='slash-text'>/</span>
                                            </div>
                                        </div>
                                        <div className='inner-backhalf-container'>
                                            <label>Enter a custom back-half</label>
                                            <div className='input text-center'>

                                                <input type='text' className="back-half-input" placeholder='my-resume' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                }

                <div className='register-now-brand'>
                    <h5 className='brand-text'>Upgrade Your <span className='brand-number'>Link Game</span> and Experience Endless Features!  <a href='#' className='register-now-text'>Register Now</a> to enjoy Unlimited Usage.</h5>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}
export default Home;