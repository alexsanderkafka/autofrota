import { useNavigate } from "react-router-dom";
import logo from "../../assets/autofrota.png";

import {
    HeaderContainer,
    HeaderButton
} from './style'

export default function Header(){

    const navigate: any = useNavigate();

    return (
        <HeaderContainer>
            <img src={logo} alt="Logo AutoFrota" />

            <HeaderButton onClick={() => navigate("/register")}>
                Comece
            </HeaderButton>
        </HeaderContainer>
    )   
}