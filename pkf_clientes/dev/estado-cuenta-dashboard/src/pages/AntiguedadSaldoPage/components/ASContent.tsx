import { ASTable } from "./ASTable";
export function ASContent() {
  return (
    <div className="d-flex flex-column flex-grow-1 mt-2 w-100 min-h-0 bg-white">
      <div className="d-flex flex-column flex-grow-1 p-2 min-h-0">
        <h6>Top 30 Clientes Morosos</h6>
        <div className="flex-grow-1 table-responsive overflow-y-auto min-h-0">
          <ASTable />
        </div>
      </div>
    </div>
  );
}
