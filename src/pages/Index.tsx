import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import GameCircle from "@/components/GameCircle";
import ScorePopup from "@/components/ScorePopup";
import { toast } from "sonner";
import { useGameSounds } from "@/hooks/useGameSounds";
import { Volume2, VolumeX } from "lucide-react";

type GameColor = "red" | "blue" | "yellow" | "brown" | "white" | "orange" | "light-green" | "green" | "default";

const Index = () => {
  const [score, setScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentColor, setCurrentColor] = useState<GameColor>("default");
  const [isGameOver, setIsGameOver] = useState(false);
  const [colorChangeInterval, setColorChangeInterval] = useState(2000);
  const [shouldShake, setShouldShake] = useState(false);
  const [shouldPulse, setShouldPulse] = useState(false);
  const [showScorePopup, setShowScorePopup] = useState(false);
  
  const colorIndexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const greenTimerRef = useRef<NodeJS.Timeout | null>(null);
  const colorsRef = useRef<GameColor[]>([]);
  
  const { playSuccessSound, playErrorSound, toggleMute, isMuted } = useGameSounds();

  const generateColorSequence = useCallback(() => {
    const colors: GameColor[] = ["red", "blue", "yellow", "brown", "white", "orange", "light-green"];
    // Shuffle and pick 3 random colors
    const shuffled = colors.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 3);
    // Add electric green as 4th color
    selected.push("green");
    return selected;
  }, []);

  const endGame = useCallback((message: string) => {
    setIsGameActive(false);
    setIsGameOver(true);
    setShouldShake(true);
    playErrorSound();
    
    setTimeout(() => {
      setCurrentColor("default");
      setShouldShake(false);
    }, 500);
    
    if (timerRef.current) clearTimeout(timerRef.current);
    if (greenTimerRef.current) clearTimeout(greenTimerRef.current);
    toast.error(message);
  }, [playErrorSound]);

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
    setShouldShake(false);
    setShouldPulse(false);
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
      
      // Trigger animations and sounds
      setShouldPulse(true);
      setShowScorePopup(true);
      playSuccessSound();
      
      setTimeout(() => setShouldPulse(false), 300);
      
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[hsl(220,15%,18%)] to-[hsl(220,18%,22%)] p-8 relative">
      {/* Mute Toggle Button */}
      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 p-3 rounded-full bg-secondary/50 hover:bg-secondary/70 transition-colors"
        aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-foreground" />
        ) : (
          <Volume2 className="w-6 h-6 text-foreground" />
        )}
      </button>

      <div className="flex flex-col items-center gap-8 max-w-md w-full">
        {/* Score Display */}
        <div className="text-center relative">
          <h1 className="text-7xl font-extrabold text-foreground mb-2 tracking-tight">
            {score}
          </h1>
          <p className="text-xl text-muted-foreground font-semibold">
            {isGameActive ? "Tap when GREEN!" : "Score"}
          </p>
          <ScorePopup 
            show={showScorePopup} 
            onComplete={() => setShowScorePopup(false)} 
          />
        </div>

        {/* Game Circle */}
        <div className="relative">
          <GameCircle 
            color={currentColor} 
            onClick={handleCircleClick}
            isGameActive={isGameActive}
            shouldShake={shouldShake}
            shouldPulse={shouldPulse}
          />
        </div>

        {/* Game Controls */}
        <div className="flex flex-col items-center gap-4 w-full">
          {!isGameActive && !isGameOver && (
            <Button 
              onClick={startGame}
              size="lg"
              className="button-3d w-full max-w-xs h-16 text-xl font-bold bg-primary hover:bg-primary text-primary-foreground rounded-xl"
            >
              Start Game
            </Button>
          )}
          
          {isGameOver && (
            <div className="text-center space-y-5 w-full animate-in fade-in duration-500">
              <div className="text-destructive text-3xl font-extrabold">
                Game Over!
              </div>
              <div className="text-foreground text-2xl">
                Final Score: <span className="font-extrabold text-[rgb(16,223,94)]">{score}</span>
              </div>
              <Button 
                onClick={startGame}
                size="lg"
                className="button-3d w-full max-w-xs h-16 text-xl font-bold bg-primary hover:bg-primary text-primary-foreground rounded-xl"
              >
                Play Again
              </Button>
            </div>
          )}
        </div>

        {/* Instructions */}
        {!isGameActive && !isGameOver && (
          <div className="text-center text-muted-foreground text-base max-w-xs font-medium">
            <p>Tap the circle only when it turns <span className="text-[rgb(16,223,94)] font-bold">ELECTRIC GREEN</span>!</p>
            <p className="mt-2">The game gets faster every 5 points.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
