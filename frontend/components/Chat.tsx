import axios from 'axios';
import { useEffect, useState } from 'react';

interface Message {
	id: number;
	content: string;
}

const Chat = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [newMessage, setNewMessage] = useState<string>('');

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const response = await axios.get<Message[]>('/chat/messages');
				setMessages(response.data);
			} catch (error) {
				console.error(error);
			}
		};

		fetchMessages();
	}, []);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await axios.post<Message>('/chat/send', { content: newMessage });
			setMessages([...messages, response.data]);
			setNewMessage('');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<div>
				{messages.map((message) => (
					<div key={message.id}>{message.content}</div>
				))}
			</div>
			<form onSubmit={handleSubmit}>
				<input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
				<button type="submit">Send</button>
			</form>
		</div>
	);
};

export default Chat;
