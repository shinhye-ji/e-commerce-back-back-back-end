const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
  // find all categories // be sure to include its associated Products vv bbg
    const categories = await Category.findAll({ 
      include: [{ model: Product }] 
    });
    res.status(200).json(categories);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
  // find one category by its `id` value
    const category = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product }]
    });
    
    if (!category) {
      res.status(404).json({ message: 'No category was found with this id!' });
      return;
    } else {
      res.status(200).json(category);
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: 'Category failed to be created!' });
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'Category does not exist!' });
      return;
    } else {
      res.status(200).json(updatedCategory);
    } 
  } catch (err) {
      res.status(500).json(err);
  }
});

 // delete a category by its `id` value
router.delete('/:id', async (req, res) => {
 try {
  const deletedCategory = await Category.destroy({ 
    where: {
      id: req.params.id
    }
  });

  if (!deletedCategory) {
    res.status(404).json({ message: 'No location was found with this id!' });
    return;
  } else {
    res.status(200).json(deletedCategory);
  }
 } catch (err) {
  res.status(500).json(err);
 }
});

module.exports = router;
