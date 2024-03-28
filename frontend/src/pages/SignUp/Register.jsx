import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import OtpVerification from '../Otp_Verification/OtpVerification';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import registerPic from "../../assets/login_pic.jpg"
import { Oval } from 'react-loader-spinner'


function Register() {
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passError, setPassError] = useState('');
  const [Error, setError] = useState('')
  const [otpSend, setOtpSend] = useState(false);
  const [isChef, setIsChef] = useState(false);
  const [loading, setLoading] = useState(false)

  const [editFormData, setEditFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });

    if (name === 'username') {
      validateUsername(value);
    } else if (name === 'email') {
      validateEmail(value);
    } else if (name === 'phone') {
      validatePhone(value);
    } else if (name === 'password') {
      validatePassword(value);
    }
  };

  const validateUsername = (value) => {
    if (/\d/.test(value)) {
      setUsernameError('Username should not contain numbers.');
    }
    else if (/\s/.test(value)) {
      setUsernameError('Username should not contain spaces.');
    } else {
      setUsernameError('');
    }
  };

  const validateEmail = (value) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailRegex.test(value) || !value.includes('.com')) {
      setEmailError('Invalid Email!');
    } else {
      setEmailError('');
    }
  };

  const validatePhone = (value) => {
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length !== 10) {
      setPhoneError('Contact should contain exactly ten digits.');
    } else {
      setPhoneError('');
    }
  };

  const validatePassword = (value) => {
    if (value.length < 6) {
      setPassError('Should contain more than 5 characters.');
    } else if (/\s/.test(value)) {
      setPassError('Should not contain spaces.');
    } else {
      setPassError('');
    }
  };


  const submit = async (e) => {
    e.preventDefault();

    for (const key in editFormData) {
      if (!editFormData[key]) {
        return toast.error('Please fill out all fields');
      }
    }
    if (usernameError || emailError || phoneError || passError) {
      return toast.error('Please fix validation errors before submitting.');
    }

    try {
      const userData = {
        username: editFormData.username,
        email: editFormData.email,
        password: editFormData.password,
        phone: editFormData.phone,
        is_chef: isChef,
      };

      setLoading(true)
      const response = await axiosInstance.post('api/register/', userData);
      if (response.status === 200) {
        setOtpSend(true);
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setError(error.response.data.message);
      } else {
        toast.error('An error occurred during registration.');
      }
    } finally {
      setLoading(false)
    }

  };



  return (
    <>
      <Navbar />
      <div className="relative ">
        <Toaster />
        {otpSend ? (
          <OtpVerification />
        ) : (
          <>
            <img
              src={registerPic}
              className="absolute inset-0 object-cover w-full h-full"
              alt=""
            />
            <div className="relative bg-opacity-75 bg-deep-purple-accent-700">

              <svg
                className="absolute inset-x-0 bottom-0 text-white"
                viewBox="0 -10 1160 163"
              >
                <path
                  fill="currentColor"
                  d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
                />
              </svg>

              <div className="relative px-4 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="flex flex-col items-center justify-between xl:flex-row">
                  <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                    <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                      The Best, Study for <br className="hidden md:block" />
                      jumps over a bright future
                    </h2>
                    <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                      You can now register your chef charisma into your account.
                      Sign up, add your course to your collection and enjoy the full chef charisma Experience.
                    </p>
                    <a
                      href="/"
                      aria-label=""
                      className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-accent-400 hover:text-teal-accent-700"
                    >

                      <svg
                        className="inline-block w-3 ml-2"
                        fill="currentColor"
                        viewBox="0 -10 12 12"
                      >
                        <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                      </svg>
                    </a>
                  </div>
                  <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                    <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                      <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                        Sign up
                      </h3>
                      <p className="text-red-500">{Error}</p>
                      <br />
                      <form onSubmit={submit}>
                        <div className="mb-1 sm:mb-2">
                          <label
                            htmlFor="Username"
                            className="inline-block mb-1 font-medium"
                          >
                            Username
                          </label>
                          <input
                            placeholder="Jony"
                            required
                            type="text"
                            name="username"
                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                            value={editFormData.username}
                            onChange={handleEditInputChange}
                          />

                          {usernameError && (
                            <p className="text-red-500">{usernameError}</p>
                          )}
                        </div>
                        <div className="mb-1 sm:mb-2">
                          <label
                            className="inline-block mb-1 font-medium"
                          >
                            Email
                          </label>
                          <input
                            placeholder="Doe@gmail.com"
                            required
                            type="email"
                            name="email"
                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                            value={editFormData.email}
                            onChange={handleEditInputChange}
                          />
                          {emailError && (
                            <p className="text-red-500">{emailError}</p>
                          )}
                        </div>
                        <div className="mb-1 sm:mb-2">
                          <label
                            className="inline-block mb-1 font-medium"
                          >
                            Phone
                          </label>
                          <input
                            placeholder="994533XXXX"
                            required
                            type="tel"
                            name="phone"
                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                            value={editFormData.phone}
                            onChange={handleEditInputChange}
                          />
                          {phoneError && (
                            <p className="text-red-500">{phoneError}</p>
                          )}
                        </div>
                        <div className="mb-1 sm:mb-2">
                          <label
                            className="inline-block mb-1 font-medium"
                          >
                            Password
                          </label>
                          <input
                            placeholder="Make it strong pass"
                            type="password"
                            required
                            name="password"
                            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                            value={editFormData.password}
                            onChange={handleEditInputChange}
                          />
                          {passError && (
                            <p className="text-red-500">{passError}</p>
                          )}
                        </div>
                        <div className="flex flex-col text-white py-2">
                          <label className="text-black">Are you a chef ?</label>
                          <input
                            type="checkbox"
                            checked={isChef}
                            onChange={() => setIsChef(!isChef)}
                          />
                        </div>
                        <div className="mt-4 mb-2 sm:mb-4">
                          <button
                            type="submit"
                            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none bg-gradient-to-r from-green-400 to-yellow-300"
                          >
                            {loading ? (
                              <Oval
                                visible={true}
                                height="30"
                                width="80"
                                color="#f5f5f5"
                                ariaLabel="oval-loading"
                                wrapperStyle={{ display: 'inline-block', marginRight: '10px' }}
                              />
                            ) : (
                              'Sign up'
                            )}

                          </button>
                        </div>
                        <p className="text-xs text-gray-600 sm:text-sm">
                          We respect your privacy. Unsubscribe at any time.
                        </p>
                        <div className="account-bottom text-center">
                          <span className="block text-gray-600">
                            Are you a member ?{' '}
                            <Link to="/Signin" className="text-blue-500">
                              Login
                            </Link>
                          </span>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Register;
