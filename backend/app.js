const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes.js');
const chatRoutes = require('./routes/chatRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
