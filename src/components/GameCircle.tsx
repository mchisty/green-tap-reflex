import { cn } from "@/lib/utils";

interface GameCircleProps {
  color: "red" | "blue" | "yellow" | "brown" | "white" | "orange" | "violet" | "green" | "purple" | "pink" | "cyan" | "magenta" | "lime" | "indigo" | "teal" | "coral" | "default";
  onClick: () => void;
  isGameActive: boolean;
  shouldShake?: boolean;
  shouldPulse?: boolean;
}

const GameCircle = ({ color, onClick, isGameActive, shouldShake, shouldPulse }: GameCircleProps) => {
  const getColorClass = () => {
    switch (color) {
      case "red":
        return "bg-gradient-to-br from-[hsl(0,95%,72%)] to-[hsl(0,95%,52%)] shadow-[0_0_80px_-10px_rgba(252,75,85,0.9),inset_0_-8px_20px_rgba(0,0,0,0.3),inset_0_2px_20px_rgba(255,255,255,0.3)]";
      case "blue":
        return "bg-gradient-to-br from-[hsl(217,95%,75%)] to-[hsl(217,95%,55%)] shadow-[0_0_80px_-10px_rgba(74,144,226,0.9),inset_0_-8px_20px_rgba(0,0,0,0.3),inset_0_2px_20px_rgba(255,255,255,0.3)]";
      case "yellow":
        return "bg-gradient-to-br from-[hsl(45,100%,65%)] to-[hsl(45,100%,45%)] shadow-[0_0_80px_-10px_rgba(255,215,64,0.9),inset_0_-8px_20px_rgba(0,0,0,0.3),inset_0_2px_20px_rgba(255,255,255,0.3)]";
      case "brown":
        return "bg-gradient-to-br from-[hsl(25,75%,57%)] to-[hsl(25,75%,37%)] shadow-[0_0_80px_-10px_rgba(165,92,42,0.9),inset_0_-8px_20px_rgba(0,0,0,0.3),inset_0_2px_20px_rgba(255,255,255,0.2)]";
      case "white":
        return "bg-gradient-to-br from-[hsl(0,0%,100%)] to-[hsl(0,0%,85%)] shadow-[0_0_80px_-10px_rgba(255,255,255,0.9),inset_0_-8px_20px_rgba(0,0,0,0.2),inset_0_2px_20px_rgba(255,255,255,0.5)]";
      case "orange":
        return "bg-gradient-to-br from-[hsl(25,95%,70%)] to-[hsl(25,95%,50%)] shadow-[0_0_80px_-10px_rgba(255,138,51,0.9),inset_0_-8px_20px_rgba(0,0,0,0.3),inset_0_2px_20px_rgba(255,255,255,0.3)]";
      case "violet":
        return "bg-gradient-to-br from-[hsl(280,75%,70%)] to-[hsl(280,75%,50%)] shadow-[0_0_80px_-10px_rgba(167,139,250,0.9),inset_0_-8px_20px_rgba(0,0,0,0.3),inset_0_2px_20px_rgba(255,255,255,0.3)]";
      case "green":
        return "bg-gradient-to-br from-[hsl(142,85%,55%)] to-[hsl(142,85%,35%)] shadow-[0_0_80px_-10px_rgba(16,223,94,1),inset_0_-8px_20px_rgba(0,0,0,0.4),inset_0_2px_20px_rgba(255,255,255,0.4)] animate-pulse-glow";
      case "purple":
        return "bg-gradient-to-br from-[hsl(270,75%,70%)] to-[hsl(270,75%,50%)] shadow-[0_0_80px_-10px_rgba(155,89,182,0.9),inset_0_-8px_20px_rgba(0,0,0,0.3),inset_0_2px_20px_rgba(255,255,255,0.3)]";
      case "pink":
        return "bg-gradient-to-br from-[hsl(330,85%,75%)] to-[hsl(330,85%,55%)] shadow-[0_0_80px_-10px_rgba(236,72,153,0.9),inset_0_-8px_20px_rgba(0,0,0,0.3),inset_0_2px_20px_rgba(255,255,255,0.3)]";
      case "cyan":
        return "bg-gradient-to-br from-[hsl(180,85%,65%)] to-[hsl(180,85%,45%)] shadow-[0_0_80px_-10px_rgba(34,211,238,0.9),inset_0_-8px_20px_rgba(0,0,0,0.3),inset_0_2px_20px_rgba(255,255,255,0.3)]";
      case "magenta":
        return "bg-gradient-to-br from-[hsl(300,80%,70%)] to-[hsl(300,80%,50%)] shadow-[0_0_80px_-10px_rgba(217,70,239,0.9),inset_0_-8px_20px_rgba(0,0,0,0.3),inset_0_2px_20px_rgba(255,255,255,0.3)]";
      case "lime":
        return "bg-gradient-to-br from-[hsl(75,85%,65%)] to-[hsl(75,85%,45%)] shadow-[0_0_80px_-10px_rgba(163,230,53,0.9),inset_0_-8px_20px_rgba(0,0,0,0.3),inset_0_2px_20px_rgba(255,255,255,0.3)]";
      case "indigo":
        return "bg-gradient-to-br from-[hsl(240,80%,75%)] to-[hsl(240,80%,55%)] shadow-[0_0_80px_-10px_rgba(99,102,241,0.9),inset_0_-8px_20px_rgba(0,0,0,0.3),inset_0_2px_20px_rgba(255,255,255,0.3)]";
      case "teal":
        return "bg-gradient-to-br from-[hsl(175,70%,60%)] to-[hsl(175,70%,40%)] shadow-[0_0_80px_-10px_rgba(20,184,166,0.9),inset_0_-8px_20px_rgba(0,0,0,0.3),inset_0_2px_20px_rgba(255,255,255,0.3)]";
      case "coral":
        return "bg-gradient-to-br from-[hsl(15,90%,75%)] to-[hsl(15,90%,55%)] shadow-[0_0_80px_-10px_rgba(251,113,133,0.9),inset_0_-8px_20px_rgba(0,0,0,0.3),inset_0_2px_20px_rgba(255,255,255,0.3)]";
      default:
        return "bg-gradient-to-br from-secondary/60 to-secondary/40 shadow-[0_0_40px_-10px_rgba(100,100,100,0.3),inset_0_-8px_20px_rgba(0,0,0,0.2)]";
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
