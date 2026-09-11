export interface AvatarProps {
  imageB64: string;
  alt?: string;
  size?: number;
  className?: string;
}
export function Avatar({ imageB64, alt, className, size = 48 }: AvatarProps) {
  const sizeStr = `${size}px`;
  return (
    <img
      src={`data:image/png;base64,${imageB64}`}
      alt={alt}
      className={`rounded-circle ${className ? className : ""}`}
      style={{ width: sizeStr, height: sizeStr, objectFit: "cover" }}
    />
  );
}
