import styled from "styled-components";
import { colors } from "../../styles/theme";

export const ContainerFooterRegister = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin-bottom: 30px;

    font-family: 'Roboto', sans-serif;

    p{
        font-size: 20px;
        font-weight: 100;
        color: ${colors.text.secondaray};
    }

    span{
        color: ${colors.text.other};
    }
`

export const FooterTitle = styled.p`
    margin-bottom: 20px;
`;
