import './Style.scss';

interface Btn {
    type: "primary" | "secondary" | "success",
    text: string,
    icon?: any,
    isLoading?: boolean,
    onClick: () => void
}

const Button = ({ type, icon, text, isLoading = false, onClick }: Btn) => {
    return (
        <div className='button-main-container'>
            {
                type == "primary" ?
                    <div className='button-container primary-button-container'>
                        <button className='flex button items-center' onClick={onClick}>
                            {text}
                            {
                                icon ?
                                    <img src={icon} className='icon' /> : ""
                            }
                        </button>

                    </div> :
                    type == "secondary" ?
                        <div className='button-container secondary-button-container'>
                            <button className='text-center' disabled={isLoading} onClick={onClick}>
                                {isLoading ?
                                    <div className="bouncing-loader">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div> : text}
                            </button>
                        </div>
                        :
                        type == "success" ?
                            <div className='button-container success-button-container'>
                                <button className='flex button text-center' onClick={onClick}>{text}
                                    {
                                        icon ?
                                            <img src={icon} className='success' /> : ""
                                    }</button>
                            </div>
                            : ""
            }

        </div>
    )
}

export default Button;