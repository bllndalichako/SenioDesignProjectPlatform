import express from 'express';
import { authUser, registerUser, logoutUser, getUserProfile, verifyRegistration } from '../controllers/userController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

// Registers a new user.
router.post('/', registerUser);

router.post('/verify/:verificationCode', verifyRegistration)

// Authenticates a new user.
router.post('/auth', authUser);

// Logs out a user.
router.post('/logout', logoutUser);

// Access user's profile
router.get('/profile', protectRoute, getUserProfile);

// TODO: Move functionality to userController.js.
// Route for getting all seniors.
// router.get('/', async (req, res) => {
//   try {
//     const seniors = await Senior.find({});
//     return res.status(200).send({
//       count: seniors.length,
//       data: seniors,
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).send({ message: error.message });
//   }
// });

// Route for getting one senior by id.
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const senior = await Senior.findById(id);
    return res.status(200).send(senior);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});


// Route for updating a senior by id.
router.put('/:id', async (req, res) => {
  try {
    // Validate request body.
    if (!req.body.firstName) {
      return res.status(400).send({ message: 'First name is required.' });
    } else if (!req.body.lastName) {
      return res.status(400).send({ message: 'Last name is required.' });
    } else if (!req.body.email) {
      return res.status(400).send({ message: 'Email is required.' });
    } else if (!req.body.skills) {
      return res.status(400).send({ message: 'Skills are required.' });
    }

    const { id } = req.params;
    const senior = await Senior.findByIdAndUpdate(id, req.body);

    if (!senior) {
      return res.status(404).send({ message: 'Senior not found.' });
    }

    return res.status(200).send({ message: 'Senior updated successfully.' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }

});

// Route for deleting a senior by id.
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const senior = await Senior.findByIdAndDelete(id);

    if (!senior) {
      return res.status(404).send({ message: 'Senior not found.' });
    }

    return res.status(200).send({ message: 'Senior deleted successfully.' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;