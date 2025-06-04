import { colors } from "../../styles/theme";
import styled from "styled-components";
import { breakpoints } from "../../styles/breakpoints";

export const HeaderContainer = styled.header`
    padding: 18px 50px;
    background-color: ${colors.primary.white};
    box-shadow: 0 2px 4px ${colors.shadow.black};
    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
        height: 40px;
        width: auto;
    }

    @media (max-width: ${breakpoints.mobile}) {
        gap: 20px;

        flex-direction: column;
    }


`

export const HeaderButton = styled.button`
    all: unset;
    background-color: ${colors.primary.main};
    border-radius: 5px;
    padding: 9px 55px;

    color: #FFF;

    transition: 0.5s;

    &:hover{
        background-color: ${colors.primary.dark};
    }

`