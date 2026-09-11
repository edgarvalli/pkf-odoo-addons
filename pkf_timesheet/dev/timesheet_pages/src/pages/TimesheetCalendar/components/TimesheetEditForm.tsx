import { EVModal, TableInfo } from "@/components";
import { ProjectCard } from "./ProjectCard";
import { DeleteEntryDialog } from "./DeleteEntryDialog";
import { useTimesheetEditForm } from "../hooks/useTimesheetEditForm";
import { isAllowedToDo } from "@/utils/entry";

export function TimesheetEditForm() {
  const {
    isOpenEditForm,
    openEditForm,
    entrySelected,
    handleUpdate,
    removeEntry,
    changePropertiesEntry,
  } = useTimesheetEditForm();

  if (!entrySelected) return null;

  const isEditable = isAllowedToDo(entrySelected);

  return (
    <EVModal open={isOpenEditForm} onClose={() => openEditForm(false)}>
      <EVModal.Body className="container">
        <div className="row mb-3">
          <div className="col-12">
            <ProjectCard project={entrySelected.project} />
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <TableInfo
              title="Informacion del proyecto"
              items={[
                { label: "Tarea:", text: entrySelected.task.name },
                { label: "Rubro:", text: entrySelected.phase.name },
                { label: "Proyecto:", text: entrySelected.project.name },
              ]}
            />
          </div>
        </div>

        <div className="row mb-2">
          <div className="col-12">
            <div className="d-flex gap-3">
              <label
                htmlFor="hours"
                className="form-label fw-medium text-muted align-content-center"
              >
                Horas:
              </label>
              {isEditable ? (
                <input
                  type="number"
                  name="hours"
                  id="hours"
                  max={24}
                  min={1}
                  value={entrySelected.hours}
                  onChange={(e) =>
                    changePropertiesEntry("hours", e.target.value)
                  }
                  className="form-control w-25"
                />
              ) : (
                <span className="text-muted">{entrySelected.hours}</span>
              )}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <label htmlFor="note" className="form-label fw-medium text-muted">
              Nota
            </label>
            {isEditable ? (
              <textarea
                name="note"
                id="note"
                className="form-control"
                value={entrySelected.note}
                onChange={(e) => changePropertiesEntry("note", e.target.value)}
              ></textarea>
            ) : (
              <span className="text-muted">{entrySelected.note}</span>
            )}
          </div>
        </div>
      </EVModal.Body>
      <EVModal.Footer>
        {isEditable && (
          <>
            <button className="btn btn-primary" onClick={handleUpdate}>
              <i className="fa fa-spinner me-2"></i>
              Actualizar
            </button>
            <DeleteEntryDialog entry={entrySelected} onAccept={removeEntry} />
          </>
        )}
        <button className="btn text-danger" onClick={() => openEditForm(false)}>
          Cancelar
        </button>
      </EVModal.Footer>
    </EVModal>
  );
}
