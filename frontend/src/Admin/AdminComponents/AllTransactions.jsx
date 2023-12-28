import React, { useEffect, useState } from 'react';
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import ChefFooter from '../../Chef/components/ChefFooter';
import AdminNav from '../AdminNav/AdminNav';

function AllTransactions() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axiosInstance.get('all_transactions/');
                console.log('response===>>', response.data);
                setTransactions(response.data.transactions || []);
            } catch (error) {
                console.error('Error fetching all transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    const adminFee = transactions.map((transaction) => parseFloat(transaction.amount) * 0.1);
    const totalAdminFee = adminFee.reduce((total, fee) => total + fee, 0);

    const totalAmount = transactions.reduce((total, transaction) => total + parseFloat(transaction.amount), 0);

    return (
        <>
            <AdminNav />
            <div className="p-8 mb-44">
                <h1 className="text-2xl font-bold mb-6">All Transactions</h1>
                {transactions.length === 0 ? (
                    <p className="text-gray-500">There are no transactions found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 shadow">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 border-b">ID</th>
                                    <th className="py-2 px-4 border-b">Transaction Date</th>
                                    <th className="py-2 px-4 border-b">Amount</th>
                                    <th className="py-2 px-4 border-b"> Admin 10%</th>
                                    <th className="py-2 px-4 border-b">Payer Name</th>
                                    <th className="py-2 px-4 border-b">Status</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction, index) => (
                                    <React.Fragment key={index}>
                                        <tr>
                                            <td className="py-2 px-4 border-b">{transaction.id}</td>
                                            <td className="py-2 px-4 border-b">
                                                {new Date(transaction.payment_date).toLocaleDateString()}
                                            </td>
                                            <td className="py-2 px-4 border-b">{transaction.amount}</td>
                                            <td className="py-2 px-4 border-b">{(parseFloat(transaction.amount) * 0.1).toFixed(2)}</td>

                                            <td className="py-2 px-4 border-b">{transaction.user.username}</td>
                                            <td
                                                className={`py-2 px-4 border-b ${
                                                    transaction.status === 'success'
                                                        ? 'text-green-500'
                                                        : 'text-red-500'
                                                }`}
                                            >
                                                {transaction.status}
                                            </td>
                                        </tr>
                                        
                                    </React.Fragment>
                                ))}
                                <tr>
                                    <td colSpan="2" className="py-2 px-4 border-b font-bold">
                                        Total Amount
                                    </td>
                                    <td className="py-2 px-4 border-b font-bold">{totalAmount.toFixed(2)}</td>
                                    <td colSpan="2" className="py-2 px-4 border-b font-bold">{totalAdminFee}</td>
                                
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <ChefFooter />
        </>
    );
}

export default AllTransactions;
