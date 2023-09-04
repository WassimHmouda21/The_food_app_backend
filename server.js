const express  = require('express');
const cors  = require('cors');
const mongoose = require('mongoose'); // Importer Mongoose
const morgan = require ('morgan');
const { notFoundError, errorHandler } = require ('./middlewares/error-handler.js');
const authRouter = require('./routes/auth.js');
const Router = require('./routes/app.routes.js');
const app = express();
const port = process.env.PORT || 3000;
const databaseName = 'foodapp';


// Cela afichera les requêtes MongoDB dans le terminal
mongoose.set('strictQuery', false)
// Utilisation des promesses ES6 pour Mongoose, donc aucune callback n'est nécessaire
mongoose.Promise = global.Promise;

// Se connecter à MongoDB
mongoose
  .connect(`mongodb://localhost:27017/${databaseName}`)
  .then(() => {
    // Une fois connecté, afficher un message de réussite sur la console
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    // Si quelque chose ne va pas, afficher l'erreur sur la console
    console.log(err);
  });
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
// app.use(notFoundError);
 app.use(errorHandler);


app.use(express.urlencoded({
  extended: true
}));
app.use('/auth', authRouter);
app.use('/api', Router);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}/`);
});