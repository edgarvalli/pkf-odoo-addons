import * as signalR from "@microsoft/signalr";

let socket: signalR.HubConnection | null = null;

export async function startSignalR(url: string) {
  if (socket) return socket;

  socket = new signalR.HubConnectionBuilder()
    .withUrl(
      `${url.endsWith("/") ? url.slice(0, -1) : url}/hub/notify/progress`,
    )
    .withAutomaticReconnect()
    .build();

  await socket.start();

  return socket;
}

export function getSocket() {
  return socket;
}
