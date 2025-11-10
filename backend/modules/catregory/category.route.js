import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "./category.controller.js";

import {
  createCategorySchema,
  updateCategorySchema,
  categoryIdSchema,
} from "./category.zod.js";

import { validate } from "../../middleware/validate.js";
import { verifyToken } from "../../middleware/userAuth.js"; // JWT middleware

const router = express.Router();

// All routes protected
router.post("/createCategory", verifyToken, validate(createCategorySchema), createCategory);
router.get("/getAllCategories", verifyToken, getAllCategories);
router.get("/getCategoryById/:id", verifyToken, validate(categoryIdSchema), getCategoryById);
router.put("/updateCategory/:id", verifyToken, validate(updateCategorySchema), updateCategory);
router.delete("/deleteCategory/:id", verifyToken, validate(categoryIdSchema), deleteCategory);

export default router;
