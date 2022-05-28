---
title: 让 Windows 更加适合开发
date: 2022-05-27 20:00:00
categories:
    - 教程
tags:
    - Windows
---

在Windows上进行优雅的编程是个头疼的问题，但是在我的精心调教下，她变得听话了许多……

<!-- more -->

## 安装scoop
为什么选择scoop？
有类似的选择如 chocolatey ，WinGet但是我选择了scoop。第一是因为scoop的软件很多是便携软件。便携，顾名思义可以很方便带着跑的东西。scoop安装的软件也是一样的，重装系统**不必重新配置**一大堆环境变量，不必重新安装一大堆软件。重装系统后按照[^1]里的步骤进行配置，很快就可以配置好各种环境变量，软件也不必再安装。
具体如何安装scoop就不赘述了，在官方网站可以了解安装的方法 <https://scoop.sh/> 。

## 变成~~Lindows~~
安装了scoop，是时候展现她的力量了。
先来安装一下 busybox 和 sudo
```pwsh
scoop install busybox sudo
```
busybox内置了linux的很多命令，常用的基本上都有了。安装sudo可以临时提权类似与linux的sudo。Windows最终变成了Linux的样子，嘿嘿Windows❤️Linux。
<details>
  <summary>Windows中busybox自带的命令</summary>

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

## 环境配置开发
在Linux里配置开发环境是很简单的，现在的Lindows其实也一样简单。
在ArchLinux里配置java开发环境，很快捷方便。
```bash
sudo pacman -Syu jdk-openjdk mariadb redis nginx nodejs-lts maven #等等
```

其实在~~Lindows~~里也一样方便。

有什么想安装的？输入`scoop search 搜索内容`，搜索软件，比如`scoop search jdk`
……好像什么也没有？其实jdk不在默认的源里，需要添加一个java的源
```pwsh
scoop bucket add java
```
再来搜索，可以看到有很多的jdk版本，运行`scoop install temurin-lts-jdk`，就安装好了jdk，什么？你说还没有配置环境变量？其实**环境变量已经自动配置**好了。类似的可以安装gcc、go、python、nodejs等等。
scoop 有一些官方源也有一些第三方的源可以在这里找到 <https://scoop.sh/#/buckets>
这里我推荐添加这些源，都是官方维护的，其他的适用性可能不广就没有列出来。
```
scoop bucket add extras #都是便携软件，包含大量GUI软件。jb家的IDE，vscode等等都在这里面
scoop bucket add java # 都是jdk
scoop bucket add nerd-fonts # 一些字体
```
如果你想使用vim或者emacs也可以使用scoop安装。
这里我把我安装的部分软件列出来，你可以自己选择安装。
如果要全部安装所列的软件，可以通过把下面的内容保存为一个文本文件，然后在PowerShell中运行如下命令，其中`scoop-apps.txt`是保存的文件名。
```pwsh
$apps = gc scoop-apps.txt
scoop install @apps
```
<details>
  <summary>我安装的部分软件 main 仓库下的</summary>

```
7zip
adb
apktool
aria2
bat
bind
bochs
bottom
busybox
cacert
caddy
chromedriver
clash
cloc
cloudflared
cmake
cppcheck
cuda
curl
dark
dog
duf
emscripten
ffmpeg
file
frp
gcc
gdb
geckodriver
gettext
git
git-lfs
gitea
glslang
go
go-ipfs
gping
gradle
gradle-bin
grep
gzip
hashcat
highlight
hugo
imagemagick
innounp
iperf3
jid
jq
latex
lessmsi
llvm
lua
maven
minio
minio-client
mongodb
mysql
nali
nano
nasm
neofetch
neovim
nginx
nim
nircmd
nmap
nodejs-lts
nssm
ntop
nu
openssl
perl
pnpm
qemu
rclone
redis
rust
scons
scrcpy
serverless
speedtest-cli
starship
sudo
syncthing
telnet
tesseract
tesseract-languages
tldr
traefik
trid
v2ray
vim
wget
winfetch
winflexbison
xray
yarn
youtube-dl
zip
zoxide
```
</details>

具体的软件太多了，想要安装啥搜索一下就可以了。

### java开发配置

首先安装需要的开发软件
```
scoop install temurin-lts-jdk maven tomcat gradle mysql nginx nodejs-lts redis
```
安装好了就可以使用了，不用配置环境变量。如果你需要一个mysql服务器那么在PowerShell运行`mysqld.exe`即可，如果要运行redis同样的`redis-server.exe`，就可以启动一个redis服务器。
然后安装想要的java IDE，
```pwsh
scoop install idea-ultimate
```
## 配置字体
字体有很多选择:FiraCode,JetBrainsMono等等，这里我选择FiraCode，
添加源`scoop bucket add nerd-fonts`安装FiraCode`scoop install firacode-nf`,这里我安装的是 nerd-font 她的区别就是附加了一些图标，在一些控制台中可以显示好看的符号

## 配置Windows Terminal
安装[starship](https://starship.rs/)
![](https://raw.githubusercontent.com/starship/starship/master/media/demo.gif)
`scoop install starship` 
具体的安装配置请看官方文档<https://starship.rs/guide/#%F0%9F%9A%80-installation>这里不作详细介绍
```


[^1]: <https://github.com/ScoopInstaller/Scoop/issues/2894>

