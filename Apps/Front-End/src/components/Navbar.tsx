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
import usePizza from "../hooks/usePizza";
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
    hamburgerButtonRef,
    menuRef,
    closeMenu
  } = useNavbar();
    const {selectedPizza} = usePizza()
  const logout = useUserStore((s:UserStore) => s.logout);
  const [userOpen, setUserOpen] = useState(false);
  const notificationRef = useRef<HTMLLIElement | null>(null);


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
        <div
  ref={menuRef}
  className={styles.hamburgerMenu}
  onClick={(e) => {
    e.stopPropagation();
    toggleMenu();
  }}
>
  <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
</div>

        <a href="/" className={styles.title}>
          <img src={PizzaIcon} alt="Ícone de pizza" />
          <span> LAPIZZA</span>
        </a>
        <nav className={styles.navbarContent}>
          <div
           ref={menuRef}
            className={`${styles.navItens} ${isMenuOpen ? styles.open : ""}`}
          >
            <ul>
              <li>
                <button onClick={toggleModal} >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </li>
              <li>
                <Link to="/"  onClick={closeMenu}>HOME</Link>
              </li>
              <li>
                <Link to="/Sobre"  onClick={closeMenu}>Sobre nós</Link>
              </li>
              <li>
                <Link to="/Cardapio"  onClick={closeMenu}>Cardápio</Link>
              </li>
              <li>
                <Link to="/fale-conosco/" onClick={closeMenu} >Contato</Link>
              </li>
              <li>
                <Link to="/Politica-Privacidade" onClick={closeMenu}>Politica</Link>
              </li>

              <li>
                <Link to="/Carrinho"  onClick={closeMenu}>
                  <FontAwesomeIcon icon={faCartShopping} />
                </Link>
              </li>
              <li className={styles.userMenu}>
                <button
                  className={styles.userButton}
                  onClick={() => setUserOpen((prev) => !prev)}
                >
                  <FontAwesomeIcon icon={faUser}  />
                </button>

                {userOpen && (
                  <div className={styles.userDropdown}>
                    <Link to="/Perfil"  onClick={closeMenu}>Minha Conta</Link>
                    <Link to="/Meus-Pedidos"  onClick={closeMenu}>Meus Pedidos</Link>
                    <button onClick={logout}>Logout</button>
                  </div>
                )}
              </li>
                  {/* <li
            className={styles.notificationWrapper}
            ref={notificationRef}
            onClick={() => setOpen(prev => !prev)}
          >
            <FontAwesomeIcon icon={faBell} className={styles.bell} />

            {unreadCount > 0 && (
              <span className={styles.notificationBadge}>{unreadCount}</span>
            )}

            {open && <NotificationDropdown />}
          </li> */}

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
                              to={`/orcamento/${item.id}`}
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
