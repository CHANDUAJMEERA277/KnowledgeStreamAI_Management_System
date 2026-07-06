"use client";

import { useEffect, useState } from "react";

import AddEmployeeDialog from "@/components/employees/add-employee-dialog";
import EditEmployeeDialog from "@/components/employees/edit-employee-dialog";
import DeleteEmployeeDialog from "@/components/employees/delete-employee-dialog";

import { getEmployees } from "@/lib/actions/employees";

interface Employee {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  designation: string;
  department: string;
  status: string;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    loadEmployees();
  }, []);

  async function loadEmployees() {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Employees
          </h1>

          <p className="text-slate-400">
            Manage all employees
          </p>

        </div>

        <AddEmployeeDialog />

      </div>

      <div className="rounded-xl border border-slate-800 overflow-hidden bg-slate-900">

        <table className="w-full">

          <thead className="bg-slate-800">

            <tr>

              <th className="p-4 text-left text-white">
                Name
              </th>

              <th className="p-4 text-left text-white">
                Email
              </th>

              <th className="p-4 text-left text-white">
                Department
              </th>

              <th className="p-4 text-left text-white">
                Designation
              </th>

              <th className="p-4 text-left text-white">
                Status
              </th>

              <th className="p-4 text-center text-white">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {employees.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="text-center py-12 text-slate-400"
                >
                  No Employees Found
                </td>

              </tr>

            ) : (

              employees.map((emp) => (

                <tr
                  key={emp.id}
                  className="border-t border-slate-800 hover:bg-slate-800/40 transition"
                >

                  <td className="p-4 text-white font-medium">
                    {emp.full_name}
                  </td>

                  <td className="p-4 text-slate-300">
                    {emp.email}
                  </td>

                  <td className="p-4 text-slate-300">
                    {emp.department}
                  </td>

                  <td className="p-4 text-slate-300">
                    {emp.designation}
                  </td>

                  <td className="p-4">

                    <span className="rounded-full bg-green-600/20 px-3 py-1 text-sm text-green-400">

                      {emp.status || "Active"}

                    </span>

                  </td>

                  <td className="p-4">

                    <div className="flex items-center justify-center gap-4">

                      <EditEmployeeDialog
                        employee={emp}
                        refresh={loadEmployees}
                      />

                      <DeleteEmployeeDialog
                        employee={emp}
                        refresh={loadEmployees}
                      />

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}