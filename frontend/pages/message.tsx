import axios from 'axios';
import { useEffect, useState } from 'react';

interface Message {
	id: number;
	content: string;
	User: {
		username: string;
	};
}

const Messages: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([]);

	useEffect(() => {
		fetchMessages();
	}, []);

	const fetchMessages = async () => {
		try {
			const response = await axios.get('/api/messages');
			setMessages(response.data);
		} catch (error) {
			console.error('Error fetching messages:', error);
		}
	};

	return (
		<div>
			<h1>Messages</h1>
			<ul>
				{messages.map((message) => (
					<li key={message.id}>
						<p>{message.content}</p>
						<p>From: {message.User?.username}</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Messages;
