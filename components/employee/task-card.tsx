export default function TaskCard() {
  return (
    <div className="bg-slate-900 rounded-xl p-6">

      <h2 className="text-xl font-semibold text-white mb-4">
        My Tasks
      </h2>

      <div className="space-y-3">

        <div className="bg-slate-800 rounded-lg p-4">
          Design Login UI
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          Build Dashboard
        </div>

        <div className="bg-slate-800 rounded-lg p-4">
          Test APIs
        </div>

      </div>

    </div>
  );
}