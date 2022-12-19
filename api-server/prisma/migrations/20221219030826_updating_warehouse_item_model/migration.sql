/*
  Warnings:

  - Added the required column `rating` to the `WarehouseItem` table without a default value. This is not possible if the table is not empty.

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
    "rating" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_WarehouseItem" ("category", "createdAt", "id", "price", "product", "sku", "stock") SELECT "category", "createdAt", "id", "price", "product", "sku", "stock" FROM "WarehouseItem";
DROP TABLE "WarehouseItem";
ALTER TABLE "new_WarehouseItem" RENAME TO "WarehouseItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
