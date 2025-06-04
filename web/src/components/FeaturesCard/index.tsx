import ButtonLandingPage from ".././Button";

import {
    Card
} from './style'

interface CardProps{
    title?: string;
    description?: string;
    img: any;
}

export default function FeaturesCard({title = "Coloque um title", description = "Coloque uma descrição.", img}: CardProps){
    return (
        <Card>
            <img src={img} alt="" />

            <h1>{title}</h1>
            <p>{description}</p>

            <ButtonLandingPage text="Saiba mais" />
        </Card>
    )
}