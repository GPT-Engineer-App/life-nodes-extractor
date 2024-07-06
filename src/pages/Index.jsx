import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/life-nodes");
  };

  return (
    <div className="text-center">
      <h1 className="text-3xl">Your Blank Canvas</h1>
      <p>Chat with the agent to start making edits.</p>
      <Button onClick={handleNavigate} className="mt-4">
        Go to Life Nodes
      </Button>
    </div>
  );
};

export default Index;