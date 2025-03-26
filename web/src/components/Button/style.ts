import styled from "styled-components"

import { colors } from "../../styles/theme";

export const FirstButton = styled.button`
    padding: 15px 26px 15px 26px;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    background-color: ${colors.primary.main};
    color: ${colors.text.white};

    transition: 0.5s;
    
    &:hover{
        background-color: ${colors.primary.dark};
    }
`

export const SecondButton = styled.button`
    padding: 15px 26px 15px 26px;
    font-size: 20px;
    
    border-radius: 5px;

    background-color: ${colors.primary.white};

    border: 1px solid ${colors.border.main};

    transition: 0.5s;
    
    &:hover{
        background-color: ${colors.primary.other};
        border-color: ${colors.border.other};
        color: ${colors.text.white};
    }
`