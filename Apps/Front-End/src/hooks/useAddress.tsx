import { useState, type FormEvent } from "react";
import { api } from "@packages/api/api";
import { toast } from "react-toastify";
import { addressSchema } from "@packages/schemas/addressSchema";

function useAddress(onContinue: (addressId: number) => void, userId?: number) {
const [cep, setCEP] = useState<string>("");
const [estado, setEstado] = useState<string>("");
const [cidade, setCidade] = useState<string>("");
const [bairro, setBairro] = useState<string>("");
const [rua, setRua] = useState<string>("");
const [numero, setNumero] = useState<string>("");
const [complemento, setComplemento] = useState<string>("");



  const handleAddress = async (e:FormEvent) => {
    e.preventDefault();
 if (!userId) {
      toast.error("Usuário não identificado");
      return;
    }
    const addressData = {
      cep,
      estado,
      cidade,
      bairro,
      rua,
      numero,
      complemento,
    };
    try {
      const parseResult = addressSchema.safeParse(addressData);
      if (parseResult.error) {
        parseResult.error.issues.forEach((err) => {
          toast.error(err.message);
        });
        return
      }
      const {data} = await api.post("/address/", {
        ...addressData,
        userId
      });

      toast.success("Endereço Criado Com Sucesso");
      onContinue(data.id)
      setCEP("");
      setEstado("");
      setCidade("");
      setBairro("");
      setRua("");
      setNumero("");
      setComplemento("");

    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar endereço");
      
    }
  };

  return {
    cep,
    setCEP,
    estado,
    setEstado,
    cidade,
    setCidade,
    bairro,
    setBairro,
    rua,
    setRua,
    numero,
    setNumero,
    complemento,
    setComplemento,
    handleAddress,
  } as const;
}

export default useAddress;

