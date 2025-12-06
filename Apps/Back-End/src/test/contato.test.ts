import request from "supertest";
import server from "../server";

describe("Test Contact", () => {
  let mockId: number;
  it("should show a new Contact", async () => {
    const res = await request(server).get("/contatos/");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("email");
    mockId = res.body[0].id;
  });

  it("should create a new Contact", async () => {
    const res = await request(server).post("contatos/criar").send({
      nome: "Rafael",
      sobreNome: "Moraes",
      email: "rafael@test.com",
      assunto: "duvida",
      mensagem: "abre hoje ?",
    });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      nome: "Rafael",
      sobreNome: "Moraes",
      email: "rafael@test.com",
      assunto: "duvida",
      mensagem: "abre hoje ?",
    });
  });

  it("should update a new Contact", async () => {
    const res = await request(server).put(`contatos/${mockId}`).send({
      nome: "Rafael",
      sobreNome: "Moraes",
      email: "rafael@test.com",
      assunto: "duvida",
      mensagem: "abre hoje ?",
    });

    expect(res.status).toBe(200);
    expect(res.body).toContain("nome");
  });

  it("should delete a new Contact", async () => {
    const res = await request(server).delete(`contatos/${mockId}`).send({
      nome: "Rafael",
      sobreNome: "Moraes",
      email: "rafael@test.com",
      assunto: "duvida",
      mensagem: "abre hoje ?",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Contato deletado com sucesso");
  });
});
