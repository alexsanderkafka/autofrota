import logo from "../assets/autofrota.png";
import styled from "styled-components";

const HeaderContainer = styled.header`
    padding: 18px 50px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
        height: 40px;
        width: auto;
    }
`

const HeaderButton = styled.button`
    all: unset;
    background-color: #2563EB;
    border-radius: 5px;
    padding: 9px 55px;

    color: #FFF;

    transition: 0.5s;

    &:hover{
        background-color: #1e40ab;
    }
`

export default function Header(){
    return (
        <HeaderContainer>
            <img src={logo} alt="Logo AutoFrota" />

            <HeaderButton>
                Comece
            </HeaderButton>
        </HeaderContainer>
    )   
}