import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import { Textarea } from "@material-tailwind/react";
import toast, { Toaster } from 'react-hot-toast';

function OtpVerification() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = () => {
    axiosInstance.post('api/verify-otp/', { otp })
      .then((response) => {
        if (response) {
          setIsVerified(true);
          toast.success('Great! Successfully verified OTP.');

          setTimeout(() => {
            navigate('/Signin');
          }, 2000);
          
        } else {
          setError('OTP verification failed');
        }
      })
      .catch((error) => {
        toast.error('An error occurred while verifying OTP');
      });
  };

  return (
    
    <div className="modal  bg-black  fixed inset-0 flex items-center justify-center z-50">
      <Toaster/>
      <div className="bg-gray-100 p-6 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">OTP Verification</h2>
        {isVerified ? (
          <div>
            <p className="text-green-500">OTP Verified! You can now access your account.</p>
          </div>
        ) : (
          <div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <p className="mb-4">Enter the OTP sent to your email or phone number:</p>
            <Textarea
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleVerifyOtp}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OtpVerification;
