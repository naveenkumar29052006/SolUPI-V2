-- CreateTable
CREATE TABLE "EmailTransaction" (
    "id" TEXT NOT NULL,
    "rrn" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "transactionDate" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "isUsed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailTransaction_rrn_key" ON "EmailTransaction"("rrn");
