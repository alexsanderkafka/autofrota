import logo from "../../assets/autofrota.png";

import {
    HeaderContainer,
    HeaderButton
} from './style'

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