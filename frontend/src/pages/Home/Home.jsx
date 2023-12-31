import React, { useEffect, useState } from 'react';
import animationData from '../../assets/cooking.json';
import Card from './Card.jsx';
import Footer from '../../components/Footer';
import { useLottie } from 'lottie-react';
import 'animate.css';
import axiosInstance from '../../../src/AxiosInstance/AxiosIntercepter.jsx';
import ChefListCard from './ChefListCard.jsx';
import Navbar from '../../components/Navbar.jsx';
import { BiSolidInstitution } from 'react-icons/bi'
import { FaGlobeAsia, FaUserGraduate } from 'react-icons/fa'
import { PiBookFill } from 'react-icons/pi'
import chefImage from "../../assets/achievment.jpg"

function Home() {
  const [categories, setCategories] = useState([]);
  const [chefs, setChefs] = useState([]);

  const people = [
    {
      name: 'AKBAR ALI',
      role: 'Co-Founder / CEO',
      imageUrl:
        'https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.1786861594.1684561590&semt=sph',
    },
    {
      name: 'RICHARD PAULSON',
      role: 'Financial / HR',
      imageUrl:
        'https://img.freepik.com/free-photo/happy-young-man-using-laptop-computer_171337-19581.jpg?size=626&ext=jpg&ga=GA1.1.1786861594.1684561590&semt=sph',
    },
    {
      name: 'BASITH M',
      role: 'Manager',
      imageUrl:
        'https://img.freepik.com/free-photo/close-up-young-successful-man-smiling-camera-standing-casual-outfit-against-blue-background_1258-66609.jpg?size=626&ext=jpg&ga=GA1.1.1786861594.1684561590&semt=sph',
    },


  ]

  const options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const { View } = useLottie(options);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const categoryResponse = await axiosInstance.get('category_list/');
      const chefResponse = await axiosInstance.get('api/chef_list/');
      setCategories(categoryResponse.data.categories);
      setChefs(chefResponse.data.chefs);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };


  return (
    <main>
      <Navbar />
      <div className=" max-w-7xl mx-auto mb-8 sm:px-6 lg:px-8">
        <div className="w-full bg-white ">
          <div className="md:max-w-[1380px] m-auto grid md:grid-cols-2 max-w-[350px] gap-16">
            <div className="flex flex-col justify-center gap-4 md:mr-8 animate__animated animate__bounce px-2 py-4">
              <p className="md:text-2xl md:py-2 text-[#20B486] font-medium">EXPAND YOUR SKILLS</p>
              <h1 className="md:text-6xl md:py-2 font-semibold ">
                Access to <span className="text-[#20B486]">500+</span> courses from{' '}
                <span className="text-[#20B486]">100+</span> International{' '}
                <span className="text-[#20B486]">CHEFS </span>
              </h1>
              <form
                className="bg-[#e4f7f1] border max-w-[650px] md:p-4 p-2 mb-2 md:mt-5 shadow-lg rounded-lg flex justify-between"
              >
                <input
                  className="bg-[#e4f7f1] placeholder-gray-500 w-full outline-none focus:outline-none"
                  type="text"
                  placeholder="What do you want to Cook today?"
                  style={{ color: 'black' }}
                />
                <button type="submit">
                  <i className="fa fa-search fa-lg mt-1"></i>
                </button>
              </form>
            </div>
            <div className="md:order-last order-first flex px-2 py-8" style={{ height: '500px' }}>
              {View}
            </div>
          </div>
          <div className=' flex max-lg justify-center items-center font-bold text-lg border-t-2  border-t-slate-200 my-4 pt-7'></div>
        </div>
      </div>


      <div className='flex justify-center mb-8'>
        <h1 className="md:text-2xl md:py-2  font-medium">Its Our Trending<span className="md:text-6xl md:py-2 font-semibold text-[#20B486] "> Categories</span> </h1>
      </div>

      <div className="px-4 py-6 sm:px-0 ">
        <div className="flex grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <Card categories={categories} />
        </div>
      </div>

      <div className='w-full bg-white py-16 px-6'>
        <div className='md:max-w-[1080px] m-auto grid md:grid-cols-2 max-w-[350px]'>
          <div className='flex flex-col justify-center   '>
            <h1 className='text-3xl py-2 font-semibold '>Our <span className='text-[#20B486]'>Achievements</span></h1>
            <p className='text-gray-500 py-2'>Choose Us for a World of Knowledge and Endless Opportunities in Your Cooking Journey.</p>
            <div className='grid grid-cols-2 py-16'>
              <div className=' py-6 flex'>
                <div className='p-4  rounded-xl bg-[#E9F8F3]'>
                  <FaGlobeAsia
                    size={30}
                    style={{ color: '#1A906B' }}
                  />
                </div>
                <div className='px-3'>
                  <h1 className='text-2xl font-bold'>10+</h1>
                  <p className='text-[#6D737A]'>Countries</p>
                </div>
              </div>
              <div className=' py-6 flex'>
                <div className='p-4  rounded-xl bg-[#FFFAF5]'>
                  <BiSolidInstitution
                    size={30}
                    style={{ color: '#FFC27A' }}
                  />
                </div>
                <div className='px-3'>
                  <h1 className='text-2xl font-bold'>100+</h1>
                  <p className='text-[#6D737A]'>Chefs</p>
                </div>
              </div>
              <div className=' py-6 flex'>
                <div className='p-4  rounded-xl bg-[#FFEEF0]'>
                  <PiBookFill
                    size={30}
                    style={{ color: '#ED4459' }}
                  />
                </div>
                <div className='px-3'>
                  <h1 className='text-2xl font-bold'>100+</h1>
                  <p className='text-[#6D737A]'>Courses</p>
                </div>
              </div>
              <div className=' py-6 flex'>
                <div className='p-4  rounded-xl bg-[#F0F7FF]'>
                  <FaUserGraduate
                    size={30}
                    style={{ color: '#0075FD' }}
                  />
                </div>
                <div className='px-3'>
                  <h1 className='text-2xl font-bold'>1000+</h1>
                  <p className='text-[#6D737A]'>Students</p>
                </div>
              </div>
            </div>
          </div>

          <img className=' m-auto md:order-last order-first rounded' alt="" src="https://www.heraldtribune.com/gcdn/authoring/2019/06/26/NSHT/ghows-LK-8c18d1ea-2228-1fe7-e053-0100007f4e92-7ed4c5c4.jpeg?width=660&height=440&fit=crop&format=pjpg&auto=webp" />


        </div>
      </div>

      <div className="">
        <div className="flex grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">


          <div className=" w-full overflow-hidden  bg-gradient-to-r from-green-400 to-yellow-300 bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat p-8  hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]">

            <div className='text-center my-8 text-4xl font-bold  mt-[-1px]'>
              <h1 className="font-bold mb-6 text-slate-500">Meet Our Most Famous <span className="md:text-6xl md:py-2 font-semibold text-[#20B486] ">Chefs</span> </h1>
            </div>
          </div>


        </div>
      </div>

      <div className="px-4 py-6 sm:px-0 ">
        <div className="flex grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <ChefListCard chefs={chefs} />
        </div>
      </div>

      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6 py-8">Meet our <span className="md:text-6xl md:py-2 font-semibold text-[#20B486] ">Leadership</span> </h2>

          <div className="grid gap-12 sm:grid-cols-2 xl:grid-cols-3">

            {people.map((person) => (
              <div key={person.name} className="flex flex-col items-center space-y-4">
                <img className="h-16 w-16 rounded-full object-cover" src={person.imageUrl} alt={person.name} />
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
                  <p className="text-sm font-medium text-indigo-600">{person.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <Footer />
    </main>
  );
}

export default Home;
