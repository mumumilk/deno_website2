<!-- ## Installation

Deno works on macOS, Linux, and Windows. Deno is a single binary executable. It
has no external dependencies. -->

## Instalação

Deno funciona em macOS, Linux e Windows, e é um único binário executável. Ele
não possui dependências externas.

<!-- ### Download and install

[deno_install](https://github.com/denoland/deno_install) provides convenience
scripts to download and install the binary.

Using Shell (macOS and Linux):

```shell
curl -fsSL https://deno.land/x/install/install.sh | sh
```

Using PowerShell (Windows):

```shell
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

Using [Scoop](https://scoop.sh/) (Windows):

```shell
scoop install deno
```

Using [Chocolatey](https://chocolatey.org/packages/deno) (Windows):

```shell
choco install deno
```

Using [Homebrew](https://formulae.brew.sh/formula/deno) (macOS):

```shell
brew install deno
```

Using [Cargo](https://crates.io/crates/deno) (Windows, macOS, Linux):

```shell
cargo install deno
```

Deno binaries can also be installed manually, by downloading a zip file at
[github.com/denoland/deno/releases](https://github.com/denoland/deno/releases).
These packages contain just a single executable file. You will have to set the
executable bit on macOS and Linux. -->

### Baixando e instalando

[deno_install](https://github.com/denoland/deno_install) fornece scripts
convenientes para baixar e instalar o binário.

Utilizando Shell (macOS e Linux):

```shell
curl -fsSL https://deno.land/x/install/install.sh | sh
```

Utilizando PowerShell (Windows):

```shell
iwr https://deno.land/x/install/install.ps1 -useb | iex
```

Utilizando [Scoop](https://scoop.sh/) (Windows):

```shell
scoop install deno
```

Utilizando [Chocolatey](https://chocolatey.org/packages/deno) (Windows):

```shell
choco install deno
```

Utilizando [Homebrew](https://formulae.brew.sh/formula/deno) (macOS):

```shell
brew install deno
```

Utilizando [Cargo](https://crates.io/crates/deno) (Windows, macOS, Linux):

```shell
cargo install deno
```

Os binários do Deno também podem ser instalados manualmente, baixando um arquivo
comprimido em
[github.com/denoland/deno/releases](https://github.com/denoland/deno/releases).
Esses pacotes possuem um único arquivo executável. Você terá que configurar o
bit executável no macOS e Linux.

<!-- ### Testing your installation

To test your installation, run `deno --version`. If this prints the Deno version
to the console the installation was successful.

Use `deno help` to see help text documenting Deno's flags and usage. Get a
detailed guide on the CLI [here](./command_line_interface.md). -->

### Testando sua instalação

Para testar sua instalação, execute `deno --version`. Se o comando mostrar a
versão do Deno no console, significa que sua instalação foi feita com sucesso.

Utilize `deno help` para visualizar o texto de ajuda que documenta as flags do
Deno e como utilizá-las. Veja um guia detalhado sobre a CLI
[aqui](./command_line_interface.md).

<!-- ### Updating

To update a previously installed version of Deno, you can run:

```shell
deno upgrade
```

This will fetch the latest release from
[github.com/denoland/deno/releases](https://github.com/denoland/deno/releases),
unzip it, and replace your current executable with it.

You can also use this utility to install a specific version of Deno:

```shell
deno upgrade --version 1.0.1
``` -->

### Atualizando

Para atualizar uma versão já instalada do Deno, você pode executar:

```shell
deno upgrade
```

Esse comando irá pegar a última versão do
[Deno](https://github.com/denoland/deno/releases), descomprimir, e substituir
seu atual executável com ela.

Você também pode utilizar o comando abaixo para instalar uma versão específica
do Deno:

```shell
deno upgrade --version 1.0.1
```

<!-- ### Building from source

Information about how to build from source can be found in the `Contributing`
chapter. -->

### Construindo direto do código fonte

Mais informações acerca de como construir diretamente do código fonte podem ser
encontradas no capítulo `Contribuindo`.
