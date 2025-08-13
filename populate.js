require("dotenv").config();

const connectDB = require("./db/connect");
const product = require("./models/product");
const Product = require("./models/product");

const jsonProducts = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(jsonProducts);
    console.log("success");
    process.exit(0); //everything went well terminate the process
  } catch (error) {
    console.log(error);
    process.exit(1);
    //error tahts why 1
  }
};

start();
