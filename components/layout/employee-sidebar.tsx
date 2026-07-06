"use client";

import Link from "next/link";
import LogoutButton from "@/components/logout-button";
import { Home, CheckSquare, FileText, Calendar, User, LogOut } from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    href: "/employee/dashboard",
    icon: Home,
  },
  {
    title: "My Tasks",
    href: "/employee/tasks",
    icon: CheckSquare,
  },
  {
    title: "Attendance",
    href: "/employee/attendance",
    icon: Calendar,
  },
  {
    title: "EOD Reports",
    href: "/employee/eod",
    icon: FileText,
  },
  {
    title: "Profile",
    href: "/employee/profile",
    icon: User,
  },
];

export default function EmployeeSidebar() {
  return (
    <aside className="w-72 bg-slate-950 border-r border-slate-800 text-white flex flex-col">

      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold">Knowledge Stream</h1>
        <p className="text-slate-400 text-sm">Employee Portal</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800"
          >
            <item.icon size={20} />
            {item.title}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <LogoutButton/>
      </div>

    </aside>
  );
}