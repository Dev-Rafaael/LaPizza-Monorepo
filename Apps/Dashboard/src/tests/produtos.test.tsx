import { describe, test, vi, type Mock } from "vitest";
import { toast } from "react-toastify";
import { api } from "@packages/api/api";

vi.mock("@packages/api/api", () => ({
  api: {
    post: vi.fn(),
    get: vi.fn()
  }
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn()
  }
}));

describe("could be a Crud", () => {

  test("should call api.get and show toast", async () => {

    (api.get as unknown as Mock).mockResolvedValue({
      data: { nome: "mussarella" }
    });


     await api.get("/pizzas/", { params: { sabor: "Frango" } });


    expect(api.get).toHaveBeenCalledTimes(1);
    expect(api.get).toHaveBeenCalledWith("/pizzas/", expect.objectContaining({ params: { sabor: "Frango" } }));


    toast.success("Pizza Atualizada com Sucesso");

    expect(toast.success).toHaveBeenCalledWith("Pizza Atualizada com Sucesso");
  });

});
