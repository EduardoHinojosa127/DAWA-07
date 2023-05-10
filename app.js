const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { Genero } = require('./models');
const { Cancion } = require('./models');
const Artista = require('./models').Artista;

app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/musica', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a la base de datos');
  })
  .catch((error) => {
    console.log('Error de conexión a la base de datos:', error);
  });

app.set('view engine', 'ejs');
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

// Artistas

app.get('/artistas', async (req, res) => {
  try {
    const artistas = await Artista.find({});
    res.render('artistas', { artistas });
  } catch (error) {
    console.log('Error al recuperar los artistas:', error);
    res.status(500).send('Error al recuperar los artistas');
  }
});

app.post('/artistas', async (req, res) => {
  const nuevoArtista = new Artista({
    nombre: req.body.nombre
  });
  try {
    await nuevoArtista.save();
    res.redirect('/artistas');
  } catch (error) {
    console.log('Error al agregar el artista:', error);
    res.status(500).send('Error al agregar el artista');
  }
});

app.get('/agregar-artista', (req, res) => {
  res.render('agregarArtista');
});

// Generos

app.get('/generos', async (req, res) => {
  try {
    const generos = await Genero.find({});
    res.render('generos', { generos });
  } catch (error) {
    console.log('Error al recuperar los generos:', error);
    res.status(500).send('Error al recuperar los generos');
  }
});

app.post('/generos', async (req, res) => {
  const nuevoGenero = new Genero({
    nombre: req.body.nombre
  });
  try {
    await nuevoGenero.save();
    res.redirect('/generos');
  } catch (error) {
    console.log('Error al agregar el genero:', error);
    res.status(500).send('Error al agregar el genero');
  }
});

app.get('/agregar-genero', (req, res) => {
  res.render('agregarGenero');
});

// canciones

app.get('/canciones', async (req, res) => {
  try {
    const canciones = await Cancion.find().populate('genero').populate('artista').exec();
    res.render('canciones', { canciones });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al mostrar las canciones');
  }
});

app.post('/canciones', async (req, res) => {
  try {
    // Creamos un objeto Cancion con los datos del formulario
    const cancion = new Cancion({
      nombre: req.body.nombre,
      genero: req.body.genero,
      artista: req.body.artista
    });

    // Guardamos la canción en la base de datos
    await cancion.save();
    res.redirect('/canciones');
  } catch (error) {
    console.error('Error al agregar la canción:', error);
    res.status(500).send('Error al agregar la canción');
  }
});


app.get('/agregar-cancion', async (req, res) => {
  try {
    const artistas = await Artista.find();
    const generos = await Genero.find();
    res.render('agregarCancion', { artistas, generos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar los artistas y los géneros');
  }
});



app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
