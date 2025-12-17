import { useEffect, useState, useRef } from "react";

import type { Cart } from "@packages/types/types";
import { api } from "@packages/api/api";
import { useLocation } from "react-router-dom";
import { useUserNotification } from "../store/useNotificationStore";
import { socket } from "../socket/socket";

import {useUserStore, type UserStore} from "@packages/store/useUserStore";

function useNavbar() {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Cart[]>([]);
  const location = useLocation();
  const addNotification = useUserNotification((s) => s.addNotification);
  const notifications = useUserNotification((s) => s.notifications);
  const unreadCount = notifications.filter((n) => !n.lida).length;
  const user = useUserStore((s:UserStore) => s.user);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const hamburgerButtonRef = useRef<HTMLDivElement | null>(null);
useEffect(() => {
  function handleClickOutside(e: MouseEvent | TouchEvent) {
    if (
      isMenuOpen &&
      menuRef.current &&
      !menuRef.current.contains(e.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  document.addEventListener("touchstart", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("touchstart", handleClickOutside);
  };
}, [isMenuOpen]);

  useEffect(() => {
    socket.on("orderStatusUpdated", (data) => {
      addNotification({
        id: Date.now(),
        titulo: "Status do Pedido",
        mensagem: `Pedido #${data.orderId} agora está ${data.newStatus}`,
        lida: false,
        criadoEm: new Date(),
        userId: user!.id!,
      });

      setToast(`Pedido #${data.orderId} agora está ${data.newStatus}`);
    });

    return () => {
      socket.off("orderStatusUpdated");
    };
  }, []);

  const toggleModal = () => {
    const next = !isModalOpen;
    setIsModalOpen(next);
    setIsMenuOpen(false);
    if (next) {
      setSearchTerm("");
      setSearchResults([]);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
const closeMenu = () => {
  setIsMenuOpen(false);
};
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
  };

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const { data } = await api.get(`/pizzas/${searchTerm}`);
        setSearchResults(data);
      } catch (error) {
        console.log(error);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
  }, [isModalOpen]);

  useEffect(() => {
    setIsModalOpen(false);
    setSearchTerm("");
    setSearchResults([]);
  }, [location.pathname]);

  return {
  open,
  setOpen,
  toast,
  setToast,
  isModalOpen,
  setIsModalOpen,
  isMenuOpen,
  setIsMenuOpen,
  menuRef,
  searchTerm,
  setSearchTerm,
  searchResults,
  setSearchResults,
  location,
  addNotification,
  notifications,
  unreadCount,
  user,
  toggleModal,
  toggleMenu,
  closeModal,
  handleSearchChange,
  clearSearch,
  hamburgerButtonRef,
  closeMenu
};
}

export default useNavbar;
