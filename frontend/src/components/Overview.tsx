import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const fetchSummary = async () => {
  const res = await axios.get('/api/customers/cust_001/summary');
  return res.data;
};

export default function Overview(){
  const { data, isLoading } = useQuery(['summary'], fetchSummary, {staleTime: 60000});
  if (isLoading) return <div className="card p-4">Loading summary...</div>;
  const { total, avg, monthly, topCategories } = data;
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Overview</h2>
        <div className="text-right">
          <div className="text-sm text-gray-500">Total spent</div>
          <div className="text-2xl font-bold">ZAR {total.toLocaleString()}</div>
        </div>
      </div>

      <div style={{width:'100%', height:220}}>
        <ResponsiveContainer>
          <LineChart data={monthly}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#FF0044" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {topCategories.map((c:any)=>(
          <div key={c.name} className="p-2 border rounded text-sm">
            <div className="font-semibold">{c.name}</div>
            <div className="text-gray-600">ZAR {c.total.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
