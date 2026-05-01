declare module "@web/core/select_menu/select_menu" {
  import { Component } from "@odoo/owl";

  // =========================
  // Choice
  // =========================
  export interface SelectMenuChoice<T = any> {
    value: T;
    label: string;
  }

  // =========================
  // Group
  // =========================
  export interface SelectMenuGroup<T = any> {
    label: string;
    choices: SelectMenuChoice<T>[];
  }

  // =========================
  // Props
  // =========================
  export interface SelectMenuProps<T = any> {
    choices?: SelectMenuChoice<T>[];
    groups?: SelectMenuGroup<T>[];

    class?: string;
    togglerClass?: string;

    multiSelect?: boolean;
    required?: boolean;
    searchable?: boolean;

    searchPlaceholder?: string;

    value?: T | T[];

    onSelect?: (value: T | T[]) => void;
  }

  // =========================
  // Component
  // =========================
  export class SelectMenu<T = any> extends Component<SelectMenuProps<T>> {}
}
