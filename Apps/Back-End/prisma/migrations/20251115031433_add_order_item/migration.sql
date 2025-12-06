/*
  Warnings:

  - You are about to drop the column `items` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `precoTotal` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `precoUnitario` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sabor` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."OrderItem" DROP CONSTRAINT "OrderItem_pizzaId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "items";

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "subtotal",
ADD COLUMN     "descricao" TEXT,
ADD COLUMN     "imagem" TEXT,
ADD COLUMN     "precoTotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "precoUnitario" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "sabor" TEXT NOT NULL,
ALTER COLUMN "pizzaId" DROP NOT NULL,
ALTER COLUMN "adicionais" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE SET NULL ON UPDATE CASCADE;
