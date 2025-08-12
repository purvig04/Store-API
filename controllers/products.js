const getAllProductsStatic = async (req, res) => {
  throw new Error("product testing route");
  res.status(200).json({ msg: "products testing route" });
};

const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: "products route" });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
