import { CircularProgress } from "@mui/material";

export function EVLoader(props: { message?: string; hidden?: boolean }) {
  if (props.hidden) return <></>;
  return (
    <div className="ev-loader">
      <span>{props.message}</span>
      <CircularProgress variant="indeterminate" color="info" />
    </div>
  );
}
