import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Na from '../../components/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-modal";
import toast, { Toaster } from 'react-hot-toast';
Modal.setAppElement('#root');
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import { baseUrl } from '../../Redux/Store/baseUrl/BaseUrl';
import Lottie from 'lottie-react';
import loadinglottie from '../../components/Animations/Loading.json';
import { setUser, setUserImage } from '../../Redux/Reducer/Reducer';
import ChefNavbar from '../components/ChefNavbar';
import ChefFooter from '../components/ChefFooter';


function ChefProfile() {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({});
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProfilePic, setIsProfilePic] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    username: '',
    email: '',
    phone: '',

  });
  const userimage = useSelector((state) => state.auth.user_image)

  const username = useSelector((state) => state.auth.username)
  console.log(username)


  const dispatch = useDispatch();

  const fetchProfileData = async () => {

    try {

      const accessToken = localStorage.getItem('accessToken');
      const response = await axiosInstance.get(`/profile/?username=${username}`);
      console.log('hai its a usseeffect', response)
      console.log(response.data)
      setProfileData(response.data);
      setSelectedImage(response.data.image);
      setIsLoading(false);

    } catch {
      console.error("Error fetching profile:");
      setIsLoading(false);
    }
  }

  useEffect(() => {


    fetchProfileData();

  }, [isProfilePic]);

  useEffect(() => {
    setEditFormData({
      username: profileData.username,
      email: profileData.email,
      phone: profileData.phone,
    });
  }, [profileData]);

  const handlePenIconClick = () => {
    window.fileInput.click();
  };

  const handleFileInputChange = async (event) => {
    const selectedFile = event.target.files[0];

    const formData = new FormData();
    formData.append("file", selectedFile)
    formData.append("username", username)

    try {
      const response = await axiosInstance.post('upload_profile_pic/',
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

      if (response.status === 200) {
        dispatch(setUserImage({ user_image: response.data.user_image }));
        toast.success('Profile image upload successfully')
        setSelectedImage(URL.createObjectURL(selectedFile))
        setIsProfilePic(true);
        fetchProfileData();
      }

    } catch (error) {
      console.error("File upload error:", error);
    }
  };





  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
    if (name === 'username') {
      validateUsername(value);
    } else if (name === 'email') {
      validateEmail(value);
    } else if (name === 'phone') {
      validaePhone(value);
    }
  }

  const validateUsername = (value) => {
    if (/\d/.test(value)) {
      setUsernameError('Username should not contain numbers.')
    } else {
      setUsernameError('')
    }
  }
  const validateEmail = (value) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(value) || !value.includes('.com')) {
      setEmailError('Invalid Email !')
    } else {
      setEmailError('')
    }
  }
  const validaePhone = (value) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length !== 10) {
      setPhoneError('Contact should contain exactly ten digits.')
    } else {
      setPhoneError('')
    }
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (usernameError || emailError || phoneError) {
      toast.error('Please fix the validation errors before submitting.');
      return;
    }

    // try {
    const response = await axiosInstance.put(`/update_profile/${profileData.id}/`, editFormData,

      {
        headers: {
          "Content-Type": "application/json",
        },

        withCredentials: true,
      }
    );
    if (response.status == 200) {
      setProfileData(response.data)
      dispatch(setUser(response.data))
      closeEditModal();

    } else {
      toast.error(response.message);
    }
    
  };


  if (isLoading) {
    return (
      <div className="flex justify-center items-center  p-16 h-[500px]">
        <Lottie animationData={loadinglottie} className="w-1/6" />
      </div>
    );
  }



  return (
    <>
      <ChefNavbar />
      <div className="md:p-16 p-3 bg-gradient-to-r from-green-100 to-yellow-100">
        <div className="p-7 bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                {userimage ? (
                  <img
                    src={`${baseUrl}${userimage}`}
                    alt="Profile"
                    className="w-48 h-48 mx-auto rounded-full shadow-2xl object-cover"
                  />

                ) : (
                  <img
                    src='src/assets/img1.png'
                    alt="Profile"
                    className="w-48 h-48 mx-auto rounded-full shadow-2xl object-cover"
                  />


                )}
                <div className="bg-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="black"
                    className="h-9 w-6 absolute right-0 bottom-0  m-2 "
                    onClick={handlePenIconClick}
                    style={{ cursor: "pointer", transform: "rotate(0deg)" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  style={{ display: "none" }}
                  ref={(input) => input && (window.fileInput = input)}
                />

              </div>

            </div>

          </div>
          <div className=" md:flex  justify-between mt-32 md:mt-0 md:justify-center">
            <div className=" p-2  md:ml-2 mt-2 ">
              <button onClick={openEditModal}>
                <a className="px-5 py-2.5 relative rounded group overflow-hidden font-medium  bg-[#E9F8F3B2] text-black inline-block">
                  <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-[#88b420] group-hover:h-full opacity-90"></span>
                  <span className="relative group-hover:text-white">
                    EDIT PROFILE
                  </span>
                </a>

              </button>

            </div>

            <div className=" p-2  md:ml-2 mt-2 ">
              <button >
                <a className="px-5 py-2.5 relative rounded group overflow-hidden font-medium  bg-[#E9F8F3B2] text-black inline-block">
                  <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-[#88b420] group-hover:h-full opacity-90"></span>
                  <span className="relative group-hover:text-white">
                    BANK DETAILS
                  </span>
                </a>

              </button>

            </div>

          </div>
          <div className="mt-20 text-center pb-12">
            <div className=' flex justify-center mb-3'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="blue"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6 mt-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>
            </div>
            <div className=" flex justify-center">

              <h1 className="text-4xl font-medium text-gray-700">CHEF - {username} </h1>
            </div>
            <p className="font-light text-gray-600 mt-3">Email : {profileData.email}</p>
            <p className="font-light text-gray-600 mt-3">Contact : {profileData.phone}</p>
            <p className="font-light text-gray-600 mt-3">India</p>

          </div>

        </div>
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          className="modal bg-opacity-90 bg-black  fixed inset-0 flex items-center justify-center z-50"


        >
          <div className="modal-content bg-white w-96 md:w-[920px]  md:mt-11 p-4 rounded-lg shadow-lg ">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

              <h4
                onClick={closeEditModal}
                className="cursor-pointer font-bold text-red-500"
              >
                X
              </h4>

            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="editUsername"
                  className="block text-sm font-semibold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id='Edit Username'
                  name='username'
                  placeholder="Username"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  value={editFormData.username}
                  onChange={handleEditInputChange}
                />
                {usernameError && <p className='text-red-500'>{usernameError}</p>}

              </div>
              <div className="mb-4">
                <label
                  htmlFor="editEmail"
                  className="block text-sm font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="editEmail"
                  name="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  value={editFormData.email}
                  onChange={handleEditInputChange}
                />
                {emailError && <p className="text-red-500">{emailError}</p>}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="editContact"
                  className="block text-sm font-semibold mb-2"
                >
                  Contact
                </label>
                <input
                  type="text"
                  id="editContact"
                  name="phone"
                  placeholder="Phone number"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  value={editFormData.phone}
                  onChange={handleEditInputChange}
                />
                {phoneError && <p className="text-red-500">{phoneError}</p>}
              </div>

              <button
                type='submit'
                className="bg-gradient-to-r from-green-400 to-yellow-300 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out"
              >
                Save Changes
              </button>
            </form>
          </div>
        </Modal>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            className: '',
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },

            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
          }}
        />

      </div>
      <ChefFooter />
    </>
  )
}

export default ChefProfile
