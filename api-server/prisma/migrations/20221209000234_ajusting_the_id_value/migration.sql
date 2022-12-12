/*
  Warnings:

  - The primary key for the `DeliveryItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `DeliveryItem` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `WarehouseItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `WarehouseItem` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DeliveryItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "carNumber" TEXT NOT NULL,
    "dateTime" DATETIME NOT NULL,
    "tu" TEXT NOT NULL,
    "carrier" TEXT NOT NULL,
    "shipTo" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "numberOfItems" INTEGER NOT NULL,
    "pickingStatus" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_DeliveryItem" ("carNumber", "carrier", "createdAt", "dateTime", "id", "numberOfItems", "pickingStatus", "shipTo", "tu", "weight") SELECT "carNumber", "carrier", "createdAt", "dateTime", "id", "numberOfItems", "pickingStatus", "shipTo", "tu", "weight" FROM "DeliveryItem";
DROP TABLE "DeliveryItem";
ALTER TABLE "new_DeliveryItem" RENAME TO "DeliveryItem";
CREATE TABLE "new_WarehouseItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "pickingStatus" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_WarehouseItem" ("createdAt", "description", "id", "pickingStatus", "product", "sku", "weight") SELECT "createdAt", "description", "id", "pickingStatus", "product", "sku", "weight" FROM "WarehouseItem";
DROP TABLE "WarehouseItem";
ALTER TABLE "new_WarehouseItem" RENAME TO "WarehouseItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
