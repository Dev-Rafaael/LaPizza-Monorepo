import { PrismaClient } from "@prisma/client";
import { Pizza } from "../model/pizza-model";

const prisma = new PrismaClient();


export const getPizzaService = async ()=>{
    try {
        const pizzas = await prisma.pizza.findMany({
              include:{adicionais:true}
        })
        return pizzas   
    } catch (error) {
        console.log(error);
        
    }
}
export const searchPizzaService = async (sabor: string) => {
  try {
   const pizzas = await prisma.pizza.findMany({
      where: {
        sabor: {
          contains: sabor,
          mode: "insensitive",
        },
      },
    });
    return pizzas;
  } catch (error) {
    console.log(error);
        throw new Error("Erro ao buscar pizza pelo sabor");
  }
};

export const createPizzaService = async (data: Pizza) => {
  try {
    const pizza = await prisma.pizza.create({
      data: {
        sabor: data.sabor,
        preco: data.preco,
        descricao: data.descricao,
        adicionais: {
          create: (data.adicionais || []).map((a) => ({
            nome: a.nome,
            preco: Number(a.preco), 
          })),
        },
      },
      include: { adicionais: true },
    });
    return pizza;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao criar pizza");
  }
};


export const updatePizzaService = async (
  id: number,
  data: Partial<{ sabor: string; preco: number }>
) => {
  try {
    const pizza = await prisma.pizza.update({
      where: { id },
      data,
      include: { adicionais: true },
    });
    return pizza;
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao atualizar pizza");
  }
};


export const deletePizzaService = async (id: number) => {
  try {
    await prisma.pizza.delete({
      where: { id },
    });
    return { message: "Pizza deletada com sucesso" };
  } catch (error) {
    console.log(error);
    throw new Error("Erro ao deletar pizza");
  }
};
