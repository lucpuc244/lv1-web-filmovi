const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// koristi EJS
app.set('view engine', 'ejs');

// koristi public folder za statičke datoteke
app.use(express.static(path.join(__dirname, 'public')));

// početna stranica
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// galerija slika
app.get('/slike', (req, res) => {
  const folderPath = path.join(__dirname, 'public', 'posteri');
  const files = fs.readdirSync(folderPath);

  const images = files
    .filter(file =>
      file.endsWith('.jpg') ||
      file.endsWith('.jpeg') ||
      file.endsWith('.png') ||
      file.endsWith('.webp') ||
      file.endsWith('.svg')
    )
    .map((file, index) => ({
      url: `/posteri/${file}`,
      id: `slika${index + 1}`,
      title: file
        .replace(/\.[^/.]+$/, '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, slovo => slovo.toUpperCase())
    }));

  res.render('slike', { images });
});

app.listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`);
});