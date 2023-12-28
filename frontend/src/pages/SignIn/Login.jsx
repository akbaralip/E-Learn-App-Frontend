
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUser, setUserImage, setUserRole } from '../../Redux/Reducer/Reducer';
import toast, { Toaster } from 'react-hot-toast';
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import Modal from '../../components/Modal';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';


function Login() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error('Please enter username and password.');
      return;
    }

    try {
      const response = await axiosInstance.post('api/token/', {
        username,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('role', data.role);
        localStorage.setItem('user_id', data.user_id);


        dispatch(setUser({ username: response.data.username }));
        dispatch(setUserRole({ role: response.data.role }));
        dispatch(setUserImage({ user_image: response.data.image_url }));

        navigate('/');
      }
    } catch (error) {
      toast.error('Invalid user !')
    }
  };

  return (
    <>
      <Navbar />
      {showModal ? (<Modal setShowModal={setShowModal} />) : null}
      <div className="relative ">
        <Toaster />
        <img
          src="src/assets/register_pic.jpg"
          className="absolute inset-0 object-cover w-full h-full"
          alt=""
        />

        <div className="relative bg-opacity-75 bg-deep-purple-accent-700 ">
          <svg
            className="absolute inset-x-0 bottom-0  text-white"
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
                  The quick, brown fox <br className="hidden md:block" />
                  jumps over a lazy dog
                </h2>
                <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudan, totam rem aperiam, eaque ipsa
                  quae.
                </p>
                <a
                  href="/"
                  aria-label=""
                  className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-accent-400 hover:text-teal-accent-700"
                >
                  Learn more
                  <svg
                    className="inline-block w-3 ml-2"
                    fill="currentColor"
                    viewBox="0 -10 12 12"
                  >
                    <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                  </svg>
                </a>
              </div>
              <div className="w-full max-w-xl xl:px-8 xl:w-5/12 opacity-80">
                <div className="bg-white rounded shadow-2xl p-7 sm:p-10">
                  <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
                    Sign in
                  </h3>
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
                        // required
                        type="text"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        onChange={(e) => setUserName(e.target.value)}
                      />

                    </div>

                    <div className="mb-1 sm:mb-2">
                      <label
                        className="inline-block mb-1 font-medium"
                      >
                        Password
                      </label>
                      <input
                        placeholder="Enter your Pass"
                        // required
                        type="password"
                        className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
                        onChange={(e) => setPassword(e.target.value)}
                      />

                    </div>


                    <div className="mt-4 mb-2 sm:mb-4">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none bg-gradient-to-r from-green-400 to-yellow-400"
                      >
                        Sign in
                      </button>
                      {error && (
                        <div className="text-red-600 text-center">
                          {error}
                        </div>
                      )}
                    </div>

                    <div className="account-bottom text-center">
                      <span className="block text-gray-600">
                        If you dont have an a account ? <Link to="/Signup" className="text-blue-500">SignUp</Link>
                      </span>
                      <span onClick={() => setShowModal(true)} className="block text-gray-600">
                        Forget password ? <Link to="/Signin" className="text-blue-500">SetUp</Link>
                      </span>

                    </div>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Login
