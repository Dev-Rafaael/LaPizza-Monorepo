import { Router } from "express"

import contatoRotas from "./contatoRoutes"
import userRotas from "./userRoutes"
import pizzaRotas from "./pizzaRoutes"
import orderRotas from "./orderRoutes"
import avaliacaoRotas from "./avaliacaoRoutes"
import destaquesRotas from "./destaquesRoutes"
import addressRotas from "./addressRoutes"
import orderItemsRotas from "./orderItemRoutes"
import adicionaisRotas from "./adicionaisRoutes"
import metricasRotas from "./metricasRoutes"
import pagamentoRotas from "./pagamentoRoutes"
import notificationRotas from "./notificationsRoutes"

const rotas = Router()

rotas.use('/contatos', contatoRotas)
rotas.use('/users', userRotas)
rotas.use('/pizzas', pizzaRotas)
rotas.use('/orders', orderRotas)
rotas.use('/ordersItems', orderItemsRotas)
rotas.use('/avaliacoes', avaliacaoRotas)
rotas.use('/destaques', destaquesRotas)
rotas.use('/address', addressRotas)
rotas.use('/adicionais', adicionaisRotas)
rotas.use('/metricas', metricasRotas)
rotas.use('/pagamentos', pagamentoRotas)
rotas.use('/notifications', notificationRotas)


export default rotas
