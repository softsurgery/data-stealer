import { Home } from "@/components/Home";
import { Inter } from "next/font/google";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Page() {
  return <Home />;
}
