const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from project root so /HTML, /CSS, /JS, /assets are accessible
app.use(express.static(path.join(__dirname, '..')));
app.use(bodyParser.json());

// Simple demo API endpoints
app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  // In a real app, validate credentials here. For demo accept any.
  return res.json({ message: 'Login successful' });
});

app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });
  // demo: return success
  return res.json({ message: 'Registration successful' });
});

app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ message: 'Email required' });
  // demo: pretend to send reset
  return res.json({ message: 'Reset email sent if account exists' });
});

// OAuth demo redirects
app.get('/auth/google', (req, res) => {
  // In a real app you'd redirect to Google's OAuth; for dev just redirect to auth page
  res.redirect('/HTML/auth.html');
});
app.get('/auth/github', (req, res) => {
  res.redirect('/HTML/auth.html');
});

// Fallback: if someone visits root, show index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'HTML', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
