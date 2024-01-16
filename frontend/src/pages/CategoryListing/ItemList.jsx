import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import { baseUrl } from '../../Redux/Store/baseUrl/BaseUrl';
import { Button } from "@material-tailwind/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Lottie from 'lottie-react';
import loadinglottie from '../../../src/components/Animations/Loading.json'


function ItemList() {
    const { categoryId } = useParams();
    const [courses, setCourses] = useState([]);
    const [visibleCourseId, setVisibleCourseId] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCourses = async () => {
        try {
            const response = await axiosInstance.get(`/courses/category/${categoryId}/`);
            setCourses(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCourses();
    }, [categoryId])

    const toggleDetails = (courseId) => {
        setVisibleCourseId((prevVisibleCourseId) => (
            prevVisibleCourseId === courseId ? null : courseId
        ));
    };

    return (
        <>
            <Navbar />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                {courses.map((course) => (
                    <div key={course.id} className="flex flex-col w-full h-full space-y-4 mt-4 mb-5 p-2">
                        <div className="flex flex-col bg-gradient-to-r from-red-200 to-yellow-200 rounded p-4">
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
                            <div className='mt-8 flex justify-between '>
                                <Button className="bg-orange-500" onClick={() => toggleDetails(course.id)}>
                                    {visibleCourseId === course.id ? <FaArrowUp /> : <FaArrowDown />}
                                </Button>
                            </div>
                            {visibleCourseId === course.id && (
                                <div className=''>
                                    <div className=" mt-4 overflow-y-auto">
                                        <p className="mb-3 text-blue-800 font-bold">Title:</p>
                                        <p>{course.title}</p>
                                        <p className="mt-4 mb-3 text-blue-800 font-bold">Description:</p>
                                        <p>{course.description}</p>
                                    </div>
                                    <div className='mt-4 '>
                                        <Link to={`/show_details/${course.id}`}>
                                            <Button className="bg-green-500">View More</Button>
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
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
    );
}

export default ItemList;
