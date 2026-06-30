import { DesktopHeader } from "@/components/DesktopHeader/DesktopHeader";
import { GameScreen } from "@/components/GameScreen/GameScreen";
import { MobileTopControls } from "@/components/MobileTopControls/MobileTopControls";
import { SettingsMenu } from "@/components/SettingsMenu/SettingsMenu";

export default function Home() {
  return (
    <GameScreen>
      <DesktopHeader />
      <SettingsMenu className="absolute left-[14px] top-[68px] z-10 hidden md:block" />
      <MobileTopControls className="absolute top-1 left-1 z-10 md:hidden" />
    </GameScreen>
  );
}
