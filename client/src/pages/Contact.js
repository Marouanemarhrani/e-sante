import React, { useState } from 'react';
import Layout from "../components/Layout/Layout"; // Assuming Layout is your page wrapper
import './Contact.css'; // Custom CSS for the page

const ContactPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isChatbotOpen, setIsChatbotOpen] = useState(false);

    // Handle sending a message
    const sendMessage = () => {
        if (newMessage.trim()) {
            setMessages([...messages, { text: newMessage, sender: 'senior' }]);
            setNewMessage('');
            // Logic to send the message to the tuteur can be implemented here
        }
    };

    // Toggle chatbot visibility
    const toggleChatbot = () => {
        setIsChatbotOpen(!isChatbotOpen);
    };

    // Simulate receiving a message from the tuteur
    const receiveMessage = (message) => {
        setMessages([...messages, { text: message, sender: 'tuteur' }]);
    };

    return (
    <Layout title="Contact">
        <h1>Chat entre Senior et Tuteur</h1>

        <div className="chat-section">
            <div className="chat-window">
                {messages.length === 0 ? (
                    <p>Aucun message pour le moment. Envoyez un message à votre tuteur.</p>
                ) : (
                    messages.map((message, index) => (
                        <div
                            key={index}
                            className={`message ${message.sender === 'senior' ? 'senior-message' : 'tuteur-message'}`}
                        >
                            {message.text}
                        </div>
                    ))
                )}
            </div>

            <div className="message-input">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Tapez votre message..."
                />
                <button onClick={sendMessage}>Envoyer</button>
            </div>
        </div>

        <div className="chatbot-section">
            <button className="chatbot-button" onClick={toggleChatbot}>
                {isChatbotOpen ? 'Fermer Chatbot' : 'Ouvrir Chatbot'}
            </button>

            {isChatbotOpen && (
                <div className="chatbot-window">
                    <iframe
                        src="https://your-chatbot-url.com"
                        title="Chatbot"
                        width="100%"
                        height="400px"
                    />
                </div>
            )}
        </div>
    </Layout>


    );
};

export default ContactPage;
