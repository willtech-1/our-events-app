// import modules
const express = require("express");
const router = express.Router();
// import controllers
const { create,  categoryById, readCategory, removeCategory, getAllCategories} = require("../controllers/category");
// import user middlewares
const { requireSignin, isAuth, isAdmin } = require("../controllers/userControllers");

const { userById } = require("../controllers/user");

// routes
router.post("/category/create/:userId", requireSignin, isAuth, isAdmin, create)
router.get("/category/:categoryId", readCategory);
router.delete("/category/:categoryId/:userId", requireSignin, isAuth, isAdmin, removeCategory)
router.get("/categories", getAllCategories);


//router.param to check the parameter everytime there is 'userId' 
router.param("userId", userById);
// route category
router.param("categoryId", categoryById)


// export router
module.exports = router;