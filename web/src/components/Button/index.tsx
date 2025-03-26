
import {
    SecondButton,
    FirstButton
} from './style'

interface ButtonProps{
    text?: string;
    transparent?: boolean;
}

export default function ButtonLandingPage({text = "Button", transparent = false}: ButtonProps){

    if(transparent){
        return (
            <SecondButton
            >
                {text}
            </SecondButton>
        )
    }else{
        return (
            <FirstButton
            >
                {text}
            </FirstButton>
        )
    }
}
    