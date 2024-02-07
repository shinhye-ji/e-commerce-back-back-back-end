const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

 // find all tags
router.get('/', async (req, res) => {
  try {
     // be sure to include its associated Product data
    const tags = await Tag.findAll({
      include: [{ model: Product }]
    });
    res.status(200).json(tags);

  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
  // be sure to include its associated Product data
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!tag) {
      res.status(404).json({ message: 'No tag was found with this id!' });
      return;
    } else {
      res.status(200).json(tag);
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);

  } catch (err) {
    res.status(400).json({ message: 'Unable to create new tag!' });
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateTag = await Tag.update(res.body, {
      where: {
        id: req.params.id
      }
    });

    if (!updateTag) {
      res.status(404).json({ message: 'Tag does not exist! '});
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy(req.body, {
      where: {
        id: req.params.id
      }
    });
    
    if (!deleteTag) {
      res.status(404).json({ message: 'No id was found!' });
    }

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
