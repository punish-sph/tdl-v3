// auth.ts (Electron Main Process)
import { app, ipcMain } from "electron";
import fs from "fs";
import path from "path";

// Path file session lokal
const sessionFile = path.join(app.getPath("userData"), "session.json");

// Simpan session (true = login, false = logout)
function saveSession(loggedIn: boolean) {
  fs.writeFileSync(sessionFile, JSON.stringify({ loggedIn }), "utf-8");
}

// Ambil status login
function loadSession(): boolean {
  if (!fs.existsSync(sessionFile)) return false;
  try {
    const data = JSON.parse(fs.readFileSync(sessionFile, "utf-8"));
    return data.loggedIn === true;
  } catch {
    return false;
  }
}

// Handler untuk login
ipcMain.handle("auth:login", async (_event, username: string, password: string) => {
  // Ganti username/password sesuai kebutuhan kamu
  if (username === "pierro" && password === "fatui123") {
    saveSession(true);
    return { success: true };
  }

  throw new Error("You are not recognized by the Fatui.");
});

// Handler untuk logout
ipcMain.handle("auth:logout", () => {
  saveSession(false);
  return { success: true };
});

// Handler untuk cek status login
ipcMain.handle("auth:check", () => {
  return loadSession();
});
