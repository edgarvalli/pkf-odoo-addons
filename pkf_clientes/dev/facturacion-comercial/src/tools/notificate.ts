window.toast = function (message, type: ToastType = "info") {
  let container = document.getElementById("toast-container");

  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";

    Object.assign(container.style, {
      position: "fixed",
      top: "16px",
      right: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
      zIndex: "9999",
      pointerEvents: "none",
    });

    document.body.appendChild(container);
  }

  const toast = document.createElement("div");

  const config = {
    success: {
      bg: "#e8f5e9",
      color: "#1b5e20",
      border: "#81c784",
      icon: "✓",
    },
    error: {
      bg: "#ffebee",
      color: "#b71c1c",
      border: "#e57373",
      icon: "✕",
    },
    warning: {
      bg: "#fff8e1",
      color: "#f57f17",
      border: "#ffd54f",
      icon: "⚠",
    },
    info: {
      bg: "#e3f2fd",
      color: "#0d47a1",
      border: "#64b5f6",
      icon: "ℹ",
    },
  };

  const style = config[type] ?? config.info;

  Object.assign(toast.style, {
    minWidth: "320px",
    maxWidth: "420px",
    padding: "14px 18px",
    borderRadius: "16px",
    background: style.bg,
    color: style.color,
    border: `1px solid ${style.border}`,
    fontFamily:
      'Roboto, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    fontSize: "14px",
    fontWeight: "500",
    boxShadow: "0 2px 8px rgba(0,0,0,.08), 0 8px 24px rgba(0,0,0,.12)",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    opacity: "0",
    transform: "translateX(100%)",
    transition: "all .25s cubic-bezier(.2,0,0,1)",
    pointerEvents: "auto",
  });

  toast.innerHTML = `
    <span style="font-size:18px">${style.icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";

    setTimeout(() => {
      toast.remove();

      if (container.children.length === 0) {
        container.remove();
      }
    }, 250);
  }, 3500);
};
