import React, { useEffect, useState } from 'react';
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import AdminNav from '../AdminNav/AdminNav';
import toast, { Toaster } from 'react-hot-toast';


function StudentsList() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get('/user_list');
      setUsers(response.data.userlist);
      console.log(response.data);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]); 

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleBlockUser = async (userId) => {
    setLoading(true);
    try {
      // setIsLoading(true)
      await axiosInstance.put(`block_user/${userId}/`);

      fetchUsers();

    } catch (error) {
      console.error('Error blocking user:', error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleUnblockUser = async (userId) => {
    // setLoading(true);
    try {
      await axiosInstance.put(`/unblock_user/${userId}/`);
      fetchUsers();
    } catch (error) {
      console.error('Error unblocking user:', error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      }
    }
  };



  return (
    <div>
      <Toaster />
      <AdminNav></AdminNav>
      <div className="relative overflow-x-auto p-14 bg-gray-200">
        <h1 className="text-2xl font-bold mb-6">All Students Details</h1>
        <table className="w-full text-sm text-left bg-white text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-white">
            <tr>
              <th scope="col" className="px-6 py-5">
                Username
              </th>
              <th scope="col" className="px-6 py-5">
                email
              </th>
              <th scope="col" className="px-6 py-5">
                contact
              </th>
              <th scope="col" className="px-8 py-5">
                status
              </th>
              <th scope="col" className="px-8 py-5">
                Buttons
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, index) => (
              <tr key={index} className="bg-white dark:bg-gray-800">
                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-black">
                  {user.username}
                </th>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4">{user.is_active ? 'Active' : 'Inactive'}</td>
                <td className="px-6 py-4">
                  {user.is_active ? (
                    <button
                      onClick={() => handleBlockUser(user.id)}
                      className={`px-4 py-2 mx-1 font-medium text-white bg-red-500 rounded-md ${loading}`}
                      disabled={loading}

                    >
                      {/* {loading ? "Loading..." : "Block"} */} Block

                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnblockUser(user.id)}
                      className={`px-4 py-2 mx-1 font-medium text-white bg-green-500 rounded-md ${loading}`}
                      disabled={loading}
                    >
                      {/* {loading ? "Loading..." : "Unblock"} */} Unblock
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 mx-1 font-medium text-gray-800 bg-gray-200 rounded-md ${currentPage === i + 1 ? 'bg-gray-400' : ''
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentsList;
