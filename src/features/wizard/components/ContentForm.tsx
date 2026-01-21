
export default function ContentForm() {
  return (
    <div className="rounded-xl border border-black bg-sky-200 p-10 min-h-[360px]">
      <div className="text-xl font-medium mb-6">Form Step</div>

      <div className="space-y-4">
        <label className="block">
          <span className="block text-sm font-medium mb-1">Field A</span>
          <input
            className="w-full rounded-lg border border-black/30 bg-white px-3 py-2"
            placeholder="Type..."
          />
        </label>
        
      </div>
    </div>
  );
}
