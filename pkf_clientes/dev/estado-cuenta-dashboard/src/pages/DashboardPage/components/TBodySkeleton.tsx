import { Placeholder } from "@/components";
export function TBodySkeleton(props: { hide?: boolean }) {
  if (props.hide) return null;
  return (
    <tbody>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={`row_skeleton_${i}`}>
          <td className="placeholder-glow">
            <Placeholder />
          </td>
          <td>
            <Placeholder />
          </td>
          <td>
            <Placeholder />
          </td>
          <td>
            <Placeholder />
          </td>
          <td>
            <Placeholder />
          </td>
          <td>
            <Placeholder />
          </td>
          <td>
            <Placeholder />
          </td>
          <td>
            <Placeholder />
          </td>
          <td>
            <Placeholder />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
