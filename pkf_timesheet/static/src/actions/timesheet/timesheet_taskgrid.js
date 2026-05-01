import TimeSheetComponent from "./timesheet_component";

export default class TimeSheetTaskGrid extends TimeSheetComponent {
  static template = "pkf_timesheet.TimeSheetTaskGrid";

  /**@returns {import("../@types/global").Params}*/
  get params() {
    if (this.props.params.endDate) {
      return this.props.params;
    }
    const initValues = this.getInitDate();
    return { ...initValues, projectId: 0 };
  }

  get project() {
    return this.props.project;
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
    const value = parseFloat(target.value);

    if (Number.isNaN(value)) {
      target.value = "";
      return;
    }

    target.value = value;
    this.props.onChange?.({
      phaseIndex,
      taskIndex,
      value,
      key: target.name,
    });
  }
}

TimeSheetTaskGrid.props = { "*": true };
