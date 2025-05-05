const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, 'credentials.json');

app.post('/register', (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  let credentials = [];
  if (fs.existsSync(dataFilePath)) {
    const fileData = fs.readFileSync(dataFilePath);
    credentials = JSON.parse(fileData);
  }

  // Check if email already exists
  if (credentials.find(cred => cred.email === email)) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  credentials.push({
    fullName,
    email,
    password
  });

  fs.writeFileSync(dataFilePath, JSON.stringify(credentials, null, 2));

  res.json({ message: 'Registration successful' });
});

app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  let credentials = [];
  if (fs.existsSync(dataFilePath)) {
    const fileData = fs.readFileSync(dataFilePath);
    credentials = JSON.parse(fileData);
  }

  credentials.push({ email, password });

  fs.writeFileSync(dataFilePath, JSON.stringify(credentials, null, 2));

  res.json({ message: 'Credentials saved successfully' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (!fs.existsSync(dataFilePath)) {
    return res.status(400).json({ error: 'No credentials found. Please sign up first.' });
  }

  const fileData = fs.readFileSync(dataFilePath);
  const credentials = JSON.parse(fileData);

  const user = credentials.find(
    (cred) => cred.email === email && cred.password === password
  );

  if (user) {
    res.json({ message: 'Login successful', user: { email: user.email, fullName: user.fullName, photoFilename: user.photoFilename } });
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
