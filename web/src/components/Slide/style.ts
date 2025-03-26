import styled from "styled-components";
import { colors } from "../../styles/theme";

export const SlideContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const FeedbackPhrase = styled.div`
    margin-top: 40px;
    font-weight: bold;
    font-size: 24px;
`

export const SlideFooterContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    gap: 30px;

    margin-top: 30px;

    h4{
        font-weight: bold;
        font-size: 16px;
    }

    p{
        font-weight: lighter;
        font-size: 16px;
    }

    hr{
        height: 61px;
        border-color: ${colors.border.main};
    }

    img{
        width: 48px;
        height: 48px;
    }
`;

export const BoxPositionSlide = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    margin-top: 30px;

    gap: 20px;
`;

export const Circle = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border:1px solid ${colors.border.main};

    &.activate{
        background-color: ${colors.primary.main};
    
    }
`;

export const ButtonPassSlide = styled.button`
    all: unset;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid ${colors.border.main};
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    color: ${colors.text.other};

    transition: 0.3s;

    &:hover{
        background-color: ${colors.primary.main};
        color: ${colors.text.white};
    }

`;

export const Positions = styled.div`
    display: flex;
    flex-direction: row;
    gap: 14px
`;