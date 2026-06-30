import { GameScreenShell } from "@/components/GameScreen/GameScreenShell";
import type { ReactNode } from "react";

type GameScreenProps = {
  children?: ReactNode;
};

export function GameScreen({ children }: GameScreenProps) {
  return <GameScreenShell>{children}</GameScreenShell>;
}
