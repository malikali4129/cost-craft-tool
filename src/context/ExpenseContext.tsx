
import React, { createContext, useContext, useState, useEffect } from "react";

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: string;
  date: string;
  notes?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

interface ExpenseContextType {
  expenses: Expense[];
  categories: Category[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  updateExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  addCategory: (category: Omit<Category, "id">) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  getTotalExpenses: () => number;
  getExpensesByCategory: () => Record<string, number>;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

const defaultCategories: Category[] = [
  { id: "1", name: "Food", color: "#0EA5E9" },
  { id: "2", name: "Transportation", color: "#F97316" },
  { id: "3", name: "Entertainment", color: "#8B5CF6" },
  { id: "4", name: "Housing", color: "#22C55E" },
  { id: "5", name: "Utilities", color: "#EF4444" },
  { id: "6", name: "Other", color: "#71717A" },
];

export const ExpenseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const savedCategories = localStorage.getItem("categories");
    return savedCategories ? JSON.parse(savedCategories) : defaultCategories;
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = {
      ...expense,
      id: crypto.randomUUID(),
    };
    setExpenses((prev) => [...prev, newExpense]);
  };

  const updateExpense = (expense: Expense) => {
    setExpenses((prev) =>
      prev.map((item) => (item.id === expense.id ? expense : item))
    );
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const addCategory = (category: Omit<Category, "id">) => {
    const newCategory = {
      ...category,
      id: crypto.randomUUID(),
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const updateCategory = (category: Category) => {
    setCategories((prev) =>
      prev.map((item) => (item.id === category.id ? category : item))
    );
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  const getTotalExpenses = () => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const getExpensesByCategory = () => {
    return expenses.reduce((acc, expense) => {
      const { category, amount } = expense;
      acc[category] = (acc[category] || 0) + amount;
      return acc;
    }, {} as Record<string, number>);
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        categories,
        addExpense,
        updateExpense,
        deleteExpense,
        addCategory,
        updateCategory,
        deleteCategory,
        getTotalExpenses,
        getExpensesByCategory,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("useExpense must be used within an ExpenseProvider");
  }
  return context;
};
