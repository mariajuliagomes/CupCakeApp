const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const cupcakesPath = path.join(__dirname, "../data/cupcakes.json");

// ✅ Função auxiliar para ler os cupcakes
function lerCupcakes() {
  try {
    const data = fs.readFileSync(cupcakesPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Erro ao ler cupcakes:", error);
    return [];
  }
}

// ✅ Função auxiliar para salvar cupcakes
function salvarCupcakes(cupcakes) {
  try {
    fs.writeFileSync(cupcakesPath, JSON.stringify(cupcakes, null, 2));
  } catch (error) {
    console.error("Erro ao salvar cupcakes:", error);
  }
}

// 📍 GET — listar todos os cupcakes
router.get("/", (req, res) => {
  const cupcakes = lerCupcakes();
  res.json(cupcakes);
});

// 📍 GET — buscar cupcake por ID
router.get("/:id", (req, res) => {
  const cupcakes = lerCupcakes();
  const cupcake = cupcakes.find((c) => c.id === parseInt(req.params.id));

  if (!cupcake) {
    return res.status(404).json({ message: "Cupcake não encontrado." });
  }

  res.json(cupcake);
});

// 📍 POST — adicionar novo cupcake
router.post("/", (req, res) => {
  const { sabor, preco } = req.body;

  if (!sabor || !preco) {
    return res.status(400).json({ message: "Sabor e preço são obrigatórios." });
  }

  const cupcakes = lerCupcakes();
  const novoCupcake = {
    id: cupcakes.length ? cupcakes[cupcakes.length - 1].id + 1 : 1,
    sabor,
    preco: parseFloat(preco),
  };

  cupcakes.push(novoCupcake);
  salvarCupcakes(cupcakes);

  res.status(201).json(novoCupcake);
});

// 📍 PUT — editar cupcake existente
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { sabor, preco } = req.body;
  const cupcakes = lerCupcakes();

  const index = cupcakes.findIndex((c) => c.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: "Cupcake não encontrado." });
  }

  cupcakes[index].sabor = sabor || cupcakes[index].sabor;
  cupcakes[index].preco = preco ? parseFloat(preco) : cupcakes[index].preco;

  salvarCupcakes(cupcakes);
  res.json(cupcakes[index]);
});

// 📍 DELETE — excluir cupcake
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let cupcakes = lerCupcakes();

  const existe = cupcakes.some((c) => c.id === parseInt(id));
  if (!existe) {
    return res.status(404).json({ message: "Cupcake não encontrado." });
  }

  cupcakes = cupcakes.filter((c) => c.id !== parseInt(id));
  salvarCupcakes(cupcakes);

  res.json({ message: "Cupcake removido com sucesso." });
});

module.exports = router;
