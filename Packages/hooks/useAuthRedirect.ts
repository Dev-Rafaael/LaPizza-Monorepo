
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useUserStore} from "../store/useUserStore";

export function useAuthRedirect() {
  const { user } = useUserStore();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(
    () => localStorage.getItem("nextPath") // 🔹 recupera ao iniciar
  );
  const navigate = useNavigate();

  const requireAuth = (next: string) => {
    if (!user || !user.nome || !user.telefone) {
      // 🔹 salva no estado e no localStorage
      setNextPath(next);
      localStorage.setItem("nextPath", next);
      setShowAuthModal(true);
      return false;
    }
    return true;
  };

  const handleLoginSuccess = () => {
    const savedPath = localStorage.getItem("nextPath");

    if (savedPath) {
      navigate(savedPath);
      localStorage.removeItem("nextPath"); // 🔹 limpa depois
      setNextPath(null);
    } else {
      navigate("/Perfil");
    }
  };

  // opcional: limpar o localStorage se o usuário fizer logout
  useEffect(() => {
    if (!user) localStorage.removeItem("nextPath");
  }, [user]);

  return { user, requireAuth, showAuthModal, setShowAuthModal, nextPath, handleLoginSuccess };
}
