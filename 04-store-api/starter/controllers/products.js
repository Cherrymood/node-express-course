import Product from "../models/product.js";

async function getAllProductsStatic(req, res) {
  const products = await Product.find({ name: "vase table" });
  res.status(200).json({ products, nbHits: products.length });
}

async function getAllProducts(req, res) {
  const { featured, company, name, sort, fields } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  let result = Product.find(queryObject);

  if (sort) {
    const sortParams = sort.split(",").join(" "); //parse incoming qParams for using at server
    result = result.sort(sortParams);
  } else {
    result = result.sort("createAt");
  }

  if (fields) {
    const fieldsParams = fields.split(",").join(" "); //parse incoming qParams for using at server
    result = result.select(fieldsParams);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  res.status(200).json({ products, nbHits: products.length });
}

export { getAllProducts, getAllProductsStatic };
