"use client";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/logout-button";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  CheckSquare,
  FileText,
  Calendar,
  Settings,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Employees",
    href: "/admin/employees",
    icon: Users,
  },
  {
    title: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    title: "Tasks",
    href: "/admin/tasks",
    icon: CheckSquare,
  },
  {
    title: "EOD Reports",
    href: "/admin/eod",
    icon: FileText,
  },
  {
    title: "Attendance",
    href: "/admin/attendance",
    icon: Calendar,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const router = useRouter();

async function handleLogout() {
  await supabase.auth.signOut();
  router.push("/login");
}
  return (
    <aside className="w-72 bg-slate-950 border-r border-slate-800 text-white flex flex-col">

      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold">
          Knowledge Stream
        </h1>
        <p className="text-slate-400 text-sm">
          Workspace
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-2">

        {menu.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-slate-800 transition"
          >
            <item.icon size={20} />
            {item.title}
          </Link>
        ))}

      </nav>

      <div className="p-4 border-t border-slate-800">
        <LogoutButton />

      </div>

    </aside>
  );
}