
import { useState, useEffect } from "react";
import ExpenseList from "@/components/ExpenseList";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ExpenseForm from "@/components/ExpenseForm";
import { Plus } from "lucide-react";

const Expenses = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    document.title = "Expenses - CostCraft";
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-4xl pb-20 sm:pb-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Expenses</h1>
        <Button 
          onClick={() => setIsDialogOpen(true)}
          className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Expense
        </Button>
      </div>

      <ExpenseList />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
          </DialogHeader>
          <ExpenseForm onSuccess={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Expenses;
