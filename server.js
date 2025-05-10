import express from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());


let testimonials = [
  { id: 1, nickname: "Иван", text: "Отличный сервис!", rating: 5, date: "2023-05-15" },
  { id: 2, nickname: "Мария", text: "Очень довольна!", rating: 4, date: "2023-06-20" }
];


app.get('/api/testimonials', (req, res) => {
  res.json(testimonials);
});


app.post('/api/testimonials', (req, res) => {
  const newReview = {
    id: testimonials.length + 1,
    nickname: req.body.nickname,
    text: req.body.text,
    rating: parseInt(req.body.rating),
    date: new Date().toISOString()
  };
  
  testimonials.push(newReview);
  res.status(201).json(newReview);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});