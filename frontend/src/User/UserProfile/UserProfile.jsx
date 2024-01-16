import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-modal";
import toast, { Toaster } from 'react-hot-toast';
Modal.setAppElement('#root');
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import { baseUrl } from '../../Redux/Store/baseUrl/BaseUrl';
import Lottie from 'lottie-react';
import loadinglottie from '../../components/Animations/Loading.json';
import { setUser, setUserImage } from '../../Redux/Reducer/Reducer';
import { Link } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import 'primeicons/primeicons.css';
import Navbar from '../../components/Navbar';

function UserProfile() {
    const [isLoading, setIsLoading] = useState(true);
    const [profileData, setProfileData] = useState({});
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isProfilePic, setIsProfilePic] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);
    const [isLoadingImage, setIsLoadingImage] = useState(false);
    const [editFormData, setEditFormData] = useState({
        username: '',
        email: '',
        phone: '',

    });
    const [changePassFormData, setChangePassFormData] = useState({
        password: '',
        newPassword: '',
        confirmPassword: '',

    });

    const username = useSelector((state) => state.auth.username)
    const userimage = useSelector((state) => state.auth.user_image)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const dispatch = useDispatch();

    const fetchProfileData = async () => {

        try {

            const accessToken = localStorage.getItem('accessToken');
            const response = await axiosInstance.get(`/profile/?username=${username}`);

            setProfileData(response.data);
            setSelectedImage(response.data.image);
            setIsLoading(false);

        } catch {
            console.error("Error fetching profile:");
            setIsLoading(false);
        }
    }


    const [subscribed, setSubscribed] = useState(false)

    const fethUserLearning = async () => {
        try {
            const response = await axiosInstance.get(`check_user_subscribed/${username}/`)
            setSubscribed(response.data.message === 'True')
        } catch (error) {
            console.error("Error fetching user subscription:", error)
        }
    }


    useEffect(() => {

        fetchProfileData();
        fethUserLearning();

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
            setIsLoadingImage(true)
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
                fetchProfileData();
                setSelectedImage(URL.createObjectURL(selectedFile))
                setIsProfilePic(true);
            }

        } catch {
            console.error("File upload error:", error);
        } finally {
            setIsLoadingImage(false);
        }
    };




    const openChangePassModal = () => {
        setIsChangePassModalOpen(true)
    }

    const handelChangePassword = (e) => {
        setChangePassFormData({
            ...changePassFormData,
            [e.target.name]: e.target.value,
        });
    }

    const handleChangePassSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const { newPassword, confirmPassword } = changePassFormData;
            if (newPassword === confirmPassword) {
                try {
                    const response = await axiosInstance.put(`/change_password/${profileData.id}/`, {

                        password: changePassFormData.password,
                        new_password: changePassFormData.newPassword,

                    });

                    if (response.status === 200) {
                        toast.success("Password changed successfully!");
                        closeEditModal();
                    } else {
                        toast.error("Failed to change password. Please try again.");
                    }
                } catch (error) {
                    toast.error("Error changing password. Please try again.");
                    console.error("Change Password Error:", error);
                }
            } else {
                toast.error('Passwords do not match');
            }
        }
    };


    const validateForm = () => {
        let isValid = true;

        if (!changePassFormData.password) {
            setPasswordError('Please enter your previous password.');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (!changePassFormData.newPassword) {
            setNewPasswordError('Please enter a new password.');
            isValid = false;
          } else if (changePassFormData.newPassword.length < 6) {
            setNewPasswordError('New password must be at least 5 characters long.');
            isValid = false;
          } else if (/\s/.test(changePassFormData.newPassword)) {
            setNewPasswordError('New password cannot contain spaces.');
            isValid = false;
          } else {
            setNewPasswordError('');
          }

        if (!changePassFormData.confirmPassword) {
            setConfirmPasswordError('Please enter a confirm password.');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        return isValid;
    };



    const openEditModal = () => {
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setIsChangePassModalOpen(false);
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


    if (isLoading || isLoadingImage) {
        return (
            <div className="flex justify-center items-center  p-16 h-[500px]">
                <Lottie animationData={loadinglottie} className="w-1/6" />
            </div>
        );
    }



    return (
        <>
            <Navbar></Navbar>
            <div className="md:p-16 p-3 bg-gradient-to-r from-green-100 to-yellow-100 ">
                <div className='flex justify-end'>

                    <Button onClick={openChangePassModal}>Change Password</Button>
                </div>
                <div className="p-7 bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] mt-24 rounded">

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
                                        src='https://cdn4.iconfinder.com/data/icons/seo-web-blue-1/100/seo__web_blue_1_46-1024.png'
                                        alt="Profile"
                                        className="w-48 h-48 mx-auto rounded-full shadow-2xl object-cover"
                                        onClick={handlePenIconClick}
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
                    <div className=" md:flex   justify-between mt-32 md:mt-0 md:justify-center">
                        <div className=" p-2  md:ml-2 mt-2 space-x-2">
                            <button onClick={openEditModal}>
                                <a className="px-5 py-2.5 relative rounded group overflow-hidden font-medium  bg-[#E9F8F3B2] text-black inline-block">
                                    <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-[#88b420] group-hover:h-full opacity-90"></span>
                                    <span className="relative group-hover:text-white">
                                        Edit Profile
                                    </span>
                                </a>

                            </button>
                            <Link to={'/mylearnings'}>
                                {subscribed && (
                                    <button >
                                        <a className="px-5 py-2.5 relative rounded group overflow-hidden font-medium  bg-[#E9F8F3B2] text-black inline-block">
                                            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-[#88b420] group-hover:h-full opacity-90"></span>
                                            <span className="relative group-hover:text-white">
                                                My Learnings
                                            </span>
                                        </a>

                                    </button>
                                )}
                            </Link>
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
                            <h1 className="text-4xl font-medium text-gray-700">  {username} </h1>

                        </div>
                        <p className="font-light text-gray-600 mt-3">Email : {profileData.email}</p>
                        <p className="font-light text-gray-600 mt-3">Contact : {profileData.phone}</p>
                        <p className="font-light text-gray-600 mt-3">India</p>

                    </div>

                </div>
                <Modal
                    isOpen={isChangePassModalOpen}
                    className="modal  justify-center bg-opacity-90 bg-black  fixed inset-0 flex items-center  z-50"
                >

                    <div >
                        <form onSubmit={handleChangePassSubmit} >
                            <div className="mb-4">
                                <input
                                    type="password"
                                    id='password'
                                    name='password'
                                    placeholder="Previous Passowrd"
                                    className=" px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    onChange={handelChangePassword}
                                />
                                {passwordError && <p className='text-red-500'>{passwordError}</p>}
                            </div>
                            <div className="mb-4">
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="newPassword"
                                        name="newPassword"
                                        placeholder="New Password"
                                        className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                        onChange={handelChangePassword}
                                    />
                                    <span
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <i className="pi pi-eye"></i>
                                        ) : (
                                            <i className="pi pi-eye-slash"></i>
                                        )}
                                    </span>
                                </div>
                                {newPasswordError && <p className="text-red-500">{newPasswordError}</p>}
                            </div>
                            <div className="mb-4">

                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    className="px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                    onChange={handelChangePassword}
                                />
                                {confirmPasswordError && <p className="text-red-500">{confirmPasswordError}</p>}
                            </div>


                            <button
                                type='submit'
                                className="bg-gradient-to-r from-green-400 to-yellow-300 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out "
                            >
                                Change Password
                            </button>
                        </form>
                        <div className='flex mt-5'>
                            <button onClick={closeEditModal} className='text-bold text-yellow-300  ' ><i className="pi pi-times" style={{ fontSize: '1.5rem' }}>
                            </i></button>
                        </div>

                    </div>


                </Modal>

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
            <Footer></Footer>
        </>
    )
}

export default UserProfile
