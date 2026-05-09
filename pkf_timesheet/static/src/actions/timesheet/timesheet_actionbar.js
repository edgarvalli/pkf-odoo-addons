import { useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { SelectMenu } from "@web/core/select_menu/select_menu";
import TimeSheetComponent from "./timesheet_component";
import ProjectSelect from "./project_select";
import { detectMimeType } from "../../utils/image";

export default class TimeSheetActionBar extends TimeSheetComponent {
  static template = "pkf_timesheet.TimeSheetActionBar";
  static description = "Barra lateral de acción para obtener los parametros.";
  static components = { SelectMenu, ProjectSelect };

  setup() {
    this.state = useState({
      ...this.getInitDate(),
      projectId: "0",
      note: "",
    });

    this.action = useService("action");
  }

  get values() {
    return {
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      projectId: this.state.projectId,
      note: this.props.note,
    };
  }

  /**@type {{id: number; name: string}} */
  get client() {
    if (!this.props.client) return;
    const client = { ...this.props.client };
    if ("avatar" in client) {
      const mimeType = detectMimeType(client.avatar);
      client.avatar = `data:${mimeType};base64,${client.avatar}`;
    }
    return client;
  }

  openClient() {
    /**@type {import("../../types/owl/actions").WindowAction} */
    const action = {
      type: "ir.actions.act_window",
      res_model: "res.partner",
      res_id: this.client.id,
      views: [[false, "form"]],
      target: "current",
    };
    this.action.doAction(action);
  }

  onProjectChange(option) {
    this.state.projectId = String(option.value);
  }

  /** @param {Event} e*/
  onDateChange(e) {
    /**@type {HTMLInputElement} */
    const target = e.target;
    const [year, month, day] = target.value.split("-");
    const val = new Date(year, month - 1, day);
    if (target.name === "startdate") {
      this.state.startDate = val;
    } else {
      this.state.endDate = val;
    }
  }

  onSave() {
    this.props.onSave?.(this.state.projectId);
  }

  onFilter() {
    this.props.onFilter?.(this.values);
  }
}

TimeSheetActionBar.props = { "*": true };
