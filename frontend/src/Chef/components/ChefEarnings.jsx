import React, { useEffect, useState } from 'react'
import axiosInstance from '../../AxiosInstance/AxiosIntercepter'
import ChefNavbar from './ChefNavbar';
import ChefFooter from './ChefFooter';


function ChefEarnings() {
  const [earnings, setEarnings] = useState([]);
  console.log('earnings==>>', earnings)

  const userId = localStorage.getItem('user_id')
  console.log('user id ===>>', userId)

  const fetchChefEarnings = async () => {
    try {
      const response = await axiosInstance.get(`chef_earnings/${userId}/`);
      setEarnings(response.data)
    } catch (error) {
      console.log('error', error);
    }
  }
  useEffect(() => {
    fetchChefEarnings();
  }, [userId])

  const totalAmount = earnings.reduce((acc, earning) => acc + (earning.amount - (earning.amount * 0.1)), 0);


  return (
    <>
      <ChefNavbar />
      <div className='py-8 relative overflow-x-auto p-14 px-6 mb-28 mt-6'>
        <h1 className="text-2xl font-bold mb-6">Purchsed deatails</h1>
        <table className="table-fixed border-collapse w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Course</th>
              <th className="border p-2">User</th>
              <th className="border p-2">After 10% Amount</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {earnings.map((earning) => (
              <tr key={earning.id} className="border">
                <td className="border p-2">{earning.course.title}</td>
                <td className="border p-2">{earning.user.username}</td>
                <td className="border p-2">₹{(earning.amount - (earning.amount * 0.1)).toFixed(2)}</td>
                <td className="border p-2">{new Date(earning.payment_date).toLocaleDateString()}</td>
              </tr>
            ))}
            <tr className="border">
              <td className="border p-2 font-bold">Total Amount</td>
              <td className="border p-2"></td>
              <td className="border p-2 font-bold">₹{totalAmount.toFixed(2)}</td>
              <td className="border p-2"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <ChefFooter />
    </>
  )
}

export default ChefEarnings
