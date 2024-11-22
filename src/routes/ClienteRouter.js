import { Router } from "express";

import { PostarCliente, getAllClientes } from "../controllers/ClienteController.js"

const router = Router()

router.post("/",PostarCliente)
router.get("/", getAllClientes)



export default router