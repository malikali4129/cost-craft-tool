
import { useState, useEffect } from "react";
import { useExpense, Category } from "@/context/ExpenseContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Edit, Trash, Plus } from "lucide-react";

const Categories = () => {
  const { categories, addCategory, updateCategory, deleteCategory, expenses } = useExpense();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#0EA5E9");

  useEffect(() => {
    document.title = "Categories - CostCraft";
  }, []);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a category name",
        variant: "destructive",
      });
      return;
    }

    addCategory({ name, color });
    toast({
      title: "Category added",
      description: "Your category has been added successfully",
    });
    setIsAddDialogOpen(false);
    setName("");
    setColor("#0EA5E9");
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return;
    
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a category name",
        variant: "destructive",
      });
      return;
    }

    updateCategory({ ...selectedCategory, name, color });
    toast({
      title: "Category updated",
      description: "Your category has been updated successfully",
    });
    setIsEditDialogOpen(false);
  };

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setName(category.name);
    setColor(category.color);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedCategory) return;
    
    // Check if category is being used
    const isUsed = expenses.some(expense => expense.category === selectedCategory.id);
    
    if (isUsed) {
      toast({
        title: "Cannot delete",
        description: "This category is being used by one or more expenses",
        variant: "destructive",
      });
    } else {
      deleteCategory(selectedCategory.id);
      toast({
        title: "Category deleted",
        description: "Your category has been deleted successfully",
      });
    }
    
    setIsDeleteDialogOpen(false);
  };

  const getCategoryUsageCount = (categoryId: string) => {
    return expenses.filter(expense => expense.category === categoryId).length;
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl pb-20 sm:pb-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div
                  className="w-4 h-4 rounded-full mr-3"
                  style={{ backgroundColor: category.color }}
                ></div>
                <div>
                  <h3 className="font-medium">{category.name}</h3>
                  <span className="text-xs text-gray-500">
                    {getCategoryUsageCount(category.id)} expenses
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(category)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(category)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                  disabled={getCategoryUsageCount(category.id) > 0}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Category Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Category name"
              />
            </div>
            <div>
              <Label htmlFor="color">Color</Label>
              <div className="flex items-center">
                <Input
                  id="color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-14 h-10 p-1"
                />
                <div className="ml-2 flex-1">
                  <Input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="#000000"
                  />
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full bg-[#0EA5E9] hover:bg-[#0EA5E9]/90">
              Add Category
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Category name"
              />
            </div>
            <div>
              <Label htmlFor="edit-color">Color</Label>
              <div className="flex items-center">
                <Input
                  id="edit-color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-14 h-10 p-1"
                />
                <div className="ml-2 flex-1">
                  <Input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="#000000"
                  />
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full bg-[#0EA5E9] hover:bg-[#0EA5E9]/90">
              Update Category
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this category. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Categories;
