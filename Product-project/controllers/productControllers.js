const {products} = require("../data/db")


exports.getProduct = (req,res)=>{
    res.render("index",{products})
}

exports.showAddForm = (req,res)=>{
    res.render("add");
}

exports.createProduct = (req,res)=>{
const newproduct = {
  id: Date.now().toString(),
  name: req.body.name,
  price: req.body.price,
  category: req.body.category,
  stock: req.body.stock,
  description: req.body.description,
};
products.push(newproduct);
res.redirect("/")
}

exports.showEditForm = (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  res.render("edit", { product });
};

exports.updateProduct = (req, res) => {
  const product = products.find((p) => p.id === req.params.id);

  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.category = req.body.category;
    product.stock = req.body.stock;
    product.description = req.body.description;
  }

  res.redirect("/");
};

exports.deleteProduct = (req, res) => {
  const index = products.findIndex((p) => p.id === req.params.id);

  if (index !== -1) {
    products.splice(index, 1);
  }

  res.redirect("/");
};


