import Button from '../Button/Button';

import './Styles.scss';

import SignInIcon from '../../assets/icons/sign-in.svg';

const Header = () => {
    return (
        <div className='header-main-container'>
            <div className="flex flex-row justify-between">
                <div className="logo-container">
                    <h1 className="logo">Small.it</h1>
                </div>
                <div className='flex flex-row'>
                    <div className='login-btn-container'>
                        <Button type="primary" icon={SignInIcon} text='Login'/>
                    </div>
                    <div>
                        <Button type="secondary" text='Register Now' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;