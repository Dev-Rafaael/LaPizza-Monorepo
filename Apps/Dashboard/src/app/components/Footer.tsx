
import "../../styles/Footer.css";

function Footer() {
  return (
   <footer className="footer">
         <div className="footer-center">
         <a href="https://github.com/seuGitHub" target="_blank" rel="noreferrer" className="footer-icon">
          🐙 GitHub
        </a>
       <span className="footer-dot">•</span>
        <span className="footer-meta status-online">Sistema online</span>
        <span className="footer-dot">•</span>
         <a href="https://linkedin.com/in/seuLinkedin" target="_blank" rel="noreferrer" className="footer-icon">
          💼 LinkedIn
        </a>
      </div>

    </footer>
  );
}

export default Footer;

