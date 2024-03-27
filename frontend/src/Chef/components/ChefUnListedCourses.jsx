import React, { useEffect, useState } from 'react';
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import { baseUrl } from '../../Redux/Store/baseUrl/BaseUrl';
import ChefNavbar from './ChefNavbar';
import ChefFooter from './ChefFooter';
import { Button } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function ChefUnListedCourses() {
  const [courses, setCourses] = useState([]);

  const userid = localStorage.getItem('user_id')


  const fetchAllCourses = async () => {
    try {
      const response = await axiosInstance.get(`chef_course_Unlist/${userid}/`);
      setCourses(response.data.courses);
      console.log(response.data.courses);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {

    fetchAllCourses();
  }, []);

  const handleEdit = (course) => {
    console.log(course)
  }

  const handleDelete = async (courseId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this video?');
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`delete_course/${courseId}/`);
        fetchAllCourses();
        toast.success('Course deleted successfully');

      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  }

  return (
    <>
      <ChefNavbar />

      <div className="flex flex-col  w-full h-full space-y-4 mt-4 mb-5 p-2">


        <div className=" mt-8 flex justify-start flex-wrap gap-4">
          <Link to={'/chef_unlisted_courses'}>
            <button
              className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="/get-started"
            >
              Unlisted
            </button>
          </Link>
          <Link to={'/chef_listed_courses'}>
            <button
              className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-black hover:bg-blue-600 hover:text-white focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="/about"
            >
              Listed
            </button>
          </Link>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {courses.filter((course) => !course.is_listed).map((course) => (
            <div key={course.id} className="flex flex-col bg-gradient-to-r from-blue-100 to-green-200 rounded p-4">
              

              <div className="relative overflow-hidden rounded h-40">
                <img
                  src={(course.cover_image || '')}
                  alt=""
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="mt-4 overflow-y-auto">
                <p className="mb-3 text-blue-800 font-bold">Title:</p>
                <p>{course.title}</p>
                <p className="mt-4 mb-3 text-blue-800 font-bold">Description:</p>
                <p>{course.description}</p>
                <p className="mt-4 text-blue-800 font-bold">About:</p>
                <p>{course.about}</p>
                <p className="mt-4 mb-3 text-blue-800 font-bold">Price:</p>
                <p>{course.price}</p>
              </div>

              <div className='mt-8 flex justify-between'>
                <Link to={`/show_courses/${course.id}`}>
                  <Button className="bg-blue-600">Your videos</Button>
                </Link>
                <div className='flex justify-end mt-3'>
                  <div onClick={() => handleEdit(course)} className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer">
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                      <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                    </svg>
                  </div>

                  <div onClick={() => handleDelete(course.id)} className="cursor-pointer" >
                    {course.is_listed ? (
                      null
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600 cursor-pointer">
                        <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                      </svg>
                    )}

                  </div>
                </div>
              </div>

            </div>
          ))}

        </div>

        <div className=" max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className=" overflow-hidden  border  bg-gradient-to-r from-red-500 to-yellow-300 bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat hover:bg-[position:200%_0,0_0] hover:duration-[1500ms] bg-blue-800 p-4 md:p-8 shadow-2xl rounded-3xl flex items-center ">
            <Link to={'/add_courses'}>
              <div className='flex items-center space-x-4 '>

                <h2 className='text-white'>Create your own skilled Courses</h2>
                <Button variant="gradient" className="rounded-full overflow-hidden    bg-gradient-to-r from-red-500 to-yellow-300 bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat hover:bg-[position:200%_0,0_0] hover:duration-[1500ms] bg-blue-800 p-4 md:p-8 shadow-2xl flex items-center">
                  ADD COURSE
                </Button>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <Toaster />
      <ChefFooter />
    </>
  );
}

export default ChefUnListedCourses;
