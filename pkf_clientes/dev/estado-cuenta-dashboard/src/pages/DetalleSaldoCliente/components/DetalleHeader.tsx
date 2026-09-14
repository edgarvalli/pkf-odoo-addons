import { Placeholder } from "@/components";
import type { Cliente } from "@/types/models";
import { useNavigate } from "react-router";

type ValuePlaceholderProps = { value?: string | number; placeholder?: boolean };

function ValuePlaceholder(props: ValuePlaceholderProps) {
  if (props.placeholder) return <Placeholder />;
  return <span>{props.value}</span>;
}

export function DetalleHeader({ cliente }: { cliente?: Cliente | null }) {
  const navigate = useNavigate();
  return (
    <div className="material-card__header">
      <div className="pb-2">
        <i
          className="fa fa-arrow-left cursor-pointer"
          onClick={() => navigate("/")}
        ></i>
      </div>

      <div className="d-flex">
        <div className="flex-grow-1 d-flex flex-column gap-1">
          <div>
            <ValuePlaceholder
              value={cliente?.razonSocial}
              placeholder={!cliente}
            />
          </div>
          <div className="text-muted fw-normal fs-6">
            <span className="me-2">Codigo cliente:</span>
            <ValuePlaceholder value={cliente?.codigo} placeholder={!cliente} />
          </div>
          <div className="text-muted fs-12px fw-normal">
            <ValuePlaceholder value={cliente?.rfc} placeholder={!cliente} />
          </div>
          <div className="text-muted fs-12px fw-normal">
            <ValuePlaceholder value={cliente?.emails} placeholder={!cliente} />
          </div>
        </div>

        <div className="me-1">
          <div className="text-end">Grupo</div>
          <div className="text-muted fs-12px fw-normal">
            <ValuePlaceholder
              value={cliente?.grupo?.nombre}
              placeholder={!cliente}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
