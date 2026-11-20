import type { RouterMenuListProps } from "./types";

export function RouterMenuList(props: RouterMenuListProps) {
  return (
    <nav className="border-top">
      <ul className="list-group list-group-flush">
        {props.menuOptions.map((m, i) => {
          const key = `${m.url.replace("/", "_").trim()}_${i}`;

          return (
            <li className="p-1 list-group-item" key={key}>
              <button
                type="button"
                className={`btn w-100 text-start ${
                  props.isActive?.(m.url)
                    ? "text-primary fw-semibold bg-light"
                    : "text-dark"
                }`}
                onClick={() => props.onItemClicked?.(m.url)}
              >
                <i className={`fa ${m.icon} me-2`} />
                {m.text}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
