/*
  Warnings:

  - You are about to drop the column `description` on the `WarehouseItem` table. All the data in the column will be lost.
  - You are about to drop the column `pickingStatus` on the `WarehouseItem` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `WarehouseItem` table. All the data in the column will be lost.
  - Added the required column `category` to the `WarehouseItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `WarehouseItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stock` to the `WarehouseItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WarehouseItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "product" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "stock" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_WarehouseItem" ("createdAt", "id", "product", "sku") SELECT "createdAt", "id", "product", "sku" FROM "WarehouseItem";
DROP TABLE "WarehouseItem";
ALTER TABLE "new_WarehouseItem" RENAME TO "WarehouseItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
