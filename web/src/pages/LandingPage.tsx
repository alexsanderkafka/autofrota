import "../styles/landing-page.css";

import PlaceholderImage from "../assets/placeholder-image.jpg";
import ButtonLandingPage from "../components/Button";
import FeaturesCard from "../components/FeaturesCard";
import PlanCard from "../components/PlanCard";
import AccordionQuestion from "../components/AccordionQuestion";

import CarImage from "../assets/car.png";
import Slide from "../components/Slide";

export default function LandingPage(){
    return (
        <>
            <section id="section-hero">
                <img src={PlaceholderImage} alt="" />

                <div className="box-text">
                    <h1>Gerencie sua frota de forma eficiente</h1>

                    <div className="box-button">
                        <div>
                            <p>Somos um sistema de gestão de frota.</p>
                            <p>Oferecemos soluções que gera economia para sua empresas.</p>
                        </div>
    
                        <div className="buttons">
                            <ButtonLandingPage text="Contato" />
                            <ButtonLandingPage text="Saiba mais testes" transparent={true} />
                        </div>
                    </div>

                </div>
            </section>

            <section id="section-features">
                <h1 className="title">Recursos Essenciais para o Gerenciamento Eficiente da Sua Frota</h1>

                <div className="containter-features">
                    <FeaturesCard title="Controle de gasto de combustível" description="Descubra como nosso sistema pode ajudar a sua empresa a reduzir custos."/>
                    <FeaturesCard title="Controle de manutenções" description="Acompanhe as manutenções dos veículos e previna quebras inesperadas."/>
                    <FeaturesCard title="Checklist nos veículos" description="Faça checklists completos e evite imprevistos com os veículos."/>
                </div>
            </section>

            <section id="section-first-call-to-action">
                <div>
                    <h1 className="title">Descubra os benifícios do nosso sistema para gerenciamento de frota</h1>
                    <p>Com nosso sistema, você pode reduzir custos operacionais, aumentar a eficiência e garantir a segurança da sua frota. Transforme a gestão de veículos em uma tarefa simples e eficaz.</p>
                </div>

                <img src={PlaceholderImage} alt="" />
            </section>

            <section id="section-feedbacks">
                <Slide />
            </section>

            <section id="section-plans">
                <div className="box-text-plans">
                    <h1>Planos</h1>
                    <p>Escolha o plano que melhor se adapta a você</p>
                </div>

                <div className="box-cards">
                    <PlanCard planName="Plano Básico" price="0,00" itens={["Controle de gasto de combustível", "Controle de manutenções", "Checklist nos veículos"]}/>
                    <PlanCard planName="Plano Pro" price="0,00" itens={["Todas as funcionalidades do básico", "Emissão de alertas", "Geração de relatório para cada veículo", "Análise de gastos", "Suporte ao cliente"]}/>
                </div>
            </section>

            <section id="section-questions">
                <h1 className="title">Perguntas frequentes</h1>
                <AccordionQuestion title="Quais são as formas de pagamento aceitas?" content="Descubra como nosso sistema pode ajudar a sua empresa a reduzir custos."/>
                <AccordionQuestion title="Quanto tempo leva para ativar a conta?" content="Descubra como nosso sistema pode ajudar a sua empresa a reduzir custos."/>
                <AccordionQuestion title="O App do AutoFrota é multiplaforma?" content="Descubra como nosso sistema pode ajudar a sua empresa a reduzir custos."/>
                <AccordionQuestion title="Onde faço o download do App do AutoFrota?" content="Descubra como nosso sistema pode ajudar a sua empresa a reduzir custos."/>
            </section>
            

            <section id="section-second-call-to-action">

            <div id="box-call-to-action">

                <div className="texts-call-to-action">
                    <h1>Pronto para começar a gerenciar a sua frota de veículos?</h1>
                    <p>Comece agora, é rápido e fácil</p>

                    <button>
                        Comece agora
                    </button>
                </div>

                <img src={CarImage} alt="Carro vermelho" />

            </div>

            </section>
        </>
    )
}