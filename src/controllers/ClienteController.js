import { z } from "zod";
import formatZodError from "../helpers/formatZodError.js";
import Cliente from "../models/ClienteModel.js";

export const PostarCliente = async(request, response)=>{
    const {nome, email, telefone, endereco} = request.body
    if (!nome) {
        response.status(400).json({ err: "o nome é obrigatório" })
        return
      }
    if (!email) {
        response.status(400).json({ err: "o email é obrigatório" })
        return
      }
    if (!telefone) {
        response.status(400).json({ err: "o telefone é obrigatório" })
        return
      }
    if (!endereco) {
        response.status(400).json({ err: "endereco é obrigatório" })
        return
      }
      const novoCliente = {
        nome,
        email,
        telefone,
        endereco,
      }
      try {
        await Cliente.create(novoCliente)
        response.status(201).json({ message: "cliente cadastrado" })
      } catch (error) {
        console.error(error)
        response.status(500).json({ message: "erro ao cadastrar cliente" })
      }
}

export const getAllClientes = async (request, response) => {
    const page = parseInt(request.query.page) || 1;
    const limit = parseInt(request.query.limit) || 10;
    const offset = (page - 1) * limit;
    try {
      const clientes = await Cliente.findAndCountAll({
        limit,
        offset,
      });
  
      const totalPaginas = Math.ceil(clientes.count / limit);
      response.status(200).json({
        totalcliente: clientes.count,
        totalPaginas,
        paginaAtual: page,
        itemsPorPagina: limit,
        proximaPagina:
          totalPaginas === 0
            ? null
            : `http://localhost:3333/clientes?page=${page + 1}`,
        clientes: clientes.rows,
      });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "erro ao buscar cliente" });
    }
  };