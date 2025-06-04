import styled from "styled-components";
import { colors } from "../../styles/theme";
import { breakpoints } from "../../styles/breakpoints";

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    text-align: center;
    width: 405px;
    height: auto;

    img{
        width: 100%;
        height: 431px;
        margin-bottom: 30px;
        object-fit: cover;
    }

    h1{
        font-size: 24px;
        margin-bottom: 15px;
    }

    p{
        font-size: 16px;
        font-weight: lighter;
        color: ${colors.text.secondaray};
        margin-bottom: 30px
    }

    @media (max-width: ${breakpoints.laptop}) {
        width: 80%;
    }

    
`