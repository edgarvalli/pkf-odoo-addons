import { useAppContext } from "@/hooks/useAppContext";
import { useEffect } from "react";
import { Modal } from "@/components/ui";

export function Dashboard() {
  const { orm } = useAppContext();

  useEffect(() => {
    orm
      .call({
        model: "pkf.timesheet.dashboard.service",
        method: "get_metadata",
      })
      .then((resp) => {
        console.log(resp);
      });
  }, []);
  return (
    <div className="d-flex flex-column h-100">
      <aside className="flex-grow-1 w-25 bg-light">Helo</aside>
      <div
        className="position-fixed w-100 h-100 bg-dark top-0 start-0"
        style={{ zIndex: 1024, opacity: 0.5 }}
      >
        <Modal />
      </div>
    </div>
  );
}
