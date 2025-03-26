import styled from "styled-components";

import StarRateIcon from '@mui/icons-material/StarRate';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import PlaceholderImage from "../assets/placeholder-image.jpg";

const SlideContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .feedback-phrase{
        margin-top: 40px;
        font-weight: bold;
        font-size: 24px;
    }
`;

const SlideFooterContainer = styled.div`
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
        border-color: #2563EB;
    }

    img{
        width: 48px;
        height: 48px;
    }
`

const BoxPositionSlide = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    margin-top: 30px;

    gap: 20px;


    .positions{
        display: flex;
        flex-direction: row;
        gap: 14px
    }
`

const Circle = styled.div`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border:1px solid #2563EB;

    &.activate{
        background-color: #2563EB;
    
    }
`

const ButtonPassSlide = styled.button`
    all: unset;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid #2563EB;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;

    color: #2563EB;

    transition: 0.3s;

    &:hover{
        background-color: #2563EB;
        color: white;
    }

`

export default function Slide(){
    return(
        <SlideContainer>
            <div>
                <StarRateIcon 
                color="primary"
                />
                <StarRateIcon 
                color="primary"
                />
                <StarRateIcon 
                color="primary"
                />
                <StarRateIcon 
                color="primary"
                />
                <StarRateIcon 
                color="primary"
                />
            </div>

            <p className="feedback-phrase">“É uma frase de feedback de algum usuário”</p>

            <SlideFooterContainer>
                <div>
                    <h4>Nome</h4>
                    <p>Cargo</p>
                </div>

                <hr />

                <img src={PlaceholderImage} alt="Image do perfil da pessoa"/>
            </SlideFooterContainer>

            <BoxPositionSlide>
                <ButtonPassSlide>
                    <ArrowBackIosNewIcon />
                </ButtonPassSlide>
                    <div className="positions">
                        <Circle className="activate"></Circle>
                        <Circle></Circle>
                        <Circle></Circle>
                        <Circle></Circle>
                    </div>
                <ButtonPassSlide>
                    <ArrowForwardIosIcon />
                </ButtonPassSlide>
            </BoxPositionSlide>
        </SlideContainer>
    );
}