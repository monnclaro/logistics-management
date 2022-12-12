-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DeliveryItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "carNumber" TEXT NOT NULL,
    "dateTime" TEXT NOT NULL,
    "tu" TEXT NOT NULL,
    "carrier" TEXT NOT NULL,
    "shipTo" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "numberOfItems" TEXT NOT NULL,
    "pickingStatus" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_DeliveryItem" ("carNumber", "carrier", "createdAt", "dateTime", "id", "numberOfItems", "pickingStatus", "shipTo", "tu", "weight") SELECT "carNumber", "carrier", "createdAt", "dateTime", "id", "numberOfItems", "pickingStatus", "shipTo", "tu", "weight" FROM "DeliveryItem";
DROP TABLE "DeliveryItem";
ALTER TABLE "new_DeliveryItem" RENAME TO "DeliveryItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
