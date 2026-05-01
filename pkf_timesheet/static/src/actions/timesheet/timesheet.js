import { onMounted, onWillUnmount, useRef, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import TimeSheetComponent from "./timesheet_component";
import TimeSheetActionBar from "./timesheet_actionbar";
import TimeSheetTaskGrid from "./timesheet_taskgrid";

/**
 * Agregar Socio y Gerente a procttos
 * Agregar costo de hora en hr.employeee
 * Agrear por default todos los staff del gerente
 */

export default class TimeSheet extends TimeSheetComponent {
  static template = "pkf_control_tiempos.TimeSheet";
  static components = { TimeSheetActionBar, TimeSheetTaskGrid };

  static props = { "*": true };

  setup() {
    this.state = useState({
      /**@type {import("./timesheet").Project} */
      project: null,
      params: {
        startDate: "",
        endDate: "",
        projectId: 0,
      },
    });

    this.orm = useService("orm");
    this.ui = useService("ui");
    this.notification = useService("notification");
    this.containerRef = useRef("container-ref");

    onMounted(() => {
      this.resizeContainer();
      window.addEventListener("resize", () => this.resizeContainer());
    });

    onWillUnmount(() => {
      window.removeEventListener("resize", () => this.resizeContainer());
    });
  }

  resizeContainer() {
    const h = this.getFullHeight(this.containerRef.el);
    this.containerRef.el.style.height = h + "px";
  }

  /**DATA */

  async getProject() {
    const { projectId, startDate, endDate } = this.state.params;
    if (!endDate || !startDate || !projectId) return;
    this.ui.block();
    this.state.project = await this.orm.call(
      "pkf.timesheet.project",
      "get_full_data",
      [[Number(projectId)]],
      {
        startdate: this.formatDate(startDate),
        enddate: this.formatDate(endDate),
      },
    );
    this.ui.unblock();
  }

  /**Eventos */
  /**@param {import("./components/@types/global").ActionBarParams} params*/
  handleFilter(params) {
    const currentProjectId = this.state.params.projectId;
    this.state.params = { ...params };
    if (params.projectId !== currentProjectId) {
      this.getProject();
    }
  }

  /** @param {import("./components/@types/global").TaskValue} vals */
  handleChange(vals) {
    const phase = this.state.project.phases[vals.phaseIndex];
    const task = phase.tasks[vals.taskIndex];

    /**@type {import("./components/@types/global").TimeEntry} */
    const entry = {
      project_id: this.state.project.id,
      phase_id: phase.id,
      task_id: task.id,
      hours: vals.value,
      date: vals.key,
    };
    task.entries[vals.key] = entry;
  }

  /** @param {import("./components/@types/global").TimeEntry[]} entries */
  async _saveToServer(entries) {
    try {
      await this.orm.call("pkf.timesheet.time.entry", "save_bulk", [entries]);
      this.notification.add("Se guardo correctamente", { type: "success" });
      this.getProject();
    } catch (error) {
      this.notification.add(String(error), { type: "danger" });
    }
  }

  onSave() {
    if (!this.state.project) return;
    const entries = this.state.project.phases.flatMap((phase) => {
      return phase.tasks.flatMap((task) => {
        return Object.values(task.entries).filter(
          (entry) => parseFloat(entry.hours) > 0,
        );
      });
    });
    if (entries.length === 0) return;
    this._saveToServer(entries);
  }
}
