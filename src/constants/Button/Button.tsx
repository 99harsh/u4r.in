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
                    <button className='button-container primary-button-container' onClick={onClick}>
                        <div className='flex button items-center' >
                            {text}
                            {
                                icon ?
                                    <img src={icon} className='icon' /> : ""
                            }
                        </div>

                    </button> :
                    type == "secondary" ?
                        <button className='button-container secondary-button-container'  disabled={isLoading} onClick={onClick}>
                            <div className='text-center'>
                                {isLoading ?
                                    <div className="bouncing-loader">
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div> : text}
                            </div>
                        </button>
                        :
                        type == "success" ?
                            <button className='button-container success-button-container' onClick={onClick}>
                                <div className='flex button text-center'>{text}
                                    {
                                        icon ?
                                            <img src={icon} className='success' /> : ""
                                    }</div>
                            </button>
                            : ""
            }

        </div>
    )
}

export default Button;