import {
  FooterContainer,
  FooterContent,
  FooterLink,
  FooterLinks,
  FooterText,
} from "./footer.styles";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          © {new Date().getFullYear()} Club Clothing. Todos os direitos
          reservados. | Desenvolvido por Pedro Faleiros
        </FooterText>

        <FooterLinks>
          <FooterLink
            href="https://github.com/pedrofaleirosss"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* GitHub */}
            <FaGithub size={24} />
          </FooterLink>

          <FooterLink
            href="https://www.linkedin.com/in/pedro-faleiros123/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* LinkedIn */}
            <FaLinkedin size={24} />
          </FooterLink>
        </FooterLinks>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
