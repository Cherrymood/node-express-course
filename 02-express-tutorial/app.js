import express from "express";
import data from "./data.js";
import peopleRouter from "./routes/people.js";
import cookieParser from "cookie-parser";

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
app.use(cookieParser());

function auth(req, res, next) {
  const cookiesName = req.cookies?.name;

  if (cookiesName) {
    req.user = cookiesName;
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}

app.use("/api/v1/people", peopleRouter);

app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

app.post("/logon", (req, res) => {
  const { name } = req.body;
  console.log(name);

  if (name) {
    res.cookie("name", name);
    res.status(201).json({ success: true, message: `Hello, ${name}` });
  } else {
    res.status(400).json({ success: false, message: "Error" });
  }
});

app.delete("/logoff", (req, res) => {
  res.clearCookie("name");
  res.status(200).json({ success: true, message: `Logged off` });
});

app.get("/test", auth, (req, res) => {
  res.json({ message: `Hello, ${req.user} !` });
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
  // Cookies that have not been signed
  console.log("Cookies: ", req.cookies);

  // Cookies that have been signed
  console.log("Signed Cookies: ", req.signedCookies);
});

app.get(`/api/v1/products/:productID`, (req, res) => {
  const productId = parseInt(req.params.productID);

  const product = data.products.find((item) => item.id == productId);
  console.log("Cookies: ", req.cookies);

  // Cookies that have been signed
  console.log("Signed Cookies: ", req.signedCookies);

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
    searchProducts = searchProducts.slice(0, parseInt(limit));
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
