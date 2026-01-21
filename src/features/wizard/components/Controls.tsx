export default function Controls() {
  return (
    <div className="rounded-lg border border-black bg-amber-50 px-8 py-6 flex items-center gap-6 min-h-[110px]">
      <button
        type="button"
        className="h-12 w-20 rounded-lg bg-sky-300 text-white hover:bg-sky-400"
      >
        Prev
      </button>

      <button
        type="button"
        className="h-12 w-20 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
}
