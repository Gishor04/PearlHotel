import express from 'express';
import {
  getFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
  toggleAvailability,
} from '../controllers/foodController.js';

const router = express.Router();

router.get('/', getFoods);
router.get('/:id', getFoodById);
router.post('/', createFood);
router.put('/:id', updateFood);
router.patch('/:id/toggle-availability', toggleAvailability);
router.delete('/:id', deleteFood);

export default router;
