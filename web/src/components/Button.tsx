import styled from "styled-components"

const FirstButton = styled.button`
    padding: 15px 26px 15px 26px;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    background-color: #2563EB;
    color: #FFF;

    transition: 0.5s;
    
    &:hover{
        background-color: #1e40ab;
    }
`

const SecondButton = styled.button`
    padding: 15px 26px 15px 26px;
    font-size: 20px;
    
    border-radius: 5px;

    background-color: #FFF;

    border: 1px solid #2563EB;

    transition: 0.5s;
    
    &:hover{
        background-color: #343434;
        border-color: #343434;
        color: #FFF;
    }
`

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
    