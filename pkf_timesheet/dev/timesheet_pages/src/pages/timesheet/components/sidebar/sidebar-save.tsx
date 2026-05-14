import { useState } from "react";
import { useTimesheet } from "@/context/timesheet";
import { useTaskActions } from "@/hooks/use-task-actions";
import type { NotificationProps } from "@/widgets/ev-notification/types";
import { EVNotification } from "@/widgets/ev-notification";
import { useProject } from "@/hooks/use-project";
import { EVLoader } from "@/widgets/ev-loader";
import { getLimitDates } from "@/utils/dates";

export function SidebarSave() {
  const { project, rangeDate } = useTimesheet();
  const { saveEntriesToServer } = useTaskActions();
  const { getProject, loading } = useProject();
  const [notificationParams, setNotificationParams] =
    useState<NotificationProps | null>(null);

  const handleSave = () => {
    saveEntriesToServer().then((resp) => {
      if (resp.error) {
        setNotificationParams({
          color: "error",
          delay: 500,
          message: resp.message ?? "",
        });
      }

      setNotificationParams({
        color: "success",
        delay: 500,
        message: "Guardado correctamente",
      });

      if (project) {
        const { startdate, enddate } = getLimitDates(rangeDate);
        getProject(project.id, startdate, enddate);
      }
    });
  };

  return (
    <>
      <button
        className={`btn btn-primary mb-2 w-100 ${project ? "" : "d-none"}`}
        onClick={handleSave}
      >
        Guardar
      </button>
      <EVLoader message="loading...." hidden={!loading} />
      {notificationParams && (
        <EVNotification
          {...notificationParams}
          onClose={() => setNotificationParams(null)}
        />
      )}
    </>
  );
}
