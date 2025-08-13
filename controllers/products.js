const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({});
  console.log(products);

  //   throw new Error("product testing route");
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort } = req.query;
  const queryObj = {};

  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObj.company = company;
  }

  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }
  console.log(queryObj);

  let result = Product.find(queryObj);
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = await result.sort(sortList);
  } else {
    result = await result.sort("createdAt");
  }
  // console.log(result);

  //const products = await Product.find(queryObj);
  //if we directly pass req.query then if we add something not acceptable then it might throw an error.
  res.status(200).json({ result, nbHits: result.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
