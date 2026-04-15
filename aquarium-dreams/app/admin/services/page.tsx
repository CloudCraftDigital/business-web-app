"use client";

import { useState, useMemo } from "react";
import { Search, Edit2, Trash2, ArrowUpDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialBookings = [
  { id: "80061130", service: "Tank Setup", customer: "Alice Smith", date: "03-12-2023", time: "9:00 AM", status: "Pending" },
  { id: "80062101", service: "Cleaning", customer: "Bob Jones", date: "03-12-2023", time: "10:00 AM", status: "Confirmed" },
  { id: "80061122", service: "Cleaning", customer: "Ctranoni Nason", date: "03-12-2023", time: "11:00 AM", status: "Confirmed" },
  { id: "80062133", service: "Cleaning", customer: "Alice Smith", date: "03-12-2023", time: "1:00 PM", status: "Delivered" },
  { id: "80061155", service: "Cleaning", customer: "Alice Smith", date: "03-12-2023", time: "2:00 PM", status: "Delivered" },
];

type SortConfig = {
  key: string;
  direction: "asc" | "desc";
} | null;

export default function ServicesPage() {
  const [bookings, setBookings] = useState(initialBookings);
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedBookings = useMemo(() => {
    let sortableBookings = [...bookings];
    if (sortConfig !== null) {
      sortableBookings.sort((a: any, b: any) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableBookings;
  }, [bookings, sortConfig]);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Service Booking Manager</h1>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-40 bg-white">
                <SelectValue placeholder="Filter by Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Filter by Service</SelectItem>
                <SelectItem value="setup">Tank Setup</SelectItem>
                <SelectItem value="cleaning">Cleaning</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-40 bg-white">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Filter by Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search bookings..." className="pl-9 bg-white" />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">View Map</Button>
          </div>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("id")}>
                  <div className="flex items-center">Booking ID <ArrowUpDown className="w-4 h-4 ml-2" /></div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("service")}>
                  <div className="flex items-center">Service Type <ArrowUpDown className="w-4 h-4 ml-2" /></div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("customer")}>
                  <div className="flex items-center">Customer Name <ArrowUpDown className="w-4 h-4 ml-2" /></div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("date")}>
                  <div className="flex items-center">Date <ArrowUpDown className="w-4 h-4 ml-2" /></div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("time")}>
                  <div className="flex items-center">Time Slot <ArrowUpDown className="w-4 h-4 ml-2" /></div>
                </TableHead>
                <TableHead className="cursor-pointer hover:bg-slate-100" onClick={() => handleSort("status")}>
                  <div className="flex items-center">Status <ArrowUpDown className="w-4 h-4 ml-2" /></div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-medium text-slate-900">{booking.id}</TableCell>
                  <TableCell className="text-slate-600">{booking.service}</TableCell>
                  <TableCell className="text-slate-600">{booking.customer}</TableCell>
                  <TableCell className="text-slate-600">{booking.date}</TableCell>
                  <TableCell className="text-slate-600">{booking.time}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={`
                        ${booking.status === 'Pending' ? 'bg-amber-100 text-amber-800 hover:bg-amber-100' : ''}
                        ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                        ${booking.status === 'Delivered' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                      `}
                    >
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8 text-slate-500">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-slate-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
