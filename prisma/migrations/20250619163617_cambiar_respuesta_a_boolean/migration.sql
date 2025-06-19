/*
  Warnings:

  - You are about to alter the column `respuesta` on the `Seguimiento` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Seguimiento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "clienteId" INTEGER NOT NULL,
    "respuesta" BOOLEAN NOT NULL,
    "observacion" TEXT,
    "fecha" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Seguimiento_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Seguimiento" ("clienteId", "fecha", "id", "observacion", "respuesta") SELECT "clienteId", "fecha", "id", "observacion", "respuesta" FROM "Seguimiento";
DROP TABLE "Seguimiento";
ALTER TABLE "new_Seguimiento" RENAME TO "Seguimiento";
CREATE UNIQUE INDEX "Seguimiento_clienteId_key" ON "Seguimiento"("clienteId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
