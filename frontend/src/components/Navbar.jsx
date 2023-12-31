import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { Dropdown } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../Redux/Reducer/Reducer';
import { Toaster } from 'react-hot-toast';
import { Avatar } from "@material-tailwind/react";
import { baseUrl } from "../Redux/Store/baseUrl/BaseUrl";
import { IconButton } from "@material-tailwind/react";
// import iconPng from "../assets/Icon.png"


function Navbar() {
  const token = localStorage.getItem('access_token')
  const role = localStorage.getItem('role')

  const user = useSelector(state => state.auth.username)
  const user_image = useSelector((state) => state.auth.user_image)



  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('role');

    dispatch(remove());

    navigate('/signin');
  };

  const handleProfileClick = () => {
    role === 'chef' ? navigate('/chef_profile') : role === 'user' ? navigate('/user_profile') : navigate('admin_dashboard');
  };

  return (

    <div>
      <Toaster />
      <nav className="w-full h-[80px] bg-white border-b fixed z-50 shadow-md">
        <div className="md:max-w-[1240px] max-w-[330px] w-full h-full flex justify-between items-center m-auto" >
          <div className="flex justify-center">


            <h1
              className="ml-2 text-italic font-serif font-medium text-xl cursor-pointer text-green-800"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              Chef Charisma
            </h1>
          </div>

          <div className="hidden md:flex flex-grow justify-center items-center space-x-4">
            <Link to='/' className="relative px-3 py-2 rounded-md hover:text-black  after:content-[''] after:block after:h-1 after:w-full after:bg-sky-500 after:absolute after:bottom-0 after:left-0 after:transform after:scale-x-0 after:transition-transform after:ease-in-out after:hover:scale-x-100 text-sm">
              HOME
            </Link>

            <Link to='/courses' className="relative px-3 py-2 rounded-md hover:text-black  after:content-[''] after:block after:h-1 after:w-full after:bg-sky-500 after:absolute after:bottom-0 after:left-0 after:transform after:scale-x-0 after:transition-transform after:ease-in-out after:hover:scale-x-100 text-sm">
              COURSES
            </Link>

            <Link to='/community' className="relative px-3 py-2 rounded-md hover:text-black  after:content-[''] after:block after:h-1 after:w-full after:bg-sky-500 after:absolute after:bottom-0 after:left-0 after:transform after:scale-x-0 after:transition-transform after:ease-in-out after:hover:scale-x-100 text-sm">
              COMMUNITY
            </Link>

            <Link to='/about' className="relative px-3 py-2 rounded-md hover:text-black  after:content-[''] after:block after:h-1 after:w-full after:bg-sky-500 after:absolute after:bottom-0 after:left-0 after:transform after:scale-x-0 after:transition-transform after:ease-in-out after:hover:scale-x-100 text-sm">
              ABOUT
            </Link>
          </div>

          {user && token ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <div className="flex items-center">
                  {user_image ? (
                    <Avatar src={`${baseUrl}${user_image}`} alt="user" />
                  ) : (
                    <Avatar src="https://th.bing.com/th/id/OIP.GjhRBLXDrrS84RRTEguk8AHaHa?pid=ImgDet&w=192&h=192&c=7&dpr=1.5" alt="user" />
                  )}
                </div>
              } >
              <Dropdown.Item >Hello {user}</Dropdown.Item>
              <Dropdown.Item onClick={handleProfileClick}>Profile</Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>Signout</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/Signin">
              <button >
                <a className="px-5 py-2.5 relative rounded group overflow-hidden font-medium  bg-sky-400 hover:bg-sky-300 group-hover:h-full opacity-90">
                  <span className="relative  text-white">
                    SignUp/SignIn
                  </span>
                </a>

              </button>

            </Link>

          )}

          <div className="md:hidden">
            <button
              className="w-9 h-9 relative focus:outline-none rounded"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="block w-5 absolute left-6 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span
                  className={`block absolute h-0.5 w-7 text-[#0b0b0b] bg-current transform transition duration-500 ease-in-out ${isOpen ? "rotate-45" : " -translate-y-1.5"
                    }`}
                ></span>
                <span
                  className={`block absolute h-0.5 w-7 text-[#0b0b0b] bg-current transform transition duration-500 ease-in-out ${isOpen ? "opacity-0" : ""
                    }`}
                ></span>
                <span
                  className={`block absolute h-0.5 w-7 text-[#0b0b0b] bg-current transform transition duration-500 ease-in-out ${isOpen ? "-rotate-45" : "translate-y-1.5"
                    }`}
                ></span>
              </div>
            </button>
          </div>
        </div>

        <div className={isOpen ? "absolute z-10 p-4 bg-white w-full px-8 md:hidden" : "hidden"}>
          <ul>
            <li
              className="p-4 hover:bg-gray-100"
              onClick={() => navigate("/")}
            >
              HOME
            </li>
            <li
              className="p-4 hover:bg-gray-100"
              onClick={() => navigate("/courses")}
            >
              COURSES
            </li>
            
            <li 
              className="p-4 hover:bg-gray-100"
              onClick={() => navigate("/community")}
            >
              COMMUNITIES
            </li>
            
            <li 
              className="p-4 hover:bg-gray-100"
              onClick={() => navigate("/about")}
              >
              ABOUT US
              </li>
            
          </ul>
        </div>
      </nav>
      <div className="w-full h-[80px] bg-white border-b"></div>
    </div>
  );
}

export default Navbar;
