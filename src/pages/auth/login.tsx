import React, { useState } from "react";
import Card from "@/components/atoms/Card";
import Title from "@/components/atoms/Title";
import InputField from "@/components/molecules/InputField";
import Button from "@/components/atoms/Button";
import Description from "@/components/atoms/Description";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!email || !password) {
        throw new Error("Email dan password harus diisi");
      }
      
      if (!email.includes("@")) {
        throw new Error("Email tidak valid");
      }
      
      console.log("Login berhasil", { email, password });
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <Card 
        padding="lg" 
        borderColor="purple" 
        className="w-full max-w-md"
      >
        <form onSubmit={handleSubmit} >
          <div className="mb-8 text-center">
            <Title 
              text="Selamat Datang Kembali" 
              highlight="Kembali"
              size="xl"
              align="center"
            />
            <Description color="muted" align="center">
              Masuk untuk melanjutkan ke akun Anda
            </Description>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-500 text-sm">
              {error}
            </div>
          )}

          <InputField
            label="Email"
            name="email"
            id="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            label="Password"
            name="password"
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="purple"
            size="lg"
            width="full"
            isLoading={loading}
            loadingText="Memproses..."
          >
            Masuk
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;