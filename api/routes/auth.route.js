import  express  from "express";
import { Signup, signin, google } from "../controllers/auth.controller.js";


const router = express.Router();

router.post('/signup', Signup);
router.post('/signin', signin);
router.post('/google', google);

export default router;

