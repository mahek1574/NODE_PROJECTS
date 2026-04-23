const express = require("express")

const router = express.Router();

const productcontroller = require("../controllers/productControllers")

router.get("/",productcontroller.getProduct)

router.get("/add",productcontroller.showAddForm)

router.post("/add",productcontroller.createProduct)

router.get("/edit/:id", productcontroller.showEditForm);

router.post("/edit/:id", productcontroller.updateProduct);

router.get("/delete/:id", productcontroller.deleteProduct);


module.exports = router;

