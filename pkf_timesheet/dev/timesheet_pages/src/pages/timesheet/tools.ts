export const signatures = {
  iVBORw0KGgo: "image/png",
  "/9j/": "image/jpg",
  R0lGOD: "image/gif",
  UklGR: "image/webp",
  PHN2Zy: "image/svg+xml",
  PD94bW: "image/svg+xml",
};
export type SignaturesKey = keyof typeof signatures;
export function detectMimeType(b64String: string): string {
  for (let s in signatures) {
    if (b64String.indexOf(s) === 0) {
      return signatures[s as SignaturesKey];
    }
  }
  return "unknown";
}

export function b64ToSource(b64String: string) {
  return `data:${detectMimeType(b64String)};base64,${b64String}`;
}
