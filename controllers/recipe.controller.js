import Recipe from "../models/recipe.model.js";

const createRecipe = async (req, res) => {
  try {
    const { title, description, ingredients, procedure, prepTime, thumbnail, createdBy } = req.body;
    
    const newRecipe = await Recipe.create({
      title,description,ingredients,procedure,prepTime,thumbnail,createdBy
    });

    res.status(201).json({ sucess:true, message: "Recipe created successfully", recipe: newRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ sucess:false,message: "Internal Server Error" });
  }
};

const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({});
    
    res.status(200).json({ success: true, message: "Recipes retrieved successfully", recipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const userRecipes = async (req, res) => {
    try {
      const recipes = await Recipe.find({createdBy:req.user._id});
      
      res.status(200).json({ success: true, message: "Recipes retrieved successfully", recipes });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

const getRecipe = async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe){
        res.status(500).json({ success: false, message: "Not Found" });
    }
      res.status(200).json({ success: true, message: "Recipes retrieved successfully", recipe });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };

const updateRecipe = async (req, res) => {
  try {
    
    if (req.user._id.toString()!=req.body.createdBy){
      return res.status(404).json({ success: false, message: "Unauthorized to edit" });
    }
    const {ingredientas}=req.body
    console.log(ingredientas)
    const updatedRecipe = await Recipe.findByIdAndUpdate(req.body._id, {
     ...req.body
    }, { new: true });

    if (!updatedRecipe) {
      return res.status(404).json({ success: false, message: "Recipe not found" });
    }

    res.status(200).json({ success: true, message: "Recipe updated successfully", recipe: updatedRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const createdBy=req.headers.createdby
    if (createdBy!==req.user._id.toString()){
      return res.status(404).json({ success: false, message: "Unauthorized" });
    }
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ success: false, message: "Recipe not found" });
    }
    res.status(200).json({ success: true, message: "Recipe deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export { createRecipe, getRecipes, updateRecipe, deleteRecipe,getRecipe,userRecipes };
