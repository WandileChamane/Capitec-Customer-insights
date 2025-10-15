import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Example topCategories prop type
interface Category {
  name: string;
  total: number;
}

interface TopCategoriesPieChartProps {
  topCategories: Category[];
}

// Optional: define some colors for the slices
const COLORS = [
    "#E60012", // Capitec Red
    "#003B5C", // Capitec Blue
    "#00A9E0", // Capitec Light Blue
    "#A7A8AA", // Capitec Grey
    "#FF6F61", // Tomato
    "#6B5B95", // Nice Blue
  ];

const TopCategoriesPieChart: React.FC<TopCategoriesPieChartProps> = ({ topCategories }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={topCategories}
          dataKey="total"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          fill="#8884d8"
          label={(entry) => entry.name} // show category name on chart
        >
          {topCategories.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => value.toLocaleString()} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default TopCategoriesPieChart;
