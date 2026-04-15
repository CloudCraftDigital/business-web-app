"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";

const initialOrders = [
  { id: "Order 1001", customer: "Alice Smith", phone: "6785-455 3553", products: "Betta Fish x1", status: "Pending" },
  { id: "Order 1002", customer: "Bob Jones", phone: "555-123 4567", products: "Filter x2", status: "Confirmed" },
  { id: "Order 1003", customer: "Charlie Brown", phone: "123-456 7890", products: "Tank Setup", status: "Delivered" },
  { id: "Order 1004", customer: "Diana Prince", phone: "987-654 3210", products: "Heater x1", status: "Pending" },
  { id: "Order 1005", customer: "Evan Wright", phone: "456-789 0123", products: "Gravel x3", status: "Confirmed" },
  { id: "Order 1006", customer: "Fiona Gallagher", phone: "321-654 0987", products: "Flakes x2", status: "Delivered" },
  { id: "Order 1007", customer: "George Martin", phone: "789-012 3456", products: "Arowana x1", status: "Pending" },
];

type SortConfig = {
  key: string;
  direction: "asc" | "desc";
} | null;

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
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

  const sortedOrders = useMemo(() => {
    let sortableOrders = [...orders];
    if (sortConfig !== null) {
      sortableOrders.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableOrders;
  }, [orders, sortConfig]);

  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedOrders, currentPage]);

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedOrders.map(o => o.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (checked: boolean, id: string) => {
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    }
  };

  const handleBulkStatusUpdate = (newStatus: string) => {
    setOrders(prev => prev.map(o => 
      selectedIds.includes(o.id) ? { ...o, status: newStatus } : o
    ));
    setSelectedIds([]);
  };
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Order Management List</h1>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-lg font-semibold text-slate-800">Order Management List</h2>
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-500 mr-2">{selectedIds.length} selected</span>
              <Button variant="outline" size="sm" onClick={() => handleBulkStatusUpdate("Confirmed")}>Mark Confirmed</Button>
              <Button variant="outline" size="sm" onClick={() => handleBulkStatusUpdate("Delivered")}>Mark Delivered</Button>
            </div>
          )}
        </div>
        <div className="border rounded-lg">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedIds.length === paginatedOrders.length && paginatedOrders.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("id")}>
                  <div className="flex items-center">Order ID <ArrowUpDown className="w-4 h-4 ml-2" /></div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("customer")}>
                  <div className="flex items-center">Customer Info <ArrowUpDown className="w-4 h-4 ml-2" /></div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("products")}>
                  <div className="flex items-center">Products <ArrowUpDown className="w-4 h-4 ml-2" /></div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("status")}>
                  <div className="flex items-center">Status <ArrowUpDown className="w-4 h-4 ml-2" /></div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedIds.includes(order.id)}
                      onCheckedChange={(checked) => handleSelectOne(checked as boolean, order.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium text-slate-900">{order.id}</TableCell>
                  <TableCell>
                    <div className="text-slate-900 font-medium">{order.customer}</div>
                    <div className="text-slate-500 text-sm">{order.phone}</div>
                  </TableCell>
                  <TableCell className="text-slate-600">{order.products}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={`
                        ${order.status === 'Pending' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' : ''}
                        ${order.status === 'Confirmed' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' : ''}
                        ${order.status === 'Delivered' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                      `}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" className="text-slate-600">View Details</Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => {
                        const nextStatus = order.status === 'Pending' ? 'Confirmed' : order.status === 'Confirmed' ? 'Delivered' : 'Pending';
                        setOrders(prev => prev.map(o => o.id === order.id ? { ...o, status: nextStatus } : o));
                      }}>Update Status</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-slate-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedOrders.length)} of {sortedOrders.length} entries
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
