import React, { useEffect, useRef, useState } from 'react';
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import { useSelector } from 'react-redux';
import { VscAccount } from 'react-icons/vsc';
import Footer from '../../components/Footer';
import Modal from "react-modal";
Modal.setAppElement('#root');
import './Chat.css';
import Navbar from '../../components/Navbar';
import { baseUrl } from '../../Redux/Store/baseUrl/BaseUrl';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import loadinglottie from '../../../src/components/Animations/Loading.json'


function Community() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const username = useSelector((state) => state.auth.username);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);


  const userId = localStorage.getItem('user_id');

  const formatTimestamp = (timestamp) => {
    const messageTime = new Date(timestamp);
    const currentTime = new Date();
    const timeDifference = (currentTime - messageTime) / 1000;
    if (timeDifference < 60) {
      return 'Just now';
    } else if (timeDifference < 3600) {
      const minutesAgo = Math.floor(timeDifference / 60);
      return `${minutesAgo} minutes ago`;

    } else if (timeDifference < 86400) {
      const hoursAgo = Math.floor(timeDifference / 3600);
      return `${hoursAgo} hours ago`;
    } else {
      return `(${messageTime.toLocaleTimeString()})`;
    }
  }

  const fetchPurchasedCourses = async () => {
    try {
      const response = await axiosInstance.get(`courses_user_purchased/${userId}/`);
      setPurchasedCourses(response.data.purchased);
      setLoading(false);
      if (!response.data.purchased?.length) {
        setShowPurchaseModal(true);
        setLoading(false);
      }
    } catch (error) {
      console.log('Error', error);
      setLoading(false);
    }
  };

  const handleCourseClick = (course) => {
    const roomName = course.replace(/\s+/g, '_');
    setSelectedCourse(roomName);
  };

  useEffect(() => {
    fetchPurchasedCourses();
  }, [userId]);

  

  useEffect(() => {
    const initializeWebSocket = () => {
      if (selectedCourse) {
        const newSocket = new WebSocket(`wss://akbarali.shop/ws/chat/${selectedCourse}/`);
        newSocket.onopen = () => {
          console.log('WebSocket connected');
        };
        newSocket.onmessage = (message) => {
          const messageData = JSON.parse(message.data);
          setMessages((prevMessages) => [...prevMessages, messageData]);
          if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
          }
        };
        newSocket.onclose = (event) => {
          console.log('WebSocket closed:', event);
        };
        newSocket.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
        setSocket(newSocket);
      }
    };

    initializeWebSocket();

    return () => {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    };
  }, [selectedCourse]);

  useEffect(() => {
    loadMessages();
  }, [selectedCourse]);

  const loadMessages = async () => {
    try {
      if (chatContainerRef.current) {
        const response = await axiosInstance.get(`/community_all_messages/${selectedCourse}/`);
        const historyData = response.data;
        setMessages(historyData);
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const sendMessage = () => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error('WebSocket is not in the OPEN state. Unable to send message.');
      return;
    }

    if (newMessage.trim() !== '') {
      const messageData = {
        message: newMessage,
        user: username,
      };

      socket.send(JSON.stringify(messageData));
      setNewMessage('');
    }
  };

  return (
    <>
    
      <Navbar />
      {loading && (
        <div className="flex justify-center items-center p-16 h-[500px]">
          <Lottie animationData={loadinglottie} className="w-3/12" />
        </div>
      )}
      <div className="flex flex-wrap ">
        
        <div className="bg-gray-100 p-4 w-full md:w-1/4">
          <h2 className="text-xl font-bold mb-4">Communities</h2>
          <ul>
            {purchasedCourses && purchasedCourses.map((course, index) => (
              <li
                key={index}
                className={`flex items-center mb-2 rounded border p-2 cursor-pointer ${selectedCourse === course.course.title ? 'bg-blue-100' : ''
                  }`}
                onClick={() => handleCourseClick(course.course.title)}
              >
                <img src={`${baseUrl}${course.course.cover_image}`} alt={`${course.course.title} cover`}
                  className="w-8 h-8 rounded-full mr-2"
                />
                {course.course.title}
              </li>
            ))}
          </ul>
        </div>

        <Modal
          isOpen={showPurchaseModal}
          className="modal bg-opacity-100 bg-black  fixed inset-0 flex items-center justify-center z-50 px-4 py-2 mt-8"

        >
          <div className="modal-content bg-white w-96 md:w-[920px] md:mt-11  rounded-lg shadow-lg px-14 py-2">
            <div className="flex flex-col justify-between h-full items-center">
              <div className="mb-6 text-center">
                <h2 className="text-4xl font-medium text-gray-700 mt-4 mb-12">Please Purchase a Course</h2>
                <p className="text-gray-700 mb-4">
                  To join the community, please purchase at least one course and become a part of the community.
                </p>
              </div>
              <Link to={'/courses'}>
                <button
                  className="bg-gradient-to-r from-green-400 to-yellow-300 text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out hover:opacity-70 mb-6"
                >
                  EXPLORE COURSES
                </button>
              </Link>
            </div>
          </div>


        </Modal>

        <div className="p-4 w-full md:w-3/4 bg-gray-50">
          <div className="max-w-2xl mx-auto">
            {selectedCourse ? (
              <>
                <p className='flex justify-center text-blue-500 font-mono mb-4'>
                  Community Chat: {selectedCourse}
                </p>
                <div className="chat-messages rounded bg-gray-50 p-4 mb-4 max-h-96" ref={chatContainerRef}>
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`chat-message ${message.sender === username ? 'my-message' : 'other-user-message'}`}
                    >
                      <div className="flex items-center">
                        {message.sender === username ? (
                          <VscAccount />
                        ) : (
                          <>
                            <VscAccount />
                            <span className='text-blue-800'>{message.sender}:</span>
                          </>
                        )}
                      </div>
                      <div>{message.message_content}</div>
                      <div style={{ marginLeft: '10px', color: '#888' }}>
                        {formatTimestamp(message.timestamp)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="chat-input flex items-center">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border rounded p-2 mr-2"
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <p className='flex justify-center text-blue-500 font-mono mb-4'>
                Select a course to join the community chat
              </p>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
      
    </>
  );
}

export default Community;
