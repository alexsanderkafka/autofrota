import styled from 'styled-components';
import Logo from '../assets/autofrota.png';
import ButtonLandingPage from './Button';

const FooterContainer = styled.footer`
  padding-top: 80px;
  padding-bottom: 25px;
`;


const FooterContent = styled.div`
  margin: 0 auto;
  padding: 0 50px;
`;

const FooterItens = styled.div`
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  
`;

const FooterSectionLogo = styled.div`
  display: flex;
  flex-direction: column;
  
  justify-content: left;

  img{
    width: auto;
    height: 40px;
    object-fit: contain;

    margin-bottom: 7px;
  }

  p{
    max-width: 378px;
    font-size: 18px;

    margin-bottom: 76px;
  }
`;

const FooterTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 24px;
`;

const FooterLink = styled.a`
  color: #343434;
  text-decoration: none;

  transition: 0.3s;

  &:hover {
    color: #2563eb;
  }
`;

const Copyright = styled.div`
  text-align: start;
  color: #000;
  font-weight: bold;
  font-size: 14px;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterItens>
          <FooterSectionLogo>
            <img src={Logo} alt="Logo"/>
            <p>
              Caso não tenha uma conta ainda, confira os planos e comece a gerenciar a sua frota.
            </p>

            <div style={{display: 'flex', gap: '20px'}}>
              <ButtonLandingPage text='Criar conta'/>
              <ButtonLandingPage text='Saiba mais' transparent={true}/>
            </div>
          </FooterSectionLogo>

          <FooterSection>
            <FooterTitle>Sobre</FooterTitle>
            <FooterLink href="#">Quem somos</FooterLink>
            <FooterLink href="#">Contato</FooterLink>
            <FooterLink href="#">Missão e valores</FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Suporte</FooterTitle>
            <FooterLink href="#">Horário</FooterLink>
            <FooterLink href="#">Telefone: (00) 0 0000-0000</FooterLink>
            <FooterLink href="#">E-mail</FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Termos</FooterTitle>
            <FooterLink href="#">Uso</FooterLink>
            <FooterLink href="#">Privacidade</FooterLink>
            <FooterLink href="#">Pagamento</FooterLink>
            <FooterLink href="#">Reembolso</FooterLink>
            <FooterLink href="#">Cancelamento</FooterLink>
          </FooterSection>

          <FooterSection>
            <FooterTitle>Siga-nos</FooterTitle>
              <FooterLink href="#" target="_blank" rel="noopener noreferrer">Facebook</FooterLink>
              <FooterLink href="#" target="_blank" rel="noopener noreferrer">Instagram</FooterLink>
              <FooterLink href="#" target="_blank" rel="noopener noreferrer">X</FooterLink>
              <FooterLink href="#" target="_blank" rel="noopener noreferrer">LinkedIn</FooterLink>
              <FooterLink href="#" target="_blank" rel="noopener noreferrer">YouTube</FooterLink>
          </FooterSection>
        </FooterItens>

        <hr style={{
          margin: '120px 0 25px 0',
          borderColor: '#2563EB',
        }}/>

        <Copyright>
          {new Date().getFullYear()} AutoFrota. Todos os direitos reservados.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
}