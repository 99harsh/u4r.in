import { useNavigate } from 'react-router-dom';

import './Styles.scss';

import SignInIcon from '../../assets/icons/sign-in.svg';

import Button from '../Button/Button';

import mixpanel from '../../utils/mixpanel';

const Header = ({route}:any) => {

    const navigate = useNavigate();

    return (
        <div className='header-main-container'>
            <div className="flex flex-row justify-between">
                <div className="logo-container">
                    <h1 className="logo">U4R.in</h1>
                </div>
                <div className='flex flex-row'>
                    <div className='login-btn-container'>
                        <Button type="primary" icon={SignInIcon} text='Login'
                            onClick={() => {
                                navigate("/auth", {state: {action:"Login"}})
                                
                            }}
                        />
                    </div>
                    <div>
                        <Button type="secondary" text='Register Now'
                            onClick={() => {
                                navigate("/auth", {state: {action: "Register"}})
                            }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;