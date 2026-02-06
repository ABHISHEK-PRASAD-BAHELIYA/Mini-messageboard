
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// --- DATA STORE ---
const messages = [
  {
    text: "Welcome to the new board! This looks so much better.",
    user: "System",
    added: new Date()
  },
  {
    text: "I love this clean design!",
    user: "DesignEnthusiast",
    added: new Date()
  }
];

// --- ROUTES ---

// 1. Index Route (Home)
app.get('/', (req, res) => {
  res.render('index', { title: "Message Board", messages: messages });
});

// 2. New Message Form Route
app.get('/new', (req, res) => {
  res.render('form', { title: "Post a Message" });
});

// 3. Create Message (POST)
app.post('/new', (req, res) => {
  const { text, user } = req.body;
  
  // Basic validation
  if(text && user) {
    messages.push({ 
      text: text, 
      user: user, 
      added: new Date() 
    });
  }
  
  res.redirect('/');
});

// 4. Message Details Route
app.get('/message/:id', (req, res) => {
  const id = req.params.id;
  const message = messages[id];
  
  if (message) {
    res.render('message', { title: "Message Details", message: message });
  } else {
    res.status(404).send('<h1>Message not found</h1><a href="/">Go Home</a>');
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});