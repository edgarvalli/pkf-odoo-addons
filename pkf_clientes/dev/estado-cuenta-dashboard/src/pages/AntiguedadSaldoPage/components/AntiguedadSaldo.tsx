import { ASHeader } from "./ASHeader";
import { ASContent } from "./ASContent";

export function AntiguedadSaldo() {
  return (
    <div
      className="d-flex flex-column flex-grow-1 p-2 min-h-0"
      style={{ overflow: "hidden" }}
    >
      <ASHeader />
      <ASContent />
    </div>
  );
}
