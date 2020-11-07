<!-- # Introduction

Deno is a JavaScript/TypeScript runtime with secure defaults and a great
developer experience.

It's built on V8, Rust, and Tokio. -->
# Introdução

Deno é uma runtime Javascript/Typescript segura por padrão e com uma
ótima experiência para pessoas desenvolvedoras.

É construído em cima do V8, Rust e Tokio.

<!-- ## Feature Highlights

- Secure by default. No file, network, or environment access (unless explicitly
  enabled).
- Supports TypeScript out of the box.
- Ships a single executable (`deno`).
- Has built-in utilities like a dependency inspector (`deno info`) and a code
  formatter (`deno fmt`).
- Has
  [a set of reviewed (audited) standard
  modules](https://github.com/denoland/deno/tree/master/std) that are guaranteed
  to work with Deno.
- Scripts can be bundled into a single JavaScript file. -->
## Funcionalidades Destacadas

- Segura por padrão. Sem acesso à arquivos, rede ou ambiente (a não ser que
  habilitado explicitamente).
- Originalmente com suporte à TypeScript.
- Gera um único executável (`deno`).
- Possui utilidades como inspetor de dependência (`deno info`) e fomatador de
  código (`deno fmt`).
- Tem
  [uma variedade de módulos padrões revisados (auditados)](https://github.com/denoland/deno/tree/master/std)
  que funcionam garantidamente com Deno.
- Scripts podem ser empacotados em um único arquivo JavaScript.

<!-- ## Philosophy

Deno aims to be a productive and secure scripting environment for the modern
programmer.

Deno will always be distributed as a single executable. Given a URL to a Deno
program, it is runnable with nothing more than
[the ~15 megabyte zipped executable](https://github.com/denoland/deno/releases).
Deno explicitly takes on the role of both runtime and package manager. It uses a
standard browser-compatible protocol for loading modules: URLs.

Among other things, Deno is a great replacement for utility scripts that may
have been historically written with bash or python. -->
## Filosofia

Deno tem o intuito de ser um ambiente seguro e produtivo de escrita de código
para a pessoa programadora moderna.

Deno sempre será distribuído como um único executável. Dado uma URL para um 
programa Deno, é executável com nada mais que [os ~15 megabytes do executável comprimido](https://github.com/denoland/deno/releases).
Deno exerce explicitamente o papel tanto de runtime, quanto de gerenciador de pacotes. Ele usa
um protocolo padrão, compatível com navegadores, para o carregamento de módulos: as URLs.

Entre outras coisas, Deno é um ótimo substituto para scripts que antes eram escritos utilizando
bash ou python.

<!-- ## Goals

- Only ship a single executable (`deno`).
- Provide Secure Defaults.
  - Unless specifically allowed, scripts can't access files, the environment, or
    the network.
- Browser compatible: The subset of Deno programs which are written completely
  in JavaScript and do not use the global `Deno` namespace (or feature test for
  it), ought to also be able to be run in a modern web browser without change.
- Provide built-in tooling like unit testing, code formatting, and linting to
  improve developer experience.
- Does not leak V8 concepts into user land.
- Be able to serve HTTP efficiently. -->
## Objetivos

- Gerar um único executável (`deno`).
- Prover segurança por padrão.
  - A não ser que permitido explícitamente, scripts não podem acessar arquivos,
  ambiente ou a rede.
- Ser compatível com navegadores: O conjunto de programas que são escritos 
inteiramente em JavaScript, e não usam o namespace global `Deno`, devem ser capazes
de rodar em um navegador moderno sem nenhuma alteração.
- Prover ferramental para testes unitários, formatação de código e linting, para melhor
experiência de desenvolvimento.
- Não vazar conceitos do V8 para o campo do usuário.
- Ser capaz de servir HTTP de maneira eficiente.

<!-- ## Comparison to Node.js

- Deno does not use `npm`.
  - It uses modules referenced as URLs or file paths.
- Deno does not use `package.json` in its module resolution algorithm.
- All async actions in Deno return a promise. Thus Deno provides different APIs
  than Node.
- Deno requires explicit permissions for file, network, and environment access.
- Deno always dies on uncaught errors.
- Uses "ES Modules" and does not support `require()`. Third party modules are
  imported via URLs: -->
## Comparação com Node.js

- Deno não usa `npm`.
  - Os módulos são referenciados como URLs ou caminhos de arquivo.
- Deno não possuí `package.json` no seu algorítmo de resolução de módulos.
- Todas as operações asíncronas no Deno retornam uma promise. Portanto as APIs
providenciadas pelo Deno são diferentes do Node.
- Deno requer permissões explícitas para acesso à arquivos, rede e ambiente.
- Utiliza "ES Modules" e não suporta `require()`. Módulos externos são
importados via URLs.

  ```javascript
  import * as log from "https://deno.land/std@$STD_VERSION/log/mod.ts";
  ```

<!-- ## Other key behaviors

- Remote code is fetched and cached on first execution, and never updated until
  the code is run with the `--reload` flag. (So, this will still work on an
  airplane.)
- Modules/files loaded from remote URLs are intended to be immutable and
  cacheable. -->
## Outros comportamentos-chave

- Códigos externos são solicitados e cacheados na primeira execução, e não são
  atualizados até que o código seja executado com a flag `--reload`. (Portanto,
  seu código irá funcionar até dentro de um avião).
- Módulos/arquivos carregados a partir de URLs remotas são cacheados e imutáveis.
