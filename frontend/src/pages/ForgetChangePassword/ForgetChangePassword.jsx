import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from "@material-tailwind/react";


const ForgetChangePassword = () => {

    const queryParams = new URLSearchParams(location.search);
    const uidb64 = queryParams.get('uidb64');
    const navigate = useNavigate();
    const [pass1, setPass1] = useState('')
    const [pass2, setPass2] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const handleVerify = async () => {
        if (pass1 != pass2) {
            toast.error('Password didn\'t match');
            return;
        }
        if (!uidb64) {
            return;
        }

        try {
            setIsLoading(true);
            const response = await axiosInstance.post('api/reset-password/', {
                password: pass1,
                uidb64,
            });

            console.log('Response from the API:', response.data);
            navigate('/signin');
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <>
        <Toaster/>
        <section className="h-screen">
            <div className="container mx-auto md:px-6 py-24 md:max-w-[960px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="flex flex-col items-center mb-12 md:mb-0">
                        <h1 className='md:text-7xl text-6xl font-bold text-[#20B486] mb-2 md:mb-4'>Chef-Charisma.</h1>
                        <h4 className='text-sm'>Best Study Cooking Platform</h4>
                    </div>

                    <div className="md:w-4/5 mx-auto">
                        <h1 className='text-center md:text-5xl py-4 mb-3 '>Reset Your Password</h1>
                        {isLoading ? (
                            <div className="flex justify-center">
                                <Spinner />
                            </div>
                        ) : (
                            <form>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="mt-1 p-2 border rounded-md w-full"
                                    value={pass1}
                                    onChange={(e) => setPass1(e.target.value)}
                                />

                                <label htmlFor="confirmPassword" className="block mt-6 text-sm font-medium text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="mt-1 p-2 border rounded-md w-full"
                                    value={pass2}
                                    onChange={(e) => setPass2(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="mt-2 w-full rounded  bg-gradient-to-r from-green-400 to-yellow-300 px-7 py-2.5 text-sm font-medium uppercase text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-600 focus:outline-none focus:ring focus:border-blue-300"
                                    onClick={handleVerify}
                                >
                                    Reset password
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    </>)
}

export default ForgetChangePassword


