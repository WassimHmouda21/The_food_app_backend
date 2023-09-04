const express = require('express');
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const productsController = require("../controllers/products.controller");
const categoriesController = require("../controllers/categories.controller");
authRouter.post("/api/signup", async (req, res) => {
   try { const {username , email , password, birth,adress} = req.body;

    const existingUser = await User.findOne({ email});
    if(existingUser) {
        return res.status(400).json({ msg:" User with same email already exists!"})
    }

     const hashedPassword = await bcryptjs.hash(password, 8);

    let user = new User({
      email,
      password: hashedPassword,
      username, 
      birth,
      adress,  
    })
    user = await user.save();
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
 });

 authRouter.post('/api/signin', async (req, res) => {
    try {
      const {email, password} = req.body;

      const user = await User.findOne({ email});
      if(!user) {
        return res.status(400)
        .json({msg: "User with this email does not exist"});
      }

     const isMatch = await bcryptjs.compare(password, user.password);
   
      if(!isMatch) {
        
        return res.status(400)
        .json({msg: "Incorrect password"});
      }

    const token = jwt.sign({id: user._id}, "passwordkey");
    res.json({token, ...user._doc})
    }catch (e) {
      res.status(500).json({ error: e.message });
    }


 });


 authRouter.post("/api/signup", async (req, res) => {
  try { const {username , email , password, birth,adress} = req.body;

   const existingUser = await User.findOne({ email});
   if(existingUser) {
       return res.status(400).json({ msg:" User with same email already exists!"})
   }

    const hashedPassword = await bcryptjs.hash(password, 8);

   let user = new User({
     email,
     password: hashedPassword,
     username, 
     birth,
     adress,  
   })
   user = await user.save();
   res.json(user);
 } catch (e) {
   res.status(500).json({ error: e.message });
 }
});

authRouter.post('/tokenIsValid', async (req, res) => {
   try {
    
      const token = req.header('x-auth-token');
      if(!token) return res.json(false);
      const verified = jwt.verify(token, 'passwordkey');
      if(!verified) return res.json(false);

      const user = await User.findById(verified.id);
      if(!user) return res.json(false);
      res.json(true);
   }catch (e) {
     res.status(500).json({ error: e.message });
   }


});

authRouter.get("/", auth, async (req,res) => {
   const user = await User.findById(req.user);
   res.json({...user._doc, token: req.token});
});


authRouter.post("/category", categoriesController.create);
authRouter.get("/category", categoriesController.findAll);
authRouter.get("/category/:id", categoriesController.findOne);
authRouter.put("/category/:id", categoriesController.update);
authRouter.delete("/category/:id", categoriesController.delete);


authRouter.post("/product", productsController.create);
authRouter.get("/product", productsController.findAll);
authRouter.get("/product/:id", productsController.findOne);
authRouter.put("/product/:id", productsController.update);
authRouter.delete("/product/:id", productsController.delete);

 module.exports = authRouter;