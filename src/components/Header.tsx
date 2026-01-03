import { cn } from "@/lib/utils";
import { ModeToggle } from "./ThemeToggle";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn("flex flex-row justify-between", className)}>
      <h1>Header</h1>
      <ModeToggle />
    </header>
  );
}
