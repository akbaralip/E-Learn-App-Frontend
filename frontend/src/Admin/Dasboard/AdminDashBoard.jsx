import React, { useEffect, useState } from 'react';
import { PiStudentBold, PiBooks, } from 'react-icons/pi'
import { FaUsers } from 'react-icons/fa'
import { MdPendingActions } from 'react-icons/md'
import AdminNav from '../AdminNav/AdminNav';
import { Link } from 'react-router-dom';
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import ChefFooter from '../../Chef/components/ChefFooter';


const AdminDashBoard = () => {
  const [totalChefs, setTotalChefs] = useState(0);
  const [totalusers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [recentTransactionsCount, setRecentTransactionsCount] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState([]);

  const fetchChefs = async () => {
    try {
      const response = await axiosInstance.get('/chefs_list');
      setTotalChefs(response.data.userlist.length);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/user_list');
      setTotalUsers(response.data.userlist.length);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchTotalRevenue = async () => {
    try {
      const response = await axiosInstance.get('/total_revenue');
      setTotalRevenue(response.data.totalRevenue);
    } catch (error) {
      console.error('Error fetching total revenue:', error);
    }
  }

  const fetchRecentTransactionsCount = async () => {
    try {
      const response = await axiosInstance.get('all_transactions/');
      console.log('response====>>', response.data)
      setRecentTransactions(response.data.transactions.slice(0, 3));
      setRecentTransactionsCount(response.data.transactions_count);
    } catch (error) {
      console.error('Error fetching recent transactions count:', error);
    }
  };

  useEffect(() => {
    fetchChefs();
    fetchUsers();
    fetchTotalRevenue();
    fetchRecentTransactionsCount();
  }, []);





  return (
    <>
      <AdminNav></AdminNav>

      <div className='bg-white mb-28'>
        <div>
          <div className='md:flex mt-2'>
            <div>

              <p className='text-4xl md:text-6xl md:ml-20 text-center md:text-left text-black md:mt-14 '>Monitor your <span className='text-green-400'>Business</span></p>
              <p className='md:ml-20 mt-2 md:text-left text-center text-sky-500 md:text-lg text-xs'>Control and analyze your data in the easiest way</p>
            </div>
            <div className='hidden md:flex h-[200px] mr-32 w-3/2 ml-auto'>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTKQu60-RA_MLhW9IAhGEm9wQXhzrZuFEVfFP2I86tU5YTs6xvKpbeTrC6zjCZZsr8E4E&usqp=CAU' alt="" className='ml-auto' />
            </div>
          </div>

          <div className='md:flex  md:px-24 px-7 gap-24 mt-6 '>

            <Link to="/studentsList" className='block md:inline-block h-64 w-full md:w-64 rounded-xl md:mt-0 mt-4 md:ml-0 ml-0 shadow-lg bg-gradient-to-r from-purple-900 to-purple-400'>
              <div className='flex p-6 w-full justify-between'>
                <p className='text-xl md:text-base text-white text-bold'>STUDENTS</p>
                <p><PiStudentBold /></p>
              </div>
              <div className='flex justify-center'>
                <img src='' alt="" className='h-[120px] ' />
              </div>
              <div>
                <p className='text-5xl ml-5 text-white'>{totalusers}</p>
              </div>
            </Link>

            <Link to="/chefslist" className='block md:inline-block h-64 w-full md:w-64 rounded-xl md:mt-0 mt-4 md:ml-0 ml-0 shadow-lg bg-gradient-to-r from-green-900 to-green-400'>
              <div className='flex p-6 w-full justify-between'>
                <p className='text-xl md:text-base text-white text-bold'>CHEFS</p>
                <p><FaUsers /></p>
              </div>
              <div className='flex justify-center'>
                <img src='' alt="" className='h-[120px] ' />
              </div>
              <div>
                <p className='text-5xl ml-5 text-white'>{totalChefs}</p>
              </div>
            </Link>

            <Link to="#" className='block md:inline-block h-64 w-full md:w-64 rounded-xl md:mt-0 mt-4 md:ml-0 ml-0 shadow-lg bg-gradient-to-r from-yellow-600 to-yellow-300'>
              <div className='flex p-6 w-full justify-between'>
                <p className='text-xl md:text-base text-white text-bold'>Total Revenue</p>
                <p><PiBooks /></p>
              </div>
              <div className='flex justify-center'>
                <img src='' alt="" className='h-[120px] ' />
              </div>
              <div>
                <p className='text-5xl ml-5 text-white'><span className='text-black'></span>{totalRevenue}</p>
              </div>
            </Link>
            <Link to="/all_transactions" className='block md:inline-block h-64 w-full md:w-64 rounded-xl md:mt-0 mt-4 md:ml-0 ml-0 shadow-lg bg-gradient-to-r from-orange-600 to-orange-400 '>
              <div className='flex p-6 w-full justify-between'>
                <p className='text-xl md:text-base text-white text-bold'>Transactions</p>
                <p><MdPendingActions /></p>
              </div>
              <div className='flex justify-center'>
                <img src='' alt="" className='h-[120px] ' />
              </div>
              <div>
                <p className='text-5xl ml-5 text-white'>{recentTransactionsCount}</p>
              </div>
            </Link>

          </div>
        </div>

        <div className="py-8 px-8 mt-4">
          <div className="border-4 flex justify-center flex-wrap h-auto w-full border-gray-200 rounded-lg">
            <h1 className="text-gray-400  text-xl mt-4">Recent Transactions</h1>
            <ul className="text-gray-700 list-none p-8 w-full">
              {recentTransactions.map((transaction, index) => (
                <li key={index} className="border-b border-gray-300 py-4">
                  <p className="text-lg font-semibold">ID: 00{transaction.id}</p>
                  <p className="text-sm">Transaction Date: {new Date(transaction.payment_date).toLocaleDateString()}</p>
                  <p className="text-sm">Amount: ₹{transaction.amount}</p>
                  <p className={`text-sm ${transaction.status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    Status: {transaction.status}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <ChefFooter></ChefFooter>
    </>
  )
};

export default AdminDashBoard;
