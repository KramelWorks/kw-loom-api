-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "deletedAt" DATETIME,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "isLockable" BOOLEAN NOT NULL DEFAULT true,
    "lockedAt" DATETIME,
    "failedLoginAttempts" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_user" ("createdAt", "deletedAt", "email", "failedLoginAttempts", "id", "isActive", "isDeleted", "isLockable", "lockedAt", "name", "password", "updatedAt") SELECT "createdAt", "deletedAt", "email", "failedLoginAttempts", "id", "isActive", "isDeleted", "isLockable", "lockedAt", "name", "password", "updatedAt" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
