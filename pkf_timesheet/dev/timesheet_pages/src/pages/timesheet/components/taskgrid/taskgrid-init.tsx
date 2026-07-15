import { getRangeDates } from "@/utils/dates";

export function TaskGridInit() {
  const getRange = () => {
    const today = new Date();

    const end = today.toISOString().split("T")[0];
    today.setDate(today.getDate() - 10);

    const start = today.toISOString().split("T")[0];
    return getRangeDates(start, end);
  };

  const renderCols = (type: "th" | "td") => {
    const dates = getRange();
    return dates.map((date, i) => {
      const colKey = `col_${i}`;
      if (type === "td") {
        return <td key={colKey}></td>;
      }

      return (
        <th key={colKey}>
          {date.label.slice(0, 3).toUpperCase()} <br />
          <span>{date.date.getDate()}</span>
        </th>
      );
    });
  };

  return (
    <div className="d-flex flex-column overflow-x-auto flex-grow-1">
      <div className="p-3 mb-3">
        <h4>No se ha seleccionado un proyecto.</h4>
      </div>
      <div className="ev-taskgrid">
        <table>
          <thead>
            <tr>
              <th>Tareas de proyecto</th>
              {renderCols("th")}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              {renderCols("td")}
            </tr>
            <tr>
              <td></td>
              {renderCols("td")}
            </tr>
            <tr>
              <td></td>
              {renderCols("td")}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
