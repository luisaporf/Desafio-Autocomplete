# COMMENTS.md

## Visão Geral do Projeto

Este projeto foi criado para um desafio técnico, com o objetivo de implementar um sistema de autocompletar para buscas. No front-end, usei React para construir a interface e o Apollo Client para conectar com uma API GraphQL, feita com Apollo Server e Node.js no back-end.

Para facilitar o uso, todo o sistema está rodando dentro de containers Docker. Basta executar:

```
docker compose up --build

```

Depois disso, o front-end estará disponível em `http://localhost:5173` e o GraphQL Playground em `http://localhost:4000`.

## Como Foi o Desenvolvimento

### Escolha das Fontes de Dados

Minha primeira grande decisão foi definir de onde viriam os termos que alimentariam o sistema de autocompletar. Inicialmente, considerei integrar alguma API pública, como as do Senado. No entanto, ao explorar essas opções, percebi que o vocabulário era, muitas vezes, excessivamente técnico ou restrito a nichos muito específicos do direito. Isso poderia comprometer a utilidade das sugestões, tornando-as pouco acessíveis para um público mais amplo.

Decidi então mudar o rumo da pesquisa. Comecei a garimpar glossários jurídicos públicos que apresentavam uma linguagem mais didática e abrangente. Encontrei alguns recursos muito interessantes para a task, como:

- [Glossário Jurídico TRT18](https://www.trt18.jus.br/portal/noticias/imprensa/glossario-juridico/)
- [Glossário de Termos Jurídicos - MPF](https://www.mpf.mp.br/es/sala-de-imprensa/glossario-de-termos-juridicos)
- [CodeSystem Natureza Jurídica - FHIR](https://fhir.saude.go.gov.br/r4/core/CodeSystem-natureza-juridica.json.html)

Com essas fontes em mãos, o próximo passo foi combinar e refinar os dados. Realizei um trabalho de limpeza, removendo duplicatas e termos que não se encaixavam no propósito do projeto. O resultado desse foi um arquivo JSON unificado, contendo aproximadamente 800 termos jurídicos diversos. Essa abordagem me garantiu uma base de dados rica, com linguagem acessível e uma boa cobertura temática, sem a necessidade de depender de APIs externas para o funcionamento central do autocompletar.

### Front-End com React

Foi minha primeira experiência prática com React. Para dar os primeiros passos, vi muitos tutoriais introdutórios, buscando compreender a fundo o funcionamento dos *hooks*, a lógica por trás da estrutura de componentes e, claro, como integrar tudo isso com o GraphQL através do Apollo Client.

Criei um campo de busca funcional, com design responsivo. Também adicionei um cabeçalho com um ícone animado, um fundo com gradiente dinâmico, flashcards temáticos e um rodapé simples para melhorar a interface.

Mesmo sem background em design, essa etapa foi ótima para aprender sobre UI/UX na prática.

### Backend e GraphQL

Com o *front-end* já tomando forma e pronto para consumir dados, dediquei-me ao desenvolvimento do servidor GraphQL, utilizando Apollo Server e Node.js. A API foi projetada com simplicidade e eficiência em mente, expondo uma única *query*: getSuggestions(term: String). Essa *query* é responsável por filtrar os termos e retornar até 20 sugestões que contêm o texto digitado pelo usuário. A busca é insensível a maiúsculas/minúsculas e procura por correspondências parciais, garantindo flexibilidade.

As sugestões aparecem dinamicamente conforme o usuário digita, já a partir do quarto caractere. No *front-end*, são exibidas até 10 sugestões de forma visível, e as demais (se houverem) podem ser acessadas por meio de um *scroll* interno, conforme especificado no desafio.

Um detalhe importante na experiência do usuário é que a parte do termo correspondente ao texto digitado é sempre exibida em negrito, facilitando a identificação. Além disso, implementei um destaque visual sutil: ao passar o mouse sobre a sugestão (ou tocar em dispositivos móveis), o item inteiro muda de cor, melhorando a navegação visual e a interação. Além disso, é permitido navegar pelas sugestões pelo mouse ou pelo teclado.

Atualmente, o backend /suggestions consulta diretamente o banco de dados PostgreSQL para buscar as sugestões. O servidor Apollo GraphQL apenas encaminha as requisições para esse backend REST. A arquitetura permite trocar facilmente o banco ou o serviço de backend conforme necessário.

## Funcionalidades Atuais

O projeto, em sua fase atual, entrega as seguintes funcionalidades:
- Sugestões aparecem a partir do 4º caractere digitado.
- Requisições rápidas via GraphQL, com busca parcial e case insensitive.
- Scroll interno com até 10 sugestões visíveis e no máximo 20 retornadas.
- Trecho que bate com a busca em negrito.
- Clique preenche o campo de busca.
- Layout responsivo para vários tamanhos de tela.
- Destaque visual no hover/touch.
- Navegação por teclado (setas e Enter).

## Principais Desafios

Como era minha primeira vez com React e GraphQL, o principal desafio foi aprender e aplicar esses conhecimentos de forma simultânea. Isso me levou a enfrentar algumas dificuldades:

- Aprender React e GraphQL ao mesmo tempo.
- Gerenciar o estado da busca para não travar a interface.
- Construir uma interface simples e agradável sem experiência prévia em design.
- Configurar o ambiente Docker para rodar tudo junto.
- Definir o momento certo para mostrar as sugestões e como destacá-las sem atrapalhar o usuário.

## Próximas Melhorias

Com mais tempo e recursos, há várias melhorias que eu adoraria implementar para levar este projeto ao próximo nível:

- Adicionar debounce para evitar muitas chamadas à API.
- Mostrar resultados reais da busca abaixo das sugestões.
- Criar um modo escuro alternável, oferecendo mais opções de personalização para o usuário.
- Implementar internacionalização (i18n).
- Colocar animações suaves.
- Criar testes automáticos para garantir qualidade.

## Considerações Finais

Foi um projeto que me tirou da zona de conforto e me fez aprender bastante. Fiquei feliz com o resultado e com a arquitetura simples, modular e pronta para crescer.

O código está organizado assim:

- `/frontend`: React + Apollo Client
- `/backend`: Apollo Server + Node.js
- `/graphql`:  GraphQL
- `/data`: arquivo `dados.json` com os termos
- `docker-compose.yml`: para rodar tudo com Docker

Luísa Gontijo Porfírio  
Julho de 2025
