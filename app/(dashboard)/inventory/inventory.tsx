"use client";
import React from "react";
import { Trash2, SquarePenIcon } from "lucide-react";
import { CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import Link from "next/link";

type Product = {
  id: number;
  sku: string;
  name: string;
  brand: string;
  category: string;
  stock: number;
  costPrice: number;
  sellPrice: number;
  description: string;
};

export default function Inventory() {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/product")
      .then((res) => res.json())
      .then(setData);
  }, []);

  return (
    <div>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Nama Produk</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Stok</TableHead>
              <TableHead>Harga Pokok</TableHead>
              <TableHead>Harga Jual</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((product: any) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium text-[#1F2937]">
                  {product.sku}
                </TableCell>
                <TableCell className="text-[hsl(var(--muted-foreground))]">
                  {product.name}
                </TableCell>
                <TableCell>
                  <Badge className="rounded-full">{product.brand}</Badge>
                </TableCell>
                <TableCell className="font-medium">
                  {product.kategori}
                </TableCell>
                <TableCell className="font-medium">
                  {product.stok}
                  <span className="ml-2 text-sm tabular-nums">unit</span>
                </TableCell>
                <TableCell className="font-medium">
                  {product.hargapokok}
                </TableCell>
                <TableCell className="font-medium">
                  {product.hargajual}
                </TableCell>
                <TableCell className=" font-medium">
                  {product.deskripsi}
                </TableCell>
                <TableCell className="font-medium text-[#1F2937]">
                  <Link href={`/inventory/${product.id}/edit`}>
                    <Button>
                      <SquarePenIcon className="size=16" />
                    </Button>
                  </Link>

                  <Button>
                    <Trash2 className="size=16" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </div>
  );
}
