const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const pedidosPath = path.join(__dirname, "../../pedidos.json");

// 🟢 Listar pedidos
router.get("/", (req, res) => {
  const pedidos = JSON.parse(fs.readFileSync(pedidosPath, "utf8"));
  res.json(pedidos);
});

// 🟢 Criar novo pedido
router.post("/", (req, res) => {
  const { usuario, cupcakes, total } = req.body;

  if (!usuario || !cupcakes || !total) {
    return res.status(400).json({ mensagem: "Dados incompletos para o pedido." });
  }

  const pedidos = JSON.parse(fs.readFileSync(pedidosPath, "utf8"));
  const novoPedido = {
    id: pedidos.length ? pedidos[pedidos.length - 1].id + 1 : 1,
    usuario,
    cupcakes,
    total,
    data: new Date().toLocaleString("pt-BR")
  };

  pedidos.push(novoPedido);
  fs.writeFileSync(pedidosPath, JSON.stringify(pedidos, null, 2));

  res.status(201).json({ mensagem: "Pedido criado com sucesso!", pedido: novoPedido });
});

module.exports = router;
