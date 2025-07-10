## Desafio: Auto-completar na Busca

Olá! Esse desafio técnico tem como propósito medir suas habilidades, ver como estuda, pensa e se organiza na prática.
O tempo de término é livre, porém o ideal é que não demore muito mais do que uma semana, já que as circunstâncias para
a vaga podem mudar.

Após finalizar o desafio, nos envie um link para repositório do projeto no GitHub, GitLab ou BitBucket (o que preferir).

**Registre tudo:** testes que forem executados, ideias que gostaria de implementar se tivesse tempo (explique como você as
resolveria, se houvesse tempo), decisões que forem tomadas e seus porquês, arquiteturas que forem testadas e os motivos
de terem sido modificadas ou abandonadas. Crie um arquivo `COMMENTS.md` ou `HISTORY.md` no repositório para registrar
essas reflexões e decisões.

============

**Dicas :bulb:**

* Use ferramentas e bibliotecas open source, mas documente as decisões e porquês;
* Automatize o máximo possível;
* Em caso de dúvidas, pergunte.

Boa sorte!

### Considerações Gerais

O problema aqui descrito tem algumas constraints:

* a) Eu preciso conseguir rodar seu código em um **Ubuntu** ou **Mac OS X**;
* b) Queremos rodar o seu projeto de maneira simples. Recomendamos que o comando docker compose up seja capaz de subir todas as partes do seu desafio (front, back, ...)

O repositório contém algumas imagens de exemplo para implementação da parte Web, elas são apenas referências então
sinta-se livre para segui-las ou criar sua própria interface.

## O Desafio :test_tube:

Você deve implementar uma única página com um formulário de busca onde, ao digitar o termo inicial, sugestões serão
exibidas para completar o termo da busca. Mais detalhes abaixo.

Seu sistema deve rodar na Web utilizando ReactJs no front-end + backend usando a linguagem de programação e ferramentas
open source da sua preferência. O front-end obrigatoriamente deve se comunicar com um GraphQL e o GraphQL é quem deve
se comunicar com o back-end.

<img width="1333" alt="Screenshot 2024-07-02 at 08 55 38" src="https://gist.github.com/assets/4166006/089edce3-70dc-4ffb-a924-855bb7394d4d">

Esperamos que o projeto cumpra os seguintes requisitos:

### Busca

A página de busca consiste em pelo menos um campo para a pessoa usuária preencher o que deseja buscar. Abaixo você pode
conferir o desenho de um exemplo, mas fique livre para implementar a interface da maneira que preferir, use-a apenas
como um guia. Dê um título para a busca, como no exemplo, ou utlize um placeholder no campo de busca.

<img width="1088" alt="Screenshot 2024-07-01 at 18 00 41" src="https://gist.github.com/assets/4166006/b991c675-3dad-411a-b63e-9ec3dc0420b0">

A página precisa ser responsiva, ou seja, exibida amigavelmente em dispositivos móveis.

### Sugestões do Autocompletar

A exibição do autocompletar para o termo digitado deve atender aos requisitos:

* As sugestão só começam a ser exibidas após digitar, no minimo, 4 caracteres;
* Se não existe sugestões para completar o termo digitado, não deve ser exibido nenhum elemento abaixo do campo de busca;
* O backend precisa retornar, no máximo, 20 sugestões. Porém, somente 10 são exibidas, as demais o usuário precisa realizar um scroll dentro do elemento do auto-completar;
* As sugestão precisam manter em **negrito** parte do termo que corresponde ao termo inicial da busca;
* Ao passar o mouse por alguma sugestão (*hover*) ou tocar no elemento (*touch* no mobile), o elemento deve ser destacado (como no exemplo abaixo);
* O usuário pode continuar digitando seu termo de busca, então as sugestões vão mudando dinamicamente, baseado na atualização do termo;
* As sugestão precisam ser exibidas na mesma (ou próximo) velocidade que o usuário digita;
* Ao clicar em alguma sugestão, o campo de busca principal deve ser atualiado com o texto da sugestão;

<img width="1087" alt="Screenshot 2024-07-01 at 18 09 31" src="https://gist.github.com/assets/4166006/077b3296-a889-4e28-b008-d3e3c941bf0c">

### Lista de Sugestões / Persistência

O armazenamento das sugestões fica à seu critério, você pode usar um banco de dados opensource à sua escolha e fornecer uma
forma de popular o banco ou até mesmo fazer com que sua API entregue os dados de um arquivo JSON já populado na pasta do
projeto. Os termos que vão ser sugeridos fica a seu critério, então prepare uma lista que consiga atender a um dominio de
sua preferência.

Se optar por usar um banco de dados você precisa me fornecer um meio automatizado de popular ele para testar seu projeto
sem que eu precise cadastrar as sugestão uma por uma.

## Avaliação do Desafio :memo:

Alguns pontos que serão analisados:

* Atende as funcionalidades propostas (auto-completar uma busca);
* Organização do código
* Facilidade ao rodar o projeto
* Justificativa das decisões no arquivo `COMMENTS.md` ou `HISTORY.md`