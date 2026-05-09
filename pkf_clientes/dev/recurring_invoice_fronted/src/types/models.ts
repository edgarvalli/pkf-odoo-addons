export interface RecurringInvoice {
  client_code: string;
  client_rfc: string;
  client_name: string;
  current_payment: number;
  total_payments: number;
  next_date: Date;
  period_date: Date;
  note: string;
  note_template: string;
  total_without_tax: number;
  move_ids: number[];
  param_ids: number[];
}
