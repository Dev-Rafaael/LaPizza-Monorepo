import request from "supertest";
import server from "../server";

describe("Account Api", () => {
    let mockId:number
  it("should show an Account", async () => {
    const res = await request(server).get("/account").send({
      nome: "Rafael",
      sobreNome: "Moraes",
      email: "rafael@test.com",
      cpf: "12345678900",
      nascimento: "2000-01-01",
      telefone: "11910928922",
      sexo: "masculino",
      senha: "123456",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("nome");
    mockId = res.body.id
  });
  it("should create a new Account", async () => {
    const res = await request(server).post("/account").send({
      nome: "Rafael",
      sobreNome: "Moraes",
      email: "rafael@test.com",
      cpf: "12345678900",
      nascimento: "2000-01-01",
      telefone: "11910928922",
      sexo: "masculino",
      senha: "123456",
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });
  it("should update an Account", async () => {
    const res = await request(server).put(`/account/${mockId}`).send({
      nome: "Rafael",
      sobreNome: "Moraes",
      email: "rafael@test.com",
      cpf: "12345678900",
      nascimento: "2000-01-01",
      telefone: "11910928922",
      sexo: "masculino",
      senha: "123456",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("nome");
  });

  it("should delete an Account", async () => {
    const res = await request(server).delete(`/account/${mockId}`).send({
      nome: "Rafael",
      sobreNome: "Moraes",
      email: "rafael@test.com",
      cpf: "12345678900",
      nascimento: "2000-01-01",
      telefone: "11910928922",
      sexo: "masculino",
      senha: "123456",
    });

    expect(res.status).toBe(200);
    expect(res.body).not.toContain("nome");
  });
});
