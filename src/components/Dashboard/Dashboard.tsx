import "./Styles.scss";

import { Tooltip } from 'react-tooltip'

import Button from "../../constants/Button/Button";

import LinkOpen from '../../assets/icons/link-open.svg';
import LinkOpenPink from '../../assets/icons/link-open-pink.svg';
import EyeIcon from '../../assets/icons/eye-icon.svg';
import CopyIcon from '../../assets/icons/copy-white.svg';
import DownloadIcon from '../../assets/icons/download.svg';

const Dashboard = () => {
   
    return (
        <div className="dashboard-main-container">
             {
       JSON.stringify(window.screen)
    }
            <div className="header-container flex items-center justify-between">
                <div className="logo-container">
                    <h1 className="logo">U4R.in</h1>
                </div>
                <div className="flex items-center">
                    <div className="mr-2">
                        <button id="dropdownInformationButton" data-dropdown-toggle="dropdownInformation" className="dropdown-btn flex items-center" type="button">Hello, Harsh
                            <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>

                        <div id="dropdownInformation" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-35 dark:bg-gray-700 dark:divide-gray-600 dropdown-container">
                            <div className="py-2">
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="body-container flex flex-col items-center">
                <div className="create-container">
                    <div className="input-container flex flex-col">
                        <label>Title</label>
                        <input type='text' className="input-box" placeholder="Enter title" />
                    </div>
                    <div className="input-container flex flex-col">
                        <label>Long URL</label>
                        <input type='text' className="input-box" placeholder="Enter title" />
                    </div>
                    <div className="input-container flex flex-col">
                        <label>Back-half URL (Optional)</label>
                        <input type='text' className="input-box" placeholder="Enter title" />
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
                        <Button type="secondary" text="Generate Short Link" onClick={() => { }} />
                    </div>
                </div>
                <div className="history-container">
                    <div className="history-heading-container text-center">
                        <h1 className="wohoo-text">W<span className="oo-container">oo</span>h<span className="oo-container">oooo</span>!</h1>
                        <span className="sub-wohoo-text">Here are your shortend URLs! Now start rick-rolling your friends!</span>
                    </div>
                    <div className="card-flex-container flex flex-row flex-wrap">
                        <div className='card'>
                            <div className='card-header flex items-center justify-between'>
                                <div>
                                    <p className="card-heading">Ladki patane ke 4 totke</p>
                                </div>
                                <label className="flex items-center relative w-max cursor-pointer select-none">
                                    <input type="checkbox" className="appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-red-500" />

                                    <span className="w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-200" />
                                </label>

                            </div>
                            <div className='card-body flex flex-col'>
                                <div className='flex flex-col'>
                                    <a className="short-url flex flex-row items-center" href="#">
                                        <span>u4r.in/testname</span>
                                        <img src={LinkOpen} className="link-icon" />
                                        <span className="dot inactive-link">Inactive</span>
                                    </a>
                                    <a className="short-url long-url flex flex-row items-center" href="#">
                                        <span>https://www.intricatecloud.io/2019/10/using-angular-innerhtml-to-display-user-generated-content-without-sacrificing-security/</span>
                                        <img src={LinkOpenPink} className="link-icon" />
                                    </a>
                                </div>
                            </div>
                            <div className='card-footer flex flex-row items-center justify-between'>
                                <div className="flex flex-row items-center">
                                    <div className="visit-count-container flex items-center">
                                        <img src={EyeIcon} className="eye-icon" />
                                        <span className='visit-count'>10</span>
                                    </div>
                                    <div>
                                        <span className="slash">|</span>
                                    </div>
                                    <div className="created-at-container">
                                        <span className="created-at">Tue, 20 Aug</span>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center">
                                    <button className="btn-copy flex items-center mr-4">
                                        <img src={DownloadIcon} className="copy-icon" />
                                        <span>Download QR</span>

                                    </button>

                                    <button className="btn-copy flex items-center">
                                        <img src={CopyIcon} className="copy-icon" />
                                        <span>Copy</span>

                                    </button>


                                </div>
                            </div>
                        </div>
                        <div className='card'>
                            <div className='card-header flex items-center justify-between'>
                                <div>
                                    <p className="card-heading">Ladki patane ke 4 totke</p>
                                </div>
                                <label className="flex items-center relative w-max cursor-pointer select-none">
                                    <input type="checkbox" className="appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-red-500" />

                                    <span className="w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-200" />
                                </label>

                            </div>
                            <div className='card-body flex flex-col'>
                                <div className='flex flex-col'>
                                    <a className="short-url flex flex-row items-center" href="#">
                                        <span>u4r.in/testname</span>
                                        <img src={LinkOpen} className="link-icon" />
                                        <span className="dot active-link">Activate</span>
                                    </a>
                                    <a className="short-url long-url flex flex-row items-center" href="#">
                                        <span>https://www.intricatecloud.io/2019/10/using-angular-innerhtml-to-display-user-generated-content-without-sacrificing-security/https://www.intricatecloud.io/2019/10/using-angular-innerhtml-to-display-user-generated-content-without-sacrificing-security/https://www.intricatecloud.io/2019/10/using-angular-innerhtml-to-display-user-generated-content-without-sacrificing-security/</span>
                                        <img src={LinkOpenPink} className="link-icon" />
                                    </a>
                                    <Tooltip anchorSelect=".long-url" place="bottom" className="tooltip-container">
                                        <span className="tooltip-text">https://www.intricatecloud.io/2019/10/using-angular-innerhtml-to-display-user-generated-content-without-sacrificing-security/ https://www.intricatecloud.io/2019/10/using-angular-innerhtml-to-display-user-generated-content-without-sacrificing-security/</span>

                                    </Tooltip>
                                </div>
                            </div>
                            <div className='card-footer flex flex-row items-center justify-between'>
                                <div className="flex flex-row items-center">
                                    <div className="visit-count-container flex items-center">
                                        <img src={EyeIcon} className="eye-icon" />
                                        <span className='visit-count'>10</span>
                                    </div>
                                    <div>
                                        <span className="slash">|</span>
                                    </div>
                                    <div className="created-at-container">
                                        <span className="created-at">Tue, 20 Aug</span>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center">
                                    <button className="btn-copy flex items-center">
                                        <img src={CopyIcon} className="copy-icon" />
                                        <span>Copy</span>

                                    </button>


                                </div>
                            </div>
                        </div>
                        <div className='card'>
                            <div className='card-header flex items-center justify-between'>
                                <div>
                                    <p className="card-heading">Ladki patane ke 4 totke</p>
                                </div>
                                <label className="flex items-center relative w-max cursor-pointer select-none">
                                    <input type="checkbox" className="appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-red-500" />

                                    <span className="w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-200" />
                                </label>

                            </div>
                            <div className='card-body flex flex-col'>
                                <div className='flex flex-col'>
                                    <a className="short-url flex flex-row items-center" href="#">
                                        <span>u4r.in/testname</span>
                                        <img src={LinkOpen} className="link-icon" />
                                        <span className="dot inactive-link">Inactive</span>
                                    </a>
                                    <a className="short-url long-url flex flex-row items-center" href="#">
                                        <span>https://www.intricatecloud.io/2019/10/using-angular-innerhtml-to-display-user-generated-content-without-sacrificing-security/</span>
                                        <img src={LinkOpenPink} className="link-icon" />
                                    </a>
                                </div>
                            </div>
                            <div className='card-footer flex flex-row items-center justify-between'>
                                <div className="flex flex-row items-center">
                                    <div className="visit-count-container flex items-center">
                                        <img src={EyeIcon} className="eye-icon" />
                                        <span className='visit-count'>10</span>
                                    </div>
                                    <div>
                                        <span className="slash">|</span>
                                    </div>
                                    <div className="created-at-container">
                                        <span className="created-at">Tue, 20 Aug</span>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center">
                                    <button className="btn-copy flex items-center">
                                        <img src={CopyIcon} className="copy-icon" />
                                        <span>Copy</span>

                                    </button>
                                    <button className="btn-copy flex items-center ml-4">
                                        <img src={DownloadIcon} className="copy-icon" />
                                        <span>Download QR</span>

                                    </button>


                                </div>
                            </div>
                        </div>
                        <div className='card'>
                            <div className='card-header flex items-center justify-between'>
                                <div>
                                    <p className="card-heading">Ladki patane ke 4 totke</p>
                                </div>
                                <label className="flex items-center relative w-max cursor-pointer select-none">
                                    <input type="checkbox" className="appearance-none transition-colors cursor-pointer w-14 h-7 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-blue-500 bg-red-500" />

                                    <span className="w-7 h-7 right-7 absolute rounded-full transform transition-transform bg-gray-200" />
                                </label>

                            </div>
                            <div className='card-body flex flex-col'>
                                <div className='flex flex-col'>
                                    <a className="short-url flex flex-row items-center" href="#">
                                        <span>u4r.in/testname</span>
                                        <img src={LinkOpen} className="link-icon" />
                                        <span className="dot active-link">Activate</span>
                                    </a>
                                    <a className="short-url long-url flex flex-row items-center" href="#">
                                        <span>https://www.intricatecloud.io/2019/10/using-angular-innerhtml-to-display-user-generated-content-without-sacrificing-security/</span>
                                        <img src={LinkOpenPink} className="link-icon" />
                                    </a>
                                </div>
                            </div>
                            <div className='card-footer flex flex-row items-center justify-between'>
                                <div className="flex flex-row items-center">
                                    <div className="visit-count-container flex items-center">
                                        <img src={EyeIcon} className="eye-icon" />
                                        <span className='visit-count'>10</span>
                                    </div>
                                    <div>
                                        <span className="slash">|</span>
                                    </div>
                                    <div className="created-at-container">
                                        <span className="created-at">Tue, 20 Aug</span>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center">
                                    <button className="btn-copy flex items-center">
                                        <img src={CopyIcon} className="copy-icon" />
                                        <span>Copy</span>

                                    </button>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;