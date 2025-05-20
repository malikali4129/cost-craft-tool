
import { Link } from "react-router-dom";
import { PieChart, Receipt, Tags, BarChart3 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const isMobile = useIsMobile();

  return (
    <nav className="bg-background shadow-sm border-b transition-colors duration-300 dark:border-gray-800 dark:bg-gray-900 dark:shadow-[0_0_15px_rgba(102,103,235,0.5)]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-[#0EA5E9] dark:text-[#0DF5E3] dark:animate-pulse dark:filter dark:drop-shadow-[0_0_10px_#0DF5E3]">
                AIM EXPENSE
              </span>
            </Link>
          </div>
          
          <div className="flex items-center">
            <ThemeToggle />
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-b-2 border-[#0EA5E9] dark:border-[#0DF5E3] text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-300 dark:hover:text-[#0DF5E3] dark:filter dark:hover:drop-shadow-[0_0_3px_#0DF5E3]"
              >
                <PieChart className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
              <Link
                to="/expenses"
                className="border-transparent border-b-2 hover:border-gray-300 dark:hover:border-[#F56EB3] text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-[#F56EB3] inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-300 dark:filter dark:hover:drop-shadow-[0_0_3px_#F56EB3]"
              >
                <Receipt className="mr-2 h-4 w-4" />
                Expenses
              </Link>
              <Link
                to="/categories"
                className="border-transparent border-b-2 hover:border-gray-300 dark:hover:border-[#A15EFF] text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-[#A15EFF] inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-300 dark:filter dark:hover:drop-shadow-[0_0_3px_#A15EFF]"
              >
                <Tags className="mr-2 h-4 w-4" />
                Categories
              </Link>
              <Link
                to="/reports"
                className="border-transparent border-b-2 hover:border-gray-300 dark:hover:border-[#5EE6FF] text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-[#5EE6FF] inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-300 dark:filter dark:hover:drop-shadow-[0_0_3px_#5EE6FF]"
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Reports
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {isMobile && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t shadow-lg transition-colors duration-300 dark:border-gray-800 dark:shadow-[0_0_10px_rgba(102,103,235,0.5)] z-50">
          <div className="flex justify-around">
            <Link to="/" className="flex flex-col items-center py-3 px-2 text-[#0EA5E9] dark:text-[#0DF5E3] transition-all duration-300 dark:filter dark:drop-shadow-[0_0_5px_#0DF5E3]">
              <PieChart className="h-5 w-5" />
              <span className="text-xs mt-1">Dashboard</span>
            </Link>
            <Link to="/expenses" className="flex flex-col items-center py-3 px-2 text-gray-500 dark:text-gray-400 hover:text-[#0EA5E9] dark:hover:text-[#F56EB3] transition-all duration-300 dark:hover:filter dark:hover:drop-shadow-[0_0_5px_#F56EB3]">
              <Receipt className="h-5 w-5" />
              <span className="text-xs mt-1">Expenses</span>
            </Link>
            <Link to="/categories" className="flex flex-col items-center py-3 px-2 text-gray-500 dark:text-gray-400 hover:text-[#0EA5E9] dark:hover:text-[#A15EFF] transition-all duration-300 dark:hover:filter dark:hover:drop-shadow-[0_0_5px_#A15EFF]">
              <Tags className="h-5 w-5" />
              <span className="text-xs mt-1">Categories</span>
            </Link>
            <Link to="/reports" className="flex flex-col items-center py-3 px-2 text-gray-500 dark:text-gray-400 hover:text-[#0EA5E9] dark:hover:text-[#5EE6FF] transition-all duration-300 dark:hover:filter dark:hover:drop-shadow-[0_0_5px_#5EE6FF]">
              <BarChart3 className="h-5 w-5" />
              <span className="text-xs mt-1">Reports</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
