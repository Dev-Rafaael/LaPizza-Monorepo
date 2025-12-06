import React from "react";
import "../../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <h2 className="footer-logo">MeuDashboard</h2>
        <p className="footer-copy">© {new Date().getFullYear()} Todos os direitos reservados</p>
      </div>

      <div className="footer-center">
        <a href="/sobre" className="footer-link">Sobre</a>
        <a href="/contato" className="footer-link">Contato</a>
        <a href="/ajuda" className="footer-link">Ajuda</a>
      </div>

      <div className="footer-right">
        <a href="https://github.com/seuGitHub" target="_blank" rel="noreferrer" className="footer-icon">
          🐙 GitHub
        </a>
        <a href="https://linkedin.com/in/seuLinkedin" target="_blank" rel="noreferrer" className="footer-icon">
          💼 LinkedIn
        </a>
      </div>
    </footer>
  );
}

export default Footer;

