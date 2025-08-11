import React, { useState, useEffect } from "react";
import rawNeofetch from "@/assets/ghost.txt?raw";

const LoginPage: React.FC = () => {
  const [phase, setPhase] = useState<"boot" | "username" | "password">("boot");
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const cleanNeofetch = rawNeofetch
    .split(/\r?\n/)
    .map((line) => line.replace(/\x1b\[[0-9;]*m/g, "").trimEnd())
    .filter((line) => line.trim() !== "");

  useEffect(() => {
    if (phase === "boot") {
      let i = 0;
      setTerminalLines([]);
      const timer = setInterval(() => {
        if (i < cleanNeofetch.length) {
          setTerminalLines((prev) => [...prev, cleanNeofetch[i]]);
          i++;
        } else {
          clearInterval(timer);
          setTimeout(() => setPhase("username"), 500);
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, [phase]);

  const handleUsernameEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && username.trim()) {
      setPhase("password");
    }
  };

  const handlePasswordEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && password.trim()) {
      setError("");
      try {
        const res = await window.auth.login(username, password);
        if (!res.success) throw new Error("Login failed.");
        window.location.href = "/#/user";
      } catch (err: any) {
        setError(err.message || "Access denied.");
        setUsername("");
        setPassword("");
        setTimeout(() => setPhase("boot"), 500);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-red-600 font-mono p-4">
      <div className="whitespace-pre leading-snug">
        {terminalLines.map((line, idx) => (
          <div key={idx} className="min-h-[1em]">
            {line || "\u00A0"}
          </div>
        ))}
      </div>

      {phase === "username" && (
        <div className="flex items-center mt-2">
          <span>{">"} Username: </span>
          <input
            type="text"
            autoFocus
            className="bg-transparent border-none outline-none flex-1 text-red-600 ml-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleUsernameEnter}
          />
        </div>
      )}

      {phase === "password" && (
        <div className="mt-2">
          <div className="flex items-center">
            <span>{">"} Username: </span>
            <span className="ml-2">{username}</span>
          </div>
          <div className="flex items-center mt-2">
            <span>{">"} Password: </span>
            <input
              type="password"
              autoFocus
              className="bg-transparent border-none outline-none flex-1 text-red-600 ml-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handlePasswordEnter}
            />
          </div>
        </div>
      )}

      {error && <div className="mt-2 text-red-900">{">"} {error}</div>}
    </div>
  );
};

export default LoginPage;
