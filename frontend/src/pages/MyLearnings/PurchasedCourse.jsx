import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import { baseUrl } from '../../Redux/Store/baseUrl/BaseUrl';
import { ImPlay } from 'react-icons/im';
import Navbar from '../../components/Navbar';

function PurchasedCourse() {
  const { courseId } = useParams();
  const [courseVideos, setCourseVideos] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState(null);

  const fetchVideos = async () => {
    try {
      const response = await axiosInstance.get(`courses_videos_user_purchased/${courseId}/`);
      setCourseVideos(response.data);
    } catch (error) {
      console.log('Error', error);
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

      <div className="rounded mb-2 mt-6 p-8">
        <div className="flex justify-center mb-5 mt-4">
          <h1 className="font-bold text-2xl text-gray-800 uppercase mt-4"></h1>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4">
          {courseVideos.map((chapter) => (
            <div key={chapter.id} className="flex-1 md:w-2/3 text-white text-right pr-4 rounded mb-4 md:mb-0" style={{ display: selectedChapter === chapter.id ? 'block' : 'none' }}>
              <ReactPlayer
                url={`${baseUrl}${chapter.videos}`}
                controls
                width='100%'
                height='100%'
                playIcon=''
                volume={0.5}
              />
            </div>
          ))}

          <div className="flex-1  bg-gradient-to-r from-red-200 to-yellow-200 text-white text-right pr-4 rounded p-4">
            <div className='flex justify-center'>
              <h2 className='font-bold text-2xl text-gray-800 mt-8 mb-6'>CHAPTERS</h2>
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

      <Footer />
    </>
  );
}

export default PurchasedCourse;
