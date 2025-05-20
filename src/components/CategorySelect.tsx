
import { useExpense, Category } from "@/context/ExpenseContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const CategorySelect = ({ value, onChange }: CategorySelectProps) => {
  const { categories } = useExpense();

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category: Category) => (
          <SelectItem key={category.id} value={category.id} className="flex items-center">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: category.color }}
              />
              {category.name}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
