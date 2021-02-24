<!-- ## Set up your environment

To productively get going with Deno you should set up your environment. This
means setting up shell autocomplete, environmental variables and your editor or
IDE of choice. -->

## Configurando seu ambiente

Para ter uma melhor produtividade com Deno, você deve configurar seu ambiente.
Isso significa configurar seu shell para autocompletar sentenças, variáveis de
ambiente e seu editor ou IDE de sua escolha.

<!-- ### Environmental variables

There are several env vars that control how Deno behaves:

`DENO_DIR` defaults to `$HOME/.cache/deno` but can be set to any path to control
where generated and cached source code is written and read to.

`NO_COLOR` will turn off color output if set. See https://no-color.org/. User
code can test if `NO_COLOR` was set without having `--allow-env` by using the
boolean constant `Deno.noColor`. -->

### Variáveis de ambiente

Existem algumas variáveis de ambiente que controlam como o Deno se comporta:

`DENO_DIR` aponta para `$HOME/.cache/deno`, mas pode ser configurado para
qualquer outro caminho que controle onde o código gerado e cacheado é escrito ou
lido.

`NO_COLOR`, caso configurado, irá desativar a coloração da saída. Veja
https://no-color.org/. Ao utilizar a constante `Deno.noColor`, códigos de
usuários podem testar se a variável `NO_COLOR` foi configurada sem a utilização
da flag `--allow-env`.

<!-- ### Shell autocomplete

You can generate completion script for your shell using the
`deno completions <shell>` command. The command outputs to stdout so you should
redirect it to an appropriate file.

The supported shells are:

- zsh
- bash
- fish
- powershell
- elvish

Example (bash):

```shell
deno completions bash > /usr/local/etc/bash_completion.d/deno.bash
source /usr/local/etc/bash_completion.d/deno.bash
```

Example (zsh without framework):

```shell
mkdir ~/.zsh # create a folder to save your completions. it can be anywhere
deno completions zsh > ~/.zsh/_deno
```

then add this to your `.zshrc`

```shell
fpath=(~/.zsh $fpath)
autoload -Uz compinit
compinit -u
```

and restart your terminal. note that if completions are still not loading, you
may need to run `rm ~/.zcompdump/` to remove previously generated completions
and then `compinit` to generate them again.

Example (zsh + oh-my-zsh) [recommended for zsh users] :

```shell
mkdir ~/.oh-my-zsh/custom/plugins/deno
deno completions zsh > ~/.oh-my-zsh/custom/plugins/deno/_deno
```

After this add deno plugin under plugins tag in `~/.zshrc` file. for tools like
`antigen` path will be `~/.antigen/bundles/robbyrussell/oh-my-zsh/plugins` and
command will be `antigen bundle deno` and so on.

Example (Powershell):

```shel
deno completions powershell > $profile
.$profile
```

This will be create a Powershell profile at
`$HOME\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1` by default,
and it will be run whenever you launch the PowerShell. -->

### Autocompletar sentenças no Shell

Você pode configurar seu shell para autocompletar sentenças através do comando
`deno completions <shell>`. O comando escreve na saída padrão (stdout), portanto
você deve direcioná-lo para o arquivo correto.

Os shells com suporte são:

- zsh
- bash
- fish
- powershell
- elvish

Exemplo (bash):

```shell
deno completions bash > /usr/local/etc/bash_completion.d/deno.bash
source /usr/local/etc/bash_completion.d/deno.bash
```

Exemplo (zsh sem framework):

```shell
mkdir ~/.zsh # create a folder to save your completions. it can be anywhere
deno completions zsh > ~/.zsh/_deno
```

e então adicione esse código ao seu `.zshrc`

```shell
fpath=(~/.zsh $fpath)
autoload -Uz compinit
compinit -u
```

e reinicie seu terminal. Note que, caso o autocomplete ainda não esteja
carregando, você talvez tenha que executar `rm ~/.zcompdump` para remover
antigos complementos gerados e então executar `compinit` para gerá-los
novamente.

Exemplo (zsh + oh-my-zsh) [recomendados para quem utiliza zsh] :

```shell
mkdir ~/.oh-my-zsh/custom/plugins/deno
deno completions zsh > ~/.oh-my-zsh/custom/plugins/deno/_deno
```

Após executar esse comando, adicione o plugin do Deno logo abaixo da tag de
plugins no arquivo `~/.zshrc`. Para ferramantas como `antigen`, o caminho será
`~/.antigen/bundles/robbyrussell/oh-my-zsh/plugins` e o comando será
`antigen bundle deno` e assim por diante.

Exemplo (Powershell):

```shel
deno completions powershell > $profile
.$profile
```

Por padrão, isso irá criar um perfil do PowerShell em
`$HOME\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1`, e irá ser
executado quando você abrir o PowerShell.

<!-- ### Editors and IDEs

Because Deno requires the use of file extensions for module imports and allows
http imports, and most editors and language servers do not natively support this
at the moment, many editors will throw errors about being unable to find files
or imports having unnecessary file extensions.

The community has developed extensions for some editors to solve these issues: -->

### Editores e IDEs

A maioria dos editores atualmente não suportam nativamente o uso de extensões
nas importações, nem importações via HTTP, e o Deno importa módulos externos
utilizando estes métodos. Caso você tente importar um módulo utilizando um
desses métodos, muitos editores irão mostrar erros dizendo que não foram capazes
de encontrar os arquivos e importações cuja extensão foi adicionada
desnecessariamente.

Para resolver esses problemas, a comunidade desenvolveu extensões para alguns
editores:

<!-- #### VS Code

The beta version of [vscode_deno](https://github.com/denoland/vscode_deno) is
published on the
[Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno).
Please report any issues. -->

#### VS Code

A versão beta do [vscode_deno](https://github.com/denoland/vscode_deno) está
publicada no
[Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno).
Caso encontre algum problema, por favor reporte-o.

<!-- #### JetBrains IDEs

Support for JetBrains IDEs is available through
[the Deno plugin](https://plugins.jetbrains.com/plugin/14382-deno).

For more information on how to set-up your JetBrains IDE for Deno, read
[this comment](https://youtrack.jetbrains.com/issue/WEB-41607#focus=streamItem-27-4160152.0-0)
on YouTrack. -->

#### IDEs da JetBrains

Suporte para IDEs da JetBrains estão disponíveis através
[do plugin Deno](https://plugins.jetbrains.com/plugin/14382-deno).

Para mais informações em como configurar sua IDE da JetBrains para Deno, leia
[esse comentário](https://youtrack.jetbrains.com/issue/WEB-41607#focus=streamItem-27-4160152.0-0)
no YouTrack.

<!-- #### Vim and NeoVim

Vim works fairly well for Deno/TypeScript if you install
[CoC](https://github.com/neoclide/coc.nvim) (intellisense engine and language
server protocol).

After CoC is installed, from inside Vim, run`:CocInstall coc-tsserver` and
`:CocInstall coc-deno`. To get autocompletion working for Deno type definitions
run `:CocCommand deno.types`. Optionally restart the CoC server `:CocRestart`.
From now on, things like `gd` (go to definition) and `gr` (goto/find references)
should work. -->

#### Vim e NeoVim

Vim funciona relativamente bem para Deno/TypeScript caso você instale
[CoC](https://github.com/neoclide/coc.nvim) (engine de intellisense e protocolo
de linguagem).

Depois de instalar o CoC, execute `:CocInstall coc-tsserver` e
`:CocInstall coc-deno` dentro do Vim. Para que o autocomplete funcione para o
Deno e definições de tipos, execute `:CocCommand deno.types`. Opicionalmente,
reinicie o servidor CoC através do comando `:CocRestart`. Após isso, comandos
como `gd` (ir para definição) e `gr` (ir/encontrar referências) devem funcionar
corretamente.

<!-- #### Emacs

Emacs works pretty well for a TypeScript project targeted to Deno by using a
combination of [tide](https://github.com/ananthakumaran/tide) which is the
canonical way of using TypeScript within Emacs and
[typescript-deno-plugin](https://github.com/justjavac/typescript-deno-plugin)
which is what is used by the
[official VSCode extension for Deno](https://github.com/denoland/vscode_deno).

To use it, first make sure that `tide` is setup for your instance of Emacs.
Next, as instructed on the
[typescript-deno-plugin](https://github.com/justjavac/typescript-deno-plugin)
page, first `npm install --save-dev typescript-deno-plugin typescript` in your
project (`npm init -y` as necessary), then add the following block to your
`tsconfig.json` and you are off to the races!

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "typescript-deno-plugin",
        "enable": true, // default is `true`
        "importmap": "import_map.json"
      }
    ]
  }
}
``` -->

#### Emacs

Emacs funciona relativamente bem para projetos TypeScript que utilizam Deno
através de uma combinação de [tide](https://github.com/ananthakumaran/tide), que
é uma maneira canônica de utilizar TypeScript dentro do Emacs, e
[typescript-deno-plugin](https://github.com/justjavac/typescript-deno-plugin)
que é utilizado pela
[extensão oficial do Deno para VSCode](https://github.com/denoland/vscode_deno).

Para utilizá-la, primeiramente garanta que `tide` está devidamente configurado
para sua instância do Emacs. Após isso, como instruído na página do
[typescript-deno-plugin](https://github.com/justjavac/typescript-deno-plugin),
primeiro execute `npm install --save-dev typescript-deno-plugin typescript` no
seu projeto (`npm init -y` caso necessário), e adicione o seguinte código ao seu
`tsconfig.json` e você estará pronto.

```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "typescript-deno-plugin",
        "enable": true, // default is `true`
        "importmap": "import_map.json"
      }
    ]
  }
}
```

<!-- If you don't see your favorite IDE on this list, maybe you can develop an
extension. Our [community Discord group](https://discord.gg/deno) can give you
some pointers on where to get started. -->

Caso a sua IDE de escolha não esteja nessa lista, talvez você possa desenvolver
uma extensão. Ou [a comunidade no grupo do Discord](https://discord.gg/deno)
pode dar um direcionamento de como começar.
