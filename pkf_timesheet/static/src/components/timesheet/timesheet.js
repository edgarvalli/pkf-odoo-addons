import { Component } from "@odoo/owl";

export default class Timesheet extends Component {
  static template = "pkf_timesheet.TimesheetTemplate";
  static props = { "*": true };
}
