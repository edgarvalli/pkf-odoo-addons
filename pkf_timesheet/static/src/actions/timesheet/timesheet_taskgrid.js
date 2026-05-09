import { onWillUpdateProps, useRef, useState } from "@odoo/owl";
import TimeSheetComponent from "./timesheet_component";

export default class TimeSheetTaskGrid extends TimeSheetComponent {
  static template = "pkf_timesheet.TimeSheetTaskGrid";

  setup() {
    this.state = useState({
      project: this.props.project,
    });

    this.delayEvent = 0;

    onWillUpdateProps((prev) => {
      if (prev.project) {
        this.state.project = prev.project;
      }
    });
  }

  /**@returns {import("../@types/global").Params}*/
  get params() {
    if (this.props.params.endDate) {
      return this.props.params;
    }
    const initValues = this.getInitDate();
    return { ...initValues, projectId: 0 };
  }

  get columns() {
    if (!this.params?.startDate || !this.params?.endDate) return [];

    const start = new Date(this.params.startDate);
    const end = new Date(this.params.endDate);

    return this.getRangeOfDates(start, end).map((d) => ({
      label: this.getDayName(d),
      name: d.toISOString().split("T")[0],
      date: d,
    }));
  }
  handleChange(e) {
    /** @type {HTMLInputElement} */
    const target = e.target;
    if (!target) return;

    const phaseIndex = parseInt(target.dataset.phaseIndex);
    const taskIndex = parseInt(target.dataset.taskIndex);
    const entryId = parseInt(target.getAttribute("data-entry-id") || "0");
    const value = parseFloat(target.value);

    if (Number.isNaN(value)) {
      target.value = "";
      return;
    }

    target.value = value;
    this.props.onChange?.({
      phaseIndex,
      taskIndex,
      entryId,
      value,
      key: target.name,
    });
  }
  /**@param {KeyboardEvent} ev*/
  searchTask(ev) {
    if (!this.props.project) return;

    clearTimeout(this.delayEvent);

    this.delayEvent = setTimeout(() => {
      /**@type {HTMLInputElement} */
      const target = ev.target;

      const val = target.value.toLowerCase();
      const newProject = {
        ...this.state.project,
        phases: this.props.project.phases.map((phase) => {
          return {
            ...phase,
            tasks: phase.tasks.filter((task) =>
              task.name.toLowerCase().includes(val),
            ),
          };
        }),
      };

      this.state.project = newProject;
    }, 500);
  }
}

TimeSheetTaskGrid.props = { "*": true };
