-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "sku" INTEGER NOT NULL,
    "name" TEXT,
    "brand" TEXT NOT NULL,
    "stok" INTEGER NOT NULL,
    "hargapokok" INTEGER NOT NULL,
    "hargajual" INTEGER NOT NULL,
    "kategori" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "deskripsi" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");
