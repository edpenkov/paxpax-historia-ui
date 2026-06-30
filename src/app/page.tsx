import { DesktopHeader } from "@/components/DesktopHeader/DesktopHeader";
import { GameScreen } from "@/components/GameScreen/GameScreen";
import { SettingsMenu } from "@/components/SettingsMenu/SettingsMenu";

export default function Home() {
  return (
    <GameScreen>
      <DesktopHeader />
      <SettingsMenu className="absolute left-[14px] top-[68px] z-10" />
    </GameScreen>
  );
}
