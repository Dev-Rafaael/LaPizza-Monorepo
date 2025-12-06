import request from "supertest";
import server from "../server";
describe('Cardapio', () => {
    let mockId: number
    test('should show Pizzas', async() => {
        const res = await request(server).get("/pizzas/show")


        expect(res.status).toBe(200)
        expect(res.body[0]).toMatchObject({
            sabor: expect.any(String),
            preco: expect.any(Number)
        })
        mockId = res.body[0].id
    });

    test('should get a single Pizza', async() => {
        const res = await request(server).get(`/pizzas/${mockId}`)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('preco')
        expect(res.body).toHaveProperty('sabor')
    });
});