# Desafio Serasa
Programa Código para TodXS – Edição Mobile da Serasa 

------------------------------------------------------------------------------

Para iniciar o programa desenvolvido basta clicar no link: 
https://rafareinert94.github.io/desafioSerasa/desafioSerasa/


------------------------------------------------------------------------------

O PROBLEMA:

A empresa CréditoParaTodxs é uma empresa multinacional que ajuda milhões de
pessoas a conseguirem crédito pessoal.

Um dos grandes desafios desta empresa, é se comunicar de forma efetiva com
seus respectivos clientes. Por exemplo, uma das necessidades é apresentar,
de acordo com sua saúde financeira, propostas de empréstimo pessoal.

Considere os seguintes critérios fictícios:
-Você está liberado(a) para utilizar a tecnologia que domina atualmente e de
forma criativa demonstrar seu conhecimento, para desenvolver um fluxo que:

*Liste as ofertas de crédito de acordo com o descritivo técnico;
*Detalhe a oferta do usuário ao momento de escolha;
*Apresente a revisão das informações;
*E permita-o realizar a contratação;

Caso você seja uma pessoa que manda bem em front, se sinta livre em demonstrar
seu conhecimento com uma jornada bonitona, ou se você manda bem em backend,
fique à vontade para criar serviços para responder à esta jornada.

 
-Critérios de Avaliação:

*Estrutura de dados e algoritmo;
*Objetividade e qualidade técnica;
*Versionamento de código e entrega;
*Compreensão da regra de negócio;

------------------------------------------------------------------------------

Para o preparo do ambiente de desenvolvimento:

ng new desafioSerasa

npm i firebase

ng add @angular/fire

ng add @angular/material

ng add @ng-bootstrap/ng-bootstrap

ng add angular-cli-ghpages (criação da página no github)

------------------------------------------------------------------------------

Dados utilizados no desafio:

Fórmula do Juros Composto utilizado no desafio: M = C(1+i)^t
M: montante
C: capital
i: taxa fixa (a taxa foi utilizada 3,95% ao mês)
t: período de tempo


Score fictício do Serasa para liberar ou não um empréstimo.

------------------------------------------------------------------------------
Utilizei o banco de dados de objetos, o firestore do firebase que me permite 
criar um ambiente de armazenagem de dados de forma rápida e de fácil resposta.


Criei duas coleções:

1) Uma coleção com uma subcoleção:

usuario ------>	uid    -----> emprestimos ---->	uid					
		score				dataDaContratação
		nome				numeroDeParcelas
						parcelas[] {dataPagamento,dataVencimento,valorParcelas}
						parcelasPagas
						pendencia
						scoreMinimo
						taxa
						valor
						valorTotal


2) E outra simples:

emprestimo --->	uid
		taxa
		valor
		scoreMinimo



