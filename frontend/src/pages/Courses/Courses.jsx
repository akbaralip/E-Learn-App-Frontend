import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Lottie from 'lottie-react';
import loadinglottie from '../../../src/components/Animations/Loading.json'

function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllCourses = async () => {
    try {
      const response = await axiosInstance.get('course_list/', {
      });
      setCourses(response.data.courses);
      setCategories(response.data.categories);
      setPrices(response.data.prices);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCourses();
  }, [searchInput, priceFilter, categoryFilter]);


  return (
    <>
      <Navbar />


      <div className="sm:flex justify-between mb-4 mt-4 p-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-2 sm:mb-0 sm:mr-2"
        />
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-2 sm:mb-0 sm:mr-2"
        >
          <option key='All prices' value="">All Prices</option>
          {prices?.map((price) => (
            <option className='text-black' key={price.id} value={price.value}>
              {price.price}
            </option>
          ))}
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option key="allCategories" value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category}
            </option>
          ))}
        </select>
      </div>

      {courses.length === 0 && (
        <div className="flex justify-center items-center h-screen">
          <p className='text-red-600 text-md'>Oops.. empty</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16 mt-6">
        {courses
          .filter((course) => course.title.toLowerCase().includes(searchInput.toLowerCase()))
          .filter((course) => !priceFilter || parseInt(course.price, 10) === parseInt(priceFilter, 10))
          .filter((course) => !categoryFilter || course.category.toString() === categoryFilter.toString())
          .map((course) => (
            <div key={course.id} className="flex flex-col w-full h-full space-y-4 mt-4 mb-5 p-2">
              <Link to={`/show_details/${course.id}`}>
                <div className="flex flex-col bg-gradient-to-r from-red-200 to-yellow-200 rounded p-4">
                  <div className='text-gray-700 mb-3'>
                    <h1>{course.title}</h1>
                  </div>
                  <div className="relative overflow-hidden rounded h-40">
                    <img
                      src={(course.cover_image || 'default-image.jpg')}
                      alt="image"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className='mt-4 overflow-y-auto h-20'> 
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

export default Courses;
