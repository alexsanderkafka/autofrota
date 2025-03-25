import styled from "styled-components";

import PlaceholderImage from "../assets/placeholder-image.jpg";
import ButtonLandingPage from "./Button";

const Card = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    text-align: center;
    width: 405px;
    height: auto;

    img{
        width: 100%;
        height: 431px;
        margin-bottom: 30px
    }

    h1{
        font-size: 24px;
        margin-bottom: 15px;
    }

    p{
        font-size: 16px;
        font-weight: lighter;
        color: #343A40;
        margin-bottom: 30px
    }
`

interface CardProps{
    title?: string;
    description?: string;
}

export default function FeaturesCard({title = "Coloque um title", description = "Coloque uma descrição."}: CardProps){
    return (
        <Card>
            <img src={PlaceholderImage} alt="" />

            <h1>{title}</h1>
            <p>{description}</p>

            <ButtonLandingPage text="Saiba mais" />
        </Card>
    )
}