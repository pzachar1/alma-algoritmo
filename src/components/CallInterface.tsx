import { useState, useEffect } from "react";
import { Phone } from "lucide-react";

interface CallInterfaceProps {
  onHangUp: () => void;
}

const CallInterface = ({ onHangUp }: CallInterfaceProps) => {
  const [seconds, setSeconds] = useState(0);
  const [isEnding, setIsEnding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleHangUp = () => {
    setIsEnding(true);
    setTimeout(() => {
      onHangUp();
    }, 800);
  };

  return (
    <div 
      className={`min-h-screen bg-background flex flex-col items-center justify-between py-16 px-6 transition-opacity duration-700 ${
        isEnding ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Top section - Caller info */}
      <div className="flex flex-col items-center gap-3 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-surface-subtle flex items-center justify-center mb-4">
          <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
            <span className="text-2xl text-muted-foreground">?</span>
          </div>
        </div>
        
        <h1 className="text-2xl font-medium text-foreground tracking-tight">
          Voz Desconhecida
        </h1>
        
        <p className="text-sm text-muted-foreground">
          mobile
        </p>
      </div>

      {/* Middle section - Timer */}
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-call-active animate-pulse-soft" />
          <span className="font-mono text-lg text-muted-foreground tracking-widest">
            {formatTime(seconds)}
          </span>
        </div>
      </div>

      {/* Bottom section - Hang up button */}
      <div className="flex flex-col items-center gap-4 animate-fade-in animation-delay-300">
        <button
          onClick={handleHangUp}
          disabled={isEnding}
          className="w-16 h-16 rounded-full bg-call-end flex items-center justify-center transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95 disabled:opacity-50"
          aria-label="Desligar"
        >
          <Phone className="w-7 h-7 text-destructive-foreground rotate-[135deg]" />
        </button>
        
        <span className="text-xs text-dim uppercase tracking-wider">
          desligar
        </span>
      </div>
    </div>
  );
};

export default CallInterface;
