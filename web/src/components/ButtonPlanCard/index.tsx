
import DoneIcon from '@mui/icons-material/Done';

import { colors } from "../../styles/theme";

import {
    ContainerToggleButtonPlanCard,
    PlanCardButton,
    ContaierItens,
    HeaderCard,
    Item
} from './style';


interface PlanCardProps{
    price?: string,
    itensOne?: string[],
    itensTwo?: string[],
    type: string,
    setType : (type: string) => void
    setPlanId : (id: number) => void
}

export default function ToggleButtonPlanCard({price = "0,00", itensOne = [], itensTwo = [], type, setType, setPlanId}: PlanCardProps){
    return(
        <ContainerToggleButtonPlanCard>
            <PlanCardButton
                className={`${type === "basic" ? "active-toggle" : ""}`}
                onClick={() => {
                    setPlanId(1);
                    setType("basic");
                }}
            >
                <HeaderCard>
                    <h3>Plano básico</h3>
                    <p>R$ {price}/ano</p>
                </HeaderCard>

                <hr/>

                <ContaierItens>
                    {
                        itensOne.map((item: string) => {
                            return(
                                
                                <Item>
                                    <DoneIcon style={{ color: `${colors.text.other}`, fontSize: '24px' }} />
                                    <p>{item}</p>
                                </Item>
                            );
                        })
                    }
                </ContaierItens>
                
            </PlanCardButton>

            <PlanCardButton
                className={type === "premium" ? "active-toggle" : ""}
                onClick={() => {
                    setPlanId(2);
                    setType("premium");
                }}
            >
                <HeaderCard>
                    <h3>Plano pro</h3>
                    <p>R$ {price}/ano</p>
                </HeaderCard>

                <hr/>

                <ContaierItens>
                    {
                        itensTwo.map((item: string) => {
                            return(
                                <Item>
                                    <DoneIcon style={{ color: `${colors.text.other}`, fontSize: '24px' }} />
                                    <p>{item}</p>
                                </Item>
                            );
                        })
                    }
                </ContaierItens>
                
            </PlanCardButton>
        </ContainerToggleButtonPlanCard>
    );
}