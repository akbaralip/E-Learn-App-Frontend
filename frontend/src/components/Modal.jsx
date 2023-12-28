import React, { useState } from "react";
import axiosInstance from "../AxiosInstance/AxiosIntercepter";
import toast, { Toaster } from 'react-hot-toast';


export default function Modal(props) {
    const [email, setEmail] = useState('')
    console.log('email', email)

    const forgetPassword = async () => {
        try {
            if (!email) {
                toast.error('Please enter your email');
                return; 
            }

            const response = await axiosInstance.post('api/forget_password/', {
                email: email,
            });

            if (response.status === 200) {
                toast.success(response.data.message, {
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#4caf50',
                        color: '#fff',
                    },
                });
                props.setShowModal(false);
            } else {
                toast.error(response.data.message, {
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });
            }
        } catch (error) {
            toast.error('enter a valid email')

        }
    };

    return (
        <>
            <Toaster></Toaster>
            <div className="modal bg-opacity-90 bg-black  fixed inset-0 flex items-center justify-center z-50"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-center p-5 border-b border-solid border-blueGray-200 rounded-t ">
                            <h3 className="text-2xl font-semibold">
                                Account Recovery
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => props.onClicksetShowModal(false)}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="mb-1 sm:mb-2 text-center">

                            <input
                                placeholder="Enter your registered Email"
                                required
                                type="email"
                                className="rounded-lg bg-white mt-2 p-2 focus-border-blue-500 focus:bg-gray-200 focus:outline-none text-black"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => props.setShowModal(false)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={forgetPassword}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    );

}