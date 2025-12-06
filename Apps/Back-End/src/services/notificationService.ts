import { PrismaClient } from "@prisma/client";
import { Notification } from "../model/notifications-model";

const prisma = new PrismaClient();

export const getNotificationService = async () => {
  try {
    const dataNotification= await prisma.notification.findMany()
    return dataNotification
  } catch (error) {
    console.log(error);
  }
};

export const getUniqueNotificationService = async (id: number) => {
  try {
    if(id){
        const dataUniqueNotification = await prisma.notification.findUnique({
            where: {id}
        })
        return dataUniqueNotification
    }else{
        return ('Id não Informado')
    }
  } catch (error) {
    console.log(error);
  }
};

export const createNotificationService = async (data: Notification) => {
  try {
    if(data){
        const newNotification = await prisma.notification.create({data})
        return newNotification
    }else{
        return ('Dados Incompletos')
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateNotificationService = async (
  id: number,
  data: Partial<Notification>
) => {
  try {
    if(id && data){
        const updatedNotification = await prisma.notification.update({
            where:{id},
            data
        })
        return updatedNotification
    }else{
        ('Id e dados Incompletos')
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteNotificationService = async (id: number) => {
  try {
    if(id){
        await prisma.notification.delete({
            where:{id}
        })
        return('Deletado Com Sucesso')
    }else{
        return ('Id não Informado')
    }
  } catch (error) {
    console.log(error);
  }
};
