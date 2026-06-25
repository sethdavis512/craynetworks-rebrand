export type ApiRow = {
  prop: string;
  type: string;
  default?: string;
  description: string;
};

export function ApiTable({ rows }: { rows: ApiRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-left text-sm">
        <thead className="bg-surface-2 text-muted">
          <tr>
            {["Prop", "Type", "Default", "Description"].map((h) => (
              <th key={h} className="px-4 py-2 font-sans font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.prop} className="border-t border-border align-top">
              <td className="px-4 py-2 font-mono text-primary">{r.prop}</td>
              <td className="px-4 py-2 font-mono text-muted">{r.type}</td>
              <td className="px-4 py-2 font-mono text-muted">{r.default ?? "-"}</td>
              <td className="px-4 py-2 leading-relaxed text-ink">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
