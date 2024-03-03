import express from 'express';
import { createRecipe, getRecipes, updateRecipe, deleteRecipe,getRecipe,userRecipes } from '../controllers/recipe.controller.js';
import authCheck from '../middleware/authCheck.js';

const router = express.Router();

router.post('/createrecipe', authCheck, createRecipe);
router.get('/getrecipes',authCheck, getRecipes);
router.get('/getrecipe/:id',authCheck, getRecipe);
router.get('/userRecipes',authCheck,userRecipes)
router.put('/updaterecipe', authCheck, updateRecipe);
router.delete('/deleterecipe/:id', authCheck, deleteRecipe);

export default router;
