import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CallInterface from "@/components/CallInterface";
import TransitionScreen from "@/components/TransitionScreen";

const Experience1 = () => {
  const [phase, setPhase] = useState<"call" | "transition">("call");
  const navigate = useNavigate();

  const handleHangUp = () => {
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

  if (phase === "call") {
    return <CallInterface onHangUp={handleHangUp} />;
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
