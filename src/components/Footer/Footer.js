import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import logo from "../../image/logo.png"
import { useLanguage } from "../../contexts/LanguageContext";

import "./Footer.css";

const whatsapp = "+5491158094982";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* TOP */}
        <div className="footer-top">
          {/* BRAND */}
          <div>
            <div className="footer-brand">
              <div className="footer-logo">
                <img className="logo-footer" src={logo} alt="logo" />
              </div>

              <div>
                <h2 className="footer-title">
                  Juan Carlos
                </h2>

                <p className="footer-subtitle">
                  Fullstack Developer
                </p>
              </div>
            </div>

            <p className="footer-description">
              {t("footer_desc")}
            </p>
          </div>

          {/* CONTACT */}
          <div className="footer-section">
            <h3>{t("footer_contact")}</h3>

            <div className="socials">
              <a
                className="social-link whatsapp"
                href={`https://wa.me/${whatsapp.replace(
                  /\D/g,
                  ""
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </a>

              <a
                href="https://github.com/jciasenza"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link github"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/juan-carlos-iasenza-8119501a9/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link linkedin"
              >
                <FaLinkedin />
              </a>

              <a
                href="mailto:iasenzajuancarlos@gmail.com"
                className="social-link mail"
              >
                <FaEnvelope />
              </a>
            </div>

            {/* <p className="footer-contact-text">
              {t("footer_contact_text")}
            </p> */}
          </div>
        </div>

        {/* BOTTOM */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()}
            {" "}
            Juan Carlos Iasenza.
            {" "}
            {t("footer_rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}