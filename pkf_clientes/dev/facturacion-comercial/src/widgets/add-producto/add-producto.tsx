import { useProducto } from "./hooks";
import type { AddProductPropos } from "./types";
import { ButtonSelect } from "@/widgets/button-select/button-select";

export function AddProducto(props: AddProductPropos) {
  const { searchAsync, productos } = useProducto(props.data);
  return (
    <ButtonSelect<Producto>
      data={productos}
      keyExtractor={(p) => p.idproducto}
      headers={[
        { name: "codigo", text: "Codigo" },
        { name: "nombre", text: "Nombre" },
      ]}
      title="Buscar un producto"
      onSearch={(e) => searchAsync(e.target.value)}
      onItemSelected={props.onAdd}
    >
      <i className="fa fa-plus"></i>
      Agregar un producto
    </ButtonSelect>
  );
}
