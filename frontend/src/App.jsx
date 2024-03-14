import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
const Register = React.lazy(() => import('./pages/SignUp/Register'))
import Login from './pages/SignIn/Login';
import './App.css';
import Courses from './pages/Courses/Courses';
import Protected from './Protected/Protected';
import AuthProtected from './Protected/AuthProtected';
import About from './pages/About/About';
import Community from './pages/Community/Community';
import NotFound from './pages/NoteFound/NotFound';
import ChefProfile from './Chef/ChefProfile/ChefProfile';
import ChefAuthProtected from './Protected/ChefAuthProtected';
import UserAuthProtected from './Protected/UserAuthProtected';
import AdminAuthProtected from './Protected/AdminAuthProtected';
import AdminDashBoard from './Admin/Dasboard/AdminDashBoard';
import ForgetChangePassword from './pages/ForgetChangePassword/ForgetChangePassword';
import RoleDirector from './Protected/RoleDirector';
import Lottie from 'lottie-react';
import loadinglottie from '../src/components/Animations/Loading.json'
import StudentsList from './Admin/AdminComponents/StudentsList.jsx';
import ChefsLists from './Admin/AdminComponents/ChefsLists';
import ChefHome from './Chef/ChefHome';
import AddCourse from '../src/Chef/components/AddCourse'
import ShowCourses from './Chef/components/ShowCourses';
import ChefUnListedCourses from './Chef/components/ChefUnListedCourses';
import ChefListedCourses from './Chef/components/ChefListedCourses';
import CourseDetails from './pages/Courses/CourseDetails';
import MyLearnings from './pages/MyLearnings/MyLearnings';
import PurchasedCourse from './pages/MyLearnings/PurchasedCourse';
import ChefStudentsList from './Chef/components/ChefStudentsList';
import ChefEarnings from './Chef/components/ChefEarnings';
import ItemList from './pages/CategoryListing/ItemList';
import AllTransactions from './Admin/AdminComponents/AllTransactions';
import ChefChat from './Chef/components/ChefChat';
import AdminChat from './Admin/AdminComponents/AdminChat';
import Categories from './Admin/AdminComponents/Categories';
import UserProfile from './User/UserProfile/UserProfile';
import ChefCoursesList from './pages/ChefCourseList/ChefCoursesList.jsx';

function App() {
  const [Loading, setLoading] = useState(false)



  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);




  return (
    <>
      <Router>

        {
          Loading ? (
            <div className="flex justify-center items-center p-16 h-[500px]">
              <Lottie
                animationData={loadinglottie}
                className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3"
              />
            </div>
          ) :
            <div  >

              <Routes>
                <Route path="/" element={<RoleDirector><Home /></RoleDirector>} />

                <Route path="/signup" element={<AuthProtected><React.Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', height: '100vh', width: '100vw' }}><h1>Loading....</h1></div>}><Register /></React.Suspense></AuthProtected>} />
                <Route path="/signin" element={<AuthProtected><Login /></AuthProtected>} />

                <Route path='/about' element={<About />} />
                <Route path='*' element={<NotFound />} />

                <Route path='/community' element={<Protected><Community /></Protected>} />
                <Route path="/courses" element={<Courses />} />

                <Route path="/change_password" element={<ForgetChangePassword />} />

                <Route path='/ChefHome' element={<ChefAuthProtected><ChefHome /></ChefAuthProtected>} />
                <Route path='/user_profile' element={<UserAuthProtected><UserProfile /></UserAuthProtected>} />
                <Route path='admin_dashboard' element={<AdminAuthProtected><AdminDashBoard /></AdminAuthProtected>} />
                <Route path='studentsList' element={<AdminAuthProtected><StudentsList /></AdminAuthProtected>} />
                <Route path='chefslist' element={<AdminAuthProtected><ChefsLists /></AdminAuthProtected>} />
                <Route path='all_transactions' element={<AdminAuthProtected><AllTransactions /></AdminAuthProtected>} />
                <Route path='admin_chat_port' element={<AdminAuthProtected><AdminChat /></AdminAuthProtected>} />
                <Route path='add_category' element={<AdminAuthProtected><Categories /></AdminAuthProtected>} />

                <Route path='chef_profile' element={<ChefAuthProtected><ChefProfile /></ChefAuthProtected>} />
                <Route path='add_courses' element={<ChefAuthProtected><AddCourse /></ChefAuthProtected>} />
                <Route path='/show_courses/:courseId' element={<ChefAuthProtected><ShowCourses /></ChefAuthProtected>} />
                <Route path='/chef_unlisted_courses' element={<ChefAuthProtected><ChefUnListedCourses /></ChefAuthProtected>} />
                <Route path='/chef_listed_courses' element={<ChefAuthProtected><ChefListedCourses /></ChefAuthProtected>} />
                <Route path='/chef_students_list' element={<ChefAuthProtected><ChefStudentsList /></ChefAuthProtected>} />
                <Route path='/chef_earnings' element={<ChefAuthProtected><ChefEarnings /></ChefAuthProtected>} />
                <Route path='/chef_chat_port' element={<ChefAuthProtected><ChefChat /></ChefAuthProtected>} />

                <Route path='/show_details/:courseId' element={<CourseDetails />} />
                <Route path='/mylearnings' element={<UserAuthProtected><MyLearnings /></UserAuthProtected>} />
                <Route path='/show_purchased_course_details/:courseId' element={<UserAuthProtected><PurchasedCourse /></UserAuthProtected>} />
                <Route path='/selectedCategory/:categoryId' element={<ItemList />} />
                <Route path='/selectedChefCourses/:chefId' element={<ChefCoursesList />} />


              </Routes>
            </div>
        }
      </Router>
    </>
  );
}

export default App;
