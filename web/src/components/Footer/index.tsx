import Logo from '../../assets/autofrota.png';
import ButtonLandingPage from '../Button';

import {
  FooterContainer,
  FooterContent,
  FooterItens,
  FooterSectionLogo,
  FooterSection,
  FooterTitle,
  FooterLink,
  Copyright,
} from './style';

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