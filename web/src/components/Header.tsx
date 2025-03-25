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

export default function Header(){
    return (
        <HeaderContainer>
            <img src={logo} alt="Logo AutoFrota" />

        </HeaderContainer>
    )   
}