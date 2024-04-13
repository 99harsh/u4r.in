import "./Styles.scss";

import Button from "../../constants/Button/Button";

import LinkOpen from '../../assets/icons/link-open.svg';
import LinkOpenPink from '../../assets/icons/link-open-pink.svg';
import EyeIcon from '../../assets/icons/eye-icon.svg';
import CopyIcon from '../../assets/icons/copy-white.svg';
import DownloadIcon from '../../assets/icons/download.svg';
import axios from "axios";
import { useState, useEffect, createRef } from "react";
import settings from "../../constants/settings";
import CopyToClipboard from "react-copy-to-clipboard";
import LinkIcon from '../../assets/icons/link.svg';
import CardSkeleton from "../../constants/Loader/Loader";
import LoaderAnimation from "../../assets/icons/loader.svg";
import { useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import QRCode from 'react-qr-code';

const Dashboard = () => {

    const navigator = useNavigate()
    const [accordionOpen, setAccordionOpen] = useState(false);
    const [userName, setUserName] = useState("User");
    const [isCreated, setIsCreated] = useState(false);
    const [errorMessage, setErrorMessage] = useState({ titleError: "", message: "", settingsError: "" });
    const [formData, setFormData] = useState({
        title: "",
        destination_url: "",
        custom_short_url: "",
        source: "web"
    });
    const [isLoading, setIsLoading] = useState(false);
    const [shortURL, setShortURL] = useState("");
    const [copied, setCopied] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [isAvailable, setIsAvailable] = useState(false);
    const [isInitalLoad, setInitialLoad] = useState(true);
    const [urldata, setUrlData] = useState({ data: [] });
    const qrCodeRef: any = createRef();

    const handleInputChange = (input: string, text: string) => {
        if (input === "title") {
            if (input.length > 100) {
                setErrorMessage((prevState: any) => ({ ...prevState, titleError: "Title must be less than 100 character!" }));
            } else {
                setErrorMessage((prevState: any) => ({ ...prevState, titleError: "" }));
            }
        }
        else if (input === "destination_url") {
            const regex = /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*/;
            if (text.length > 500) {
                setErrorMessage((prevState: any) => ({ ...prevState, message: "Destination url must be less than 500 characters!" }));
            } else if (!regex.test(text) && text != "") {
                setErrorMessage((prevState: any) => ({ ...prevState, message: "Please enter a valid url!" }))
            } else {
                setErrorMessage((prevState: any) => ({ ...prevState, message: "" }));
            }

            console.log(regex.test(text), text, errorMessage.message)
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
            if (formData.title == "") {
                setErrorMessage((prevState: any) => ({ ...prevState, titleError: "Please enter title!" }));
            }
            else if (formData.destination_url === "") {
                setErrorMessage((prevState: any) => ({ ...prevState, message: "Please enter destination url!" }))
            } else if (errorMessage.settingsError != "") {
                setAccordionOpen(true);
            } else {
                setErrorMessage((prevState: any) => ({ ...prevState, message: "" }))
                setErrorMessage((prevState: any) => ({ ...prevState, settingsError: "" }))
                const payload: any = formData;
                if (payload.custom_short_url === "") delete payload.custom_short_url;
                const head = {
                    access_token: localStorage.getItem("auth_token")
                }
                const { data } = await axios.post(`${settings.appURL}user/generate`, payload, { headers: head });
                if (data.status === 200) {
                    setShortURL(data.data.new_url);
                    setIsCreated(true);
                } else {
                    alert("Server Error!")
                }
            }
        } catch (error) {
            console.log("Error", error)
        } finally {
            loadUrlData();
            setIsLoading(false);
        }
    }

    const checkBackHalfHandler = async (text: string) => {
        setIsDisabled(true);
        try {
            const { data } = await axios.get(`https://u4r.in/check_availability/${text}`)
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
            console.log("Server Error!", error);
            setIsDisabled(false);
        }
    }

    const downloadQRCode = () => {
        const canvas = qrCodeRef.current.querySelector('canvas');
        console.log("CANVAS", canvas)
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "QRCode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    const loadUrlData = async () => {
        try {
            setInitialLoad(true)
            const userName: any = localStorage.getItem("user_name");
            if (userName) {
                setUserName(userName);
            }
            const headers = {
                access_token: localStorage.getItem("auth_token")
            }
            console.log(headers);
            const { data } = await axios.get(`${settings.appURL}user/urls`, { headers: headers });
            console.log(data.data);
            if (data.status == 200) {
                setUrlData((prevState: any) => ({ ...prevState, data: data.data }));
                console.log("DATA", data.data)
            } else if (data.status == 401) {
                localStorage.clear();
                navigator("/")
            }
        } catch (error) {
            console.log("ERROR", error);
        } finally {
            setInitialLoad(false);
        }
    }

    // const changeLinkStatus = (element:any) =>{
    //     try{
    //         const {data} = axios.post()
    //     }catch(error){

    //     }finally{

    //     }
    // }

    const logout = () =>{
        try{
            const headers = {
                access_token: localStorage.getItem("auth_token")
            }
            const data = axios.get(`${settings.appURL}user/logout`, {headers:headers});
            localStorage.clear();
            navigator("/")
            console.log("DATA", data);
        }catch(error){
            console.log("ERROR", error);
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

    useEffect(() => {
        loadUrlData()
    }, []);




    return (
        <div className="dashboard-main-container">
            <div className="header-container flex items-center justify-between">
                <div className="logo-container">
                    <h1 className="logo">U4R.in</h1>
                </div>
                <div className="flex items-center">
                    <div className="mr-2">
                        <button id="dropdownInformationButton" data-dropdown-toggle="dropdownInformation" className="dropdown-btn flex items-center" type="button">
                            Hello, {
                                userName ? userName : "User"
                            }
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>

                        <div id="dropdownInformation" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-35 dark:bg-gray-700 dark:divide-gray-600 dropdown-container">
                            <div className="py-2">
                                <button onClick={()=>{logout()}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                isInitalLoad ?
                    <>
                        <div className="loading-animation">
                            <img src={LoaderAnimation} />
                        </div>
                    </> :
                    <>

                        <div className="body-container flex flex-col items-center">
                            {
                                isCreated ?
                                    <>
                                        <div className={`input-main-container`}>
                                            <div className='input-inner-container flex flex-row items-center active-text-box'>
                                                <div className='link-logo-container'>
                                                    <img src={LinkIcon} className='link-logo' />
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
                                    </> :
                                    <div className="create-container">
                                        <div className="input-container flex flex-col">
                                            <label>Title</label>
                                            <input type='text' className={`input-box ${errorMessage.titleError != "" ? 'input-error' : ""}`} placeholder="Enter title" value={formData.title} onChange={(e: any) => { handleInputChange('title', e.target.value) }} />
                                            {
                                                errorMessage.titleError != "" ?
                                                    <span className="error-text">{errorMessage.titleError}</span> : ""
                                            }
                                        </div>
                                        <div className="input-container flex flex-col">
                                            <label>Long URL</label>
                                            <input type='text' className={`input-box ${errorMessage.message != "" ? 'input-error' : ""}`} placeholder="Enter destination url" value={formData.destination_url} onChange={(e: any) => { handleInputChange('destination_url', e.target.value) }} />
                                            {
                                                errorMessage.message != "" ?
                                                    <span className="error-text">{errorMessage.message}</span> : ""
                                            }
                                        </div>
                                        <div className="input-container flex flex-col">
                                            <label>Back-half URL (Optional)</label>
                                            <input type='text' className={`input-box ${errorMessage.settingsError != "" ? 'input-error' : ""}`} placeholder="my-resume" onChange={(e: any) => { handleInputChange('custom_short_url', e.target.value) }} />
                                            {
                                                errorMessage.settingsError != "" ?
                                                    <span className="error-text">{errorMessage.settingsError}</span> : ""
                                            }
                                        </div>
                                        {/* <div className="input-container flex flex-col">
                          <div>
                              <label className="relative inline-flex items-center cursor-pointer justify-center">
                                  <input type="checkbox" value="" className="sr-only peer" />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-red after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 generate-text">Generate QR</span>
                              </label>
                          </div>
                      </div> */}
                                        <div className="">
                                            <Button type="secondary" text="Generate Short Link"
                                                isLoading={isLoading}
                                                disabled={isDisabled || errorMessage.settingsError != "" || errorMessage.message != ""}
                                                onClick={() => {
                                                    submitHandler()
                                                }}
                                            />
                                        </div>
                                    </div>

                            }
                            {
                                urldata.data.length > 0 ?
                                    <div className="history-container">
                                        <div className="history-heading-container text-center">
                                            <h1 className="wohoo-text">W<span className="oo-container">oo</span>h<span className="oo-container">oooo</span>!</h1>
                                            <span className="sub-wohoo-text">Here are your shortend URLs! Now start rick-rolling your friends!</span>
                                        </div>
                                        <div className="card-flex-container flex flex-row flex-wrap ">
                                            {
                                                urldata.data.map((element: any) => {
                                                    return (
                                                        <div className='card'>
                                                            <div className='card-header flex items-center justify-between'>
                                                                <div>
                                                                    <p className="card-heading">{element.title}</p>
                                                                </div>
                                                                {/* <label className="flex items-center relative w-max cursor-pointer select-none">
                                                    <input checked={element.status} type="checkbox" className="appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-red-500" />
    
                                                    <span className="w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-200" />
                                                </label> */}

                                                            </div>
                                                            <div className='card-body flex flex-col'>
                                                                <div className='flex flex-col'>
                                                                    <a className="short-url flex flex-row items-center" href={element.shorten_url} target="_blank">
                                                                        <span>{element.shorten_url}</span>
                                                                        <img src={LinkOpen} className="link-icon" />
                                                                        <span className={`dot ${element.status ? 'active-link' : 'inactive-link'}`}>{element.status ? 'Active' : "Inactive"}</span>
                                                                    </a>
                                                                    <a className="short-url long-url flex flex-row items-center" href={element.destination_url} target="_blank">
                                                                        <span>{element.destination_url}</span>
                                                                        <img src={LinkOpenPink} className="link-icon" />
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className='card-footer flex flex-row items-center justify-between'>
                                                                <div className="flex flex-row items-center">
                                                                    <div className="visit-count-container flex items-center">
                                                                        <img src={EyeIcon} className="eye-icon" />
                                                                        <span className='visit-count'>{element.click_count}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span className="slash">|</span>
                                                                    </div>
                                                                    <div className="created-at-container">
                                                                        <span className="created-at">{format(element.created_at, "EEEE, dd MMM yyyy")}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-row items-center">
                                                                    <button className="btn-copy flex items-center">
                                                                        <CopyToClipboard text={element.shorten_url}>
                                                                            <div className="flex flex-row copy-button-container items-center">
                                                                                <img src={CopyIcon} className="copy-icon" />
                                                                                <span>Copy</span>
                                                                            </div>
                                                                        </CopyToClipboard>
                                                                      

                                                                    </button>


                                                                </div>
                                                            </div>
                                                        </div>

                                                    )
                                                })
                                            }
                                        </div>
                                    </div> : ""
                            }
                        </div></>
            }
        </div>
    )
}

export default Dashboard;