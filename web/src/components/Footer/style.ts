import styled from 'styled-components';

import { colors } from "../../styles/theme";
import { breakpoints } from '../../styles/breakpoints';

export const FooterContainer = styled.footer`
  padding-top: 80px;
  padding-bottom: 25px;
`;


export const FooterContent = styled.div`
  margin: 0 auto;
  padding: 0 50px;
`;

export const FooterItens = styled.div`
    max-width: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    @media (max-width: ${breakpoints.laptop}) {
      flex-direction: column;
      gap: 30px;
    }

`;

export const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  
`;

export const FooterSectionLogo = styled.div`
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

export const FooterTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 24px;

  @media (max-width: ${breakpoints.tablet}) {
    margin-bottom: 0px;
  }
`;

export const FooterLink = styled.a`
  color: ${colors.text.secondaray};
  text-decoration: none;

  transition: 0.3s;

  &:hover {
    color: ${colors.text.other};
  }
`;

export const Copyright = styled.div`
  text-align: start;
  color:  ${colors.text.primary};
  font-weight: bold;
  font-size: 14px;
`;