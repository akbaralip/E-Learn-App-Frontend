import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import { baseUrl } from '../../Redux/Store/baseUrl/BaseUrl';
import { Link } from 'react-router-dom';
import { Button } from "@material-tailwind/react";
import Navbar from '../../components/Navbar';


function MyLearnings() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  var userId = localStorage.getItem('user_id');
  

  const fetchVideos = async () => {
    try {

      const response = await axiosInstance.get(`courses_user_purchased/${userId}/`);
      setPurchasedCourses(response.data.purchased);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    fetchVideos()
  }, [])

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16 mt-6">
        {purchasedCourses.map((data) => (

          <div key={data.id} className="flex flex-col w-full h-full space-y-4 mt-4 mb-5 p-2">

            <div className="flex flex-col bg-gradient-to-r from-red-200 to-yellow-200 rounded p-4">
              <div className='text-gray-700 mb-3'>
                <h1>{data.course.title}</h1>
              </div>
              <div className="relative overflow-hidden rounded h-40">
                <img
                  src={baseUrl + (data.course.cover_image || 'default-image.jpg')}
                  alt=""
                  className="object-cover w-full h-full"
                />

              </div>

              <div className='mt-8 flex justify-between '>
                <Link to={`/show_purchased_course_details/${data.course.id}`}>
                  <Button className="bg-green-500">View More</Button>
                </Link>
              </div>


            </div>

          </div>
        ))}
      </div>
      <Footer />
    </>
  )
}

export default MyLearnings
