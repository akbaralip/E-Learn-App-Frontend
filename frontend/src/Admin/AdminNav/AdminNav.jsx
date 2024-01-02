import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { Avatar, Dropdown } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../../Redux/Reducer/Reducer/'
import toast, { Toaster } from 'react-hot-toast';

function AdminNav() {
  const token = localStorage.getItem('access_token')
  const role = localStorage.getItem('role')

  const user = useSelector(state => state.auth.username)

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
      <nav className=" h-[90px]  shadow w-full " >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 " >
          <div className="flex items-center justify-between h-20" >
            <div className="flex items-center" >
              {/* <div className="flex-shrink-0">
                <img
                  className="h-12 w-12"
                  src="/src/assets/Icon.png"
                  alt="Brand Icon"
                />
              </div> */}
              <Link to={'/'}>
                <div className="ml-2 text-italic font-serif font-medium text-xl cursor-pointer text-green-800">
                  Chef-Charisma
                </div>
              </Link>
            </div>

            <div className="hidden md:flex flex-grow justify-center items-center space-x-4">
              <Link to='/add_category' className="relative px-3 py-2 rounded-md text-green-500   after:content-[''] after:block after:h-1 after:w-full after:bg-red-600 after:absolute after:bottom-0 after:left-0 after:transform after:scale-x-0 after:transition-transform after:ease-in-out after:hover:scale-x-100">
                CATEGORIES
              </Link>

              <Link to='/chefslist' className="relative px-3 py-2 rounded-md text-green-500   after:content-[''] after:block after:h-1 after:w-full after:bg-red-600 after:absolute after:bottom-0 after:left-0 after:transform after:scale-x-0 after:transition-transform after:ease-in-out after:hover:scale-x-100">
                CHEFS
              </Link>

              <Link to='/admin_chat_port' className="relative px-3 py-2 rounded-md text-green-500  after:content-[''] after:block after:h-1 after:w-full after:bg-red-600 after:absolute after:bottom-0 after:left-0 after:transform after:scale-x-0 after:transition-transform after:ease-in-out after:hover:scale-x-100">
                CHAT
              </Link>

              <Link to='#' className="relative px-3 py-2 rounded-md text-green-500  after:content-[''] after:block after:h-1 after:w-full after:bg-red-600 after:absolute after:bottom-0 after:left-0 after:transform after:scale-x-0 after:transition-transform after:ease-in-out after:hover:scale-x-100">
                ABOUT
              </Link>
            </div>

            {user && token ? (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <div className="flex items-center">
                    <Avatar alt="user" img="https://th.bing.com/th/id/OIP.GjhRBLXDrrS84RRTEguk8AHaHa?pid=ImgDet&w=192&h=192&c=7&dpr=1.5" rounded />
                  </div>
                } >
                <Dropdown.Item onClick={handleProfileClick}>Hello {user}</Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>Signout</Dropdown.Item>
              </Dropdown>
            ) : (
              <Link to="/Signin">
                <button className="btn bg-white text-black text-italic hover:bg-sky-300 py-2 px-3 md:ml-6 rounded md:static font-semibold">
                  Register/Login
                </button>
              </Link>
            )}

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-700 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div className="md:hidden" id="mobile-menu">
            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#"
                className="hover:bg-stone-500 text-black block px-3 py-2 rounded-md text-base font-semibold"
              >
                HOME
              </a>

              <a
                href="#"
                className="text-gray-300 hover:bg-stone-500 hover:text-white block px-3 py-2 rounded-md text-base font-semibold"
              >
                COURSES
              </a>

              <a
                href="#"
                className="text-gray-300 hover:bg-stone-500 hover:text-white block px-3 py-2 rounded-md text-base font-semibold"
              >
                COMMUNITY
              </a>

              <a
                href="#"
                className="text-gray-300 hover:bg-stone-500 hover:text-white block px-3 py-2 rounded-md text-base font-semibold"
              >
                ABOUT
              </a>
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
}

export default AdminNav;


