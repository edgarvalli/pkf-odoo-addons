export function detectMimeType(b64String) {
  const signatures = {
    iVBORw0KGgo: "image/png",
    "/9j/": "image/jpg",
    R0lGOD: "image/gif",
    UklGR: "image/webp",
    PHN2Zy: "image/svg+xml", // Firma para <svg
    PD94bW: "image/svg+xml", // Firma para <?xml
  };

  for (let s in signatures) {
    if (b64String.indexOf(s) === 0) {
      return signatures[s];
    }
  }
  return "unknown";
}
