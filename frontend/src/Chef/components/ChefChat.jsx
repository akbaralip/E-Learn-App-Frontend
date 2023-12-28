import React, { useEffect, useRef, useState } from 'react';
import ChefNavbar from './ChefNavbar';
import ChefFooter from './ChefFooter';
import axiosInstance from '../../AxiosInstance/AxiosIntercepter';
import { useSelector } from 'react-redux';
import { VscAccount } from 'react-icons/vsc';

function ChefChat() {
    const [adminUserId, setAdminUserId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const chatContainerRef = useRef(null);

    const username = useSelector((state) => state.auth.username);

    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/one_to_one_chat/${adminUserId}/`);

    const fetchAdminDetails = async () => {
        try {
            const response = await axiosInstance.get('/api/get_admin_user_id/');
            setAdminUserId(response.data.admin_user_id);
        } catch (error) {
            console.log('error', error);
        }
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
    }, [adminUserId]);


    const fetchOneToOneChatMessages = async () => {
        try {
            if (adminUserId) {
                const response = await axiosInstance.get(`/one_to_one_chat_messages/${adminUserId}/`);
                setMessages(response.data);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    

    return (
        <>
            <ChefNavbar />
            <div>
                <div className="p-4 mt-6 mb-24">
                    <div className="chat-container max-w-2xl mx-auto ">
                        <div className="chat-messages border rounded bg-white p-4 mb-4 max-h-96 " ref={chatContainerRef}>
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`chat-message ${message.sender === username ? 'my-message' : 'other-user-message'
                                        }`}
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

export default ChefChat;
