import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IncomingCallScreen from "@/components/IncomingCallScreen";
import CallInterface from "@/components/CallInterface";
import TransitionScreen from "@/components/TransitionScreen";

const Experience1 = () => {
  const [phase, setPhase] = useState<"incoming" | "call" | "transition">("incoming");
  const navigate = useNavigate();

  const handleAccept = () => {
    setPhase("call");
  };

  const handleDecline = () => {
    setPhase("transition");
  };

  const handleHangUp = () => {
    setPhase("transition");
  };

  const handleNextExperience = () => {
    setPhase("transition");
  };

  const handleContinue = () => {
    navigate("/experiencia-2");
  };

  const transitionLines = [
    "Algo te manteve cansada.",
    "Agora você percebeu.",
    "Eles também."
  ];

  if (phase === "incoming") {
    return <IncomingCallScreen onAccept={handleAccept} onDecline={handleDecline} />;
  }

  if (phase === "call") {
    return <CallInterface onHangUp={handleHangUp} onNextExperience={handleNextExperience} />;
  }

  return (
    <TransitionScreen
      lines={transitionLines}
      buttonText="CONTINUAR"
      onContinue={handleContinue}
    />
  );
};

export default Experience1;
