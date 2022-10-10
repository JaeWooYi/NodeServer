const express = require("express");
const cors = require("cors");
const app = express();
const port = 8070;
const models = require("./models");
const multer = require("multer");
const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "upload/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

app.use(express.json());
app.use(cors());
app.use("/upload", express.static("upload"));

app.get("/banners", (req, res) => {
  models.Banner.findAll({
    limit: 3,
  })
    .then(result => {
      res.send({
        banners: result,
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).send("Error!!");
    });
});

app.get("/products", async (req, res) => {
  models.Product.findAll({
    order: [["createdAt", "DESC"]],
    attributes: ["id", "name", "price", "createdAt", "seller", "imageUrl"],
  })
    .then(result => {
      console.log("PRODUCTS : " + result);
      res.send({
        products: result,
      });
    })
    .catch(error => {
      console.error(error);
      res.send("ERROR..");
    });
});

app.post("/products", (req, res) => {
  const body = req.body;
  const { name, description, price, seller, imageUrl } = body;
  if (!name || !description || !price || !seller || !imageUrl) {
    res.status(400).send("Input Every Field.");
  }
  models.Product.create({
    name,
    description,
    price,
    seller,
    imageUrl,
  })
    .then(result => {
      console.log("Product Create Result : " + result);
      res.send({
        result: result,
      });
    })
    .catch(error => {
      console.log(error);
      res.status(400).send("Product Upload Fail..");
    });
});

app.get("/products/:id", (req, res) => {
  const params = req.params;
  const { id, eventID } = params;
  models.Product.findOne({
    where: {
      id: id,
    },
  })
    .then(result => {
      console.log("PRODUCT : " + result);
      res.send({
        product: result,
      });
    })
    .catch(error => {
      console.error(error);
      res.status(400).send("Error..");
    });
});

app.post("/image", upload.single("image"), (req, res) => {
  const file = req.file;
  console.log(file);
  res.send({
    imageUrl: file.path,
  });
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
