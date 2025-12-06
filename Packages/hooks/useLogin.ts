import { useState, type FormEvent } from "react";
import { api } from "../api/api";
import { toast } from "react-toastify";
import { useUserStore } from '../store/useUserStore';
import { loginSchema } from "../schemas/loginSchema";
import { useAuthRedirect } from "./useAuthRedirect";


function useLogin() {
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [loading, setLoading] = useState(false);
const  {handleLoginSuccess}  = useAuthRedirect(); 
   const login = useUserStore((s)=> s.login)
const handleSubmit = async (e: FormEvent) => {
 
  e.preventDefault();
  setLoading(true);

  try {
    const parseResult = loginSchema.safeParse({email,senha})
    if (parseResult.error){
      parseResult.error.issues.forEach(err => {
      toast.error(err.message);
    });
    return;
    }

    const { data } = await api.post("/users/login", { email, senha });

    if (data?.token && data?.user) {
      login(data.user,data.token)
      toast.success("Login feito com sucesso 🍕");
   handleLoginSuccess();
    } else {
      throw new Error("Resposta inválida do servidor");
    }
  } catch (error) {
    console.error("Erro no login:", error);
    toast.error("Falha ao fazer login");
  } finally {
    setLoading(false);
  }
};

  return {
    email,
    setEmail,
    senha,
    setSenha,
    loading,
    setLoading,
    handleSubmit,
  } as const;
}

export default useLogin;
