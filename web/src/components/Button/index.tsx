
import { useNavigate } from 'react-router-dom';
import {
    SecondButton,
    FirstButton
} from './style'

interface ButtonProps{
    text?: string;
    transparent?: boolean;
}

export default function ButtonLandingPage({text = "Button", transparent = false}: ButtonProps){

    const navigate: any = useNavigate();
    if(transparent){
        return (
            <SecondButton onClick={() => navigate('/register')}
            >
                {text}
            </SecondButton>
        )
    }else{
        return (
            <FirstButton onClick={() => navigate('/register')}
            >
                {text}
            </FirstButton>
        )
    }
}
    