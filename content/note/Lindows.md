---
title: 让 Windows 更加适合开发
date: 2022-05-27 20:00:00
categories:
  - 教程
tags:
  - Windows
---

在 Windows 上进行优雅的编程是个头疼的问题，但是在我的精心调教下，她变得听话了许多……

<!-- more -->

## 安装 scoop

为什么选择 scoop？
有类似的选择如 chocolatey ，WinGet 但是我选择了 scoop。第一是因为 scoop 的软件很多是便携软件。便携，顾名思义可以很方便带着跑的东西。scoop 安装的软件也是一样的，重装系统**不必重新配置**一大堆环境变量，不必重新安装一大堆软件。重装系统后可以很快就可以配置好各种环境变量，软件也不必再安装。

安装 scoop 也非常简单

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex
```

有更多问题访问 scoop 官网 <https://scoop.sh/>
报告问题等访问仓库 Issue <https://github.com/ScoopInstaller/Scoop/issues>

## 变成~~Lindows~~

安装了 scoop，是时候展现她的力量了。
先来安装一下 busybox 和 sudo

```powershell
scoop install busybox sudo
```

busybox 内置了 linux 的很多命令，常用的基本上都有了。
安装 sudo 可以临时提权类似与 linux 的 sudo（不过有烦人的 UAC，关掉又不安全）。Windows 最终变成了 Linux 的样子，嘿嘿 Windows❤️Linux。

<details>
  <summary> 🔽点击展开 Windows中busybox自带的命令</summary>

```
ar arch ash awk base64 basename bash bunzip2 bzcat bzip2 cal cat
chmod cksum clear cmp comm cp cpio cut date dc dd df diff dirname
dos2unix dpkg dpkg-deb du echo ed egrep env expand expr factor
false fgrep find fold fsync ftpget ftpput getopt grep groups gunzip
gzip hd head hexdump httpd iconv id ipcalc kill killall less link
ln logname ls lzcat lzma lzop lzopcat man md5sum mkdir mktemp mv nc
nl od paste patch pgrep pidof pipe_progress pkill printenv printf
ps pwd readlink realpath reset rev rm rmdir rpm rpm2cpio sed seq sh
sha1sum sha256sum sha3sum sha512sum shred shuf sleep sort split
ssl_client stat strings su sum tac tail tar tee test time timeout
touch tr true truncate ts ttysize uname uncompress unexpand uniq
unix2dos unlink unlzma unlzop unxz unzip usleep uudecode uuencode
vi watch wc wget which whoami whois xargs xxd xz xzcat yes zcat
```

</details>
有了这些命令Windows变得更像Linux了。如果有没有的命令可以尝试搜索一下`scoop search something`。

## 开发环境配置

在 Linux 里配置开发环境是很简单的，例如在 ArchLinux 里配置 java 开发环境，很快捷方便。

```bash
sudo pacman -Syu jdk-openjdk mariadb redis nginx nodejs-lts maven #等等
```

其实在~~Lindows~~里也一样方便。

有什么想安装的？输入`scoop search 搜索内容`，搜索软件，比如`scoop search jdk`
欸？好像……什么也没有？其实 jdk 不在默认的源里，需要添加一个 java 的源

```powershell
scoop bucket add java
```

再来搜索，可以看到有很多的 jdk 版本，运行`scoop install temurin-lts-jdk`，就安装好了 jdk，什么？你说还没有配置环境变量？其实**环境变量已经自动配置**好了。
类似的可以安装 gcc、go、python、nodejs 等等。
scoop 有一些官方源也有一些第三方的源可以在这里找到 <https://scoop.sh/#/buckets>
这里我推荐添加这些源，都是官方维护的，其他的适用性可能不广就没有列出来。

```powershell
scoop bucket add extras #都是便携软件，包含大量GUI软件。jb家的IDE，vscode等等都在这里面
scoop bucket add java # 都是jdk
scoop bucket add nerd-fonts # 一些字体
```

如果你想使用 vim 或者 emacs 也可以使用 scoop 安装。
这里我把我安装的部分软件列出来，你可以自己选择安装。

<details>
  <summary> 🔽点击展开 我安装的部分软件 main 仓库下的</summary>

```powershell
"7zip"
"adb"
"apktool"
"aria2"
"bat"
"bind"
"bochs"
"bottom"
"busybox"
"cacert"
"caddy"
"clash"
"cloc"
"cloudflared"
"cmake"
"cppcheck"
"cuda"
"curl"
"dark"
"dog"
"duf"
"emscripten"
"ffmpeg"
"file"
"frp"
"gcc"
"gdb"
"geckodriver"
"gettext"
"git"
"git-lfs"
"gitea"
"glslang"
"go"
"gping"
"gradle-bin"
"grep"
"gzip"
"hashcat"
"highlight"
"httpstat"
"hugo"
"imagemagick"
"innounp"
"iperf3"
"jid"
"jq"
"kubo"
"lessmsi"
"llvm"
"lua"
"maven"
"miktex"
"minio"
"minio-client"
"mongodb"
"mysql"
"nali"
"nano"
"nasm"
"neofetch"
"neovim"
"nginx"
"nim"
"nircmd"
"nmap"
"nodejs-lts"
"nssm"
"Ntfs2btrfs"
"ntop"
"nu"
"openssl"
"perl"
"pnpm"
"qemu"
"rclone"
"redis"
"ruby"
"rust"
"scons"
"scrcpy"
"speedtest-cli"
"starship"
"sudo"
"syncthing"
"telnet"
"tesseract"
"tesseract-languages"
"tldr"
"tor"
"trid"
"v2ray"
"vim"
"wget"
"winfetch"
"winflexbison"
"xray"
"yarn"
"youtube-dl"
"zip"
"zoxide"
```

</details>

具体的软件太多了，想要安装啥搜索一下就可以了。

### java 开发配置 示例

首先安装需要的开发软件

```powershell
scoop install temurin-lts-jdk maven tomcat gradle mysql nginx nodejs-lts redis
```

安装好了就可以使用了，不用配置环境变量。如果你需要一个 mysql 服务器那么在 PowerShell 运行`mysqld.exe`即可，如果要运行 redis 同样的`redis-server.exe`，就可以启动一个 redis 服务器。
然后安装想要的 java IDE `scoop install idea-ultimate`

### 重装系统后的环境配置

安装scoop时可以自定义安装位置，可以选择一个C盘以外的位置，这样重装系统就不会丢失之前安装的软件和数据。这里以scoop安装到`D:/scoop`为例

重装系统后参照 <https://github.com/ScoopInstaller/Install#advanced-installation> 这里的安装说明
执行 这个 `.\install.ps1 -ScoopDir 'D:/scoop'` 就可以保留所有数据安装scoop (其实就是把D:/scoop/shims/这个文件夹放到环境变量里)

安装完成之后然后执行scoop reset * 就可以一键配置环境变量（就是之前重装系统前安装的东西）

### 切换Java、Node等运行时版本

以java为例：`scoop reset temurin8-jdk`就可以将Java环境变量设置为java8，立即生效

## 配置字体 (可忽略)

字体有很多选择:FiraCode,JetBrainsMono 等等，这里我选择 FiraCode，
添加源`scoop bucket add nerd-fonts`安装 FiraCode`scoop install firacode-nf`,这里我安装的是 nerd-font 她的区别就是附加了一些图标，在一些控制台中可以显示好看的符号

## 安装 starship

安装[starship](https://starship.rs/)`scoop install starship`
starship 可以在执行任务完成的发送通知，在执行一些耗时命令时比较有用，还可以显示当前的环境变量状态，比如显示当前的Java版本等等。

具体的安装配置请看官方文档 <https://starship.rs/guide/#%F0%9F%9A%80-installation>
这里不作详细介绍
