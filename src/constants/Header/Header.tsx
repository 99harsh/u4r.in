import React from 'react';
import './Styles.scss';

const Header = () =>{
    return (
        <div className="header-main-container">
            <div className="flex">
                <div className="logo-container">
                    <h1 className="logo">Small.it</h1>
                </div>
                <div>
                    <button>Login</button>
                </div>
            </div>
        </div>
    )
}

export default Header;