export function SaldosHelper(props: { hide?: boolean }) {
  if (props.hide) return null;

  return (
    <div className="p-3 flex-grow-1 d-flex justify-content-center align-items-center">
      <h6>No hay saldos de clientes que mostrar.</h6>
    </div>
  );
}
