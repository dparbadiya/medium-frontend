import axios from 'axios';
import  { useState, useEffect } from 'react';
import { BACKEND_URL } from '../config';
import { useVerifyToken } from '../hooks';

// interface DataItem {
//   id: string;
//   MGT_CODE: string;
//   ACCOUNT_NUMBER: number;
//   INVESTOR_TYPE: string;
//   ACCT_TYPE: string;
//   SPOUSAL: string;
//   FUND_CODE: string;
//   FUND_CODE_NUMBER: number;
//   FUND_NAME: string;
//   MARKET_VALUE: string;
//   DEALER_CODE: number;
//   BOOK_VALUE: string;
//   REP_CODE: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface ApiResponse {
//   data: DataItem[];
// }

// interface DataTableState {
//   data: DataItem[];
//   loading: boolean;
//   error: string | null;
// }


const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useVerifyToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/salesforce/bulk`,

          {
            headers: {
              Authorization: 'bearer ' + localStorage.getItem('token'),
            },
          }
        );

        console.log(response.data.data[0]);
        // Check if response.data.data is an array
        if (Array.isArray(response.data.data)) {
          setData(response.data.data);
        } else {
          setError('Unexpected data format');
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  interface IVRA {
    id: number;
    MGT_CODE: string;
    ACCOUNT_NUMBER: string;
    INVESTOR_TYPE: string;
    ACCT_TYPE: string;
    SPOUSAL: string;
    FUND_CODE: string;
    FUND_NAME: string;
    MARKET_VALUE: string;
    DEALER_CODE: string;
    BOOK_VALUE: string;
    REP_CODE: string;
    createdAt: string;
    updatedAt: string;
  }
  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">MGT Code</th>
            <th className="py-3 px-6 text-left">Account Number</th>
            <th className="py-3 px-6 text-left">Investor Type</th>
            <th className="py-3 px-6 text-left">Acct Type</th>
            <th className="py-3 px-6 text-left">Spousal</th>
            <th className="py-3 px-6 text-left">Fund Code</th>
            <th className="py-3 px-6 text-left">Fund Name</th>
            <th className="py-3 px-6 text-left">Market Value</th>
            <th className="py-3 px-6 text-left">Dealer Code</th>
            <th className="py-3 px-6 text-left">Book Value</th>
            <th className="py-3 px-6 text-left">Rep Code</th>
            <th className="py-3 px-6 text-left">Created At</th>
            <th className="py-3 px-6 text-left">Updated At</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.map((item:IVRA) => (
            <tr
              key={item.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {item.id}
              </td>
              <td className="py-3 px-6 text-left">{item.MGT_CODE}</td>
              <td className="py-3 px-6 text-left">{item.ACCOUNT_NUMBER}</td>
              <td className="py-3 px-6 text-left">{item.INVESTOR_TYPE}</td>
              <td className="py-3 px-6 text-left">{item.ACCT_TYPE}</td>
              <td className="py-3 px-6 text-left">{item.SPOUSAL}</td>
              <td className="py-3 px-6 text-left">{item.FUND_CODE}</td>
              <td className="py-3 px-6 text-left">{item.FUND_NAME}</td>
              <td className="py-3 px-6 text-left">{item.MARKET_VALUE}</td>
              <td className="py-3 px-6 text-left">{item.DEALER_CODE}</td>
              <td className="py-3 px-6 text-left">{item.BOOK_VALUE}</td>
              <td className="py-3 px-6 text-left">{item.REP_CODE}</td>
              <td className="py-3 px-6 text-left">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-6 text-left">
                {new Date(item.updatedAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
