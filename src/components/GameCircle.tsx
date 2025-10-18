import { cn } from "@/lib/utils";

interface GameCircleProps {
  color: "red" | "blue" | "yellow" | "green" | "default";
  onClick: () => void;
  isGameActive: boolean;
}

const GameCircle = ({ color, onClick, isGameActive }: GameCircleProps) => {
  const getColorClass = () => {
    switch (color) {
      case "red":
        return "bg-red-500 shadow-[0_0_60px_-15px_rgba(239,68,68,0.8)]";
      case "blue":
        return "bg-blue-500 shadow-[0_0_60px_-15px_rgba(59,130,246,0.8)]";
      case "yellow":
        return "bg-yellow-500 shadow-[0_0_60px_-15px_rgba(234,179,8,0.8)]";
      case "green":
        return "bg-green-500 shadow-[0_0_60px_-15px_rgba(34,197,94,0.8)] animate-pulse-glow";
      default:
        return "bg-secondary";
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={!isGameActive}
      className={cn(
        "w-64 h-64 rounded-full transition-all duration-300 ease-in-out transform",
        "active:scale-95 hover:scale-105",
        "disabled:cursor-not-allowed disabled:hover:scale-100",
        getColorClass()
      )}
      aria-label="Game circle"
    />
  );
};

export default GameCircle;
