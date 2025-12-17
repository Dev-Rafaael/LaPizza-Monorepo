import { useEffect } from "react";
import type { Pizzas } from "@packages/types/types";
import { api } from "@packages/api/api";
import { usePizzaStore } from "@packages/store/usePizzaStore";
import { useNavigate } from "react-router-dom";

function usePizza() {
  const pizzas = usePizzaStore((s) => s.pizzas);
  const setPizzas = usePizzaStore((s) => s.setPizzas);
  const navigate = useNavigate();

  useEffect(() => {
    if (pizzas.length) return;

    api.get<Pizzas[]>("/pizzas")
      .then((res) => setPizzas(res.data))
      .catch((err) => console.error(err));
  }, [pizzas.length, setPizzas]);

  const selectedPizza = (pizza: Pizzas) => {
    navigate(`/orcamento/${pizza.id}`);
  };

  return {
    pizzas,
    selectedPizza,
  };
}

export default usePizza;
