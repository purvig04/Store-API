const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const name = "accent";
  const products = await Product.find({
    name: { $regex: name, $options: "i" },
  });
  //   throw new Error("product testing route");
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name } = req.query;
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

  const products = await Product.find(queryObj);
  //if we directly pass req.query then if we add something not acceptable then it might throw an error.
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
