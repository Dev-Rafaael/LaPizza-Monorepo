/*
  Warnings:

  - You are about to drop the `Adicional` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Adicional" DROP CONSTRAINT "Adicional_pizzaId_fkey";

-- DropTable
DROP TABLE "public"."Adicional";

-- CreateTable
CREATE TABLE "adicional" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "pizzaId" INTEGER NOT NULL,

    CONSTRAINT "adicional_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "adicional" ADD CONSTRAINT "adicional_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
