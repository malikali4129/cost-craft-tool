
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="relative overflow-hidden group w-10 h-10 rounded-full"
    >
      <div className="absolute inset-0 dark:bg-gradient-to-r dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 dark:opacity-20 transition-all duration-300 group-hover:opacity-40"></div>
      <div className="relative z-10">
        {theme === "light" ? (
          <Sun className="h-5 w-5 text-orange-500 transition-transform duration-300 hover:rotate-45" />
        ) : (
          <Moon className="h-5 w-5 text-blue-400 transition-transform duration-300 hover:-rotate-45" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
