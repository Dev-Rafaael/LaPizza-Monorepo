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
exports.addressDelete = exports.addressUpdate = exports.addressCreate = exports.addressUserShow = exports.addressUniqueShow = exports.addressShow = void 0;
const addressService_1 = require("../services/addressService");
const addressShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const address = yield (0, addressService_1.getAddressService)();
        res.status(200).json(address);
    }
    catch (error) {
        res.status(400).json({ error: "Endereço nao encontrado" });
    }
});
exports.addressShow = addressShow;
const addressUniqueShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (id) {
            const uniqueAddress = yield (0, addressService_1.getAddressUniqueService)(id);
            res.status(200).json(uniqueAddress);
        }
    }
    catch (error) {
        res.status(400).json({ error: "Endereço nao encontrado" });
    }
});
exports.addressUniqueShow = addressUniqueShow;
const addressUserShow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = parseInt(req.params.userId);
        if (userId) {
            const uniqueAddress = yield (0, addressService_1.getAddressByUserService)(userId);
            res.status(200).json(uniqueAddress);
        }
    }
    catch (error) {
        res.status(400).json({ error: "Endereço nao encontrado" });
    }
});
exports.addressUserShow = addressUserShow;
const addressCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        if (body) {
            const newAddress = yield (0, addressService_1.createAddressService)(body);
            res.status(200).json(newAddress);
        }
    }
    catch (error) {
        res.status(400).json({ error: "Endereço nao Criado" });
    }
});
exports.addressCreate = addressCreate;
const addressUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const body = req.body;
        if (id && body) {
            const updatedAddress = yield (0, addressService_1.updateAddressService)(id, body);
            res.status(200).json(updatedAddress);
        }
    }
    catch (error) {
        res.status(400).json({ error: "Endereço nao Atualizado" });
    }
});
exports.addressUpdate = addressUpdate;
const addressDelete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        if (id) {
            yield (0, addressService_1.deleteAddressService)(id);
            res.status(200).json({ msg: "Deletado Com Sucesso" });
        }
    }
    catch (error) {
        res.status(400).json({ error: "Endereço nao Deletado" });
    }
});
exports.addressDelete = addressDelete;
