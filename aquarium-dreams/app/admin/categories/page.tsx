"use client";

import { useState, useMemo } from "react";
import { Search, Plus, Edit2, Trash2, ArrowUpDown, ChevronLeft, ChevronRight, FolderTree, Fish, Package, Droplets, Box, Wrench, Leaf, Waves, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const AVAILABLE_ICONS = [
  { name: "Fish", icon: Fish },
  { name: "Package", icon: Package },
  { name: "Droplets", icon: Droplets },
  { name: "Box", icon: Box },
  { name: "Wrench", icon: Wrench },
  { name: "Leaf", icon: Leaf },
  { name: "Waves", icon: Waves },
  { name: "Activity", icon: Activity },
  { name: "FolderTree", icon: FolderTree },
];

const initialCategories = [
  { id: 1, name: "Livestock", description: "Live fish, invertebrates, and plants", productCount: 45, iconName: "Fish" },
  { id: 2, name: "Equipment", description: "Filters, heaters, lighting, and pumps", productCount: 112, iconName: "Wrench" },
  { id: 3, name: "Accessories", description: "Decorations, gravel, and cleaning tools", productCount: 85, iconName: "Box" },
  { id: 4, name: "Consumables", description: "Fish food, water conditioners, and fertilizers", productCount: 64, iconName: "Droplets" },
  { id: 5, name: "Aquariums", description: "Glass and acrylic tanks of all sizes", productCount: 24, iconName: "Waves" },
];

type SortConfig = {
  key: string;
  direction: "asc" | "desc";
} | null;

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", description: "", iconName: "FolderTree" });
  const itemsPerPage = 5;

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedCategories = useMemo(() => {
    let sortableCategories = [...categories];
    if (sortConfig !== null) {
      sortableCategories.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCategories;
  }, [categories, sortConfig]);

  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedCategories.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedCategories, currentPage]);

  const totalPages = Math.ceil(sortedCategories.length / itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedCategories.map(c => c.id));
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
    setCategories(prev => prev.filter(c => !selectedIds.includes(c.id)));
    setSelectedIds([]);
  };

  const handleAddCategory = () => {
    if (newCategory.name.trim() === "") return;
    
    const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
    setCategories([...categories, { id: newId, name: newCategory.name, description: newCategory.description, productCount: 0, iconName: newCategory.iconName }]);
    setNewCategory({ name: "", description: "", iconName: "FolderTree" });
    setIsAdding(false);
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = AVAILABLE_ICONS.find(i => i.name === iconName)?.icon || FolderTree;
    return <IconComponent className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Category Management</h1>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input placeholder="Search categories..." className="pl-9 bg-white" />
        </div>
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search within table..." className="pl-9" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {selectedIds.length > 0 && (
              <Button variant="destructive" onClick={handleDeleteSelected}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Selected ({selectedIds.length})
              </Button>
            )}
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setIsAdding(!isAdding)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>
        </div>

        {isAdding && (
          <div className="mb-6 p-4 border rounded-lg bg-slate-50 flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium text-slate-700 mb-1 block">Category Name</label>
              <Input 
                placeholder="e.g. Saltwater Fish" 
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
              />
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium text-slate-700 mb-1 block">Description</label>
              <Input 
                placeholder="Brief description" 
                value={newCategory.description}
                onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
              />
            </div>
            <div className="w-48">
              <label className="text-sm font-medium text-slate-700 mb-1 block">Icon</label>
              <Select value={newCategory.iconName} onValueChange={(val) => setNewCategory({...newCategory, iconName: val})}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select icon" />
                </SelectTrigger>
                <SelectContent>
                  {AVAILABLE_ICONS.map((icon) => (
                    <SelectItem key={icon.name} value={icon.name}>
                      <div className="flex items-center gap-2">
                        <icon.icon className="w-4 h-4" />
                        <span>{icon.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddCategory} className="bg-green-600 hover:bg-green-700">Save</Button>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
            </div>
          </div>
        )}

        <div className="border rounded-lg">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedIds.length === paginatedCategories.length && paginatedCategories.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="w-12">Icon</TableHead>
                <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("name")}>
                  <div className="flex items-center">Category Name <ArrowUpDown className="w-4 h-4 ml-2" /></div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("description")}>
                  <div className="flex items-center">Description <ArrowUpDown className="w-4 h-4 ml-2" /></div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("productCount")}>
                  <div className="flex items-center">Products <ArrowUpDown className="w-4 h-4 ml-2" /></div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-slate-500">
                    No categories found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedIds.includes(category.id)}
                        onCheckedChange={(checked) => handleSelectOne(checked as boolean, category.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="w-8 h-8 rounded-md bg-blue-100 text-blue-600 flex items-center justify-center" title={category.iconName}>
                        {renderIcon(category.iconName)}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">{category.name}</TableCell>
                    <TableCell className="text-slate-600">{category.description}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                        {category.productCount} items
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 text-slate-500">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 text-slate-500" onClick={() => {
                          setCategories(prev => prev.filter(c => c.id !== category.id));
                        }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-slate-500">
            Showing {categories.length === 0 ? 0 : ((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedCategories.length)} of {sortedCategories.length} entries
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || totalPages === 0}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="text-sm font-medium">
              Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
            </div>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
