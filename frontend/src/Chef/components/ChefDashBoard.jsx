import React, { useEffect, useState } from 'react';
import { PiStudentBold } from 'react-icons/pi';
import { FaBookOpen } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { Button } from "@material-tailwind/react";
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ChefCard from './ChefCard';

function ChefDashBoard() {
  const [earnings, setEarnings] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  console.log(courses)

  const user = useSelector(state => state.auth.username)
  const userid = localStorage.getItem('user_id')

  const fetchCourse = async () => {
    try {
      const response = await axiosInstance.get(`chef_course_list/${userid}/`);
      console.log('course_list', response.data)
      setCourses(response.data.courses)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  };

  useEffect(() => {
    fetchCourse()
  }, [])

  const handleButtonClick = (courseId) => {
    navigate(`/show_courses/${courseId}`)
  }

  const [students, setStudents] = useState([])
    console.log('students====>>', students)
    const fetchStudents = async () => {
        try {
            const response = await axiosInstance.get(`api/chef_students_list/${userid}/`);
            setStudents(response.data)
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    }

    const fetchChefEarnings = async () => {
      try {
        const response = await axiosInstance.get(`chef_earnings/${userid}/`);
        setEarnings(response.data)
      } catch (error) {
        console.log('error', error);
      }
    }

    useEffect(() => {
      fetchChefEarnings();
      fetchStudents();
    }, [])
  
    const totalAmount = earnings.reduce((acc, earning) => acc + (earning.amount - (earning.amount * 0.1)), 0);


  return (
    <>
      <div className='flex flex-wrap justify-center'>
        <Link to={'/chef_students_list'}>
          <div className="my-4 mx-2 sm:my-8 sm:mx-4 max-w-xs overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.8)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat p-6 sm:p-10 shadow-2xl hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">
            <div className="mb-4">
              <PiStudentBold className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="mb-2 font-medium tracking-tight text-neutral-100">
              STUDENTS
            </h3>
            <h1 className="text-sm text-neutral-400">
              {students.length}
            </h1>
          </div>
        </Link>
          <Link to={'/chef_unlisted_courses'}>
            <div className="my-4 mx-2 sm:my-8 sm:mx-4 max-w-xs overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.8)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat p-6 sm:p-10 shadow-2xl hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">
              
              <div className="mb-4" >
                <FaBookOpen className="h-8 w-8 text-orange-400" />
              </div>
              
              <h3 className="mb-2 font-medium tracking-tight text-neutral-100">
                COURSES
              </h3>
              <h1 className="text-sm text-neutral-400">
                {courses.length}
              </h1>
            </div>
          </Link>

          <Link to={'/chef_earnings'}>
            <div className="my-4 mx-2 sm:my-8 sm:mx-4 max-w-xs overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.8)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat p-6 sm:p-10 shadow-2xl hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">
              <div className="mb-4">
                <FaIndianRupeeSign className="h-8 w-8 text-yellow-400" />
              </div>
              <h3 className="mb-2 font-medium tracking-tight text-neutral-100">
                EARNINGS
              </h3>
              <h1 className="text-sm text-neutral-400">
                {totalAmount}
              </h1>
            </div>
          </Link>
        </div>
      

      <div className="my-8 w-full h-[130px] bg-gray-200 overflow-hidden  border  bg-gradient-to-r from-green-400 to-yellow-300 bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat p-8 shadow-2xl hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">

        <div className='text-center my-8 text-4xl font-bold  mt-[-1px]'>
          <h1 className='text-3xl  '>Recently uploaded courses</h1>
        </div>

      </div>

      <div className="">
        {courses.slice(0,4).map((course) => (
          <div key={course.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-8 ">
            <button onClick={() => handleButtonClick(course.id)}>
              <ChefCard course={course} />
            </button>
          </div>
        ))}
      </div>


      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="my-8 w-full md:w-[90%] lg:w-[80%] xl:w-[900px] h-[130px] overflow-hidden border bg-blue-800 p-4 md:p-8 shadow-2xl rounded-3xl flex items-center justify-center">
          <Link to={'/add_courses'}>
            <div className='flex items-center space-x-4'>

              <h2 className='text-white'>Create your own skilled Courses</h2>
              <Button variant="gradient" className="rounded-full overflow-hidden    bg-gradient-to-r from-red-500 to-yellow-300 bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat hover:bg-[position:200%_0,0_0] hover:duration-[1500ms] bg-blue-800 p-4 md:p-8 shadow-2xl flex items-center">
                ADD COURSE
              </Button>
            </div>
          </Link>
        </div>
      </div>

    </>

  );
}

export default ChefDashBoard;
