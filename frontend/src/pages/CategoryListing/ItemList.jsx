import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import { baseUrl } from '../../Redux/Store/baseUrl/BaseUrl';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Lottie from 'lottie-react';
import loadinglottie from '../../../src/components/Animations/Loading.json'


function ItemList() {
    const { categoryId } = useParams();
    const [courses, setCourses] = useState([]);
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


    return (
        <>
            <Navbar />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16 mt-6">
                {courses.length === 0 && (
                    <div className="flex justify-center items-center h-screen">
                        <p className='text-red-600 text-md'>Oops.. empty</p>
                    </div>
                )}
                {courses.map((course) => (
                    <div key={course.id} className="flex flex-col w-full h-full space-y-4 mt-4 p-2 max-w-md max-h-96 mb-8">
                        <Link to={`/show_details/${course.id}`}>
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
                                <div className=" mt-4 overflow-y-auto h-20">
                                    <p className="mt-4 mb-3 text-blue-800 font-bold">Description:</p>
                                    {course.description.length > 10 ? (
                                        <>
                                            <p>{course.description.substring(0, 100)}...</p>
                                            <Link to={`/show_details/${course.id}`}>
                                                <p className="text-blue-500 cursor-pointer">More</p>
                                            </Link>
                                        </>
                                    ) : (
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
    );
}

export default ItemList;
