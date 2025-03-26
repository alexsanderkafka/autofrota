import styled from "styled-components";
import { colors } from "../../styles/theme";

export const ContainerFormsButton = styled.button`
    width: 100%;
    height: auto;
    margin-top: 20px;
    padding: 15px 0px;
    background-color: ${colors.primary.main};
    color: ${colors.text.white};
    font-size: 20px;
    font-family: "Roboto", sans-serif;
    border: none;
    border-radius: 5px;
    transition: 0.3s;
    cursor: pointer;

    &:hover{
        background-color: ${colors.primary.dark};
    }
`;