import PlaceholderImage from "../../assets/placeholder-image.jpg";
import ButtonLandingPage from "../../components/Button";
import FeaturesCard from "../../components/FeaturesCard";
import PlanCard from "../../components/PlanCard";
import AccordionQuestion from "../../components/AccordionQuestion";

import CarImage from "../../assets/car.png";
import Fuel from "../../assets/fuel.png";
import Checklist from "../../assets/checklist.png";
import Maintenance from "../../assets/maintenance.png";
import Manage from "../../assets/manage.png";

import {
    SectionHero,
    BoxText,
    BoxButton,
    ContainerButtons,
    SectionFeatures,
    Title,
    ContainerFeatures,
    SectionFirstCallToAction,
    SectionPlans,
    BoxTextPlans,
    BoxCards,
    SectionQuestions,
    SectionSecondCallToAction,
    BoxCallToAction,
    TextsCallToAction
} from './style';

export default function LandingPage(){
    return (
        <>
            <SectionHero>
                <img src={PlaceholderImage} alt="" />

                <BoxText>
                    <h1>Gerencie sua frota de forma eficiente</h1>

                    <BoxButton>
                        <div>
                            <p>Somos um sistema de gestão de frota.</p>
                            <p>Oferecemos soluções que gera economia para sua empresas.</p>
                        </div>
    
                        <ContainerButtons>
                            <ButtonLandingPage text="Contato" />
                            <ButtonLandingPage text="Saiba mais" transparent={true} />
                        </ContainerButtons>
                    </BoxButton>
                </BoxText>

            </SectionHero>

            <SectionFeatures>
                <Title>Recursos Essenciais para o Gerenciamento Eficiente da Sua Frota</Title>

                <ContainerFeatures>
                    <FeaturesCard title="Controle de gasto de combustível" description="Descubra como nosso sistema pode ajudar a sua empresa a reduzir custos." img={Fuel}/>
                    <FeaturesCard title="Controle de manutenções" description="Acompanhe as manutenções dos veículos e previna quebras inesperadas." img={Maintenance}/>
                    <FeaturesCard title="Checklist nos veículos" description="Faça checklists completos e evite imprevistos com os veículos." img={Checklist}/>
                </ContainerFeatures>
            </SectionFeatures>

            <SectionFirstCallToAction>
                <div>
                    <Title>Descubra os benifícios do nosso sistema para gerenciamento de frota</Title>
                    <p>Com nosso sistema, você pode reduzir custos operacionais, aumentar a eficiência e garantir a segurança da sua frota. Transforme a gestão de veículos em uma tarefa simples e eficaz.</p>
                </div>

                <img src={Manage} alt="" />
            </SectionFirstCallToAction>

            <SectionPlans>
                <BoxTextPlans>
                    <h1>Planos</h1>
                    <p>Escolha o plano que melhor se adapta a você</p>
                </BoxTextPlans>

                <BoxCards>
                    <PlanCard planName="Plano Básico" price="0,00" itens={["Controle de gasto de combustível", "Controle de manutenções", "Checklist nos veículos"]}/>
                    <PlanCard planName="Plano Pro" price="0,00" itens={["Todas as funcionalidades do básico", "Emissão de alertas", "Geração de relatório para cada veículo", "Análise de gastos", "Suporte ao cliente"]}/>
                </BoxCards>
            </SectionPlans>

            <SectionQuestions>
                <Title>Perguntas frequentes</Title>
                <AccordionQuestion title="Quais são as formas de pagamento aceitas?" content="Descubra como nosso sistema pode ajudar a sua empresa a reduzir custos."/>
                <AccordionQuestion title="Quanto tempo leva para ativar a conta?" content="Descubra como nosso sistema pode ajudar a sua empresa a reduzir custos."/>
                <AccordionQuestion title="O App do AutoFrota é multiplaforma?" content="Descubra como nosso sistema pode ajudar a sua empresa a reduzir custos."/>
                <AccordionQuestion title="Onde faço o download do App do AutoFrota?" content="Descubra como nosso sistema pode ajudar a sua empresa a reduzir custos."/>
            </SectionQuestions>
            

            <SectionSecondCallToAction>
                <BoxCallToAction>
                    <TextsCallToAction >
                        <h1>Pronto para começar a gerenciar a sua frota de veículos?</h1>
                        <p>Comece agora, é rápido e fácil</p>

                        <button>
                            Comece agora
                        </button>
                    </TextsCallToAction >

                    <img src={CarImage} alt="Carro vermelho" />
                </BoxCallToAction>
            </SectionSecondCallToAction>
        </>
    )
}