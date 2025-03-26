import styled from "styled-components";
import { colors } from "../../styles/theme";

export const SectionHero = styled.section`
    width: 100%;
    height: auto;

    img{
        width: 100%;
        height: 703px;

        object-fit: cover;
    }
`

export const BoxText = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;

    justify-content: center;
    align-items: flex-start;

    gap: 135px;

    margin-top: 100px;

    & h1{
        font-size: 40px;
        max-width: 616px;   
    }
`

export const BoxButton = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 25px;

    & p{
        font-size: 20px;
        font-weight: lighter;
        color: ${colors.text.secondaray};
    }
`

export const SectionFeatures = styled.section`
    margin-top: 120px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: auto;

    gap: 80px;

    img{
        object-fit: cover;
    }
`

export const ContainerButtons = styled.div`
    display: flex;
    gap: 20px;
`

export const Title = styled.h1`
    font-size: 40px;
    max-width: 768px;
    text-align: center;
`

export const ContainerFeatures = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    width: 100%;
    height: auto;
`

export const SectionFirstCallToAction = styled.section`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: auto;

    margin-top: 120px;
    gap: 135px;

    img{
        width: 616px;
        height: 100%;
        object-fit: cover;
    }

    h1{
        font-size: 40px;
        max-width: 616px;
        text-align: left;  
    }

    p{
        font-size: 18px;
        font-weight: lighter;
        color: ${colors.text.secondaray};
        max-width: 616px;
    }
`

export const SectionFeedbacks = styled.section`
    margin-top: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 280px;
`

export const SectionPlans = styled.section`
    margin-top: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: auto;
`

export const BoxTextPlans = styled.div`
    text-align: center;
    margin-bottom: 52px;

    h1{
        font-size: 40px;
    }

    p{
        font-size: 18px;
        font-weight: lighter;
        color: ${colors.text.secondaray};
    }

`

export const BoxCards = styled.div`
    display: flex;
    flex-direction: row;
    gap: 50px;
`

export const SectionQuestions = styled.section`
    margin-top: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    height: auto;

    h1{
        font-size: 40px;
        margin-bottom: 52px;
    }
`

export const SectionSecondCallToAction = styled.section`
    margin-top: 120px;
    width: 100%;
    height: 200px;

    display: flex;
    flex-direction: column;
    align-items: center;

    margin-bottom: 200px;
`

export const BoxCallToAction = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    border-radius: 10px;
    background-color:  ${colors.primary.main};

    width: 1296px;
    height: auto;

    padding: 30px;
`

export const TextsCallToAction = styled.div`
    color: ${colors.text.white};

    h1{
        font-size: 40px;
        max-width: 704px;
    }

    p{
        font-size: 18px;

        margin-bottom: 63px;
    }

    img{
        width: 500px;
        height: 214px;
    }

    button{
        border: none;
        padding: 15px 150px 15px 150px;
        border-radius: 5px;
        color: ${colors.text.secondaray};
        font-size: 20px;
        transition: 0.5s;
    }

    button:hover{
        background-color: ${colors.primary.other};
        color: ${colors.text.white};
    }
`