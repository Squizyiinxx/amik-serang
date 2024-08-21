-- CreateTable
CREATE TABLE "news" (
    "id" SERIAL NOT NULL,
    "Judul" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "kategoriId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
