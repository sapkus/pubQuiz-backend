const express = require('express');
const mongoose = require('mongoose');

const teamRoutes = require('./routes/team')

const app=express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

app.use("/team", teamRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data
  res.status(status).json({ message: message, data:data });
});


mongoose
  .connect(
    "mongodb+srv://marius_admin:6ZnwFzY7RAz9Tv6@cluster0.1ivjr.mongodb.net/pubQuiz?retryWrites=true",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((result) => app.listen(8080))
  .catch((err) => console.log(err));



