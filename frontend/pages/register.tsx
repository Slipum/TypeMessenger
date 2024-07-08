import axios from 'axios';
import { useState } from 'react';

const Register = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await axios.post('/auth/register', { username, email, password });
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex justify-center items-center h-screen">
			<form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
				<h2 className="text-2xl mb-4">Register</h2>
				<div className="mb-4">
					<label className="block mb-2">Username</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full px-3 py-2 border rounded"
					/>
				</div>
				<div className="mb-4">
					<label className="block mb-2">Email</label>
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full px-3 py-2 border rounded"
					/>
				</div>
				<div className="mb-4">
					<label className="block mb-2">Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full px-3 py-2 border rounded"
					/>
				</div>
				<button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
					Register
				</button>
			</form>
		</div>
	);
};

export default Register;
