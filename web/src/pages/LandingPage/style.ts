import styled from "styled-components";
import { colors } from "../../styles/theme";
import { breakpoints } from "../../styles/breakpoints";

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

    @media (max-width: ${breakpoints.laptop}) {
        gap: 50px;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h1{
            text-align: center;
        }
    }

    @media (max-width: ${breakpoints.mobile}) {
        h1{
            font-size: 34px;
        }
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


    @media (max-width: ${breakpoints.laptop}) {
        flex-direction: column;
        justify-content: center;
        align-items: center;

        p{
            text-align: center;
        }
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

    @media (max-width: ${breakpoints.mobile}) {
        font-size: 34px;
    }
`

export const ContainerFeatures = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    width: 100%;
    height: auto;

    @media (max-width: ${breakpoints.tablet}) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 50px;
    }
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

    @media (max-width: ${breakpoints.laptop}) {
        gap: 50px;
        flex-direction: column;
      
        h1{
            text-align: center;
        }

        p{
            text-align: center;
        }
    }

    @media (max-width: ${breakpoints.tablet}) {
        img{
            width: 80%;
            height: 431px;
        }
    }

    @media (max-width: ${breakpoints.mobile}) {
        h1{
            font-size: 34px;
        }
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

    @media (max-width: ${breakpoints.mobile}) {
        h1{
            font-size: 34px;
        }
    }

`

export const BoxCards = styled.div`
    display: flex;
    flex-direction: row;
    gap: 50px;

    @media (max-width: ${breakpoints.laptop}) {
      flex-direction: column;
    }

    @media (max-width: ${breakpoints.tablet}) {
      width: 80%;
    }
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

    @media (max-width: ${breakpoints.laptop}) {
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 80%;


      img{
        display: none;
      }
    }

    @media (max-width: ${breakpoints.mobile}) {
        padding-top: 30px;
        padding-bottom: 30px;
    }
    
`

export const TextsCallToAction = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

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

    @media (max-width: ${breakpoints.tablet}) {
        p, h1{
            text-align: flex-start;
        }
    }

    @media (max-width: ${breakpoints.mobile}) {
        h1{
            font-size: 34px;
        }

        button{
            padding: 15px 0px 15px 0px;
        }
    }
`