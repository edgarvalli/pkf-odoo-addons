import { EVModal } from "@/components";
import { TaskSelect } from "./TaskSelect";
import { PhaseSelect } from "./PhaseSelect";
import { ProjectSelect } from "./ProjectSelect";
import { NoCargableSelect } from "./NoCargableSelect";
import { useTimesheetForm } from "../hooks/useTimesheetForm";

export function TimesheetForm() {
  const {
    hours,
    endDate,
    startDate,
    isOpenForm,
    noCargable,
    taskSelected,
    phaseSelected,
    projectSelected,
    allowedRangeDate,
    openForm,
    setPhase,
    setProject,
    setTask,
    closeForm,
    handleSave,
    resetSelection,
    handleInputChange,
  } = useTimesheetForm();

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => openForm(true)}
      >
        Registrar
      </button>
      <EVModal open={isOpenForm} onClose={closeForm} minHeightCard={"80vh"}>
        <EVModal.Body className="container">
          <div className="row mb-1">
            <div className="col-12 mb-3">
              <ProjectSelect
                onChange={(item) => setProject(item)}
                onClickCard={resetSelection}
                projectSelected={projectSelected}
                noCargable={noCargable}
              />
            </div>
            <div className={`col-12 ${!projectSelected ? "" : "d-none"}`}>
              <div className="form-check form-switch">
                <input
                  type="checkbox"
                  name="no_cargable"
                  id="no_cargable"
                  className="form-check-input"
                  checked={noCargable}
                  onChange={handleInputChange}
                />
                <label htmlFor="no_cargable" className="form-form-check-label">
                  Horas no cargables
                </label>
              </div>
            </div>
            <NoCargableSelect hide={!noCargable} onChange={setTask} />
          </div>
          <div className="row mb-1">
            <div className="col-12">
              <PhaseSelect
                projectId={projectSelected?.id ?? 0}
                hide={!projectSelected}
                onChange={setPhase}
              />
            </div>
          </div>
          <div className="row mb-1">
            <div className="col-12">
              <TaskSelect
                phase={phaseSelected}
                hide={!phaseSelected}
                onChange={setTask}
              />
            </div>
          </div>
          {(taskSelected || noCargable) && (
            <>
              <div className="row mb-2">
                <div className="col-6 text-muted ">
                  <label htmlFor="startdate" className="form-label fw-medium">
                    Fecha Inicial
                  </label>
                  <input
                    type="date"
                    name="startdate"
                    id="startdate"
                    value={startDate}
                    min={allowedRangeDate?.from}
                    max={allowedRangeDate?.to}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="col-6 text-muted">
                  <label htmlFor="enddate" className="form-label fw-medium">
                    Fecha Final
                  </label>
                  <input
                    type="date"
                    name="enddate"
                    id="enddate"
                    value={endDate}
                    min={allowedRangeDate?.from}
                    max={allowedRangeDate?.to}
                    onChange={handleInputChange}
                    className="form-control"
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
                    <input
                      type="number"
                      name="hours"
                      id="hours"
                      max={24}
                      min={1}
                      value={hours}
                      onChange={handleInputChange}
                      className="form-control w-25"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <label
                    htmlFor="note"
                    className="form-label fw-medium text-muted"
                  >
                    Nota
                  </label>
                  <textarea
                    name="note"
                    id="note"
                    className="form-control"
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
            </>
          )}
        </EVModal.Body>
        <EVModal.Footer>
          <button className="btn btn-primary" onClick={handleSave}>
            Registrar
          </button>
          <button className="btn btn-btn-light text-danger" onClick={closeForm}>
            Cancelar
          </button>
        </EVModal.Footer>
      </EVModal>
    </>
  );
}
