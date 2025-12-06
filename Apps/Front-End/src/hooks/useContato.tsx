import { useState } from 'react'
import { toast } from 'react-toastify';
import { api } from '@packages/api/api';
import { contatoSchema } from '@packages/schemas/contatoSchema';

function UseContato() {
   const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({
    nome: "",
    sobreNome: "",
    email: "",
    assunto: "",
    mensagem: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const parseResult = contatoSchema.safeParse(formData);

    if (!parseResult.success) {
      parseResult.error.issues.forEach((err) => {
        toast.warning(`🛎️ ${err.message}`);
      });

      setLoading(false);
      return;
    }

    try {
      await api.post("/contatos/", formData);
      toast.success("🛎️ Mensagem Enviada com sucesso!");
      setFormData({
        nome: "",
        sobreNome: "",
        email: "",
        assunto: "",
        mensagem: "",
      });
    } catch (error) {
      console.log(error);
      toast.warning("🛎️ Mensagem Não foi Enviada!");
    } finally {
      setLoading(false);
    }
  };
  return {formData,setFormData,handleChange,loading,setLoading,handleSubmit} as const
}

export default UseContato
