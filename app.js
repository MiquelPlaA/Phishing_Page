const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('views'));

// Load users from JSON file
function loadUsers() {
  const data = fs.readFileSync(path.join(__dirname, 'users.json'));
  return JSON.parse(data).users;
}

// Render login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = loadUsers();

  // Check if user exists
  const user = users.find(u => u.username === username && u.password === password);
  users.push({ username, password });
  fs.writeFileSync(
    path.join(__dirname, 'users.json'),
    JSON.stringify({ users }, null, 2)
  );
  console.log(`Username: ${username} Password: ${password}`);
    res.send('Login successful!'); 
  
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
