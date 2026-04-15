"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Plus, Edit2, Trash2, ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

const initialProducts = [
  { id: 1, name: "Bettas", price: 24.99, stock: 45, category: "Livestock", image: "https://picsum.photos/seed/betta/100/100" },
  { id: 2, name: "Filtration Systems", price: 115.00, stock: 12, category: "Equipment", image: "https://picsum.photos/seed/filter/100/100" },
  { id: 3, name: "Adjustable Heater", price: 32.50, stock: 28, category: "Equipment", image: "https://picsum.photos/seed/heater/100/100" },
  { id: 4, name: "River Gravel (5lb)", price: 8.99, stock: 60, category: "Accessories", image: "https://picsum.photos/seed/gravel/100/100" },
  { id: 5, name: "Tropical Flakes", price: 12.45, stock: 85, category: "Consumables", image: "https://picsum.photos/seed/flakes/100/100" },
  { id: 6, name: "Arowana", price: 120.00, stock: 3, category: "Livestock", image: "https://picsum.photos/seed/arowana/100/100" },
  { id: 7, name: "Neon Tetra", price: 3.99, stock: 150, category: "Livestock", image: "https://picsum.photos/seed/tetra/100/100" },
  { id: 8, name: "Aquarium Salt", price: 5.50, stock: 40, category: "Consumables", image: "https://picsum.photos/seed/salt/100/100" },
  { id: 9, name: "LED Light Fixture", price: 45.00, stock: 15, category: "Equipment", image: "https://picsum.photos/seed/light/100/100" },
  { id: 10, name: "Sponge Filter", price: 12.00, stock: 35, category: "Equipment", image: "https://picsum.photos/seed/sponge/100/100" },
  { id: 11, name: "Guppy", price: 4.50, stock: 200, category: "Livestock", image: "https://picsum.photos/seed/guppy/100/100" },
  { id: 12, name: "Driftwood", price: 18.00, stock: 25, category: "Accessories", image: "https://picsum.photos/seed/wood/100/100" },
];

type SortConfig = {
  key: string;
  direction: "asc" | "desc";
} | null;

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = useMemo(() => {
    let sortableProducts = [...products];
    if (sortConfig !== null) {
      sortableProducts.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableProducts;
  }, [products, sortConfig]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, currentPage]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedProducts.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (checked: boolean, id: number) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    }
  };

  const handleDeleteSelected = () => {
    setProducts(prev => prev.filter(p => !selectedIds.includes(p.id)));
    setSelectedIds([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Product Management Table</h1>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search" className="pl-9 bg-white" />
        </div>
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search Products..." className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Category</SelectItem>
                <SelectItem value="livestock">Livestock</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            {selectedIds.length > 0 && (
              <Button variant="destructive" onClick={handleDeleteSelected}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected ({selectedIds.length})
              </Button>
            )}
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Link href="/admin/products/new" className="flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Link>
            </Button>
          </div>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedIds.length === paginatedProducts.length && paginatedProducts.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-24">Image</TableHead>
                <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("name")}>
                  <div className="flex items-center">Product Name <ArrowUpDown className="w-4 h-4 ml-2" /></div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("price")}>
                  <div className="flex items-center">Price <ArrowUpDown className="w-4 h-4 ml-2" /></div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("stock")}>
                  <div className="flex items-center">Stock <ArrowUpDown className="w-4 h-4 ml-2" /></div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("category")}>
                  <div className="flex items-center">Category <ArrowUpDown className="w-4 h-4 ml-2" /></div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedIds.includes(product.id)}
                      onCheckedChange={(checked) => handleSelectOne(checked as boolean, product.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-slate-100">
                      <Image src={product.image} alt={product.name} fill className="object-cover" referrerPolicy="no-referrer" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">{product.name}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8 text-slate-500">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-slate-500" onClick={() => {
                        setProducts(prev => prev.filter(p => p.id !== product.id));
                      }}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-slate-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedProducts.length)} of {sortedProducts.length} entries
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="text-sm font-medium">
              Page {currentPage} of {totalPages}
            </div>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
