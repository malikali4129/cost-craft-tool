
import { Link } from "react-router-dom";
import { PieChart, Receipt, Tags, BarChart3 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const isMobile = useIsMobile();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-[#0EA5E9]">CostCraft</span>
            </Link>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link
              to="/"
              className="border-b-2 border-[#0EA5E9] text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              <PieChart className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
            <Link
              to="/expenses"
              className="border-transparent border-b-2 hover:border-gray-300 text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              <Receipt className="mr-2 h-4 w-4" />
              Expenses
            </Link>
            <Link
              to="/categories"
              className="border-transparent border-b-2 hover:border-gray-300 text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              <Tags className="mr-2 h-4 w-4" />
              Categories
            </Link>
            <Link
              to="/reports"
              className="border-transparent border-b-2 hover:border-gray-300 text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium"
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Reports
            </Link>
          </div>
        </div>
      </div>
      
      {isMobile && (
        <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
          <div className="flex justify-around">
            <Link to="/" className="flex flex-col items-center py-3 px-2 text-[#0EA5E9]">
              <PieChart className="h-5 w-5" />
              <span className="text-xs mt-1">Dashboard</span>
            </Link>
            <Link to="/expenses" className="flex flex-col items-center py-3 px-2 text-gray-500">
              <Receipt className="h-5 w-5" />
              <span className="text-xs mt-1">Expenses</span>
            </Link>
            <Link to="/categories" className="flex flex-col items-center py-3 px-2 text-gray-500">
              <Tags className="h-5 w-5" />
              <span className="text-xs mt-1">Categories</span>
            </Link>
            <Link to="/reports" className="flex flex-col items-center py-3 px-2 text-gray-500">
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
