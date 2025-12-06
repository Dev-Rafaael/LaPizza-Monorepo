import { PrismaClient } from "@prisma/client";
import { Contato } from "../model/contato-model";
const prisma = new PrismaClient();
export const getContatosService = async ()=>{

    try {
        const contatos = await prisma.contato.findMany()
        return contatos
    } catch (error) {
        console.log(error);
        
    }

}
export const getUniqueContatoService = async (id:number)=>{
    try {
       const contact = await prisma.contato.findUnique({
        where: {id}
       }) 
       return contact
    } catch (error) {
        console.log(error);
        
    }
}
export const createContatoService = async (data:Contato)=>{
    try {
        const dataContato = await prisma.contato.create({data})
        return dataContato
    } catch (error) {
        console.log(error);
    
    }
}


export const updateContatoService = async (id:number,data:Contato)=>{

    try {

        const updatedContato = await prisma.contato.update({
            where: {id},
            data:data
        })
        return updatedContato
    } catch (error) {
        console.log(error);
        
    }
}

export const deleteContatoService = async (id:number)=>{

    try {
      await prisma.contato.delete({
            where: {id}
        })
    } catch (error) {
        console.log(error);
        
    }
}