const express = require("express");
const router = express.Router();

let usuarios = [
  { id: 1, nome: "Maria Júlia", email: "maju@cupcakeapp.com", senha: "1234", tipo: "Admin" },
  { id: 2, nome: "Lucas Pereira", email: "lucas@gmail.com", senha: "123", tipo: "Cliente" },
];

// Listar (sem senha)
router.get("/", (req, res) => {
  const lista = usuarios.map(({ senha, ...resto }) => resto);
  res.json(lista);
});

// Login
router.post("/login", (req, res) => {
  const { email, senha } = req.body;
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);
  if (!usuario) return res.status(401).json({ mensagem: "E-mail ou senha incorretos!" });
  const { senha: _, ...dadosUsuario } = usuario;
  res.json({ mensagem: "Login realizado com sucesso!", usuario: dadosUsuario });
});

module.exports = router;
