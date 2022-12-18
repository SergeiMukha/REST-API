const clothesRouter = require("express").Router();
const Clothing = require("../models/clothing");

clothesRouter.get("/", (req, res, next) => {

    Clothing.find({}).then((result) => res.json(result)).catch(err => res.status(500).json({err: err.message}));

});

// Create Clothing
clothesRouter.post("/create", async (req, res) => {
    // Getting necessary data
    const title = req.body.title;

    // Checking if all necessary data provided
    if (!title) {
      return res.status(400).json({ err: "You haven't given arguments" });
    }

    try {

      // Trying to create new clothing
      const clothing = new Clothing({
        title: title,
      });
      
      // Saving clothing to db
      const result = await clothing.save()

      return res.json({
        elementCreated: {
          title: result.title
        }
      })

    } catch (err) {

      return res.status(400).json({
        err: "This clothing is already exist."
      })

    }
});

// Delete Clothing
clothesRouter.post("/delete", async (req, res) => {
  // Getting necessary data
  const title = req.body.title;

  // Checking if necessary data was provided
  if (!title) {
    return res.status(400).json({ err: "You haven't given arguments" });
  }

  try {

    // Finding clothing to delete
    const clothing = await Clothing.findOne({title: title})

    // Deleting clothing
    await Clothing.deleteOne({title: title})
  
    return res.json({
      elementDeleted: {
        title: clothing.title
      }
    })

  } catch (err) {

    return res.status(400).json({
      err: "No such element."
    })

  }
})

module.exports = clothesRouter;
