import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/upload");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-white">
      <Card className="w-full max-w-2xl bg-gray-800">
        <CardHeader>
          <CardTitle className="text-4xl">Life Nodes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            Welcome to Life Nodes, a tool designed to help you organize and
            manage important life documents. Upload your documents and let our
            system extract key information for easy access and management.
          </p>
          <Button onClick={handleNavigate} className="mt-4">
            Go to Upload Tool
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;