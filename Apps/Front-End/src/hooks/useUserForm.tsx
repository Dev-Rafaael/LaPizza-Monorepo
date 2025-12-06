import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { api } from "@packages/api/api";
import  {useUserStore, type UserStore}  from "@packages/store/useUserStore";
import { useNavigate } from "react-router-dom";
import { userSchema } from "@packages/schemas/userSchema";

function useUserForm() {
  const [nome, setNome] = useState<string>("");
  const [sobreNome, setSobreNome] = useState<string>("");
  const [cpf, setCPF] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [sexo, setSexo] = useState<string>("");
  const [nascimento, setNascimento] = useState<string>();
  const [telefone, setTelefone] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [account, setAccount] = useState();
  const navigate = useNavigate(); 
  const storeCreate = useUserStore((s:UserStore) => s.createUser);

  
  const handleAccount = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const dataAccount = {
        nome,
        sobreNome,
        email,
        cpf,
        sexo,
        nascimento,
        telefone,
        senha,
      };

      const schemaResult = userSchema.safeParse(dataAccount)
      if(schemaResult.error){
        schemaResult.error.issues.forEach((error)=>{
          toast.error(error.message)
        })
      }
      if (dataAccount) {
        const newAccount = (await api.post("/users/", dataAccount)).data;
        storeCreate(newAccount);
        toast.success("🍕 Pedido realizado com sucesso!");
        navigate('/Login')
        setLoading(false);
        setNome("");
        setSobreNome("");
        setEmail("");
        setSenha("");
        setSexo("");
        setNascimento("");
        setTelefone("");
      } else {
        
        toast.error(
          "Não foi possivel fazer a compra! Tente Novamente Mais tarde!"
        );
      }
    } catch (error) {
      console.log(error);
      console.log("Deu Erro");
    } finally {
      setLoading(false);
    }
  };
  return {
    nome,
    setNome,
    sobreNome,
    setSobreNome,
    cpf,
    email,
    setEmail,
    senha,
    setSenha,
    setCPF,
    sexo,
    setSexo,
    nascimento,
    setNascimento,
    telefone,
    setTelefone,
    loading,
    setLoading,
    handleAccount,
    account,
    setAccount,
  } as const;
}

export default useUserForm;
