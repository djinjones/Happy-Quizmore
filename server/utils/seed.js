const mongoose = require('mongoose');

const Question = require('../models/question');

const questions = [
    { title: 'The Waterboy', url: 'https://www.austinchronicle.com/binary/0641/waterboy.jpg' },
    { title: 'Happy Gilmore', url: 'https://res.cloudinary.com/pgatour-prod/pgatour/news/editorial/2016/02/07/HappyGilmore-Barker-1320.jpg' },
    { title: 'Mr. Deeds', url: 'https://dvdmedia.ign.com/dvd/image/deeds02.jpg?fit=bounds&width=1280&height=720' },
    { title: 'Little Nicky', url: 'https://robsmovievault.wordpress.com/wp-content/uploads/2014/01/mv5botu3mjk1oda3nl5bml5banbnxkftztcwmdazntu0na-_v1_sx640_sy720_.jpg' },
    { title: 'Big Daddy', url: 'https://miro.medium.com/v2/resize:fit:1200/1*wIbtNna2IUQ3YZFvvX3xnQ.jpeg' },
    { title: '50 First Dates', url: 'https://fullerstudio.fuller.edu/wp-content/uploads/2020/07/50-first-dates-pair.jpg' },
    { title: 'Click', url: 'https://resizing.flixster.com/vxhHJp_OoHeIhmE1WtV2u4lirC4=/270x160/v2/https://statcdn.fandango.com/MPX/image/NBCU_Fandango/346/526/fatguyclick.jpeg' },
    { title: 'The Longest Yard', url: 'https://i0.wp.com/midwestfilmjournal.com/wp-content/uploads/2023/08/LongestYard.jpeg' },
    { title: 'Bedtime Stories', url: 'https://resizing.flixster.com/eYwNR1mIR_77Wk-VOd0XmUFpG58=/1100x618/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p171576_i_h10_ac.jpg' },
    { title: 'Murder Mystery 2', url: 'https://www.hollywoodreporter.com/wp-content/uploads/2023/03/MM2_20220217_08220_R3-H-2023.jpg?w=1296&h=730&crop=1' },
    { title: 'Murder Mystery', url: 'https://static01.nyt.com/images/2019/06/14/arts/14murder-mystery/5da11389a9aa4d839950a1aa13fdc654-superJumbo.jpg' },
    { title: 'Billy Madison', url: 'https://static1.colliderimages.com/wordpress/wp-content/uploads/2022/04/Billy-Madison-Adam-Sandler.jpg' },
    { title: 'The Wedding Singer', url: 'https://m.media-amazon.com/images/M/MV5BMTg3MjYwZWItYzFhNi00M2IwLTlkYzgtYmUzODdiNjljMDY2XkEyXkFqcGdeQTNwaW5nZXN0._V1_.jpg' },
    { title: 'Grown Ups', url: 'https://m.media-amazon.com/images/M/MV5BMTQzNTg2OTg3OV5BMl5BanBnXkFtZTcwMzYyOTM1Mw@@._V1_.jpg' },
    { title: 'Grown Ups 2', url: 'https://pyxis.nymag.com/v1/imgs/be2/a5e/271bb6d58ffac4864c7252d062d5373b13-11-grown-ups2.2x.rsocial.w600.jpg' },
    { title: 'Uncut Gems', url: 'https://i0.wp.com/www.michigandaily.com/wp-content/uploads/2020/01/Edited_UncutGems.jpg?fit=720%2C481&ssl=1' },
    { title: 'Anger Management', url: 'https://www.toledoblade.com/image/2003/04/11/1140x_a10-7_cTC/Anger-Management.jpg' },
    { title: 'Blended', url: 'https://media.newyorker.com/photos/59095159ebe912338a3727dd/master/pass/Blended.jpg' },
    { title: 'Sandy Wexler', url: 'https://m.media-amazon.com/images/M/MV5BYWI4OTBkNmEtNWI5Yy00MDdlLWE3M2MtODA1ZTM0MTcwOGZhXkEyXkFqcGdeQXVyOTc5MDI5NjE@._V1_.jpg' },
  ];

async function seedDatabase() {
  try {

    await Question.deleteMany({});

    console.log('Cleared old questions... reseeding db...')

    const insertedQuestions = await Question.insertMany(questions);

    console.log('Questions seeded successfully!');

    // Use this only for debuging seed function, it puts too much information in the terminal
    // const newQuestionsArray = await Question.find({})
    // console.log(newQuestionsArray)

    return insertedQuestions;
  } catch (err) {
    console.error('Error seeding the database:', err);
  } 
};


module.exports = seedDatabase