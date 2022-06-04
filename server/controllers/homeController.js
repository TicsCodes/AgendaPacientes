// URL: Get /
const index = (req, res) => {
  // Calculando emoji
  const emojiDataset = ['🐸', '🐲', '🐈‍⬛', '🐾', '🦬', '🐉', '🦖'];
  const emoji = emojiDataset[Math.floor(Math.random() * emojiDataset.length)];

  // view Models
  const viewModel = {
    title: 'Agenda de Pacientes',
    author: 'Isaac Estrada',
    emoji,
  };
  res.render('home/indexView', viewModel);
};

// URL: Get /about
const about = (req, res) => {
  res.render('home/aboutView', {
    name: 'Isaac Estrada',
    email: 'isaacitgam@gmail.com',
    url: 'https://www.facebook.com/gears9208/',
    description:
      'Terapeuta Profesional en Masajes Relajantes y Descontracturantes ',
    cedula: 'CHL-050830-SB9-0013',
    num: '55-4421-7353',
  });
};

export default {
  // action methods
  index,
  about,
};
