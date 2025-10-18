import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import GameCircle from "@/components/GameCircle";
import { toast } from "sonner";

type GameColor = "red" | "blue" | "yellow" | "green" | "default";

const Index = () => {
  const [score, setScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentColor, setCurrentColor] = useState<GameColor>("default");
  const [isGameOver, setIsGameOver] = useState(false);
  const [colorChangeInterval, setColorChangeInterval] = useState(2000);
  
  const colorIndexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const greenTimerRef = useRef<NodeJS.Timeout | null>(null);
  const colorsRef = useRef<GameColor[]>([]);

  const generateColorSequence = useCallback(() => {
    const colors: GameColor[] = ["red", "blue", "yellow"];
    // Shuffle first 3 colors
    for (let i = colors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [colors[i], colors[j]] = [colors[j], colors[i]];
    }
    // Add green as 4th color
    colors.push("green");
    return colors;
  }, []);

  const endGame = useCallback((message: string) => {
    setIsGameActive(false);
    setIsGameOver(true);
    setCurrentColor("default");
    if (timerRef.current) clearTimeout(timerRef.current);
    if (greenTimerRef.current) clearTimeout(greenTimerRef.current);
    toast.error(message);
  }, []);

  const changeColor = useCallback(() => {
    if (colorIndexRef.current >= colorsRef.current.length) {
      // Start new cycle
      colorsRef.current = generateColorSequence();
      colorIndexRef.current = 0;
    }

    const newColor = colorsRef.current[colorIndexRef.current];
    setCurrentColor(newColor);
    colorIndexRef.current++;

    // If color is green, set a 1.5s timeout for game over
    if (newColor === "green") {
      greenTimerRef.current = setTimeout(() => {
        endGame("Too slow! You must tap green within 1.5 seconds.");
      }, 1500);
    }

    // Schedule next color change
    timerRef.current = setTimeout(changeColor, colorChangeInterval);
  }, [colorChangeInterval, generateColorSequence, endGame]);

  const startGame = () => {
    setScore(0);
    setIsGameActive(true);
    setIsGameOver(false);
    setCurrentColor("default");
    setColorChangeInterval(2000);
    colorIndexRef.current = 0;
    colorsRef.current = generateColorSequence();
    
    // Start color changes after a brief delay
    timerRef.current = setTimeout(changeColor, 500);
  };

  const handleCircleClick = () => {
    if (!isGameActive) return;

    if (currentColor === "green") {
      // Correct tap!
      const newScore = score + 1;
      setScore(newScore);
      toast.success("Nice tap!", { duration: 1000 });
      
      // Clear the green timeout
      if (greenTimerRef.current) clearTimeout(greenTimerRef.current);
      
      // Increase difficulty every 5 points
      if (newScore % 5 === 0) {
        const newInterval = Math.max(colorChangeInterval * 0.9, 500);
        setColorChangeInterval(newInterval);
        toast.info(`Speed increased! ${newInterval.toFixed(0)}ms per color`, { duration: 1500 });
      }
      
      // Clear existing timer and start new cycle immediately
      if (timerRef.current) clearTimeout(timerRef.current);
      colorIndexRef.current = 0;
      colorsRef.current = generateColorSequence();
      timerRef.current = setTimeout(changeColor, colorChangeInterval);
    } else if (currentColor !== "default") {
      // Wrong tap!
      endGame(`Wrong color! You tapped ${currentColor} instead of green.`);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (greenTimerRef.current) clearTimeout(greenTimerRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-8">
      <div className="flex flex-col items-center gap-8 max-w-md w-full">
        {/* Score Display */}
        <div className="text-center">
          <h1 className="text-6xl font-bold text-foreground mb-2">
            {score}
          </h1>
          <p className="text-xl text-muted-foreground">
            {isGameActive ? "Tap when GREEN!" : "Score"}
          </p>
        </div>

        {/* Game Circle */}
        <GameCircle 
          color={currentColor} 
          onClick={handleCircleClick}
          isGameActive={isGameActive}
        />

        {/* Game Controls */}
        <div className="flex flex-col items-center gap-4 w-full">
          {!isGameActive && !isGameOver && (
            <Button 
              onClick={startGame}
              size="lg"
              className="w-full max-w-xs h-14 text-lg font-bold bg-primary hover:bg-primary/90"
            >
              Start Game
            </Button>
          )}
          
          {isGameOver && (
            <div className="text-center space-y-4 w-full">
              <div className="text-destructive text-2xl font-bold">
                Game Over!
              </div>
              <div className="text-foreground text-xl">
                Final Score: <span className="font-bold text-primary">{score}</span>
              </div>
              <Button 
                onClick={startGame}
                size="lg"
                className="w-full max-w-xs h-14 text-lg font-bold bg-primary hover:bg-primary/90"
              >
                Play Again
              </Button>
            </div>
          )}
        </div>

        {/* Instructions */}
        {!isGameActive && !isGameOver && (
          <div className="text-center text-muted-foreground text-sm max-w-xs">
            <p>Tap the circle only when it turns <span className="text-green-500 font-bold">GREEN</span>!</p>
            <p className="mt-2">The game gets faster every 5 points.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
