import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import { ImPlay } from 'react-icons/im';
import Navbar from '../../components/Navbar';
import Lottie from 'lottie-react';
import loadinglottie from '../../../src/components/Animations/Loading.json'


function PurchasedCourse() {
  const { courseId } = useParams();
  const [courseVideos, setCourseVideos] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log('fetched data', courseVideos)
  const fetchVideos = async () => {
    try {
      const response = await axiosInstance.get(`courses_videos_user_purchased/${courseId}/`);
      setCourseVideos(response.data);
      setLoading(false);

    } catch (error) {
      console.log('Error', error);
      setLoading(false);

    }
  };

  useEffect(() => {
    fetchVideos();
  }, [courseId]);

  const handleChapterClick = (chapterId) => {
    setSelectedChapter(chapterId);
  };



  return (
    <>
      <Navbar />
      

      <div className="rounded mb-2 p-8">
        

        <div className="flex flex-col md:flex-row justify-between gap-4">
          {courseVideos.map((chapter) => (
            <div key={chapter.id} className="flex-1 md:w-2/3 mb-24 text-white text-right pr-4 rounded  " style={{ display: selectedChapter === chapter.id ? 'block' : 'none' }}>
              <ReactPlayer
                url={chapter.videos}
                controls
                width='100%'
                height='100%'
                playIcon=''
                volume={0.5}
                
              />
              <h2 className="text-xl font-bold text-black flex mt-2 mb-2 justify-start">{chapter.title}</h2>
                <p className="text-sm text-gray-800 ">{chapter.description}</p>
            </div>
          ))}


          <div className="flex-1 text-right rounded">
            <div className='flex justify-start'>
              <h2 className='font-bold text-2xl text-gray-600 mt-8 mb-6'>CHAPTERS</h2>
            </div>
            <ul className="list-none pl-0 mb-6">
              {courseVideos.map((chapter) => (
                <li className='text-black font-bold cursor-pointer hover:bg-sky-50 py-2 px-6 flex items-center' key={chapter.id} onClick={() => handleChapterClick(chapter.id)}>
                  <span className="mr-2 text-red-600 text-xl"><ImPlay /></span>
                  {chapter.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
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

export default PurchasedCourse;
