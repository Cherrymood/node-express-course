import express from "express";
import data from "./data.js";
import peopleRouter from "./public/routes-people.js";

const { products } = data;

const app = express();
const port = 3000;

function logger(req, res, next) {
  const now = new Date();
  console.log(`Method: ${req.method} Url:${req.url}`);
  next();
}

//middleware
app.use(express.static("./public"));
app.use(logger);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/v1/people", peopleRouter);

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

// app.get(`/api/v1/people`, logger, (req, res) => {
//   res.json(data.people);
// });

// app.post(`/api/v1/people`, logger, (req, res) => {
//   const name = req.body.name;

//   if (!name) {
//     res.status(400).json({ success: false, message: "Please provide a name" });
//   } else {
//     people.push({ id: people.length + 1, name: name });
//     res.status(201).json({ success: true, name: req.body.name });
//   }
// });

app.get(`/api/v1/products`, logger, (req, res) => {
  res.json(data.products);
});

app.get(`/api/v1/products/:productID`, (req, res) => {
  const productId = parseInt(req.params.productID);

  const product = data.products.find((item) => item.id == productID);

  if (!product) {
    return res.status(404).json({ message: "That product was not found." });
  }

  res.json(product);
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit, price } = req.query;
  console.log(search, limit);

  let searchProducts = data.products;

  if (search) {
    searchProducts = searchProducts.filter((product) =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );
    if (searchProducts.length === 0) {
      return res.status(404).json({ message: "There is no such product." });
    }
  }

  if (price) {
    searchProducts = searchProducts.filter((product) => product.price < price);
    if (searchProducts.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found under this price." });
    }
  }

  if (limit) {
    return (searchProducts = searchProducts.slice(0, parseInt(limit)));
  }

  res.json(searchProducts);
});

// app.post();

app.all("*", (req, res) => {
  console.log("404 Error - Page Not Found");
  // res.status(404).send("404 Error - Page Not Found");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
