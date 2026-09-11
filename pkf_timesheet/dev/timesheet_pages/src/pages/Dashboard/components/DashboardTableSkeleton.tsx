// Skeleton para la tabla
import "../styles/table-skeleton.css";

export function DashboardTableSkeleton({ rows = 5, cols = 7 }) {
  return (
    <table className="table table-bordered dashboard-table bg-white">
      <thead>
        <tr>
          <th style={{ width: 200 }}></th>
          {Array.from({ length: cols }).map((_, i) => (
            <th key={i} style={{ width: 40, height: 40 }}></th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, r) => (
          <tr key={r}>
            <td>
              <div
                className="skeleton skeleton-text"
                style={{ width: "80%" }}
              />
            </td>
            {Array.from({ length: cols }).map((_, c) => (
              <td key={c}>
                <div
                  className="skeleton skeleton-box"
                  style={{ width: "100%", height: 20 }}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
