const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

const cors = require('cors') // initialisation de cors

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importer les routes
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

const authRoutes = require('./routes/auth')
app.use('/api/auth', authRoutes)

// Synchroniser avec la base de données
db.sequelize.sync().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
