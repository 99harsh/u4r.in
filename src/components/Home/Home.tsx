import { useEffect, useState } from 'react';
import axios from 'axios';
import settings from '../../constants/settings';
import './Styles.scss';

import Header from "../../constants/Header/Header";
import Button from '../../constants/Button/Button';
import Footer from '../../constants/Footer/Footer';

import GearIcon from '../../assets/icons/gear.svg';
import LinkIcon from '../../assets/icons/link.svg';
import CopyIcon from '../../assets/icons/clipboard.svg';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useNavigate } from 'react-router-dom';


const Home = () => {

    const [accordionOpen, setAccordionOpen] = useState(false);
    const [isCreated, setIsCreated] = useState(false);
    const [errorMessage, setErrorMessage] = useState({ message: "", settingsError: "" });
    const [formData, setFormData] = useState({
        title: null,
        destination_url: "",
        custom_short_url: "",
        source: "web"
    });
    const [isLoading, setIsLoading] = useState(false);
    const [shortURL, setShortURL] = useState("");
    const [copied, setCopied] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isAvailable, setIsAvailable] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (input: string, text: string) => {
        if (input === "destination_url") {
            const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*/;
            if (text.length > 500) {
                setErrorMessage((prevState: any) => ({ ...prevState, message: "Destination url must be less than 500 characters!" }));
            } else if (!regex.test(text)) {
                setErrorMessage((prevState: any) => ({ ...prevState, message: "Please enter a valid url!" }))
            } else {
                setErrorMessage((prevState: any) => ({ ...prevState, message: "" }));
            }
        } else if (input === "custom_short_url") {
            const regex = /^[a-zA-Z0-9_-]+$/;
            if (text === "") {
                setErrorMessage((prevState: any) => ({ ...prevState, settingsError: "" }))
            }
            else if (text.length < 7 || text.length > 100) {
                setErrorMessage((prevState: any) => ({ ...prevState, settingsError: "Input must be in between 7-100 characters long" }))
            } else if (!regex.test(text)) {
                setErrorMessage((prevState: any) => ({ ...prevState, settingsError: "Input must contain only letters, digits, underscores (_), and hyphens (-)" }))
            } else {
                setErrorMessage((prevState: any) => ({ ...prevState, settingsError: "" }))
            }
        }
        setFormData((prevState: any) => ({ ...prevState, [input]: text }))
    }

    const submitHandler = async () => {
        try {
            setIsLoading(true);

            if (formData.destination_url === "") {
                setErrorMessage((prevState: any) => ({ ...prevState, message: "Please enter destination url!" }))

            } else if (errorMessage.settingsError != "") {
                setAccordionOpen(true);
            } else {
                setErrorMessage((prevState: any) => ({ ...prevState, message: "" }))
                setErrorMessage((prevState: any) => ({ ...prevState, settingsError: "" }))
                const payload: any = formData;
                if (payload.custom_short_url === "") delete payload.custom_short_url;

                const { data } = await axios.post(`${settings.appURL}guest/generate`, payload);
                if (data.status === 200) {
                    setShortURL(data.data.new_url);
                    setIsCreated(true);
                } else {
                    alert("Server Error!")
                }
            }
        } catch (error) {
            alert("Something went wrong!");
        } finally {
            setIsLoading(false);
        }
    }

    const checkBackHalfHandler = async (text: string) => {
        setIsDisabled(true);
        try {
            const { data } = await axios.get(`${settings.appURL}${text}`)
            if (data.status === 200 && data?.data?.is_available) {
                setIsAvailable(true)
                setIsDisabled(false);
            } else {
                setErrorMessage((prevState: any) => ({ ...prevState, settingsError: "Back half link already exist!" }))
                setIsAvailable(false);
                setIsDisabled(true);
            }
        } catch (error) {
            alert("Something Went Wrong!");
            setIsDisabled(false);
        }
    }

    useEffect(() => {
        if (errorMessage.settingsError === "" && formData?.custom_short_url?.length >= 7) {
            setIsDisabled(true);
            setIsAvailable(false);
            const delay = 300;
            const debounce = setTimeout(() => {
                checkBackHalfHandler(formData.custom_short_url)
            }, delay)
            return () => {
                clearTimeout(debounce)
            }
        }
    }, [formData.custom_short_url]);

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
                            <div className={`input-main-container`}>
                                <div className='input-inner-container flex flex-row items-center active-text-box'>
                                    <div className='link-logo-container'>
                                        <img src={LinkIcon} className='link-logo' alt="link icon" />
                                    </div>
                                    <div className='input-box-container'>
                                        <input className={`input-box`} placeholder='Enter the link here' value={shortURL} />
                                    </div>
                                    <div className='button-container'>
                                        <CopyToClipboard text={shortURL}
                                            onCopy={() => { setCopied(true) }}>
                                            <Button type='success' text={`${copied ? 'Copied' : 'Copy'}`} icon={CopyIcon} onClick={() => { }} />
                                        </CopyToClipboard>
                                    </div>
                                </div>
                            </div>
                            <div className='switch-container'>
                                <Button type='secondary' text='Generate More' onClick={() => {
                                    setShortURL("");
                                    setFormData((prevState: any) => ({ ...prevState, destination_url: "" }))
                                    setFormData((prevState: any) => ({ ...prevState, custom_short_url: "" }))
                                    setIsAvailable(false);
                                    setIsCreated(false);
                                }} />
                            </div>
                        </>
                        :
                        <>
                            <div className={`input-main-container`}>
                                <div className={`input-inner-container flex flex-row items-center ${errorMessage.message != "" ? 'input-error' : ''}`}>
                                    <div className='link-logo-container'>
                                        <img src={LinkIcon} className='link-logo' alt='link-logo' />
                                    </div>
                                    <div className='input-box-container'>
                                        <input className='input-box' placeholder='Enter the link here' value={formData.destination_url} onChange={(e: any) => { handleInputChange('destination_url', e.target.value) }} />
                                    </div>
                                    <div className='button-container'>
                                        <Button type='secondary' text='Shorten Now!'
                                            isLoading={isLoading}
                                            disabled={isDisabled || errorMessage.settingsError != "" || errorMessage.message != ""}
                                            onClick={() => {
                                                submitHandler()
                                            }} />
                                    </div>
                                </div>
                                {
                                    <span className='error-message'>{errorMessage.message}</span>
                                }
                            </div>

                            <div className='switch-container'>

                                <span className="relative inline-flex items-center cursor-pointer pl-3 gear-icon" onClick={() => { setAccordionOpen(!accordionOpen) }}>
                                    <img src={GearIcon} className='gear-icon' alt='gear icon' />
                                    <span className="ms-1 text-sm font-medium text-gray-900 dark:text-gray-300 settings-text">Customize</span>
                                </span>
                            </div>
                            <span className='text-primary'>{isDisabled}</span>
                            <div
                                className={`accordian-container grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${accordionOpen || isDisabled
                                    ? "grid-rows-[1fr] opacity-100 mt-2 flex"
                                    : "grid-rows-[0fr] opacity-0"
                                    }`}
                            >
                                <div className="overflow-hidden accordian-inner-container">

                                    <div className="back-half-container flex justify-center">
                                        <div className='inner-backhalf-container'>
                                            <label htmlFor="domain">Domain</label>
                                            <div id="domain" className='input domain-container items-center'>
                                                <span className='domain-name'>https://u4r.in</span>
                                            </div>
                                        </div>
                                        <div className='inner-backhalf-container'>
                                            <span className='dot'>. </span>
                                            <div className='input text-center'>
                                                <span className='slash-text'>/</span>
                                            </div>
                                        </div>
                                        <div className='inner-backhalf-container backhalf-container-internal'>
                                            <label htmlFor='backhalf'>Enter a custom back-half</label>
                                            <div className={`input text-center  ${errorMessage.settingsError != '' ? 'error-container' : ''} ${errorMessage.settingsError === "" && isAvailable ? 'success-container' : ""}`}>
                                                <input type='text' className="back-half-input" placeholder='my-resume' onChange={(e: any) => { handleInputChange('custom_short_url', e.target.value) }} />
                                            </div>
                                            <span className="errorText">
                                                {errorMessage.settingsError}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                }
                <div className='register-now-brand'>
                    <h5 className='brand-text'>Upgrade Your <span className='brand-number'>Link Game</span> and Experience Endless Features!
                        <span
                            onClick={() => {
                                navigate("/auth", { state: { action: "Register" } })
                            }}
                            className='register-now-text'> Register Now</span> to enjoy Unlimited Usage.</h5>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}
export default Home;