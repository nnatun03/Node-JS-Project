const express = require('express');
const userController = require('../controllers/userController'); // import user controller

const router = express.Router(); // create router
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router; // export router
