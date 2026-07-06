import EmployeeSidebar from "@/components/layout/employee-sidebar";
import EmployeeNavbar from "@/components/layout/employee-navbar";

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-950">

      <EmployeeSidebar />

      <div className="flex flex-col flex-1">

        <EmployeeNavbar />

        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>

      </div>

    </div>
  );
}