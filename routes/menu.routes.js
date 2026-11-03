
import express from "express";

import {
    getSemuaMenu,
    getMenuById,
    postMenu,
    deleteMenu
} from "../controllers/menu.controller.js";

import { cekApiKey } from "../middlewares/cekApiKey.js";
import { validasiMenu } from "../validators/menu.validator.js";

const router = express.Router();

router.get("/", getSemuaMenu);

router.get("/:id", getMenuById);

router.post("/", cekApiKey, validasiMenu, postMenu);

router.delete("/:id", cekApiKey, deleteMenu);

export default router;
