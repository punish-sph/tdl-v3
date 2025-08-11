export {};

declare global {
  interface Window {
    auth: {
      login: (username: string, password: string) => Promise<{ success: boolean }>;
      logout: () => Promise<{ success: boolean }>;
      getSession: () => Promise<{ loggedIn: boolean }>;
    };
    ipcRenderer: import("electron").IpcRenderer;
  }
}
