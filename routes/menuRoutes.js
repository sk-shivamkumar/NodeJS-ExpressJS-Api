const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/MenuItem");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("Data Saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data Fetched");
    res.status(500).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:taste", async (req,res)=>{
    try{
        const taste = req.params.taste;
        if(taste == "sweet" || taste == "spicy" || taste == "sour"){
            const response = await MenuItem.find({taste: taste});
            console.log("response fetched");
            res.status(200).json(response);
        }else{
            res.status(404).json({error:"Invalid taste"});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
});

router.put("/:id", async (req, res) => {
    try {
      const menuId = req.params.id;
      const updatedMenuData = req.body;
  
      const response = await MenuItem.findByIdAndUpdate(
        menuId,
        updatedMenuData,
        {
          new: true, // Return the updated document
          runValidators: true, // Run Mongoose validation
        }
      );
  
      if (!response) {
        return res.status(404).json({ error: "Menu not found" });
      }
      console.log("data updated");
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const menuId = req.params.id;
  
      const response = await MenuItem.findByIdAndDelete(menuId);
      if (!response) {
        return res.status(404).json({ error: "Menu not found" });
      }
      console.log("data deleted");
      res.status(200).json({ message: "Menu Deleted Successfully" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;
