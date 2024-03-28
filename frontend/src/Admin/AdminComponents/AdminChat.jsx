import React, { useEffect, useRef, useState } from 'react';
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import { useSelector } from 'react-redux';
import { VscAccount } from 'react-icons/vsc';
import AdminNav from '../AdminNav/AdminNav';
import ChefFooter from '../../Chef/components/ChefFooter';
import { baseUrl } from '../../Redux/Store/baseUrl/BaseUrl';

function AdminChat() {
    const [adminUserId, setAdminUserId] = useState(null);
    const [chefs, setChefs] = useState([]);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [selectedChef, setSelectedChef] = useState(null); 
    const chatContainerRef = useRef(null);

    const username = useSelector((state) => state.auth.username);

    console.log('adminUserId===>>', adminUserId);
    console.log('messages===>>', messages);
    console.log('chefs===>>', chefs);
    console.log('selectedChef===>>', selectedChef);

    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/one_to_one_chat/${adminUserId}/`);

    const fetchAdminDetails = async () => {
        try {
            const response = await axiosInstance.get('/api/get_admin_user_id/');
            setAdminUserId(response.data.admin_user_id);
        } catch (error) {
            console.log('error', error);
        }
    };

    const fetchChefs = async () => {
        try {
            const response = await axiosInstance.get('/api/get_all_chefs/');
            setChefs(response.data);
        } catch (error) {
            console.log('error', error);
        }
    }

    const handleChefSelection = (chef) => {
        setSelectedChef(chef);
    };

    useEffect(() => {
        const initializeWebSocket = () => {
            if (adminUserId) {
                socket.onopen = () => {
                    console.log('WebSocket connected');
                };

                socket.onmessage = (message) => {
                    const messageData = JSON.parse(message.data);
                    setMessages((prevMessages) => [...prevMessages, messageData]);
                    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                };

                socket.onclose = (event) => {
                    console.log('WebSocket closed:', event);
                };

                return () => {
                    socket.onmessage = null;
                    socket.close();
                };
            }
        };

        fetchAdminDetails();
        initializeWebSocket();
        fetchChefs();
    }, [adminUserId]);

    const sendMessage = () => {
        if (newMessage.trim() !== '') {
            const messageData = {
                message: newMessage,
                user: username,
            };

            socket.send(JSON.stringify(messageData));
            setNewMessage('');
        }
    };

    useEffect(() => {
        fetchOneToOneChatMessages();
    }, [adminUserId, selectedChef]);

    const fetchOneToOneChatMessages = async () => {
        try {
            if (adminUserId && selectedChef) {
                const response = await axiosInstance.get(`/one_to_one_chat_messages/${adminUserId}/`);
                setMessages(response.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <>
            <AdminNav />
            <div className="flex flex-wrap " style={{ height: '600px' }}>
                {/* Chef List */}
                <div className="bg-gray-100 p-4 w-full md:w-1/4">
                    <h2 className="text-xl font-bold mb-4">Chefs</h2>
                    <ul>
                        {chefs.map((chef) => (
                            <li
                                key={chef.id}
                                className={`flex items-center mb-2 rounded border p-2 cursor-pointer ${selectedChef && selectedChef.id === chef.id ? 'bg-blue-100' : ''}`}
                                onClick={() => handleChefSelection(chef)}
                            >
                                <img
                                    src={chef.image}
                                    alt={`${chef.username} avatar`}
                                    className="w-8 h-8 rounded-full mr-2"
                                />
                                <span>{chef.username}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Chat Box */}
                <div className="p-4 w-full md:w-3/4 bg-gray-50">
                    <div className="max-w-2xl mx-auto">
                        <h1 className='flex justify-center text-blue-500 font-mono mb-4'>{selectedChef ? `Chatting with ${selectedChef.username}` : 'Chat with chef\'s'}</h1>
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
                                        ({new Date(message.timestamp).toLocaleTimeString()})
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
                    </div>
                </div>
            </div>

            <ChefFooter />
        </>
    );
}

export default AdminChat;
