CREATE TABLE `usuario` (
  `id_usuario` int PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(100),
  `email` varchar(100) UNIQUE,
  `senha` varchar(255),
  `telefone` varchar(20),
  `endereco` varchar(150)
);

CREATE TABLE `pedido` (
  `id_pedido` int PRIMARY KEY AUTO_INCREMENT,
  `id_usuario` int,
  `data_pedido` datetime,
  `status` varchar(20),
  `valor_total` decimal(6,2)
);

CREATE TABLE `pagamento` (
  `id_pagamento` int PRIMARY KEY AUTO_INCREMENT,
  `id_pedido` int,
  `tipo` varchar(20),
  `status` varchar(20)
);

CREATE TABLE `cupcake` (
  `id_cupcake` int PRIMARY KEY AUTO_INCREMENT,
  `sabor` varchar(50),
  `recheio` varchar(50),
  `cobertura` varchar(50),
  `preco` decimal(5,2)
);

CREATE TABLE `pedido_cupcake` (
  `id_pedido` int,
  `id_cupcake` int,
  `quantidade` int
);

ALTER TABLE `pedido_cupcake` COMMENT = 'Tabela associativa para o relacionamento N:N entre Pedido e Cupcake.';

ALTER TABLE `pedido` ADD FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

ALTER TABLE `pagamento` ADD FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`);

ALTER TABLE `pedido_cupcake` ADD FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`);

ALTER TABLE `pedido_cupcake` ADD FOREIGN KEY (`id_cupcake`) REFERENCES `cupcake` (`id_cupcake`);
