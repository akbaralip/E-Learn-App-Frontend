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
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


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

  const user = useSelector(state => state.auth);

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
      <div className="max-w-7xl mx-auto mb-8 sm:px-6 lg:px-8">
        <div className="w-full bg-white">
          <div className="md:max-w-[1380px] m-auto grid md:grid-cols-2 max-w-[350px] gap-8">
            <div className="flex flex-col justify-center gap-4 md:mr-8 animate__animated animate__bounce px-2 py-4 ">
              <p className="md:text-2xl md:py-2 text-[#20B486] font-medium">EXPAND YOUR SKILLS</p>
              <h1 className="md:text-6xl md:py-2 font-semibold">
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
            <div className="md:order-last order-first flex px-2 py-10 md:py-0 " style={{ height: '500px' }}>
              {View}
            </div>
          </div>
          <div className="flex max-lg justify-center items-center font-bold text-lg border-t-2  border-t-slate-200 my-4 pt-7"></div>
        </div>

        <div className='w-full bg-white py-16 px-6'>
          <div className='md:max-w-[1080px] m-auto grid md:grid-cols-2 max-w-[350px]'>

            <div className='flex flex-col justify-center   '>

              <h1 className='text-3xl py-2 font-semibold mb-4'>REGISTER MY  <span className='text-[#20B486]'>Chef Charisma </span></h1>
              <div class="text-media__description">You can now register your chef charisma into your account.
                Sign up, add your course to your collection and enjoy the full chef charisma Experience.
                Want to personalize your watch with a compatible course?
                Want to know about your study status?
                Want to know how to get the most of your chef thanks to your user guide?
                Want to access your past order and personal information?
                All you need is accessible in your account. </div>

            </div>

          </div>
          {user.username ? (
            null
          ) : (
            <Link to="/Signup">
              <button className='px-9'>
                <a className=" mt-6 px-12 py-3 relative rounded group overflow-hidden font-medium  bg-[#96f2d3b2] text-black inline-block">
                  <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-[#88b420] group-hover:h-full opacity-90"></span>
                  <span className="relative group-hover:text-white">
                    Register now
                  </span>
                </a>
              </button>
            </Link>
          )}

        </div>

      </div>



      <div className='flex justify-center mb-8'>
        <h1 className="md:text-2xl md:py-2  font-medium">Its Our Trending<span className="md:text-6xl md:py-2 font-semibold text-[#20B486] "> Categories</span> </h1>
      </div>

      <div className="px-4 py-6 sm:px-0 ">
        <div className="flex grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" >
          <Card categories={categories} />
        </div>
      </div>


      <div className='mani flex flex-col lg:flex-row py-16 px-10'>
        <div className='flex flex-col justify-center'>
          <h1 className='text-3xl py-2 font-semibold'>Our <span className='text-[#20B486]'>Achievements</span></h1>
          <p className='text-gray-500 py-2'>Choose Us for a World of Knowledge and Endless Opportunities in Your Cooking Journey.</p>
          <div className='grid grid-cols-1 lg:grid-cols-2 py-1'>
            <div className='py-6 flex justify-center items-center'>
              <div className='p-4 rounded-xl bg-[#E9F8F3]'>
                <FaGlobeAsia size={30} style={{ color: '#1A906B' }} />
              </div>
              <div className='px-3'>
                <h1 className='text-2xl font-bold'>10+</h1>
                <p className='text-[#6D737A]'>Countries</p>
              </div>
            </div>
            <div className='py-6 flex justify-center items-center'>
              <div className='p-4 rounded-xl bg-[#FFFAF5]'>
                <BiSolidInstitution size={30} style={{ color: '#FFC27A' }} />
              </div>
              <div className='px-3'>
                <h1 className='text-2xl font-bold'>100+</h1>
                <p className='text-[#6D737A]'>Chefs</p>
              </div>
            </div>
            <div className='py-6 flex justify-center items-center'>
              <div className='p-4 rounded-xl bg-[#FFEEF0]'>
                <PiBookFill size={30} style={{ color: '#ED4459' }} />
              </div>
              <div className='px-3'>
                <h1 className='text-2xl font-bold'>100+</h1>
                <p className='text-[#6D737A]'>Courses</p>
              </div>
            </div>
            <div className='py-6 flex justify-center items-center'>
              <div className='p-4 rounded-xl bg-[#F0F7FF]'>
                <FaUserGraduate size={30} style={{ color: '#0075FD' }} />
              </div>
              <div className='px-3'>
                <h1 className='text-2xl font-bold'>1000+</h1>
                <p className='text-[#6D737A]'>Students</p>
              </div>
            </div>
          </div>
        </div>

        <div className='py-4 px-6 lg:px-28'>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/I_6aMZwf9CU?autoplay=1&mute=1"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>

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
