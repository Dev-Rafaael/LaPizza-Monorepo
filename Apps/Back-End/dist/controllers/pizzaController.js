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
exports.pizzaDelete = exports.pizzaUpdate = exports.pizzaCreate = exports.pizzaSearch = exports.pizzaShow = void 0;
const pizzaService_1 = require("../services/pizzaService");
const pizzaShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pizzasData = yield (0, pizzaService_1.getPizzaService)();
        res.status(200).json(pizzasData);
    }
    catch (error) {
        res.status(400).json({ error: 'Pizza não encontrada' });
    }
});
exports.pizzaShow = pizzaShow;
const pizzaSearch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sabor = req.params.sabor;
        const pizzasUniqueData = yield (0, pizzaService_1.searchPizzaService)(sabor);
        res.status(200).json(pizzasUniqueData);
    }
    catch (error) {
        res.status(400).json({ error: 'Pizza não encontrada' });
    }
});
exports.pizzaSearch = pizzaSearch;
const pizzaCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pizza = yield (0, pizzaService_1.createPizzaService)(req.body);
        res.status(201).json(pizza);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.pizzaCreate = pizzaCreate;
const pizzaUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const pizza = yield (0, pizzaService_1.updatePizzaService)(id, req.body);
        res.status(200).json(pizza);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.pizzaUpdate = pizzaUpdate;
const pizzaDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const result = yield (0, pizzaService_1.deletePizzaService)(id);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
exports.pizzaDelete = pizzaDelete;
