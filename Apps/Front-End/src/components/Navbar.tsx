import PizzaIcon from "../assets/IMG/faviconPizza.png";
import styles from "../styles/NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faBell,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { NotificationDropdown } from "./NotificationDropdown";
import { ToastNotification } from "./ToastNotification";
import useNavbar from "../hooks/useNavbar";
import { useState, useEffect, useRef } from "react";
import {useUserStore, type UserStore} from "@packages/store/useUserStore";
function Navbar() {
  const {
    open,
    setOpen,
    toast,
    setToast,
    isModalOpen,
    isMenuOpen,
    searchTerm,
    searchResults,
    unreadCount,
    toggleModal,
    toggleMenu,
    closeModal,
    handleSearchChange,
    clearSearch,
  } = useNavbar();
  const logout = useUserStore((s:UserStore) => s.logout);
  const [userOpen, setUserOpen] = useState(false);
  const menuRef = useRef<HTMLLIElement>(null);
  const notificationRef = useRef<HTMLLIElement | null>(null);
useEffect(() => {
  function handleOutsideClick(e: MouseEvent | TouchEvent) {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  }

  document.addEventListener("mousedown", handleOutsideClick);
  document.addEventListener("touchstart", handleOutsideClick);

  return () => {
    document.removeEventListener("mousedown", handleOutsideClick);
    document.removeEventListener("touchstart", handleOutsideClick);
  };
}, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleClickOutside(e:any) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);
  return (
    <section className={styles.navBar}>
      {toast && (
        <ToastNotification message={toast} onClose={() => setToast(null)} />
      )}

      <div className={styles.content}>
        <div className={styles.hamburgerMenu} onClick={toggleMenu}>
          <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
        </div>

        <a href="/" className={styles.title}>
          <img src={PizzaIcon} alt="Ícone de pizza" />
          <span> LAPIZZA</span>
        </a>
        <nav className={styles.navbarContent}>
          <div
            className={`${styles.navItens} ${isMenuOpen ? styles.open : ""}`}
          >
            <ul>
              <li>
                <button onClick={toggleModal}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </li>
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/Sobre">Sobre nós</Link>
              </li>
              <li>
                <Link to="/Cardapio">Cardápio</Link>
              </li>
              <li>
                <Link to="/fale-conosco/">Contato</Link>
              </li>
              <li>
                <Link to="/Politica-Privacidade">Politica</Link>
              </li>

              <li>
                <Link to="/Carrinho">
                  <FontAwesomeIcon icon={faCartShopping} />
                </Link>
              </li>
              <li className={styles.userMenu} ref={menuRef}>
                <button
                  className={styles.userButton}
                  onClick={() => setUserOpen((prev) => !prev)}
                >
                  <FontAwesomeIcon icon={faUser} />
                </button>

                {userOpen && (
                  <div className={styles.userDropdown}>
                    <Link to="/Perfil">Minha Conta</Link>
                    <Link to="/Meus-Pedidos">Meus Pedidos</Link>
                    <button onClick={logout}>Logout</button>
                  </div>
                )}
              </li>
                  <li
            className={styles.notificationWrapper}
            ref={notificationRef}
            onClick={() => setOpen(prev => !prev)}
          >
            <FontAwesomeIcon icon={faBell} className={styles.bell} />

            {unreadCount > 0 && (
              <span className={styles.notificationBadge}>{unreadCount}</span>
            )}

            {open && <NotificationDropdown />}
          </li>

            </ul>
          </div>
        </nav>

        {isModalOpen && (
          <div className={styles.modalOverlay} onClick={toggleModal}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Pesquisar</h2>
              <div className={styles.searchContainer}>
                <input
                  type="text"
                  placeholder="Digite sua busca..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className={styles.searchInput}
                />

                {searchTerm && (
                  <button className={styles.clearButton} onClick={clearSearch}>
                    Limpar
                  </button>
                )}
              </div>
              <div className={styles.searchResults}>
                {searchResults.length > 0 ? (
                  <ul>
                    {searchResults.map((item, index) => (
                      <div className={styles.pacotesType} key={index}>
                        <img src={item.imagem} alt={item.sabor} />
                        <h2>{item.sabor}</h2>
                        <p>{item.descricao}</p>
                        <div className={styles.pacotesPreco}>
                          <p>R${item.preco.toFixed(2)}</p>
                        </div>
                        <div className={styles.actionPay}>
                          <Link
                            to={`/Orçamento/${item.sabor}`}
                            onClick={closeModal}
                          >
                            Selecionar
                          </Link>
                        </div>
                      </div>
                    ))}
                  </ul>
                ) : (
                  <p className={styles.vazioSearch}>
                    Nenhum pacote encontrado.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Navbar;
