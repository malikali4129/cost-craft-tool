
import { useState } from "react";
import { useExpense } from "@/context/ExpenseContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";
import CategorySelect from "./CategorySelect";

interface ExpenseFormProps {
  onSuccess?: () => void;
  initialData?: {
    id?: string;
    title: string;
    amount: number;
    category: string;
    date: string;
    notes?: string;
  };
}

const ExpenseForm = ({ onSuccess, initialData }: ExpenseFormProps) => {
  const { addExpense, updateExpense } = useExpense();
  const { toast } = useToast();
  const isEditing = Boolean(initialData?.id);
  
  const [title, setTitle] = useState(initialData?.title || "");
  const [amount, setAmount] = useState(initialData?.amount?.toString() || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState(initialData?.notes || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !amount || !category || !date) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    const expenseData = {
      title,
      amount: parseFloat(amount),
      category,
      date,
      notes,
    };

    if (isEditing && initialData?.id) {
      updateExpense({
        id: initialData.id,
        ...expenseData,
      });
      toast({
        title: "Expense updated",
        description: "Your expense has been updated successfully",
      });
    } else {
      addExpense(expenseData);
      toast({
        title: "Expense added",
        description: "Your expense has been added successfully",
      });
      
      // Reset form after adding
      setTitle("");
      setAmount("");
      setCategory("");
      setDate(new Date().toISOString().split("T")[0]);
      setNotes("");
    }

    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Expense title"
          required
        />
      </div>

      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          required
        />
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <CategorySelect value={category} onChange={setCategory} />
      </div>

      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Additional notes (optional)"
        />
      </div>

      <Button type="submit" className="w-full bg-[#0EA5E9] hover:bg-[#0EA5E9]/90">
        {isEditing ? "Update Expense" : "Add Expense"}
      </Button>
    </form>
  );
};

export default ExpenseForm;
