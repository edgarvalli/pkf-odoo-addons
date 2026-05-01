import { Component, onMounted, useRef, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

export default class ProjectSelect extends Component {
  static props = {
    onChange: { type: Function, optional: true },
    value: { type: [String, Number] },
  };
  static template = "pkf_timesheet.ProjectSelect";

  setup() {
    this.orm = useService("orm");
    this.state = useState({
      options: [],
      isOpen: false,
      value: this.props.value,
    });

    this.lazy = 0;

    onMounted(() => {
      this.getProjects();
      this.getValue();
    });
  }

  getValue() {
    const value = this.state.options.filter(
      (opt) => String(opt.value) === String(this.props.value),
    );
    this.state.value = value.length === 0 ? "" : value[0].label;
  }

  getCache(value) {
    return this.state.options.filter((opt) =>
      String(opt.value).includes(String(value)),
    );
  }

  async getProjects(value = null) {
    const options = await this.orm.call(
      "pkf.timesheet.project",
      "search_projects_by_user",
      [value],
      { limit: 10 },
    );
    if (options) {
      this.state.options = options.map((item) => ({
        label: item.name,
        value: item.id,
      }));
    }
  }

  toggleMenu(isOpen = false) {
    this.state.isOpen = isOpen;
  }

  onProjectSelect(option) {
    this.state.value = option.label;
    this.props.onChange?.(option);
    this.state.isOpen = false;
  }

  onChange(el) {
    clearTimeout(this.lazy);
    this.lazy = setTimeout(() => {
      /**@type {HTMLInputElement} */
      const { value } = el.target;
      const cache = this.getCache(value);
      if (cache.length > 0) {
        this.state.options = cache;
      } else {
        this.getProjects([["name", "like", value]]);
      }

      this.state.value = value;
    }, 500);
  }
}
