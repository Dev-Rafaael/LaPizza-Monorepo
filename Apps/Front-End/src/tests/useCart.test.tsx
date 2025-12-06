import { beforeEach, describe, expect, test } from "vitest";
import { useUserCart } from "../store/useCartStore";
import { resetZustand } from "./resetZustand";

describe("Test the cart Features", () => {
  beforeEach(() => {
    resetZustand(useUserCart);
  });

  test("should get a Pizza", () => {
    const { addItem } = useUserCart.getState();

    addItem({
      id: 1,
      cartId: 0,
      sabor: "mussarela",
      descricao: "Muito Saborosa",
      preco: 40,
      precoTotal: 80,
      unidades: 2,
      adicionais: [],
      imagem: "pizza.png",
    });

    const items = useUserCart.getState().items;

    expect(items).toHaveLength(1);
    expect(items[0].sabor).toBe("mussarela");
  });

  test("should add a Pizza", () => {
    const { addItem } = useUserCart.getState();

    addItem({
      id: 1,
      cartId: 0,
      sabor: "mussarela",
      descricao: "Muito Saborosa",
      preco: 40,
      precoTotal: 80,
      unidades: 2,
      adicionais: [],
      imagem: "pizza.png",
    });

    const items = useUserCart.getState().items;

    expect(items[0]).toMatchObject({
      sabor: "mussarela",
      descricao: "Muito Saborosa",
      preco: 40,
    });
  });

  test("should update a Pizza", () => {
    const { addItem } = useUserCart.getState();

    addItem({
      id: 1,
      cartId: 0,
      sabor: "calabresa",
      descricao: "Muito Boa",
      preco: 40,
      precoTotal: 80,
      unidades: 2,
      adicionais: [],
      imagem: "pizza.png",
    });

    const item = useUserCart.getState().items[0];

    useUserCart.getState().updateItem(item.cartId, { precoTotal: 41 });

    const items = useUserCart.getState().items;

    expect(items).toHaveLength(1);
    expect(items[0].precoTotal).toBe(41);
  });

  test("should update and check various Pizza", () => {
    const { addItem } = useUserCart.getState();

    addItem({
      id: 1,
      cartId: 0,
      sabor: "mussarela",
      descricao: "Muito Saborosa",
      preco: 40,
      precoTotal: 80,
      unidades: 2,
      adicionais: [],
      imagem: "pizza.png",
    });

    addItem({
      id: 2,
      cartId: 0,
      sabor: "calabresa",
      descricao: "Muito Boa",
      preco: 40,
      precoTotal: 80,
      unidades: 2,
      adicionais: [],
      imagem: "pizza.png",
    });

    const item = useUserCart.getState().items[1];

    useUserCart.getState().updateItem(item.cartId, { precoTotal: 81 });

    const items = useUserCart.getState().items;

    expect(items[0].precoTotal).toBe(80);

    expect(items[1]).toMatchObject({
      sabor: "calabresa",
      descricao: "Muito Boa",
      preco: 40,
      precoTotal: 81,
    });

    expect(items).toHaveLength(2);
  });

  test("should delete a Pizza", () => {
    const { addItem } = useUserCart.getState();

    addItem({
      id: 1,
      cartId: 0,
      sabor: "mussarela",
      descricao: "Muito Saborosa",
      preco: 40,
      precoTotal: 80,
      unidades: 2,
      adicionais: [],
      imagem: "pizza.png",
    });

    const first = useUserCart.getState().items[0];

    useUserCart.getState().deleteItem(first.cartId);

    const items = useUserCart.getState().items;

    expect(items).toHaveLength(0);
  });
});
