import styled from "styled-components";

import DoneIcon from '@mui/icons-material/Done';


const ContainerToggleButtonPlanCard = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 50px;
`

const PlanCardButton = styled.div`
    display: flex;
    flex-direction: column;

    width: 496px;
    height: 615px;

    border-radius: 5px;

    margin-top: 50px;
    margin-bottom: 50px;

    cursor: pointer;

    .header-card {
        margin-top: 96px;
        margin-left: 32px;
        margin-right: 32px;
        margin: 96px 32px 28px 32px;
    }

    .header-card h3{
        font-size: 20px;
    }

    .header-card p{
        font-size: 56px;
        font-weight: bold;
    }

    hr{
        margin: 0px 32px 32px 32px;
        height: 1px;
        background-color: #2563EB;
    }

    .container-itens{
        margin: 0px 32px;
    }

    .container-itens p{
        font-size: 16px;
    }

    .item{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 15px;
        margin-bottom: 16px;
    }

    &.active-toggle {
        background-color: #FFF;
        border: 1px solid #2563EB;
    }
`;

interface PlanCardProps{
    planName?: string,
    price?: string,
    itensOne?: string[],
    itensTwo?: string[],
    type: string,
    setType : (type: string) => void
}

export default function ToggleButtonPlanCard({planName = "Plano Básico", price = "0,00", itensOne = [], itensTwo = [], type, setType}: PlanCardProps){
    return(
        <ContainerToggleButtonPlanCard>
            <PlanCardButton
                className={`${type === "basic" ? "active-toggle" : ""}`}
                onClick={() => {
                    setType("basic");
                }}
            >
                <div className="header-card">
                    <h3>{planName}</h3>
                    <p>R$ {price}/ano</p>
                </div>

                <hr/>

                <div className="container-itens">
                    {
                        itensOne.map((item: string, index: number) => {
                            return(
                                
                                <div className="item" key={index}>
                                    <DoneIcon style={{ color: '#2563EB', fontSize: '24px' }} />
                                    <p>{item}</p>
                                </div>
                            )
                        })
                    }
                </div>
                
            </PlanCardButton>

            <PlanCardButton
                className={type === "premium" ? "active-toggle" : ""}
                onClick={() => {
                    setType("premium");
                }}
            >
                <div className="header-card">
                    <h3>{planName}</h3>
                    <p>R$ {price}/ano</p>
                </div>

                <hr/>

                <div className="container-itens">
                    {
                        itensTwo.map((item: string, index: number) => {
                            return(
                                <div className="item">
                                    <DoneIcon style={{ color: '#2563EB', fontSize: '24px' }} />
                                    <p>{item}</p>
                                </div>
                            )
                        })
                    }
                </div>
                
            </PlanCardButton>
        </ContainerToggleButtonPlanCard>
    );
}