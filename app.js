const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://127.0.0.1:8081',
  }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', {
   
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/follows', require('./routes/follows'));
app.use('api/user',require("./routes/profileRoutes"))

// Route for uploading profile photo
app.post('/api/upload-profile-photo', upload.single('profilePhoto'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    // Access uploaded file info using req.file
    console.log(req.file);
    // Process the uploaded file (e.g., save it to the database, resize, etc.)
    // Respond with a success message
    res.status(200).json({ message: 'File uploaded successfully' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
