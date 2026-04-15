"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  CalendarDays,
  Users,
  Image as ImageIcon,
  Settings,
  Bell,
  ChevronDown,
  Fish
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 flex items-center gap-2 text-blue-600 font-bold text-xl">
          <Fish className="w-6 h-6" />
          <span>AquaManage</span>
        </div>

        <div className="px-4 pb-4">
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-100">
            <Avatar className="w-10 h-10">
              <AvatarImage src="https://picsum.photos/seed/john/100/100" />
              <AvatarFallback>JM</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 truncate">John</p>
              <p className="text-xs text-slate-500 truncate">Manager</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <NavItem href="/admin" icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" active={pathname === "/admin"} />
          <NavItem href="/admin/products" icon={<Package className="w-5 h-5" />} label="Products" active={pathname.startsWith("/admin/products")} />
          <NavItem href="/admin/categories" icon={<Package className="w-5 h-5" />} label="Categories" active={pathname.startsWith("/admin/categories")} />
          <NavItem href="/admin/orders" icon={<ShoppingCart className="w-5 h-5" />} label="Orders" active={pathname.startsWith("/admin/orders")} />
          <NavItem href="/admin/services" icon={<CalendarDays className="w-5 h-5" />} label="Services Booking" active={pathname.startsWith("/admin/services")} />
          <NavItem href="/admin/customers" icon={<Users className="w-5 h-5" />} label="Customers" active={pathname.startsWith("/admin/customers")} />
          <NavItem href="/admin/gallery" icon={<ImageIcon className="w-5 h-5" />} label="Gallery" active={pathname.startsWith("/admin/gallery")} />
          <NavItem href="/admin/settings" icon={<Settings className="w-5 h-5" />} label="Settings" active={pathname.startsWith("/admin/settings")} />
        </nav>

        <div className="p-4 border-t border-slate-200">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
          >
            <LayoutDashboard className="w-5 h-5" />
            Back to Storefront
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-end px-8 gap-4">
          <button className="relative p-2 text-slate-400 hover:text-slate-600">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://picsum.photos/seed/john/100/100" />
              <AvatarFallback>JM</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-slate-700">John Manager</span>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        active 
          ? "bg-blue-700 text-white" 
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}
