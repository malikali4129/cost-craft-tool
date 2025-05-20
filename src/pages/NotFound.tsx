
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  useEffect(() => {
    document.title = "Page Not Found - CostCraft";
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold text-[#0EA5E9] mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Page not found</p>
      <p className="text-gray-500 mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90">
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
