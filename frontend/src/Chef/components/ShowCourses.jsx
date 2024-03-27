import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import { baseUrl } from '../../Redux/Store/baseUrl/BaseUrl';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from "@material-tailwind/react";
import ChefNavbar from './ChefNavbar';
import ReactPlayer from 'react-player';
import ChefFooter from './ChefFooter';
import Modal from "react-modal";
Modal.setAppElement('#root');


function ShowCourses() {
  const { courseId } = useParams();
  const [videos, setVideos] = useState([]);
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editVideo, setEditVideo] = useState(null);
  const [loading, setLoading] = useState(false);


  const fetchVideos = async () => {
    try {
      const response = await axiosInstance.get(`courses_videos/${courseId}/`);
      console.log('response===>', response)
      setVideos(response.data.videos);
      setCourses(response.data.course);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [courseId]);

  const handleEdit = (video) => {
    setEditVideo(video)
    setShowModal(true);


    setTitle(video.title)
    setDescription(video.description)
    setVideo(video.videos);

  }

  const [editCourse, setEditCourse] = useState('')
  const handleEditCourse = (course) => {
    setEditCourse(course)
    setShowModal(true);



  }

  const handleDelete = async (videoId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this video?');
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`delete_course_video/${videoId}/`);
        toast.success('Video deleted successfully');
        fetchVideos();
      } catch (error) {
        console.error('Error deleting video:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);

      if (video) {
        formData.append('video', video);
      }

      console.log('FormData:', formData);

      if (editVideo) {
        await axiosInstance.put(`edit_course_video/${editVideo.id}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        })
      } else {
        const response = await axiosInstance.post(`upload_course_videos/${courseId}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }


      toast.success('Successfully created');
      closeEditModal(false);
      fetchVideos();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const buttnClick = () => {
    setShowModal(true);
  };

  const closeEditModal = () => {
    setShowModal(false);
    setTitle('');
    setDescription('');
    setVideo(null);
    setEditVideo(null);
  };

  const handleUploadCourse = async (courseId) => {
    const confirmUpload = window.confirm('Are you sure you want to upload this course?. Once the course is uploaded, the delete button will be hidden during the course duration.');

    if (confirmUpload) {
      try {
        await axiosInstance.post(`mark_course_as_listed/${courseId}/`);
        toast.success('Course marked as listed');
        fetchVideos();
      } catch (error) {
        console.error('Error marking course as listed:', error);
      }
    }

  }

  return (
    <>
      <ChefNavbar />

      {courses.map((cour) => (
        <div className='mb-8 md:mb-24 mt-10' key={cour.id}>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 p-4 rounded mb-3 md:mb-0">
              <Button onClick={buttnClick} variant="gradient" className="flex rounded-full bg-sky-600">
                ADD YOUR COURSE VIDEOS
              </Button>
            </div>

            <div className="w-full md:w-1/3 p-4 rounded cursor-pointer">
              <h2 className="text-sky-600 text-bold text-center italic hover:not-italic font-bold">{cour.title}</h2>
            </div>
          </div>

          <Modal
            isOpen={showModal}
            onRequestClose={closeEditModal}
            className="modal bg-opacity-90 bg-black fixed inset-0 flex items-center justify-center z-50"
          >

            <div className="max-w-lg mx-auto rounded-lg overflow-hidden shadow-lg mb-8 mt-10 p-4">
              <form className="p-8 bg-gradient-to-r from-gray-100 to-green-100" onSubmit={handleSubmit}>
                <div className="flex justify-end">
                  <button
                    onClick={closeEditModal}
                    className="cursor-pointer font-bold justify-center bg-white w-8 rounded text-red-600"
                  >
                    X
                  </button>
                </div>
                <div className="mb-4">
                  <h1>ADD VIDEOS</h1>
                  <br />
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                    Title
                  </label>
                  <input
                    className="w-full p-3 border rounded text-black"
                    placeholder="Title"
                    type="text"
                    id="title"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                    Description
                  </label>
                  <textarea
                    className="w-full p-3 border rounded text-black"
                    placeholder="Description"
                    rows="4"
                    id="description"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="video">
                      Add video (File)
                    </label>
                    <input
                      className="w-full p-3 border rounded text-black"
                      placeholder="Video (File)"
                      type="file"
                      id="video"
                      name="video"
                      accept="video/*"
                      onChange={(e) => setVideo(e.target.files[0])}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <div>
                    {loading ? (
                      <p className='text-black'>Loading...</p>
                    ) : (<button
                      type="submit"
                      className="bg-gradient-to-r from-blue-700 to-orange-500 text-white px-5 py-3 font-medium rounded"
                    >
                      SUBMIT
                    </button>
                    )}
                  </div>
                </div>
              </form>
            </div>

          </Modal>

          <div className="flex flex-col md:flex-row h-full space-y-4 md:space-y-0 ">
            <div className=" md:w-5/6 relative p-2 ">
              {videos.map((video) => (
                <div key={video.id} className="rounded bg-gradient-to-r from-purple-100 to-green-100 p-4 mb-4">
                  <ReactPlayer
                    url={video.videos}
                    controls
                    width='100%'
                    height='100%'
                    playIcon
                    volume
                  />
                  <div className='flex justify-end mt-2'>
                    <div onClick={() => handleEdit(video)} className="cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 cursor-pointer">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                      </svg>
                    </div>
                    <div onClick={() => handleDelete(video.id)} className="cursor-pointer ml-4">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600 cursor-pointer">
                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className='mt-2'>
                    <h1 className="font-bold text-xl text-gray-900">{video.title}</h1>
                    <p className="text-gray-600 mt-2">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full md:w-1/2 relative p-2 ">
              <div className=' top-4 left-4 right-4 w-1/1 h-2/1 bg-gradient-to-r from-green-100 to-yellow-100 p-8 rounded '>

                {courses.map((course) => (
                  <div key={course.id}>
                    <ReactPlayer
                      url={course.demo_video}
                      controls
                      width='100%'
                      height='100%'
                      playIcon
                      volume
                    />


                    <div className='mt-4'>
                      <p className="font-bold text-xl text-gray-900"><strong>Title:<br /></strong> </p>
                      <p className="text-gray-600 mt-2">{course.title}</p>
                      <p className="font-bold text-xl text-gray-900"><strong>Description:<br /></strong> </p>
                      <p className="text-gray-600 mt-2">{course.description}</p>
                      <p className="font-bold text-xl text-gray-900"><strong>About:<br /></strong> </p>
                      <p className="text-gray-600 mt-2">{course.about}</p>
                      <p className="font-bold text-xl text-gray-900"><strong>Price:<br /></strong> </p>
                      <p className="text-gray-600 mt-2">{course.price}</p>
                    </div>
                    <Link >
                      <div className='mt-8'>
                        {course.is_listed ? (null) : (

                          <div className="text-gray-600">
                            <Button onClick={() => handleUploadCourse(course.id)} className='bg-green-400 mb-4'>Upload Course</Button> <br />
                            Once the course is uploaded, the delete button will be hidden during the course duration.</div>
                        )}

                      </div>
                    </Link>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      ))}

      <ChefFooter />
      <Toaster />
    </>
  );
}

export default ShowCourses;
