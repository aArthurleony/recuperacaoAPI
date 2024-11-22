import { Router } from "express";

import { Postagem, deletarProduto, getAll, getUmProduto, updateProduto } from "../controllers/ProdutoController.js"

const router = Router()

router.post("/", Postagem)
router.get("/", getAll)
router.get("/:id", getUmProduto)
router.put("/:id", updateProduto)
router.delete("/:id", deletarProduto)


export default router