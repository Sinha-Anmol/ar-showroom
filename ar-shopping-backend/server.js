const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Serve models
app.use('/models', express.static(path.join(__dirname, 'models')));

app.get('/api/products', (req, res) => {
  const products = [
    { id: 1, name: 'Model 1', model: 'model1.glb' },
    { id: 2, name: 'Model 2', model: 'model2.glb' }
  ];
  res.json(products);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
