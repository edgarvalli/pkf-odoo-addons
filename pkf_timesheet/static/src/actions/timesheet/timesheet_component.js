import { Component } from "@odoo/owl";

/**
 * @typedef InitDate
 * @property {Date} startDate
 * @property {Date} endDate
 */

export default class TimeSheetComponent extends Component {
  /**
   * @param {Date} date
   * @returns {string}
   */
  formatDate(date) {
    if (!date) return "";
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    return `${y}-${m}-${d}`;
  }

  /**
   * @param {number} days
   * @returns {InitDate}
   */
  getInitDate(days = 15) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    return { startDate, endDate };
  }

  /**
   * @param {Date | string} start
   * @param {Date | string} end
   * @returns {Date[]}
   */
  getRangeOfDates(start, end) {
    if (!start || !end) {
      throw new Error("Debe de definir un rango de fechas.");
    }

    const startDate = typeof start === "string" ? new Date(start) : start;
    const endDate = typeof end === "string" ? new Date(end) : end;

    if (startDate > endDate) {
      throw new Error("La fecha inicio no puede ser mayor a la fecha fin.");
    }

    const rangeOfDates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      rangeOfDates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return rangeOfDates;
  }

  /**
   * @param {Date} date
   * @returns {string}
   */
  getDayName(date) {
    return new Intl.DateTimeFormat("es-MX", {
      weekday: "short",
    })
      .format(date)
      .toUpperCase();
  }

  /**
   *
   * @param {HTMLElement} el
   * @returns {number}
   */
  getFullHeight(el) {
    if (!el) return;
    const rec = el.getClientRects();
    if (!rec) return 0;
    return window.innerHeight - rec[0].top;
  }
}
