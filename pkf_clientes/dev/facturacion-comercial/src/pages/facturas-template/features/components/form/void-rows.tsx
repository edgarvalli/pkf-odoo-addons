export function VoidRows() {
  return (
    <tbody>
      {Array.from({ length: 3 }).map((_, i) => {
        return (
          <tr key={`void-row-${i}`}>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        );
      })}
    </tbody>
  );
}
