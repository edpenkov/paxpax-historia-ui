import { DesktopHeader } from "@/components/DesktopHeader/DesktopHeader";
import { GameScreen } from "@/components/GameScreen/GameScreen";

export default function Home() {
  return (
    <GameScreen>
      <DesktopHeader />
    </GameScreen>
  );
}
