const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).select("name price");
  console.log(products);

  //   throw new Error("product testing route");
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, NumericFilter } = req.query;
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

  if (NumericFilter) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;

    let filters = NumericFilter.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObj[field] = { [operator]: Number(value) };
      }
    });
  }

  console.log(queryObj);

  let result = Product.find(queryObj);
  // sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  console.log(fields);
  console.log(req.query);

  //show only some feilds
  if (fields) {
    const fieldList = fields.split(",").join(" ");

    result = result.select(fieldList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  //const products = await Product.find(queryObj);
  //if we directly pass req.query then if we add something not acceptable then it might throw an error.

  const products = await result;
  res.status(200).json({ products, nbHits: result.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
