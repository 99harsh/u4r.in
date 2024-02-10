import './Styles.scss';

import Header from "../../constants/Header/Header";
import Button from '../../constants/Button/Button';

import LinkIcon from '../../assets/icons/link.svg';
import Footer from '../../constants/Footer/Footer';
const Home = () => {
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
                    <h3 className="subheading-text">Linkly is an efficient and easy-to-use URL shortening service that streamlines your online experience.</h3>
                </div>
                <div className='input-main-container'>
                    <div className='input-inner-container flex flex-row items-center'>
                        <div className='link-logo-container'>
                            <img src={LinkIcon} className='link-logo'/>
                        </div>
                        <div className='input-box-container'>
                            <input className='input-box' placeholder='Enter the link here'/>
                        </div>
                        <div className='button-container'>
                            <Button type='secondary' text='Shorten Now!'/>
                        </div>
                    </div>
                </div>
                <div className='switch-container'>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Generate QR</span>
                    </label>
                </div>
                <div className='register-now-brand'>
                    <h5 className='brand-text'>You can create <span className='brand-number'>05</span> more links. <a href='#' className='register-now-text'>Register Now</a> to enjoy Unlimited Usage.</h5>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}

export default Home;