import './Styles.scss';

import HeartIcon from '../../assets/icons/heart.svg';

const Footer = () => {
    return (
        <div className="footer-main-container">
            <div className='footer-inner-container'>
                <h1 className='footer-text flex justify-center items-center'>Made with <img src={HeartIcon} className='heart-icon' /> by Dev Crafted Creations.</h1>
            </div>
        </div>
    )
}

export default Footer;