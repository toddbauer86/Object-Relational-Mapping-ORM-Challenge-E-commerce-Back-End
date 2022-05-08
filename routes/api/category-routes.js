const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  Category.findAll({
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    },
  })
    .then((dbCategory) => {
      if (!dbCategory) {
        res.json(404).json({ message: "Category not found" });
        return;
      }
      res.json(dbCategory);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Product,
      attributes: ["id", "product_name", "price", "stock", "category_id"],
    },
  })
    .then((dbCategory) => {
      if (!dbCategory) {
        res.status(404).json({ message: "Category not found" });
      }
      res.json(dbCategory);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post("/", (req, res) => {
  Category.create({
    category_name: req.body.category_name,
  })
    .then((dbCategory) => res.json(dbCategory))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  // create a new category
});

router.put("/:id", (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategory) => {
      if (!dbCategory) {
        res.status(404).json({ message: "Category not found" });
        return;
      }
      res.json(dbCategory);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbCategory) => {
      if (!dbCategory) {
        res.status(404).json({ message: "Category note found" });
        return;
      }
      res.json(dbCategory);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
  // delete a category by its `id` value
});

module.exports = router;
