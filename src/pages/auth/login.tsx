import React, { useState } from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Card from "@/components/atoms/Card";
import Title from "@/components/atoms/Title";
import InputField from "@/components/molecules/InputField";
import Button from "@/components/atoms/Button";
import Description from "@/components/atoms/Description";

const LoginPage: React.FC = () => {
  const [identification, setIdentification] = useState("");
  const [divineSeal, setDivineSeal] = useState("");
  const [invoking, setInvoking] = useState(false);
  const [omen, setOmen] = useState("");

  const invokeAccess = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInvoking(true);
    setOmen("");

    try {
      if (!identification || !divineSeal) {
        throw new Error("All are sinners. Yet only the resolute are permitted through.");
      }

      const res = await window.auth.login(identification, divineSeal);
      if (!res.success) {
        throw new Error("Your devotion lacks weight.");
      }

      // Redirect ke halaman utama
      window.location.href = "/user/pages";
    } catch (err: any) {
      setOmen(err.message || "The will of the Gods forbids passage—for now.");
    } finally {
      setInvoking(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 flex items-center justify-center px-4">
      <Card padding="xl" borderColor="purple" className="w-full max-w-md border-2 border-purple-600">
        <form onSubmit={invokeAccess}>
          <div className="text-center">
            <Title
              text="Rejection from the God's"
              highlight="God's"
              size="xl"
              align="center"
            />
            <Description color="muted" align="center">
              "Fools do not beg. They declare."
            </Description>
          </div>

          {omen && (
            <div className="mb-4 p-3 bg-red-900/10 border border-red-700 text-red-400 text-sm flex items-start gap-2">
              <ExclamationTriangleIcon className="w-5 h-5 mt-0.5" />
              <span>{omen}</span>
            </div>
          )}

          <InputField
            label="Code"
            name="identification"
            id="identification"
            placeholder="••••••••"
            value={identification}
            onChange={(e) => setIdentification(e.target.value)}
          />

          <InputField
            label="Seal"
            name="divineSeal"
            id="divineSeal"
            type="password"
            placeholder="••••••••"
            value={divineSeal}
            onChange={(e) => setDivineSeal(e.target.value)}
          />

          <Button
            type="submit"
            variant="purple"
            size="lg"
            width="full"
            isLoading={invoking}
            loadingText="Swearing fealty..."
          >
            Submit to the Order
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
