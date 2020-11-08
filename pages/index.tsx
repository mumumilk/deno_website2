/* Copyright 2020 the Deno authors. All rights reserved. MIT license. */

import React from "react";
import Head from "next/head";
import Link from "next/link";
import CodeBlock from "../components/CodeBlock";
import Footer from "../components/Footer";
import versions from "../versions.json";
import { NextPage, GetStaticProps } from "next";
import InlineCode from "../components/InlineCode";
import Header from "../components/Header";
import { CookieBanner } from "../components/CookieBanner";

interface HomeProps {
  latestStd: string;
}

const Home: NextPage<HomeProps> = ({ latestStd }) => {
  const complexExampleProgram = `import { serve } from "https://deno.land/std@${latestStd}/http/server.ts";
const s = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of s) {
  req.respond({ body: "Hello World\\n" });
}`;

  return (
    <>
      <Head>
        <title>
          {/* Deno - A secure runtime for JavaScript and TypeScript */}
          Deno - Uma runtime segura para JavaScript e TypeScript
        </title>
      </Head>
      <CookieBanner />
      <div className="bg-white">
        <div className="bg-gray-50 border-b border-gray-200">
          <Header />
          <div className="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-20 flex flex-col items-center">
            <h1 className="font-extrabold text-5xl leading-10 tracking-tight text-gray-900">
              Deno
            </h1>
            <h2 className="mt-4 sm:mt-5 font-light text-2xl text-center leading-tight text-gray-900">
              {/* A <strong className="font-semibold">secure</strong> runtime for{" "}
              <strong className="font-semibold">JavaScript</strong> and{" "}
              <strong className="font-semibold">TypeScript</strong>. */}
              Uma runtime <strong className="font-semibold">segura</strong> para{" "}
              <strong className="font-semibold">JavaScript</strong> e{" "}
              <strong className="font-semibold">TypeScript</strong>.
            </h2>

            <a
              href="https://github.com/denoland/deno/releases/latest"
              className="rounded-full mt-4 px-8 py-2 bg-blue-500 text-white shadow-lg"
            >
              {versions.cli[0]}
            </a>
          </div>
        </div>
        <div className="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 mt-20">
          <p className="my-4 text-gray-700">
            {/* Deno is a simple, modern and secure runtime for JavaScript and
            TypeScript that uses V8 and is built in Rust. */}
            Deno é uma runtime simples, moderna e segura para JavaScript e TypeScript
            que utiliza o V8 e é construída em Rust.
          </p>
          <ol className="ml-8 list-disc text-gray-700">
            <li>
              {/* Secure by default. No file, network, or environment access, unless
              explicitly enabled. */}
              Segura por padrão. Sem acesso à arquivos, rede ou ambiente, a não ser
              que habilitado explícitamente.
            </li>
            <li>
              {/* Supports TypeScript out of the box. */}
              Suporta TypeScript por padrão.
            </li>
            <li>
              {/* Ships only a single executable file. */}
              Gera um único executável.
            </li>
            <li>
              {/*Has built-in utilities like a dependency inspector (
              <InlineCode>deno info</InlineCode>) and a code formatter (
              <InlineCode>deno fmt</InlineCode>). */}
              Possui utilidades como inspetor de dependências (<InlineCode>deno info</InlineCode>)
              e um formatador de código (<InlineCode>deno fmt</InlineCode>)
            </li>
            <li>
              {/* Has a set of reviewed (audited) standard modules that are
              guaranteed to work with Deno:{" "}
              <a href="https://deno.land/std" className="link">
                deno.land/std
              </a> */}
              Tem um conjunto de módulos padrões revisados (auditados) que funcionam
              garantidamente com Deno:{" "}
              <a href="https://deno.land/std" className="link">
                deno.land/std
              </a>
            </li>
          </ol>
        </div>
        <div className="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 mt-20">
          <Link href="#installation">
            <a className="hover:underline">
              <h3 className="font-bold text-xl" id="installation">
                {/* Installation */}
                Instalação
              </h3>
            </a>
          </Link>
          <InstallSection />
        </div>
        <div className="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 mt-20">
          <Link href="#getting-started">
            <a className="hover:underline">
              <h3 className="font-bold text-xl" id="getting-started">
                {/* Getting Started */}
                Começando
              </h3>
            </a>
          </Link>
          <p className="my-4 text-gray-700">
            {/* Try running a simple program: */}
            Tente executar um simples programa:
          </p>
          <CodeBlock
            code="deno run https://deno.land/std/examples/welcome.ts"
            language="bash"
          />
          <p className="my-4 text-gray-700">
            {/* Or a more complex one: */}
            Ou um mais complexo:
          </p>
        </div>
        <div className="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8">
          <CodeBlock
            code={complexExampleProgram}
            language="typescript"
            disablePrefixes
          />
        </div>
        <div className="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8">
          <p className="my-4 text-gray-700">
            {/* You can find a more in depth introduction, examples, and environment
            setup guides in{" "}
            <Link href="/[...rest]" as="/manual">
              <a className="link">the manual</a>
            </Link>
            . */}
            Você pode encontrar uma introdução mais aprofundada, com exemplos e configuração
            de ambiente{" "}
            <Link href="/[...rest]" as="/manual">
              <a className="link">no manual</a>
            </Link>
            .
          </p>
        </div>
        <div className="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 mt-20">
          <Link href="#runtime-documentation">
            <a className="hover:underline">
              <h3 className="font-bold text-xl" id="runtime-documentation">
                {/* Runtime Documentation */}
                Documentação da runtime
              </h3>
            </a>
          </Link>
          <p className="my-4 text-gray-700">
            A documentação básica da runtime para o Deno pode ser encontrada em{" "}
            <a href="https://doc.deno.land/builtin/stable" className="link">
              doc.deno.land
            </a>
            .
            {/* The basic runtime documentation for Deno can be found on{" "}
            <a href="https://doc.deno.land/builtin/stable" className="link">
              doc.deno.land
            </a>
            . */}
          </p>
          <p className="my-4 text-gray-700">
            {/* Deno comes with{" "}
            <Link href="/[...rest]" as="/manual">
              <a className="link">a manual</a>
            </Link>{" "}
            which contains more in depth explanations about the more complex
            functions of the runtime, an introduction to the concepts that Deno
            is built on, details about the internals of Deno, how to embed Deno
            in your own application and how to extend Deno using Rust plugins. */}
            Deno já vem com{" "}
            <Link href="/[...rest]" as="/manual">
              <a className="link">um manual</a>
            </Link>{" "}
            que contém explicações mais aprofundadas acerca das funções mais complexas
            da runtime, uma introdução aos conceitos nos quais o Deno é escrito em cima,
            detalhes internos do Deno, como embutir Deno na sua própria aplicação e como
            extender o Deno usando plugins Rust. 
          </p>
          <p className="my-4 text-gray-700">
            {/* The manual also contains information about the built in tools that
            Deno provides. */}
            O manual também possuí informações acerca das ferramentas fornecidas
            originalmente com Deno.
          </p>
        </div>
        <div className="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 mt-20">
          <Link href="#standard-modules">
            <a className="hover:underline">
              <h3 className="font-bold text-xl" id="standard-modules">
                {/* Standard Modules */}
                Módulos Padrões
              </h3>
            </a>
          </Link>
          <p className="my-4 text-gray-700">
            {/* Next to the Deno runtime, Deno also provides a list of audited
            standard modules that are reviewed by the Deno maintainers and are
            guaranteed to work with a specific Deno version. These live
            alongside the Deno source code in the{" "}
            <a href="https://github.com/denoland/deno" className="link">
              denoland/deno
            </a>{" "}
            repository. */}
            Próximo à runtime, Deno também fornece uma lista de módulos
            padrões auditados que são revisados pelos mantenedores do Deno e funcionam
            garantidamente com versões específicas do Deno. Eles vivem junto ao código
            fonte do Deno no repositório{" "}
            <a href="https://github.com/denoland/deno" className="link">
              denoland/deno
            </a>{" "}
          </p>
          <p className="my-4 text-gray-700">
            {/* These standard modules are hosted at{" "}
            <Link href="/[...rest]" as="/std">
              <a className="link">deno.land/std</a>
            </Link>{" "}
            and are distributed via URLs like all other ES modules that are
            compatible with Deno. */}
            Esses módulos padrões são hospedados em{" "}
            <Link href="/[...rest]" as="/std">
              <a className="link">deno.land/std</a>
            </Link>{" "}
            e são distribuídos via URLs como todos os outros ES módulos que são
            compatíveis com Deno.
          </p>
        </div>
        <div className="max-w-screen-sm mx-auto px-4 sm:px-6 md:px-8 mt-20">
          <Link href="#third-party-modules">
            <a className="hover:underline">
              <h3 className="font-bold text-xl" id="third-party-modules">
                {/* Third Party Modules */}
                Módulos Externos
              </h3>
            </a>
          </Link>
          <p className="my-4 text-gray-700">
            {/* Deno can import modules from any location on the web, like GitHub, a
            personal webserver, or a CDN like{" "} */}
            Deno pode importar módulos de qualquer lugar da web, como Github, um
            servidor web próprio, ou uma CDN como{" "}
            <a href="https://www.skypack.dev" className="link">
              Skypack
            </a>
            ,{" "}
            <a href="https://jspm.io" className="link">
              jspm.io
            </a>{" "}
            or{" "}
            <a href="https://www.jsdelivr.com/" className="link">
              jsDelivr
            </a>
            .
          </p>
          <p className="my-4 text-gray-700">
            {/* To make it easier to consume third party modules Deno provides some
            built in tooling like <InlineCode>deno info</InlineCode> and{" "}
            <InlineCode>deno doc</InlineCode>. deno.land also provides a web UI
            for viewing module documentation. It is available at{" "} */}
            Para facilitar o consumo de módulos externos, Deno fornece ferramentas
            como <InlineCode>deno info</InlineCode> e{" "}
            <InlineCode>deno doc</InlineCode>. deno.land também fornece uma interface
            web para visualização da documentação dos módulos. Disponível em{" "}
            <a href="https://doc.deno.land" className="link">
              doc.deno.land
            </a>
            .
          </p>
          <p className="my-4 text-gray-700">
            {/* deno.land also provides a simple public hosting service for ES
            modules that work with Deno. It can be found at{" "} */}
            deno.land também fornece um serviço simples de hospedagem para ES modules
            que funcionam com Deno. Disponível em{" "}
            <Link href="/x">
              <a className="link">deno.land/x</a>
            </Link>
            .
          </p>
        </div>
        <div className="mt-20">
          <Footer simple />
        </div>
      </div>
    </>
  );
};

const InstallSection = () => {
  const shell = (
    <div key="shell" className="my-4 text-gray-700">
      <p className="py-2">Shell (Mac, Linux):</p>
      <CodeBlock
        language="bash"
        code={`curl -fsSL https://deno.land/x/install/install.sh | sh`}
      />
    </div>
  );
  const homebrew = (
    <div key="homebrew" className="my-4 text-gray-700">
      <p className="mb-2">
        <a href="https://formulae.brew.sh/formula/deno" className="link">
          Homebrew
        </a>{" "}
        (Mac):
      </p>
      <CodeBlock language="bash" code={`brew install deno`} />
    </div>
  );
  const powershell = (
    <div key="powershell" className="my-4 text-gray-700">
      <p className="mb-2">PowerShell (Windows):</p>
      <CodeBlock
        language="bash"
        code={`iwr https://deno.land/x/install/install.ps1 -useb | iex`}
      />
    </div>
  );
  const chocolatey = (
    <div key="chocolatey" className="my-4 text-gray-700">
      <p className="mb-2">
        <a href="https://chocolatey.org/packages/deno" className="link">
          Chocolatey
        </a>{" "}
        (Windows):
      </p>
      <CodeBlock language="bash" code={`choco install deno`} />
    </div>
  );
  const scoop = (
    <div key="scoop" className="my-4 text-gray-700">
      <p className="mb-2">
        <a href="https://scoop.sh/" className="link">
          Scoop
        </a>{" "}
        (Windows):
      </p>
      <CodeBlock language="bash" code={`scoop install deno`} />
    </div>
  );
  const cargo = (
    <div key="cargo" className="my-4 text-gray-700">
      <p className="py-2">
        {/* Build and install from source using{" "} */}
        Constrúa e instale através do fonte utilizando{" "}
        <a href="https://crates.io/crates/deno" className="link">
          Cargo
        </a>
      </p>
      <CodeBlock language="bash" code={`cargo install deno`} />
    </div>
  );

  return (
    <>
      <p className="my-4 text-gray-700">
        {/* Deno ships as a single executable with no dependencies. You can install
        it using the installers below, or download a release binary from the{" "}
        <a href="https://github.com/denoland/deno/releases" className="link">
          releases page
        </a>
        . */}
        Deno gera um único executável sem dependências. Você pode instalá-lo
        usando algum dos instaladores abaixo, ou baixar os binários através da{" "}
        <a href="https://github.com/denoland/deno/releases" className="link">
          página de versões
        </a>
        .
      </p>
      {shell}
      {powershell}
      {homebrew}
      {chocolatey}
      {scoop}
      {cargo}
      <p className="my-4 text-gray-700">
        {/* See{" "}
        <a className="link" href="https://github.com/denoland/deno_install">
          deno_install
        </a>{" "}
        for more installation options. */}
        Veja{" "}
        <a className="link" href="https://github.com/denoland/deno_install">
          deno_install
        </a>{" "}
        para mais opções de instalação.
      </p>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  return {
    props: {
      latestStd: versions.std[0],
    },
  };
};

export default Home;
