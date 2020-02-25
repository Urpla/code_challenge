import Express from "express";
const router = Express.Router();
import HeroController from "./controllers/heroes.controller";

router.get("/heroes", HeroController.findAll);
router.get("/heroes/:id", HeroController.findById);

export default router;