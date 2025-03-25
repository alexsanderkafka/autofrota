import styled from "styled-components";
import Logo from "../assets/autofrota.png";
import PlanCard from "../components/PlanCard";
import ToggleButton from "../components/ToggleButton";
import { useState } from "react";
import Forms from "../components/Forms";


const RegisterContainer = styled.div`

    *{
        font-family: 'Roboto', sans-serif;
    }

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    padding-top: 50px;

    img{
        width: 200px;
        height: auto;
        margin-bottom: 70px;
    }
`;

const RegisterTexts = styled.div`
    display: flex;
    flex-direction: column;

    text-align: center;

    h1{
        font-size: 40px;
        
    }

    p{
        font-size: 20px;
    }
`

const RegisterContainerPlanButtons = styled.div`
    display: flex;
    flex-direction: row;
    gap: 50px;
    margin-top: 50px;
    margin-bottom: 50px;
`


export default function Register(){

    const [type, setType] = useState("Pessoa física");

    return(
        <RegisterContainer>
            <img src={Logo} alt="" />

            <RegisterTexts>
                <h1>Cadastre-se</h1>
                <p>Escolha o seu o plano e comece a gerenciar sua frota</p>
            </RegisterTexts>

            <RegisterContainerPlanButtons>
                <PlanCard planName="Plano Básico" price="0,00" itens={["Controle de gasto de combustível", "Controle de manutenções", "Checklist nos veículos"]}/>
                <PlanCard planName="Plano Pro" price="0,00" itens={["Todas as funcionalidades do básico", "Emissão de alertas", "Geração de relatório para cada veículo", "Análise de gastos", "Suporte ao cliente"]}/>
            </RegisterContainerPlanButtons>

            <ToggleButton type={type} setActive={setType} />

            <Forms typeForm={type}/>


        </RegisterContainer>
    );
}