import useWizardNavigation from "./hooks/useWizardNavigation";

export default function Navigation() {
 
  const items = useWizardNavigation()

  return (
    <aside className="w-full max-w-[420px] rounded-xl border border-black bg-rose-200 p-6">
      <ul className="space-y-6">
        {items.navigationKeys.map((label) => {

          return (
            <li key={label}>
              <button
                type="button"
                className=
                  "w-full text-left font-semibold hover:text-black ">
                <div className="flex items-center gap-3">
                  <span
                    className=
                      "inline-flex h-2.5 w-2.5 rounded-full "
                  />
                  <span>{label}</span>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
