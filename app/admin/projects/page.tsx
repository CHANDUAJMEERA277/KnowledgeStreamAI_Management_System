import { FolderKanban } from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="flex items-center justify-center h-[75vh]">

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center max-w-xl">

        <div className="flex justify-center mb-6">
          <FolderKanban className="w-16 h-16 text-blue-500" />
        </div>

        <h1 className="text-4xl font-bold text-white">
          Projects Module
        </h1>

        <p className="text-slate-400 mt-4 text-lg">
          We're working on something amazing.
        </p>

        <p className="text-slate-500 mt-2">
          Project Management will be available in a future update.
        </p>

        <div className="mt-8 inline-flex items-center rounded-full bg-blue-600/20 border border-blue-600 px-5 py-2">
          <span className="text-blue-400 font-semibold">
            🚀 Coming Soon
          </span>
        </div>

      </div>

    </div>
  );
}