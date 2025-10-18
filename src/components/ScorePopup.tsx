import { useEffect, useState } from "react";

interface ScorePopupProps {
  show: boolean;
  onComplete: () => void;
}

const ScorePopup = ({ show, onComplete }: ScorePopupProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!visible) return null;

  return (
    <div className="absolute -top-16 left-1/2 -translate-x-1/2 text-5xl font-bold text-primary animate-fade-up pointer-events-none z-10">
      +1
    </div>
  );
};

export default ScorePopup;
