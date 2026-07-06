import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex items-center justify-center h-[75vh]">

      <div className="max-w-xl w-full rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">

        <div className="flex justify-center mb-6">
          <Settings className="w-20 h-20 text-blue-500" />
        </div>

        <h1 className="text-4xl font-bold text-white">
          Settings
        </h1>

        <p className="mt-4 text-lg text-slate-400">
          Workspace settings are under development.
        </p>

        <p className="mt-2 text-slate-500">
          This section will include company settings, branding, notifications,
          themes, and more.
        </p>

        <div className="mt-8 inline-flex items-center rounded-full border border-blue-500 bg-blue-500/10 px-5 py-2">
          <span className="font-semibold text-blue-400">
            🚀 Coming Soon
          </span>
        </div>

      </div>

    </div>
  );
}