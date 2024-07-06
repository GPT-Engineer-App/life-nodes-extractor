import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Home } from "lucide-react";
import LifeNodes from "./pages/LifeNodes.jsx";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./layouts/default"; // available: default, navbar, sidebar
import HomePage from "./pages/Home.jsx";
import Upload from "./pages/Upload.jsx";
const queryClient = new QueryClient();

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Life Nodes",
    to: "/life-nodes",
    icon: <Home className="h-4 w-4" />, // Replace with appropriate icon
  },
  {
    title: "Upload", // Feel free to change this to your liking
    to: "/upload",
    icon: <Home className="h-4 w-4" />,
  },
];

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="life-nodes" element={<LifeNodes />} />
              <Route path="upload" element={<Upload />} />
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;