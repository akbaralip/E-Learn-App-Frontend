import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import { baseUrl } from '../../Redux/Store/baseUrl/BaseUrl';
import ReactPlayer from 'react-player';
import Footer from '../../components/Footer';
import { Button } from '@material-tailwind/react';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import loadinglottie from '../../../src/components/Animations/Loading.json'

function CourseDetails() {
  const user = useSelector((state) => state.auth.username)
  const navigate = useNavigate();

  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isPurchased, setIsPurchased] = useState(false);
  const [loading, setLoading] = useState(true);


  const fetchVideos = async () => {
    try {
      const response = await axiosInstance.get(`courses_videos/${courseId}/`);
      setVideos(response.data.videos);
      setCourses(response.data.course);
      setLoading(false);

    } catch (error) {
      console.error('Error fetching videos:', error);
      setLoading(false);

    }
  };

  const checkCoursePurchaseStatus = async () => {
    try {
      const response = await axiosInstance.get(`check_course_purchase_status/${courseId}/${user}/`);
      setIsPurchased(response.data.isPurchased);
    } catch (error) {
      console.error('Error checking course purchase status:', error);
    }
  };

  useEffect(() => {
    checkCoursePurchaseStatus();
  }, [courseId, user]);

  useEffect(() => {
    fetchVideos();
  }, [courseId]);

  const handlePurchase = async () => {
    if (!user) {
      navigate('/signin');
      return;
    }
  }

  return (
    <>
      <Navbar />

      

      <div className='mb-10 md:mb-24 mt-8 '>
      
        {courses.map((course) => (
          <div key={course.id} className="flex flex-col md:flex-row mb-4 space-y-4 md:space-y-0">
            <div className="md:w-2/3  relative p-2">
              <div className="rounded mt-8 bg-gradient-to-r from-red-200 to-yellow-200 p-8 md:w-96 shadow-lg">
                <div className="flex justify-center mb-4">
                  <h1 className="font-bold text-2xl text-gray-800 uppercase">{course.title}</h1>
                </div>
                <div className="mb-4">
                  <p className="text-gray-800 mt-2">{course.description}</p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-800 mt-2">{course.about}</p>
                </div>
                <div className="flex flex-col justify-center items-center">
                  {course.instructor.image && (
                    <img
                      className="rounded mb-4"
                      src={`${baseUrl}${course.instructor.image}`}
                      alt={`Profile for ${course.instructor.username}`}
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                  )}
                  <div className="text-gray-800 text-center">
                    <h1 className="text-2xl font-bold">{course.instructor.username}</h1>
                    <p>{course.instructor.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-2/3 relative p-2">
              <div className="rounded bg-gradient-to-r from-red-200 to-yellow-200 p-4 mb-4 mt-8 shadow-lg">
                <ReactPlayer
                  url={`${baseUrl}${course.demo_video}`}
                  controls
                  width='100%'
                  height='100%'
                  playIcon
                  volume
                />
                <div className='mt-4'>
                  <p className="font-bold text-xl text-gray-900"><strong>Price: <span>{course.price}</span></strong></p>
                  <p className="text-x text-blue-800"><strong>Lessons: <span>{videos.length}</span></strong></p>
                </div>
                <div className='mt-7 flex justify-end'>
                  {!isPurchased ? (
                    <form action={`${baseUrl}/api/stripe/create-checkout-session/${courseId}/${user}/`} method='POST'>
                      <Button type='submit' className="bg-orange-500 text-white hover:bg-orange-600" onClick={handlePurchase}>
                        Purchase now
                      </Button>
                    </form>
                  ) : (
                    <Link to="/mylearnings">
                      <Button className="bg-green-500 text-white hover:bg-green-600">
                        Go to My Learnings
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
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

export default CourseDetails;
