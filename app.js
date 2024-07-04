const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

require('dotenv').config()

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


// db.User.create({
//   nom: 'Hugo',
//   prenom: 'Bigeas',
//   email: 'hugo.bigeas@estiam.com',
//   tel: '123-456-7890',
//   date_naissance: new Date('1980-01-01'),
//   sexe: 'Feminin',
//   qualification: 'Ingénieur Dev',
//   pays: 'France',
//   ville: 'Paris',
//   statut: 'Actif'
// }).then(utilisateur => {
//   console.log('Nouvelle entrée créée:', utilisateur);
// }).catch(error => {
//   console.error('Erreur lors de la création de l\'entrée:', error);
// });

// Synchroniser avec la base de données
db.sequelize.sync().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
