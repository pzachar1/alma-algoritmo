import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-redirect to Experience 1 after a brief moment
    const timer = setTimeout(() => {
      navigate("/experiencia-1");
    }, 100);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-pulse-soft">
        <div className="w-2 h-2 rounded-full bg-muted-foreground" />
      </div>
    </div>
  );
};

export default Index;
