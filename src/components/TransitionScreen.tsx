import { useState, useEffect } from "react";

interface TransitionScreenProps {
  lines: string[];
  buttonText: string;
  onContinue: () => void;
  initialDelay?: number;
  lineDelay?: number;
}

const TransitionScreen = ({ 
  lines, 
  buttonText, 
  onContinue,
  initialDelay = 2000,
  lineDelay = 1500
}: TransitionScreenProps) => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Initial pause before first line
    const initialTimer = setTimeout(() => {
      setVisibleLines([0]);
    }, initialDelay);

    return () => clearTimeout(initialTimer);
  }, [initialDelay]);

  useEffect(() => {
    if (visibleLines.length > 0 && visibleLines.length < lines.length) {
      const timer = setTimeout(() => {
        setVisibleLines((prev) => [...prev, prev.length]);
      }, lineDelay);

      return () => clearTimeout(timer);
    } else if (visibleLines.length === lines.length) {
      const buttonTimer = setTimeout(() => {
        setShowButton(true);
      }, lineDelay);

      return () => clearTimeout(buttonTimer);
    }
  }, [visibleLines, lines.length, lineDelay]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="max-w-md w-full flex flex-col items-center gap-8 text-center">
        <div className="flex flex-col gap-6">
          {lines.map((line, index) => (
            <p
              key={index}
              className={`text-lg text-foreground font-light tracking-wide transition-all duration-700 ${
                visibleLines.includes(index)
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }`}
            >
              {line}
            </p>
          ))}
        </div>

        <button
          onClick={onContinue}
          className={`mt-8 px-8 py-3 text-sm uppercase tracking-[0.2em] text-foreground border border-border rounded-sm transition-all duration-500 hover:bg-secondary hover:border-muted-foreground ${
            showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default TransitionScreen;
