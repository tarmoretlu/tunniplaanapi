const express = require('express');
const app = express();

const port = 3000;

const tunniplaan = [
 
  {
    id:1,
    kursus:"RIF2",
    kuupaev:"06.02.2021",
    alguskell:"14:15",
    loppkell:"17:30",
    ainekood:"HKI5003.HK",
    ainenimetus:"Programmeerimine II",
    maht:"4",
    oppejoud:"Martti Raavel",
    ruum:"",
    kommentaar:"GoogleMeet"
}

];

app.use(express.json());

app.get('/tunniplaan', (req, res) => {
  res.status(200).json({
    tunniplaan: tunniplaan
  });
});

app.get('/tunniplaan/:id', (req, res) => {
    //const key = req.query.key;
  const id = req.params.id;
  const tund = tunniplaan[id-1];
  res.status(200).json({
    tunniplaan: tund
  });
});

app.post('/tunniplaan', (req, res) => {
    const kursus = req.body.kursus;
    const kuupaev = req.body.kuupaev;
    const alguskell = req.body.alguskell;
    const loppkell = req.body.loppkell;
    const ainekood = req.body.ainekood;
    const ainenimetus = req.body.ainenimetus;
    const maht = req.body.maht;
    const oppejoud = req.body.oppejoud;
    const ruum = req.body.ruum;
    const kommentaar = req.body.kommentaar;
    if (kursus && kuupaev && alguskell && loppkell && ainekood && ainenimetus && maht && oppejoud) {
      const tund = {
        id: tunniplaan.length + 1,
        kursus : kursus,
        kuupaev : kuupaev,
        alguskell : alguskell,
        loppkell : loppkell,
        ainekood : ainekood,
        ainenimetus : ainenimetus,
        maht : maht,
        oppejoud : oppejoud,
        ruum : ruum,
        kommentaar : kommentaar
      };
      tunniplaan.push(tund);
      res.status(201).json({
        id: tunniplaan.id
      });
    } else {
      res.status(400).json({
        error: 'Andmed puudulikud'
      });
    }
  });



  app.delete('/tunniplaan/:id', (req, res) => {
    const id = req.params.id;
    tunniplaan.splice(id - 1, 1);
    res.status(200).end();
  });

  
  app.patch('/tunniplaan/:id', (req, res) => {
    const id = req.params.id;
    //const description = req.body.description;
    const kursus = req.body.kursus;
    const kuupaev = req.body.kuupaev;
    const alguskell = req.body.alguskell;
    const loppkell = req.body.loppkell;
    const ainekood = req.body.ainekood;
    const ainenimetus = req.body.ainenimetus;
    const maht = req.body.maht;
    const oppejoud = req.body.oppejoud;
    const ruum = req.body.ruum;
    const kommentaar = req.body.kommentaar;
    tunniplaan[id - 1].kursus = kursus;
    tunniplaan[id - 1].kuupaev = kuupaev;
    tunniplaan[id - 1].alguskell = alguskell;
    tunniplaan[id - 1].loppkell = loppkell;
    tunniplaan[id - 1].ainekood = ainekood;
    tunniplaan[id - 1].ainenimetus = ainenimetus;
    tunniplaan[id - 1].maht = maht;
    tunniplaan[id - 1].oppejoud = oppejoud;
    tunniplaan[id - 1].ruum = ruum;
    tunniplaan[id - 1].kommentaar = kommentaar;
    res.status(200).json({
      success: true
    });
  });


app.listen(port, () => {
  console.log('Server jookseb pordil:', port);
});