export function THead() {
  return (
    <thead>
      <tr>
        <th>Código</th>
        <th>Cliente</th>
        <th>Rfc</th>
        <th>Grupo</th>
        <th className="text-end">Vigente</th>
        <th className="text-end">Vencido +30</th>
        <th className="text-end">Vencido +60</th>
        <th className="text-end">Vencido</th>
        <th className="text-end">Pendiente</th>
      </tr>
    </thead>
  );
}
