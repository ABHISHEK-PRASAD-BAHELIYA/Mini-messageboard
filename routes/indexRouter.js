
const express = require('express');
const router = express.Router();

// 1. Create the messages array
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

// 2. Index route ("/")
router.get('/', (req, res) => {
  res.render('index', { title: "Mini Messageboard", messages: messages });
});

// 3. New Message Form route ("/new")
router.get('/new', (req, res) => {
  res.render('form', { title: "New Message" });
});

// 4. Handle POST request for new messages
router.post('/new', (req, res) => {
  const messageUser = req.body.user;
  const messageText = req.body.text;
  
  messages.push({ 
    text: messageText, 
    user: messageUser, 
    added: new Date() 
  });
  
  res.redirect('/');
});

// 5. Route to see message details ("open" button)
router.get('/message/:id', (req, res) => {
  const messageId = req.params.id;
  const message = messages[messageId];
  
  if (message) {
    res.render('message', { title: "Message Details", message: message });
  } else {
    res.status(404).send('Message not found');
  }
});

module.exports = router;