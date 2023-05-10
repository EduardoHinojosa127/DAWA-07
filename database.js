const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/musica', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conexión a la base de datos exitosa');
})
.catch((err) => {
  console.log('Error al conectar a la base de datos:', err);
});
