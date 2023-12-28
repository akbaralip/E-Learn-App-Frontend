import React, { useEffect, useState } from 'react';
import axiosInstance from '../../AxiosInstance/AxiosIntercepter'
import ChefFooter from './ChefFooter';
import ChefNavbar from './ChefNavbar';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useLottie } from 'lottie-react';
import AddCourseAnim from '../../components/Animations/AddCourseAnim.json'
import { Button } from "@material-tailwind/react";


function AddCourse() {

  const navigate = useNavigate()
  const user_id = localStorage.getItem('user_id');

  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [video, setVideo] = useState(null);
  const [price, setPrice] = useState('')
  const [coverImage, setCoverImage] = useState(null);
  const [about, setAbout] = useState('')
  const [instructor, setInstructor] = useState('')
  const [buttonClicked, setButtonClicked] = useState(false)

  const [titleError, setTitleError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [videoError, setVideoError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [coverImageError, setCoverImageError] = useState('');
  const [aboutError, setAboutError] = useState('');
  const [loading, setLoading] = useState(false);


  const options = {
    loop: true,
    autoplay: true,
    animationData: AddCourseAnim,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    }
  };
  const { View } = useLottie(options);

  useEffect(() => {
    setInstructor(user_id);
  }, [user_id]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('category_list/');
        setCategories(response.data.categories);

      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, [])

  const validateForm = () => {
    let isValid = true;

    if (!title) {
      setTitleError('Title is required');
      isValid = false;
    } else {
      setTitleError('');
    }

    if (!category) {
      setCategoryError('Category is required');
      isValid = false;
    } else {
      setCategoryError('');
    }

    if (!description) {
      setDescriptionError('Description is required');
      isValid = false;
    } else {
      setDescriptionError('');
    }

    if (!video) {
      setVideoError('Demo video is required');
      isValid = false;
    } else {
      setVideoError('');
    }

    if (!price) {
      setPriceError('Price is required');
      isValid = false;
    } else {
      setPriceError('');
    }

    if (!coverImage) {
      setCoverImageError('Cover Image is required');
      isValid = false;
    } else {
      setCoverImageError('');
    }

    if (!about) {
      setAboutError('About is required');
      isValid = false;
    } else {
      setAboutError('');
    }

    return isValid;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }


    try {
      setLoading(true);
      const formData = new FormData();

      formData.append('title', title);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('video', video);
      formData.append('price', price);
      formData.append('coverImage', coverImage);
      formData.append('coverImage', formData.coverImage);
      formData.append('about', about);
      formData.append('instructor', instructor);


      const response = await axiosInstance.post('upload_course/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });


      toast.success('Succefully created')
      navigate('/')



    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.error) {
        toast.error('Validation error:', error.response.data.error);

      } else {
        console.error('Unexpected error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const buttnClick = () => {
    setButtonClicked((prev) => !prev);
  };



  return (
    <>
      <ChefNavbar />

      <div className="text-white mt-5">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center mb-6" >
            <div className="md:w-[90%] lg:w-[80%] xl:w-[900px] h-[130px] overflow-hidden border p-4 md:p-8 shadow-2xl rounded-3xl flex items-center justify-center">

              <Button onClick={buttnClick} variant="gradient" className="rounded-full bg-sky-600">
                {buttonClicked ? 'CLOSE FORM' : 'FILL THE FORM NOW'}
              </Button>

              <img src="src/assets/video_create.svg" alt="" className='mb-4' style={{ height: '140px' }} />
            </div>
          </div>

          {buttonClicked && (
            <div className="max-w-lg mx-auto rounded-lg overflow-hidden shadow-lg mb-8">
              <form className="p-8 bg-gradient-to-r from-gray-100 to-green-100" onSubmit={handleSubmit}>
                <div className="mb-4">
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
                  <div className="text-red-500 text-sm mb-2">{titleError}</div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="instructor">
                    Category
                  </label>
                  <select
                    className="w-full p-3 border rounded text-gray-500"
                    id="category"
                    name="category"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="" >Select category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.category}
                      </option>
                    ))}
                  </select>
                  <div className="text-red-500 text-sm mb-2">{categoryError}</div>
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
                  <div className="text-red-500 text-sm mb-2">{descriptionError}</div>

                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="video">
                      Add Demo video (File)
                    </label>
                    <input
                      className="w-full p-3 border rounded text-black"
                      placeholder="Video (File)"
                      type="file"
                      id="video"
                      name="video"
                      accept='video/*'
                      onChange={(e) => setVideo(e.target.files[0])}

                    />
                    <div className="text-red-500 text-sm mb-2">{videoError}</div>

                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                      Price
                    </label>
                    <input
                      className="w-full p-3 border rounded text-black"
                      placeholder="Price"
                      type="number"
                      id="price"
                      name="price"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <div className="text-red-500 text-sm mb-2">{priceError}</div>

                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverImage">
                    Cover Image (File)
                  </label>
                  <input
                    className="w-full p-3 border rounded text-black"
                    placeholder="Cover Image (File)"
                    type="file"
                    id="coverImage"
                    name="coverImage"
                    accept='image/*'
                    onChange={(e) => setCoverImage(e.target.files[0])}
                  />
                  <div className="text-red-500 text-sm mb-2">{coverImageError}</div>

                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="about">
                    About
                  </label>
                  <input
                    className="w-full p-3 border rounded text-black"
                    placeholder="About"
                    type="text"
                    id="about"
                    name="about"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                  <div className="text-red-500 text-sm mb-2">{aboutError}</div>

                </div>

                <div className="text-center">
                  <div>
                    {loading ? (
                      <p className='text-black'>Loading...</p>
                    ) : (
                      <button
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
          )}
          <div className="flex justify-center" style={{ height: '500px' }}>
            {View}
          </div>
        </div>


      </div>

      <Toaster></Toaster>
      <ChefFooter />

    </>
  );
}

export default AddCourse;
