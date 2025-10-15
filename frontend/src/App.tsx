import React from 'react';
import { useState } from 'react';
import Overview from './components/Overview';
import Transactions from './components/Transactions';
import logo from './images/109590421.png';
import TopCategoriesPieChart from "./components/Categories";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


interface Category {
  name: string;
  total: number;
} 


const topCategoriesDefault = [
  { name: "Other", total: 67625.9 },
  { name: "Transport", total: 65419.17 },
  { name: "Food", total: 45000 },
  { name: "Entertainment", total: 30000 },
];


export default function App(){

 

  const fetchSummary = async () => {
    const res = await axios.get('/api/customers/cust_001/summary');
  
    const { topCategories } = res.data;
    setTopCategories(topCategories);
    return res.data;
  };

  const { data, isLoading } = useQuery(['summary'], fetchSummary, {staleTime: 60000});
  
  const [topCategories, setTopCategories] = useState<Category[]>(topCategoriesDefault);
  
  return (
    <div className="min-h-screen p-6">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12"><img src={logo} alt='Capitec'/></div>
          <h1 className="text-2xl font-bold">Capitec</h1> |
          <h1 className="text-2xl font-normal text-gray-600">Customer Spending Insights</h1>
        </div>
        <div className="text-sm text-gray-600">Customer: Wandile Chamane</div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 space-y-6">
          <Overview />
          <Transactions />
        </section>

        <aside className="space-y-6">
          <div className="card p-4">
            <h3 className="font-semibold mb-2">Spending Goals</h3>
            <p className="text-sm text-gray-600">Manage monthly budgets and receive alerts when near limit.</p>
            <br/>
            <button className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:text-gray dark:hover:bg-gray-700">Get Started</button>
          </div>
          <div className="card p-4">
            <h3 className="font-semibold mb-2">Top Categories</h3>
            <TopCategoriesPieChart topCategories={topCategories} />
          </div>
        </aside>
      </main>
    </div>
  )
}
