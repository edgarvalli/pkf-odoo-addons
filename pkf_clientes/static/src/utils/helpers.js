export function formatAccount(value) {
  return Number(value).toLocaleString("es-MX", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
}

export function getUser() {
  const userList = localStorage.getItem("web.lastConnectedUser");
  const user = JSON.parse(userList)[0];
  return user;
}
