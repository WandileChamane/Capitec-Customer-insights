import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchTx = async (limit=20, offset=0) => {
  const res = await axios.get(`/api/customers/cust_001/transactions?limit=${limit}&offset=${offset}`);
  return res.data;
};

export default function Transactions(){
  const [page, setPage] = useState(0);
  const { data, isLoading } = useQuery(['tx', page], ()=> fetchTx(20, page*20));
  if (isLoading) return <div className="card p-4">Loading transactions...</div>;
  const { total, data: rows } = data;
  return (
    <div className="card p-4">
      <h2 className="text-lg font-semibold mb-3">Transactions</h2>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr><th>Date</th><th>Merchant</th><th>Category</th><th className="text-right">Amount</th></tr>
          </thead>
          <tbody>
            {rows.map((r:any)=>(
              <tr key={r.id} className="border-t">
                <td className="py-2">{new Date(r.date).toLocaleDateString()}</td>
                <td className="py-2">{r.merchant}</td>
                <td className="py-2">{r.category}</td>
                <td className="py-2 text-right font-medium">ZAR {r.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">Showing {rows.length} of {total}</div>
        <div className="space-x-2">
          <button onClick={()=> setPage(p=> Math.max(0,p-1))} className="px-3 py-1 rounded border">Prev</button>
          <button onClick={()=> setPage(p=> p+1)} className="px-3 py-1 rounded border">Next</button>
        </div>
      </div>
    </div>
  )
}
