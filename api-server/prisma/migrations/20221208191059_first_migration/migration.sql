-- CreateTable
CREATE TABLE "DeliveryItem" (
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

-- CreateTable
CREATE TABLE "WarehouseItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "pickingStatus" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
