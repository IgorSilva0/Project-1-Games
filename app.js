import express from "express";

const app = express();
const PORT = process.env.PORT;

app.use(express.static("public"));
app.use(express.json());

// using middleware to log requests
app.use((req, res, next) => {
  console.log(`Method : ${req.method}, Path : ${req.path}`);
  next();
});

// Server listen to a port
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
