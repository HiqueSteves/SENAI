import { Router } from "express";
import { body, validationResult } from "express-validator";
import { createUser, listUsers } from "../controllers/users.controller.js";

const router = Router();

// validação simples e didática
const createUserValidators = [
  body("name").trim().isLength({ min: 2 }).withMessage("Nome muito curto."),
  body("email").isEmail().withMessage("E-mail inválido."),
  body("password").isLength({ min: 6 }).withMessage("Senha deve ter 6+ caracteres.")
];

router.post("/users", createUserValidators, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return createUser(req, res, next);
});

router.get("/users", listUsers);

export default router;
