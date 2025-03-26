import DoneIcon from '@mui/icons-material/Done';

import { colors } from "../../styles/theme";

import {
    Card,
    HeaderCard,
    ContainerItens,
    Item
} from './style'

interface PlanCardProps{
    planName?: string,
    price?: string,
    itens?: string[],
    isButton?: boolean
}

export default function PlanCard({planName = "Plano Básico", price = "0,00", itens = []}: PlanCardProps){
    return(
        <Card>
            <HeaderCard>
                <h3>{planName}</h3>
                <p>R$ {price}/ano</p>
            </HeaderCard>

            <hr/>

            <ContainerItens>
                {
                    itens.map((item: string) => {
                        return(
                            <Item>
                                <DoneIcon style={{ color: `${colors.border.main}`, fontSize: '24px' }} />
                                <p>{item}</p>
                            </Item>
                        )
                    })
                }
            </ContainerItens>
            
        </Card>
    );
}