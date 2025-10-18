import { cn } from "@/lib/utils";

interface GameCircleProps {
  color: "red" | "blue" | "yellow" | "brown" | "white" | "orange" | "light-green" | "green" | "default";
  onClick: () => void;
  isGameActive: boolean;
  shouldShake?: boolean;
  shouldPulse?: boolean;
}

const GameCircle = ({ color, onClick, isGameActive, shouldShake, shouldPulse }: GameCircleProps) => {
  const getColorClass = () => {
    switch (color) {
      case "red":
        return "bg-[rgb(252,75,85)] shadow-[0_0_80px_-10px_rgba(252,75,85,0.9)]";
      case "blue":
        return "bg-[rgb(74,144,226)] shadow-[0_0_80px_-10px_rgba(74,144,226,0.9)]";
      case "yellow":
        return "bg-[rgb(255,215,64)] shadow-[0_0_80px_-10px_rgba(255,215,64,0.9)]";
      case "brown":
        return "bg-[rgb(165,92,42)] shadow-[0_0_80px_-10px_rgba(165,92,42,0.9)]";
      case "white":
        return "bg-[rgb(255,255,255)] shadow-[0_0_80px_-10px_rgba(255,255,255,0.9)]";
      case "orange":
        return "bg-[rgb(255,138,51)] shadow-[0_0_80px_-10px_rgba(255,138,51,0.9)]";
      case "light-green":
        return "bg-[rgb(102,221,119)] shadow-[0_0_80px_-10px_rgba(102,221,119,0.9)]";
      case "green":
        return "bg-[rgb(16,223,94)] shadow-[0_0_80px_-10px_rgba(16,223,94,1)] animate-pulse-glow";
      default:
        return "bg-secondary/50 shadow-[0_0_40px_-10px_rgba(100,100,100,0.3)]";
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={!isGameActive}
      className={cn(
        "w-64 h-64 rounded-full transition-all duration-500 ease-in-out transform",
        "active:scale-95",
        "disabled:cursor-not-allowed disabled:hover:scale-100",
        "opacity-0 animate-in fade-in duration-500",
        shouldShake && "animate-shake",
        shouldPulse && "animate-success-pulse",
        getColorClass()
      )}
      style={{
        animationFillMode: shouldShake ? "forwards" : "none",
      }}
      aria-label="Game circle"
    />
  );
};

export default GameCircle;
