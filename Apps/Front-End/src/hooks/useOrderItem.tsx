import { useMemo, useState, type FormEvent } from "react";
import type { Adicional, Pizzas } from "@packages/types/types";
import { toast } from "react-toastify";
import { cartSchema } from "@packages/schemas/cartSchema";

function useOrderItem(pizzaSelecionada: Pizzas | undefined) {
  const [unidades, setUnidades] = useState(1);
  const [adicionaisSelecionados, setAdicionaisSelecionados] = useState<Adicional[]>([]);
  const [modal, setModal] = useState(false);

  const toggleAdicional = (adicional: Adicional) => {
    setAdicionaisSelecionados((prev) =>
      prev.some((a) => a.id === adicional.id)
        ? prev.filter((a) => a.id !== adicional.id)
        : [...prev, adicional]
    );
  };

  const precoTotal = useMemo(() => {
    if (!pizzaSelecionada) return 0;

    const adicionaisTotal = adicionaisSelecionados.reduce(
      (acc, ad) => acc + (ad.preco ?? 0),
      0
    );

    return (pizzaSelecionada.preco + adicionaisTotal) * unidades;
  }, [pizzaSelecionada, adicionaisSelecionados, unidades]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!pizzaSelecionada) return;

    const newOrcamento = {
      ...pizzaSelecionada,
      unidades,
      adicionais: adicionaisSelecionados,
      precoTotal,
    };

    const parseResult = cartSchema.safeParse(newOrcamento);

    if (!parseResult.success) {
      parseResult.error.issues.forEach((err) => toast.error(err.message));
      return;
    }

    setModal(true);
  };

  return {
    unidades,
    setUnidades,
    adicionaisSelecionados,
    toggleAdicional,
    precoTotal,
    handleSubmit,
    modal,
    setModal,
  } as const;
}

export default useOrderItem;

