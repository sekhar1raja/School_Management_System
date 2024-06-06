const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === '' && password === '') {
    res.json({ success: true, message: 'User authenticated successfully' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid email or password' });
  }
});


app.get('/studentCount', (req, res) => {
  
  const studentCount = 100;
  res.json({ studentCount });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
