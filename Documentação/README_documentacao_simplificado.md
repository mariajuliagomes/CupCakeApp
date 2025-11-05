Documentação — CupcakeApp

Projeto: CupcakeApp
Aluna: Maria Júlia Gomes de Castro
Curso: Engenharia de Software — Projeto Integrador II



Estrutura do Sistema

O CupcakeApp é um aplicativo web para gerenciar vendas de cupcakes personalizados.
Usuários podem criar contas, escolher sabores, realizar pedidos e acompanhar o status das compras.



Modelagem de Dados

A modelagem segue o padrão UML e o modelo relacional de banco de dados.
Principais componentes:
- Usuário: cadastra e realiza pedidos
- Pedido: registra informações de compra e pagamento
- Cupcake: define os produtos disponíveis
- Pagamento: controla o status e tipo de pagamento
- PedidoCupcake: relaciona pedidos e cupcakes



Arquivos Incluídos 

        Arquivo	                                                      Descrição
Diagrama_de_Classes_UML.png	                    Estrutura das classes do sistema
Diagrama_Entidade_Relacionamento_ER.png	            Relações entre tabelas
Dicionario_de_Dados_CupcakeApp.pdf	            Especificações do banco de dados




Relações Principais

- 1 Usuário → N Pedidos
- 1 Pedido → 1 Pagamento
- N Pedidos ↔ N Cupcakes (via PedidoCupcake)




Tecnologias

- UML
- SQL (MySQL/SQLite)
- Markdown




Versão: 1.0 — Documentação inicial
Data: Outubro/2025

© 2025 — Maria Júlia Gomes de Castro