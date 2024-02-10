import './Style.scss';

interface Btn {
    type: "primary" | "secondary",
    text:string,
    icon?: any
}

const Button = ({ type, icon, text }: Btn) => {
    return (
        <div className='button-main-container'>
            {
                type == "primary" ?
                    <div className='button-container primary-button-container'>
                        <button className='flex button items-center'>
                        {text}
                        {
                            icon ?
                            <img src={icon} className='icon' />:""
                        }
                        </button>
                     
                    </div> :
                    type == "secondary" ?
                    <div className='button-container secondary-button-container'>
                        <button>{text}</button>
                    </div> : ""
            }

        </div>
    )
}

export default Button;