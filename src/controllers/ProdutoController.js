import Produto from "../models/ProdutoModel.js";
import { z } from "zod";
import formatZodError from "../helpers/formatZodError.js";

export const Postagem = async (request, response) => {
  const { nome, descricao, preco, estoque } = request.body
  if (!nome) {
    response.status(400).json({ err: "o nome é obrigatório" })
    return
  }
  if (!descricao) {
    response.status(400).json({ err: "o descricao é obrigatório" })
    return
  }
  if (!preco) {
    response.status(400).json({ err: "o preco é obrigatório" })
    return
  }
  if (!estoque) {
    response.status(400).json({ err: "o estoque é obrigatório" })
    return
  }
  const novoProduto = {
    nome,
    descricao,
    preco,
    estoque,

  }
  try {
    await Produto.create(novoProduto)
    response.status(201).json({ message: "produto cadastrado" })
  } catch (error) {
    console.error(error)
    response.status(500).json({ message: "erro ao cadastrar produto" })
  }
}
export const getAll = async (request, response) => {
  const page = parseInt(request.query.page) || 1;
  const limit = parseInt(request.query.limit) || 10;
  const offset = (page - 1) * limit;
  try {
    const produtos = await Produto.findAndCountAll({
      limit,
      offset,
    });

    const totalPaginas = Math.ceil(produtos.count / limit);
    response.status(200).json({
      totalProduto: produtos.count,
      totalPaginas,
      paginaAtual: page,
      itemsPorPagina: limit,
      proximaPagina:
        totalPaginas === 0
          ? null
          : `http://localhost:3333/produtos?page=${page + 1}`,
      produtos: produtos.rows,
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "erro ao buscar Produto" });
  }
};


export const getUmProduto = async (request, response) => {
  const { id } = request.params
  try {
    const produto = await Produto.findOne({ where: { id } })
    if (produto === null) {
      response.status(404).json({ message: "tarefa não encontrada" })
      return
    }
    response.status(200).json(produto)
  } catch (error) {
    console.log(error)
    response.status(500).json({ message: "erro ao buscar tarefa" })
  }
}

export const updateProduto = async(request, response)=>{
  const {id} = request.params
  const { nome, descricao, preco, estoque } = request.body

  const ProdutoAtualizado = {
    nome,
    descricao,
    preco,
    estoque
  }
  try{
    const [linhasAfetadas] = await Produto.update(ProdutoAtualizado, {
      where: {id}
    })
    if (linhasAfetadas <= 0) {
      response.status(404).json({ message: "produto não encontrada" });
      return;
    }

    response.status(200).json({ message: "produto atualizado" });
  }catch(error){
    console.log(error)
    response.status(200).json({message: "erro ao atualizar produto"})
  }
}

export const deletarProduto = async (request, response) => {
  const { id } = request.params;

  try {
    const linhasAfetadas = await Produto.destroy({
      where: { id },
    });

    if (linhasAfetadas === 0) {
      return response.status(404).json({ msg: "produto não encontrado" });
    }

    response.status(200).json({ msg: "produto deletado" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ msg: "Erro ao deletar produto" });
  }
};
