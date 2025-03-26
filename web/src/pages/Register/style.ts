
import styled from "styled-components";

import { typography } from "../../styles/theme";

export const RegisterContainer = styled.div`

    *{
        font-family: ${typography.fontFamily.primary};
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding-top: 50px;

    img{
        width: 200px;
        height: auto;
        margin-bottom: 70px;
    }
`;

export const RegisterTexts = styled.div`
    display: flex;
    flex-direction: column;

    text-align: center;

    h1{
        font-size: 40px;
        
    }

    p{
        font-size: 20px;
    }
`