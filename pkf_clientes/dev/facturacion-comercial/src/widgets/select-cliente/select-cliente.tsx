import { ButtonSelect } from "@/widgets/button-select/button-select";
import { useSelectClient } from "./hooks";
import type { SelectClientProps } from "./types";

export function SelectCliente(props: SelectClientProps) {
  const { data, searchClientAsync, clientSelected, handleItemSelected } =
    useSelectClient(props.data);
  return (
    <ButtonSelect<Cliente>
      keyExtractor={(item) => item.idcliente}
      data={data}
      title="Buscar Cliente"
      slots={{
        inputProps: { placeholder: "Busca un cliente por razon social" },
      }}
      headers={[
        { name: "razonSocial", text: "Razon Social" },
        { name: "rfc", text: "Rfc" },
      ]}
      onSearch={(e) => searchClientAsync(e.target.value)}
      onItemSelected={(c) => handleItemSelected(c, props.onItemSelected)}
    >
      <i className="fa fa-user me-2" />
      {props.value ?? clientSelected.razonSocial ?? "Selecciona un cliente"}
    </ButtonSelect>
  );
}
