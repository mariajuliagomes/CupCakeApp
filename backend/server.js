const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Caminho dos arquivos JSON
const cupcakesPath = path.join(__dirname, "data", "cupcakes.json");
const pedidosPath = path.join(__dirname, "data", "pedidos.json");
const usuariosPath = path.join(__dirname, "data", "usuarios.json");

// Funções utilitárias
function lerArquivoJSON(caminho) {
  if (!fs.existsSync(caminho)) return [];
  const dados = fs.readFileSync(caminho, "utf-8");
  return dados ? JSON.parse(dados) : [];
}

function salvarArquivoJSON(caminho, dados) {
  fs.writeFileSync(caminho, JSON.stringify(dados, null, 2));
}

// ✅ ROTA BASE
app.get("/api", (req, res) => {
  res.send(`
    🍰 CupCakeApp Backend rodando com sucesso! <br>
    Use as rotas: /api/cupcakes, /api/pedidos, /api/usuarios, /api/admin
  `);
});

// ✅ CUPCAKES
app.get("/api/cupcakes", (req, res) => {
  const cupcakes = lerArquivoJSON(cupcakesPath);
  res.json(cupcakes);
});

app.post("/api/cupcakes", (req, res) => {
  const cupcakes = lerArquivoJSON(cupcakesPath);
  const novoCupcake = { id: Date.now(), ...req.body };
  cupcakes.push(novoCupcake);
  salvarArquivoJSON(cupcakesPath, cupcakes);
  res.status(201).json(novoCupcake);
});

app.put("/api/cupcakes/:id", (req, res) => {
  const cupcakes = lerArquivoJSON(cupcakesPath);
  const index = cupcakes.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ mensagem: "Cupcake não encontrado" });

  cupcakes[index] = { ...cupcakes[index], ...req.body };
  salvarArquivoJSON(cupcakesPath, cupcakes);
  res.json(cupcakes[index]);
});

app.delete("/api/cupcakes/:id", (req, res) => {
  const cupcakes = lerArquivoJSON(cupcakesPath);
  const novos = cupcakes.filter(c => c.id !== parseInt(req.params.id));
  salvarArquivoJSON(cupcakesPath, novos);
  res.json({ mensagem: "Cupcake removido com sucesso!" });
});

// ✅ PEDIDOS
app.get("/api/pedidos", (req, res) => {
  const pedidos = lerArquivoJSON(pedidosPath);
  res.json(pedidos);
});

app.post("/api/pedidos", (req, res) => {
  const pedidos = lerArquivoJSON(pedidosPath);
  const novo = { id: Date.now(), data: new Date().toLocaleString(), ...req.body };
  pedidos.push(novo);
  salvarArquivoJSON(pedidosPath, pedidos);
  res.status(201).json(novo);
});

// ✅ USUÁRIOS + LOGIN
app.get("/api/usuarios", (req, res) => {
  const usuarios = lerArquivoJSON(usuariosPath).map(({ senha, ...rest }) => rest);
  res.json(usuarios);
});

app.post("/api/usuarios/login", (req, res) => {
  const { email, senha } = req.body;
  const usuarios = lerArquivoJSON(usuariosPath);
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (!usuario) return res.status(401).json({ mensagem: "E-mail ou senha incorretos!" });

  const { senha: _, ...dados } = usuario;
  res.json({ mensagem: "Login realizado com sucesso!", usuario: dados });
});

// ✅ ROTA ADMIN (somente admin pode usar)
app.post("/api/admin/verificar", (req, res) => {
  const { email } = req.body;
  const usuarios = lerArquivoJSON(usuariosPath);
  const usuario = usuarios.find(u => u.email === email);
  if (!usuario || usuario.tipo !== "Admin")
    return res.status(403).json({ mensagem: "Acesso negado" });
  res.json({ mensagem: "Acesso autorizado" });
});

// ✅ SERVIR O FRONTEND EM PRODUÇÃO
const frontendPath = path.join(__dirname, "../frontend/build");
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`🍰 CupCakeApp rodando completamente em http://localhost:${PORT}`);
});
