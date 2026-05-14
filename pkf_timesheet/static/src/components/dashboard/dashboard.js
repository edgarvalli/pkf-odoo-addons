import { Component } from "@odoo/owl";
/*
 * Agregar Socio y Gerente a procttos
 * Agregar costo de hora en hr.employeee
 * Agrear por default todos los staff del gerente
 */
export default class Dashboard extends Component {
  static template = "pkf_control_tiempos.Dashboard";
}

Dashboard.props = { "*": true };
