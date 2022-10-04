const express = require("express");
const cors = require("cors");
const app = express();
const port = 8070;
const models = require("./models");

app.use(express.json());
app.use(cors());

app.get("/products", async (req, res) => {
  const query = req.query;
  console.log("QUERY : " + query);
  res.send({
    products: [
      {
        id: 1,
        name: "농구공",
        price: 100000,
        seller: "조던",
        imageUrl: "images/products/basketball1.jpeg",
      },
      {
        id: 2,
        name: "축구공",
        price: 50000,
        seller: "메시",
        imageUrl: "images/products/soccerball1.jpg",
      },
      {
        id: 3,
        name: "키보드",
        price: 10000,
        seller: "그랩",
        imageUrl: "images/products/keyboard1.jpg",
      },
    ],
  });
});

app.post("/products", (req, res) => {
  const body = req.body;
  // res.send("상품이 등록 되었습니다.");
  res.send({
    body,
  });
});

app.get("/products/:id/events/:eventID", (req, res) => {
  const params = req.params;
  const { id, eventID } = params;
  res.send(`ID : ${id}, eventID : ${eventID}`);
});

app.listen(port, () => {
  console.log("GrapMall Server Startig!");
  models.sequelize
    .sync()
    .then(() => {
      console.log("DB Connect Success !@!@");
    })
    .catch(err => {
      console.error(err);
      console.log("DB Connect Failed....");
      process.exit();
    });
});
