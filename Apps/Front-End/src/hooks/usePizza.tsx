import { useEffect, useState } from "react";
import type {  Pizzas } from "@packages/types/types";
import { api } from "@packages/api/api";
import { usePizzaStore } from "../store/usePizzaStore";
import { useNavigate } from "react-router-dom";

function usePizza() {
      const [pizzas, setPizzas] = useState<Pizzas[]>([]);
    
      const pizzaSelecionada = usePizzaStore((s)=> s.setPizzaSelecionada)
      const navigate = useNavigate()
      useEffect(() => {
        const handlePizzas = async () => {
          try {
            const responsePizza = await api.get("/pizzas/");
            setPizzas(responsePizza.data);
           
          } catch (error) {
            console.log(error);
          }
        };
        handlePizzas();
      }, [])

      const selectedPizza = (pizzas:Pizzas)=>{
        if(!pizzas) return
        pizzaSelecionada(pizzas)
        navigate(`/Orçamento/${pizzas.sabor}`)
      }
  return {pizzas,selectedPizza}as const
}

export default usePizza
