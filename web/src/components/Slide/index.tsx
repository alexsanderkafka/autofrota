import StarRateIcon from '@mui/icons-material/StarRate';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import PlaceholderImage from "../../assets/placeholder-image.jpg";

import { 
    SlideContainer,
    SlideFooterContainer,
    BoxPositionSlide,
    ButtonPassSlide,
    Circle,
    Positions,
    FeedbackPhrase
} from "./style";


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

            <FeedbackPhrase>“É uma frase de feedback de algum usuário”</FeedbackPhrase>

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
                    <Positions>
                        <Circle className="activate"></Circle>
                        <Circle></Circle>
                        <Circle></Circle>
                        <Circle></Circle>
                    </Positions>
                <ButtonPassSlide>
                    <ArrowForwardIosIcon />
                </ButtonPassSlide>
            </BoxPositionSlide>
        </SlideContainer>
    );
}