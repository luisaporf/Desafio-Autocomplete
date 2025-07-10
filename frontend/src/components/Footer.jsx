import React from 'react';
import './Footer.css';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

// Componente que renderiza o rodapé completo do site.
export const Footer = () => {
  // Obtém o ano atual dinamicamente para o aviso de copyright.
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-column">
            <h4>Institucional</h4>
            <ul>
              <li><a href="#">Sobre Nós</a></li>
              <li><a href="#">Carreiras</a></li>
              <li><a href="#">Contato</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Soluções</h4>
            <ul>
              <li><a href="#">Para Advogados</a></li>
              <li><a href="#">Para Empresas</a></li>
              <li><a href="#">Para Estudantes</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Siga-nos</h4>
            <div className="social-icons">
              <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
              <a href="#" aria-label="GitHub"><FaGithub /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
            </div>
          </div>
        </div>

        <div className="footer-base">
          <hr />
          <p>&copy; {currentYear} Consulta Jurídica. Todos os direitos reservados.</p>
          <div className="footer-legal-links">
            <a href="#">Termos de Uso</a>
            <span>|</span>
            <a href="#">Política de Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
};