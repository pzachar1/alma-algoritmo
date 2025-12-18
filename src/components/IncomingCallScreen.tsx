import { Phone, User } from "lucide-react";
import { useEffect, useRef } from "react";
import vibratingSound from "@/assets/vibrating-phone.mp3";

interface IncomingCallScreenProps {
  onAccept: () => void;
  onDecline: () => void;
}

const IncomingCallScreen = ({ onAccept, onDecline }: IncomingCallScreenProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create and play audio
    audioRef.current = new Audio(vibratingSound);
    audioRef.current.loop = true;
    audioRef.current.play().catch(console.error);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleAccept = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    onAccept();
  };

  const handleDecline = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    onDecline();
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between py-16 px-6 animate-vibrate">
      {/* Top section - Caller info */}
      <div className="flex flex-col items-center gap-2 animate-fade-in pt-8">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-gradient-to-b from-zinc-600 to-zinc-800 flex items-center justify-center mb-4">
          <User className="w-14 h-14 text-zinc-400" />
        </div>
        
        <h1 className="text-3xl font-light text-white tracking-tight">
          Número Restrito
        </h1>
        
        <p className="text-lg text-zinc-400">
          Desconhecido
        </p>
        
        <p className="text-sm text-zinc-500 mt-2">
          Chamada de voz do iPhone
        </p>
      </div>

      {/* Middle spacer */}
      <div className="flex-1" />

      {/* Bottom section - Action buttons */}
      <div className="flex items-center justify-center gap-16 animate-fade-in animation-delay-300">
        {/* Decline button */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleDecline}
            className="w-16 h-16 rounded-full bg-call-end flex items-center justify-center transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
            aria-label="Recusar"
          >
            <Phone className="w-7 h-7 text-white rotate-[135deg]" />
          </button>
          <span className="text-xs text-white uppercase tracking-wider">
            Recusar
          </span>
        </div>

        {/* Accept button */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleAccept}
            className="w-16 h-16 rounded-full bg-call-active flex items-center justify-center transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
            aria-label="Aceitar"
          >
            <Phone className="w-7 h-7 text-white" />
          </button>
          <span className="text-xs text-white uppercase tracking-wider">
            Aceitar
          </span>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallScreen;
