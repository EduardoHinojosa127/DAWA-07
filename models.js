const mongoose = require('mongoose');

const artistaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  }
});

const generoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  }
});

const cancionSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  genero: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genero'
  },
  artista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artista'
  }
});

const Genero = mongoose.model('Genero', generoSchema);
const Cancion = mongoose.model('Cancion', cancionSchema);
const Artista = mongoose.model('Artista', artistaSchema);

module.exports = {
  Genero,
  Cancion,
  Artista
};
