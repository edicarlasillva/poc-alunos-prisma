import { PrismaClient } from "@prisma/client";

// Cria uma instância do PrismaClient, que permite interagir com o banco de 
// dados usando as definições de modelo geradas pelo Prisma.
export const repository = new PrismaClient();