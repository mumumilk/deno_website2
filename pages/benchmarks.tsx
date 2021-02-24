/* Copyright 2020 the Deno authors. All rights reserved. MIT license. */

import React from "react";
import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  BenchmarkData,
  Column,
  reshape,
  formatLogScale,
  formatMB,
  formatPercentage,
  formatReqSec,
  formatKB,
} from "../util/benchmark_utils";
import BenchmarkChart, { BenchmarkLoading } from "../components/BenchmarkChart";
import { CookieBanner } from "../components/CookieBanner";

// TODO(lucacasonato): add anchor points to headers
function Benchmarks(): React.ReactElement {
  const _ = useRouter();
  const location = typeof window !== "undefined" ? window.location : null;
  const typescriptBenches = ["check", "no_check", "bundle", "bundle_no_check"];

  let show!: { dataFile: string; range: number[]; search: string };
  // Default (recent).
  show = {
    dataFile: "recent.json",
    range: [],
    search: "",
  };
  while (location) {
    // Show all.
    if (location.search.endsWith("?all")) {
      show = { dataFile: "data.json", range: [], search: "all" };
      break;
    }
    // Custom range.
    const range = decodeURIComponent(location.search)
      .split(/([?,]|\.{2,})/g)
      .filter(Boolean)
      .map(Number)
      .filter(Number.isInteger);
    if ([1, 2].includes(range.length)) {
      const search = range.join("...");
      show = { dataFile: "data.json", range, search };
      break;
    }
    break;
  }
  if (
    location != null &&
    location.search !== show.search &&
    location.search !== `?${show.search}`
  ) {
    location.replace(location.toString().replace(/\?.*$/, `?${show.search}`));
  }

  const showAll = show.dataFile !== "recent.json";
  const dataUrl = `https://denoland.github.io/benchmark_data/${show.dataFile}`;

  const [data, setData] = React.useState<BenchmarkData | null>(null);
  const [dataRangeTitle, setDataRangeTitle] = React.useState<string>("");
  const [showNormalized, setShowNormalized] = React.useState(false);

  React.useEffect(() => {
    setData(null);
    fetch(dataUrl).then(async (response) => {
      const rawData = await response.json();
      const data = reshape(rawData.slice(...show.range));
      setData(data);

      // Show actual range in title bar (except when showing 'recent' only).
      if (typeof window !== "undefined") {
        setDataRangeTitle(
          showAll
            ? [(ks: number[]) => ks[0], (ks: number[]) => ks.pop()]
                .map((f) => f([...rawData.keys()].slice(...show.range)))
                .filter((k) => k != null)
                .join("...")
            : ""
        );
      }
    });
  }, [show.search]);

  return (
    <>
      <Head>
        <title>
          {/* Benchmarks */}
          Comparativo
          {dataRangeTitle ? `(${dataRangeTitle})` : `| Deno`}
        </title>
      </Head>
      <CookieBanner />
      <div className="bg-gray-50 min-h-full">
        {/* <Header subtitle="Continuous Benchmarks" widerContent={true} /> */}
        <Header subtitle="Comparativos contínuos" widerContent={true} />
        <div className="mb-12">
          <div className="max-w-screen-md mx-auto px-4 sm:px-6 md:px-8 mt-8 pb-8">
            <img src="/images/deno_logo_4.gif" className="mb-12 w-32 h-32" />
            <h4 className="text-2xl font-bold tracking-tight">
              {/* About */}
              Sobre
            </h4>
            <p className="mt-4">
              {/* As part of Deno's continuous integration and testing pipeline we
              measure the performance of certain key metrics of the runtime. You
              can view these benchmarks here. */}
              Como parte da integração contínua e fluxo de testes do Deno, nós medimos
              o desempenho de certas métricas-chave da runtime. Você pode ver esses
              comparativos aqui.
            </p>
            <p className="mt-4">
              {/* You are currently viewing data for{" "}
              {showAll ? "all" : "the most recent"} commits to the{" "}
              <a href="https://github.com/denoland/deno">main</a>
              branch. You can also view{" "}
              <Link href={!showAll ? "/benchmarks?all" : "/benchmarks"}>
                <a className="link">{!showAll ? "all" : "the most recent"}</a>
              </Link>{" "}
              commits. */}
              Você está visualizando os dados{" "}
              {showAll ? "de todos os commits" : "dos commits mais recentes"} da branch{" "}
              <a href="https://github.com/denoland/deno">master</a>.
              Você também pode visualizar{" "}
              <Link
                href="/benchmarks"
                as={!showAll ? "/benchmarks?all" : "/benchmarks"}
              >
                <a className="link">{!showAll ? "todos os commits" : "os commits mais recentes"}</a>
              </Link>.
            </p>
            <div className="mt-12 pt-4">
              <h4 className="text-2xl font-bold tracking-tight">
                {/* Runtime Metrics */}
                Métricas da runtime
              </h4>
              <p className="mt-2">
                {/* In this section we measure various metrics of the following
                scripts: */}
                Nesta seção nós medimos várias métricas dos seguintes scripts:
              </p>
              <ul className="ml-8 list-disc my-2">
                <li>
                  <SourceLink
                    path="cli/tests/003_relative_import.ts"
                    name="cold_relative_import"
                  />
                </li>
                <li>
                  <SourceLink
                    path="cli/tests/text_decoder_perf.js"
                    name="text_decoder"
                  />
                </li>
                <li>
                  <SourceLink path="cli/tests/error_001.ts" name="error_001" />
                </li>
                <li>
                  <SourceLink path="cli/tests/002_hello.ts" name="cold_hello" />
                </li>
                <li>
                  <SourceLink
                    path="cli/tests/workers_round_robin_bench.ts"
                    name="workers_round_robin"
                  />
                </li>
                <li>
                  <SourceLink
                    path="cli/tests/003_relative_import.ts"
                    name="relative_import"
                  />
                </li>
                <li>
                  <SourceLink
                    path="cli/tests/workers_startup_bench.ts"
                    name="workers_startup"
                  />
                </li>
                <li>
                  <SourceLink path="cli/tests/002_hello.ts" name="hello" />
                </li>
              </ul>
              <div className="mt-8">
                <a href="#execution-time" id="execution-time">
                  <h5 className="text-lg font-medium tracking-tight hover:underline">
                    {/* Execution time */}
                    Tempo de execução
                  </h5>
                </a>
                <BenchmarkOrLoading
                  data={data}
                  columns={data?.execTime.filter(
                    ({ name }) => !typescriptBenches.includes(name)
                  )}
                  yLabel="seconds"
                  yTickFormat={formatLogScale}
                />
                <p className="mt-1">
                  {/* Log scale. This shows how much time total it takes to run a
                  script. For deno to execute typescript, it must first compile
                  it to JS. A warm startup is when deno has a cached JS output
                  already, so it should be fast because it bypasses the TS
                  compiler. A cold startup is when deno must compile from
                  scratch. */}
                  Representado em escala logarítmica, o gráfico mostra quanto tempo leva para executar
                  um script. Para que o Deno execute TypeScript, é preciso primeiro
                  compilar para JS. Uma inicialização quente (warm) é quando Deno já possuí uma
                  saída JS, portanto deve ser rápida pois não passa pelo compilador TS.
                  Uma inicialização fria (cold) é quando Deno precisa compilar do zero.
                </p>
              </div>
              <div className="mt-8">
                <a href="#thread-count" id="thread-count">
                  <h5 className="text-lg font-medium tracking-tight hover:underline">
                    {/* Thread count */}
                    Quantidade de threads
                  </h5>
                </a>
                <BenchmarkOrLoading
                  data={data}
                  columns={data?.threadCount.filter(
                    ({ name }) => !typescriptBenches.includes(name)
                  )}
                />
                <p className="mt-1">
                  {/* How many threads various programs use. Smaller is better. */}
                  Quantidade de threads que os programas usam. Quanto menos, melhor.
                </p>
              </div>
              <div className="mt-8">
                <a href="#syscall-count" id="syscall-count">
                  <h5 className="text-lg font-medium tracking-tight hover:underline">
                    {/* Syscall count */}
                    Quantidade de chamadas de sistema
                  </h5>
                </a>{" "}
                <BenchmarkOrLoading
                  data={data}
                  columns={data?.syscallCount.filter(
                    ({ name }) => !typescriptBenches.includes(name)
                  )}
                />
                <p className="mt-1">
                  {/* How many total syscalls are performed when executing a given
                  script. Smaller is better. */}
                  Quantidade de chamadas de sistema feitas durante a execução de um determinado script.
                  Quanto menos, melhor.
                </p>
              </div>
              <div className="mt-8">
                <a href="#max-memory-usage" id="max-memory-usage">
                  <h5 className="text-lg font-medium tracking-tight hover:underline">
                    {/* Max memory usage */}
                    Uso máximo de memória
                  </h5>
                </a>{" "}
                <BenchmarkOrLoading
                  data={data}
                  columns={data?.maxMemory.filter(
                    ({ name }) => !typescriptBenches.includes(name)
                  )}
                  yLabel="megabytes"
                  yTickFormat={formatMB}
                />
                <p className="mt-1">
                  {/* Max memory usage during execution. Smaller is better. */}
                  Uso máximo de memória durante a execução. Quanto menos, melhor.
                </p>
              </div>
            </div>
            <div className="mt-20">
              <h4 className="text-2xl font-bold tracking-tight">
                {/* TypeScript Performance */}
                Performance do TypeScript
              </h4>
              <div className="mt-8">
                <a href="#type-checking" id="type-checking">
                  <h5 className="text-lg font-medium tracking-tight hover:underline">
                    {/* Type Checking */}
                    Verificação de tipos
                  </h5>
                </a>
                <BenchmarkOrLoading
                  data={data}
                  columns={data?.execTime.filter(({ name }) => {
                    console.log(name);
                    return typescriptBenches.includes(name);
                  })}
                  yLabel="seconds"
                  yTickFormat={formatLogScale}
                />
                <p className="mt-1">
                  {/* In both cases, <code>std/examples/chat/server_test.ts</code>{" "}
                  is cached by Deno. The workload contains 20 unique TypeScript
                  modules. With <em>check</em> a full TypeScript type check is
                  performed, while <em>no_check</em> uses the{" "}
                  <code>--no-check</code> flag to skip a full type check.{" "}
                  <em>bundle</em> does a full type check and generates a single
                  file output, while <em>bundle_no_check</em> uses the{" "}
                  <code>--no-check</code> flag to skip a full type check. */}
                  Em ambos os casos, <code>std/examples/chat/server_test.ts</code>{" "}
                  é cacheado pelo Deno. A carga de trabalho contém 20 módulos únicos de TypeScript.
                  Com <em>check</em>, uma verificação completa de tipos do TypeScript é
                  feita, enquanto com <em>no_check</em>, a flag{" "}
                  <code>--no-check</code> é utilizada para pular a verificação completa de tipos.{" "}
                  <em>bundle</em> faz uma verificação completa de tipos e gera um
                  único arquivo de saída, enquanto <em>bundle_no_check</em> utiliza a flag{" "}
                  <code>--no-check</code> para pular a verificação completa de tipos.
                </p>
              </div>
            </div>
            <div className="mt-20">
              <h4 className="text-2xl font-bold tracking-tight">I/O</h4>
              <p
                className="mt-4 flex cursor-pointer"
                onClick={() => setShowNormalized(!showNormalized)}
              >
                <span
                  role="checkbox"
                  tabIndex={0}
                  aria-checked={showNormalized ? "true" : "false"}
                  className={`${
                    showNormalized ? "bg-gray-900" : "bg-gray-200"
                  } relative inline-block flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline`}
                >
                  <span
                    aria-hidden="true"
                    className={`${
                      showNormalized ? "translate-x-5" : "translate-x-0"
                    } inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200`}
                  ></span>
                </span>
                <span className="ml-2 text-gray-900">
                  {/* Show normalized benchmarks */}
                  Mostrar comparativo normalizado
                </span>
              </p>
              <div className="mt-8">
                <a href="#http-server-throughput" id="http-server-throughput">
                  <h5 className="text-lg font-medium tracking-tight hover:underline">
                    {/* HTTP Server Throughput */}
                    Taxa de transferência HTTP
                  </h5>
                </a>
                <BenchmarkOrLoading
                  data={data}
                  columns={
                    showNormalized ? data?.normalizedReqPerSec : data?.reqPerSec
                  }
                  yLabel={
                    showNormalized ? "% of hyper througput" : "1k req/sec"
                  }
                  yTickFormat={showNormalized ? formatPercentage : formatReqSec}
                />
                <p className="mt-1">
                  {/* Tests HTTP server performance. 10 keep-alive connections do as
                  many hello-world requests as possible. Bigger is better. */}
                  Testa a performance de um server HTTP. 10 conexões do tipo keep-alive
                  fazem o maior número possível de requisições hello-world. Quanto mais, melhor.
                </p>
                <ul className="ml-8 list-disc my-2">
                  <li>
                    {/* <SourceLink path="tools/deno_tcp.ts" name="deno_tcp" /> is a
                    fake http server that doesn't parse HTTP. It is comparable
                    to <SourceLink path="tools/node_tcp.js" name="node_tcp" /> */}
                    <SourceLink path="cli/bench/deno_tcp.ts" name="deno_tcp" /> é uma
                    imitação de um servidor http que não faz parse de HTTP. Pode ser comparado 
                    com <SourceLink path="cli/bench/node_tcp.js" name="node_tcp" />
                  </li>
                  <li>
                    <SourceLink
                      path="std/http/http_bench.ts"
                      name="deno_http"
                    />{" "}
                    {/* is a web server written in TypeScript. It is comparable to{" "} */}
                    é um servidor web escrito em TypeScript. Pode ser comparado com{" "}
                    <SourceLink
                      path="cli/bench/node_http.js"
                      name="node_http"
                    />
                  </li>
                  <li className="break-words">
                   {/* core_http_bin_ops and core_http_json_ops are two versions of
                    a minimal fake HTTP server. It blindly reads and writes
                    fixed HTTP packets. It is comparable to deno_tcp and
                    node_tcp. This is a standalone executable that uses{" "} */}
                    deno_core_single e deno_core_multi são duas versões de uma imitação de
                    um servidor HTTP mínimo. Esse servidor somente lê e escreve pacotes HTTP
                    fixos. Pode ser comparado com deno_tcp e node_tcp.
                    Esse é um executável standalone que utiliza{" "}
                    <a
                      className="link"
                      href="https://crates.io/crates/deno_core"
                    >
                      {/* the deno rust crate */}
                      a crate de rust deno
                    </a>
                    {/* . The code is in{" "} */}
                    . Disponível em{" "}
                    <SourceLink
                      path="core/examples/http_bench_bin_ops.rs"
                      name="http_bench_bin_ops.rs"
                    />{" "}
                    {/* and{" "} */}
                    e{" "}
                    <SourceLink
                      path="core/examples/http_bench_bin_ops.js"
                      name="http_bench_bin_ops.js"
                    />
                    {/* for http_bench_bin_ops and{" "} */}
                    para http_bench_bin_ops e{" "}
                    <SourceLink
                      path="core/examples/http_bench_json_ops.rs"
                      name="http_bench_json_ops.rs"
                    />{" "}
                    {/* and{" "} */}
                    e{" "}
                    <SourceLink
                      path="core/examples/http_bench_json_ops.js"
                      name="http_bench_json_ops.js"
                    />
                    {/* for http_bench_json_ops. */}
                    para http_bench_json_ops.
                  </li>
                  <li>
                    <SourceLink
                      path="test_util/src/test_server.rs"
                      name="hyper"
                    />{" "}
                    {/* is a Rust HTTP server and represents an upper bound. */}
                    é um servidor HTTP em Rust e representa um limiar superior.
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <a href="#http-latency" id="http-latency">
                  <h5 className="text-lg font-medium tracking-tight hover:underline">
                    {/* HTTP Latency */}
                    Latência HTTP
                  </h5>
                </a>{" "}
                <BenchmarkOrLoading
                  data={data}
                  columns={data?.maxLatency}
                  yLabel={"milliseconds"}
                  yTickFormat={formatLogScale}
                />
                <p className="mt-1">
                  {/* Max latency during the same test used above for
                  requests/second. Smaller is better. Log scale. */}
                  Latência máxima durante o mesmo teste utilizado acima para
                  requisições por segundo. Quanto menor, melhor. Gráfico em escala logarítmica. 
                </p>
              </div>
              <div className="mt-8">
                <a href="#http-proxy-throughput" id="http-proxy-throughput">
                  <h5 className="text-lg font-medium tracking-tight hover:underline">
                    {/* HTTP Proxy Throughput */}
                    Taxa de transferência de proxy HTTP
                  </h5>
                </a>
                <BenchmarkOrLoading
                  data={data}
                  columns={showNormalized ? data?.normalizedProxy : data?.proxy}
                  yLabel={
                    showNormalized ? "% of hyper througput" : "1k req/sec"
                  }
                  yTickFormat={showNormalized ? formatPercentage : formatReqSec}
                />
                <p className="mt-1">
                  {/* Tests proxy performance. 10 keep-alive connections do as many
                  hello-world requests as possible. Bigger is better. */}
                  Testa o desempenho do proxy. 10 conexões do tipo keep-alive fazendo
                  o maior número de requisições hello-world. Quanto mais, melhor.
                </p>
                <ul className="ml-8 list-disc my-2">
                  <li>
                    <SourceLink
                      path="cli/bench/deno_tcp_proxy.ts"
                      name="deno_proxy_tcp"
                    />{" "}
                    {/* is a fake tcp proxy server that doesn't parse HTTP. It is
                    comparable to{" "} */}
                    é uma imitação de um servidor proxy TCP que não faz parse de HTTP.
                    Pode ser comparado com{" "} 
                    <SourceLink
                      path="cli/bench/node_tcp_proxy.js"
                      name="node_proxy_tcp"
                    />
                  </li>
                  <li>
                    <SourceLink
                      path="cli/bench/deno_http_proxy.ts"
                      name="deno_proxy"
                    />{" "}
                    {/* is an HTTP proxy server written in TypeScript. It is
                    comparable to{" "} */}
                    é um servidor proxy HTTP escrito em TypeScript. Pode ser
                    comparado com{" "}
                    <SourceLink
                      path="cli/bench/node_http_proxy.js"
                      name="node_proxy"
                    />
                  </li>
                  <li>
                    <SourceLink
                      path="test_util/src/test_server.rs"
                      name="hyper"
                    />{" "}
                    {/* is a Rust HTTP server used as the origin for the proxy
                    tests. */}
                    é um servidor HTTP em Rust usado como origem para os testes
                    de proxy.
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <a href="#throughput" id="throughput">
                  <h5 className="text-lg font-medium tracking-tight hover:underline">
                    {/* Throughput */}
                    Taxa de transferência
                  </h5>
                </a>
                <BenchmarkOrLoading
                  data={data}
                  columns={data?.throughput}
                  yLabel={"seconds"}
                  yTickFormat={formatLogScale}
                />
                <p className="mt-1">
                  {/* Log scale. Time it takes to pipe a certain amount of data
                  through Deno.{" "} */}
                  Gráfico em escala logarítmica, representa o tempo que leva para
                  uma quantidade de dados fluirem através do Deno.
                  <SourceLink
                    path="cli/tests/echo_server.ts"
                    name="echo_server.ts"
                  />{" "}
                  {/* and */}
                  e{" "}
                  <SourceLink path="cli/tests/cat.ts" name="cat.ts" />.{" "}
                  {/* Smaller is better. */}
                  Quanto menor, melhor.
                </p>
              </div>
            </div>
            <div className="mt-20">
              <h4 className="text-2xl font-bold tracking-tight">
                {/* Size */}
                Tamanho
              </h4>
              <div className="mt-8">
                <a href="#executable-size" id="executable-size">
                  <h5 className="text-lg font-medium tracking-tight hover:underline">
                    {/* File sizes */}
                    Tamanho dos arquivos
                  </h5>
                </a>
                <BenchmarkOrLoading
                  data={data}
                  columns={data?.binarySize}
                  yLabel={"megabytes"}
                  yTickFormat={formatMB}
                />
                <p className="mt-1">
                  {/* We track the size of various files here. "deno" is the release
                  binary. */}
                  Nós acompanhamos vários arquivos aqui. "deno" é a versão binária.
                </p>
              </div>
              <div className="mt-8">
                <a href="#bundle-size" id="bundle-size">
                  <h5 className="text-lg font-medium tracking-tight hover:underline">
                    {/* Bundle size */}
                    Tamanho do bundle
                  </h5>
                </a>{" "}
                <BenchmarkOrLoading
                  data={data}
                  columns={data?.bundleSize}
                  yLabel={"kilobytes"}
                  yTickFormat={formatKB}
                />
                <p className="mt-1">
                  {/* Size of different bundled scripts. */}
                  Tamanho de diferentes bundles.
                </p>
                <ul className="ml-8 list-disc my-2">
                  <li>
                    <Link href="/std/http/file_server.ts">
                      <a className="link">file_server</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/std/examples/gist.ts">
                      <a className="link">gist</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-8">
                <a href="#cargo-deps" id="cargo-deps">
                  <h5 className="text-lg font-medium tracking-tight hover:underline">
                    Cargo Dependencies
                  </h5>
                </a>{" "}
                <BenchmarkOrLoading data={data} columns={data?.cargoDeps} />
              </div>
            </div>
          </div>
        </div>
        <Footer simple />
      </div>
    </>
  );
}

function BenchmarkOrLoading(props: {
  data: BenchmarkData | null;
  columns?: Column[];
  yLabel?: string;
  yTickFormat?: (n: number) => string;
}) {
  return props.data && props.columns ? (
    <BenchmarkChart
      columns={props.columns}
      sha1List={props.data.sha1List}
      yLabel={props.yLabel}
      yTickFormat={props.yTickFormat}
    />
  ) : (
    <BenchmarkLoading />
  );
}

function SourceLink({ name, path }: { name: string; path: string }) {
  return (
    <a
      href={`https://github.com/denoland/deno/blob/main/${path}`}
      className="link"
    >
      {name}
    </a>
  );
}

export default Benchmarks;
