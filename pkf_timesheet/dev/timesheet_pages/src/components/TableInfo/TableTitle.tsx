export function TableTitle(props: { title?: string }) {
  if (!props.title) return null;

  return (
    <thead>
      <tr>
        <th colSpan={2} style={{ fontSize: 14 }}>
          {props.title}
        </th>
      </tr>
    </thead>
  );
}
