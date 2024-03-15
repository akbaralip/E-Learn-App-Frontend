import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Button } from "@material-tailwind/react";
import { baseUrl } from '../../Redux/Store/baseUrl/BaseUrl';
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Lottie from 'lottie-react';
import loadinglottie from '../../../src/components/Animations/Loading.json'


function ChefCoursesList() {
    const { chefId } = useParams();
    const [chefCourses, setChefCourses] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchCHefCourses = async () => {
        try {
            const response = await axiosInstance.get(`/chef/courses/${chefId}/`);
            setChefCourses(response.data);
            setLoading(false);

        } catch (error) {
            console.error('Error fetching courses:', error);
            setLoading(false);

        }
    }

    useEffect(() => {
        fetchCHefCourses();
    }, [chefId])


    return (
        <>
            <Navbar />
            <div className="grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                {chefCourses.length === 0 && (
                    <div className="flex justify-center items-center h-screen">
                        <p className='text-red-600 text-md'>Oops.. empty</p>
                    </div>
                )}
                {chefCourses.map((course) => (
                    <div key={course.id} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16 mt-6 py-3 px-3">
                        <Link to={`/show_details/${course.id}`}>
                            <div className="flex flex-col bg-gradient-to-r from-red-200 to-yellow-200 rounded p-4 h-full">
                                <div className='text-gray-700 mb-3'>
                                    <h1>{course.title}</h1>
                                </div>
                                <div className="relative overflow-hidden rounded h-40">
                                    <img
                                        src={baseUrl + (course.cover_image || 'default-image.jpg')}
                                        alt=""
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className=" mt-4 overflow-y-auto h-20">
                                    <p className="mt-4 mb-3 text-blue-800 font-bold">Description:</p>
                                    {course.description.length > 10 ? (
                                        <>
                                            <p>{course.description.substring(0, 100)}...</p>
                                            <Link to={`/show_details/${course.id}`}>
                                                <p className="text-blue-500 cursor-pointer">More</p>
                                            </Link>
                                        </>
                                    ):(
                                        <p>{course.description}</p>
                                    )}


                                </div>
                            </div>
                        </Link>

                    </div>

                ))}
            </div>

            {loading && (
                <div className="flex justify-center items-center p-16 h-[500px]">
                    <Lottie animationData={loadinglottie} className="w-3/12" />
                </div>
            )}
            <Footer />

        </>
    )
}

export default ChefCoursesList
