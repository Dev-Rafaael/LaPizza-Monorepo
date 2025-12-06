/*
  Warnings:

  - You are about to drop the column `cpf` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `sobreNome` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `telefone` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "cpf",
DROP COLUMN "email",
DROP COLUMN "nome",
DROP COLUMN "sobreNome",
DROP COLUMN "telefone";
