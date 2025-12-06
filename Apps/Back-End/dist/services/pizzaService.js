"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePizzaService = exports.updatePizzaService = exports.createPizzaService = exports.searchPizzaService = exports.getPizzaService = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getPizzaService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pizzas = yield prisma.pizza.findMany({
            include: { adicionais: true }
        });
        return pizzas;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPizzaService = getPizzaService;
const searchPizzaService = (sabor) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pizzas = yield prisma.pizza.findMany({
            where: {
                sabor: {
                    contains: sabor,
                    mode: "insensitive",
                },
            },
        });
        return pizzas;
    }
    catch (error) {
        console.log(error);
        throw new Error("Erro ao buscar pizza pelo sabor");
    }
});
exports.searchPizzaService = searchPizzaService;
const createPizzaService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pizza = yield prisma.pizza.create({
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
    }
    catch (error) {
        console.log(error);
        throw new Error("Erro ao criar pizza");
    }
});
exports.createPizzaService = createPizzaService;
const updatePizzaService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pizza = yield prisma.pizza.update({
            where: { id },
            data,
            include: { adicionais: true },
        });
        return pizza;
    }
    catch (error) {
        console.log(error);
        throw new Error("Erro ao atualizar pizza");
    }
});
exports.updatePizzaService = updatePizzaService;
const deletePizzaService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.pizza.delete({
            where: { id },
        });
        return { message: "Pizza deletada com sucesso" };
    }
    catch (error) {
        console.log(error);
        throw new Error("Erro ao deletar pizza");
    }
});
exports.deletePizzaService = deletePizzaService;
