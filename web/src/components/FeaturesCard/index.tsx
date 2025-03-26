import PlaceholderImage from "../../assets/placeholder-image.jpg";
import ButtonLandingPage from ".././Button";

import {
    Card
} from './style'

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