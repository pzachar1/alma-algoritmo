import { useState, useEffect, useRef } from "react";
import soundFile from "../../assets/1217.mp3"; // Caminho do arquivo de áudio
import { Phone, User, Mic, Grid3X3, Volume2, Plus, Video, UserRound } from "lucide-react";

interface CallInterfaceProps {
  onHangUp: () => void;
  onNextExperience: () => void; // Adicionei um evento para a próxima experiência
}

const CallInterface = ({ onHangUp, onNextExperience }: CallInterfaceProps) => {
  const [seconds, setSeconds] = useState(0);
  const [isEnding, setIsEnding] = useState(false);
  const [isCallEnded, setIsCallEnded] = useState(false); // Novo estado para controlar o término da chamada
  const audioRef = useRef(new Audio(soundFile)); // Referência ao áudio

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

  // Iniciar a reprodução do áudio ao atender a chamada
  useEffect(() => {
    const audio = audioRef.current;

    // Play o áudio assim que o componente montar
    audio.play();

    // Evento para capturar o término do áudio
    audio.addEventListener("ended", () => {
      // Após o fim do áudio, exibe a tela de desligamento
      setIsCallEnded(true);

      // Mostra a experiência seguinte após 2 segundos
      setTimeout(() => {
        onNextExperience(); // Chamar a próxima experiência
      }, 2000);
    });
    
    return () => {
      audio.pause();
      audio.removeEventListener("ended", () => {});
    };
  }, [onNextExperience]);

  const handleHangUp = () => {
    setIsEnding(true);
    setTimeout(() => {
      onHangUp(); // Desliga a ligação
    }, 800);
  };

  const actionButtons = [
    { icon: Mic, label: "mudo" },
    { icon: Grid3X3, label: "teclado" },
    { icon: Volume2, label: "alto-falante" },
    { icon: Plus, label: "adicionar" },
    { icon: Video, label: "FaceTime" },
    { icon: UserRound, label: "contatos" },
  ];

  return (
    <div 
      className={`min-h-screen bg-black flex flex-col items-center justify-between py-12 px-6 transition-opacity duration-700 ${
        isEnding ? "opacity-0" : "opacity-100"
      }`}
    >
      {isCallEnded ? (
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-2xl font-light text-white tracking-tight">
            Chamada Encerrada
          </h1>
        </div>
      ) : (
        <>
          {/* Top section - Caller info */}
          <div className="flex flex-col items-center gap-1 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-gradient-to-b from-zinc-600 to-zinc-800 flex items-center justify-center mb-3">
              <User className="w-12 h-12 text-zinc-400" />
            </div>
            <h1 className="text-2xl font-light text-white tracking-tight">Número Restrito</h1>
            <p className="text-sm text-zinc-400">mobile</p>
            <span className="text-base text-zinc-400 font-light tracking-tight mt-1">
              {formatTime(seconds)}
            </span>
          </div>

          {/* Middle section - Action buttons grid */}
          <div className="grid grid-cols-3 gap-x-12 gap-y-6 animate-fade-in animation-delay-300">
            {actionButtons.map((button, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <div
                  className="w-16 h-16 rounded-full bg-zinc-800/80 flex items-center justify-center"
                >
                  <button.icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs text-white">{button.label}</span>
              </div>
            ))}
          </div>

          {/* Bottom section - Hang up button */}
          <div className="flex flex-col items-center gap-2 animate-fade-in animation-delay-600">
            <button
              onClick={handleHangUp}
              disabled={isEnding}
              className="w-16 h-16 rounded-full bg-call-end flex items-center justify-center transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95 disabled:opacity-50"
              aria-label="Desligar"
            >
              <Phone className="w-7 h-7 text-white rotate-[135deg]" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CallInterface;