---
title: ZFS on Windows (using WSL2)
date: 2022-07-27 18:30:00
categories:
  - 教程
tags:
  - Linux
  - Windows
---

这个让 ZFS 工作在 Windows 上的[项目](https://github.com/openzfsonwindows/openzfs)还不太稳定，经常蓝屏，便寻求其他解决方案，于是乎。
有人可能会说你在不是脱裤子放屁吗，这不就是装个虚拟机运行 Linux？？？

> 是的，我就是脱裤子放屁。

<!-- more -->

写这个文章的时候使用的是 ArchLinux 的 WSL2，为了使教程更简单，也为了从 0 实现，这篇文章使用 Ubuntu22.04 版本进行测试。

## 先决条件

安装 WSL2 版本的 Ubuntu22.04，其他的系统版本应当也可。
具体安装方法参考官方文档。

对于系统版本大于 Windows 10 version 2004 或者 Windows11 的用户参考下面的文档：
https://docs.microsoft.com/en-us/windows/wsl/install

对于系统版本大于 Version 1903 的参考下面的文档：
https://docs.microsoft.com/en-us/windows/wsl/install-manual

## 替换 WSL 的 Linux Kernel

参考文档[^1]

在此 https://github.com/oldshensheep/zfs-on-wsl/releases 下载编译好的支持 ZFS 的 Kernel，需要下载 bzImage，放到 **Windows** 的一个地方。
然后在 PowerShell 窗口中执行以下命令：
注意把`<bzImage Path>`替换成你下载的 bzImage 的路径，例如`C:\\Fun\\bzImage`

```pwsh
"
[wsl2]
kernel=<bzImage Path>
" > ~/.wslconfig
```

然后`wsl --shutdown`关闭运行中的实例，然后重新启动 Ubuntu。

## 挂载硬盘到 WSL2

参考文档[^2]

其实系统现在已经支持 ZFS 了，但是我需要访问 Windows 中的硬盘，所以多了这一步。如果不需要挂载外部硬盘可以跳到下一步。

Windows 版本必须是 Windows 11 Build 22000 及更新版本，否则无法挂载硬盘（官方文档如此，未测试）。挂载 USB 硬盘是支持的，但是 U 盘不支持，不过可以直接挂载 USB 设备到 Linux[^3]，暂未测试。

在 PowerShell 中执行，获取可用的磁盘

```pwsh
GET-CimInstance -query "SELECT * from Win32_DiskDrive"
```

应该会输出类似的结果：

```
DeviceID           Caption                              Partitions Size          Model
--------           -------                              ---------- ----          -----
\\.\PHYSICALDRIVE3 Microsoft Virtual Disk               1          214745610240  Microsoft Virtual Disk
\\.\PHYSICALDRIVE4 Seagate BUP Slim BK SCSI Disk Device 2          1000202273280 Seagate BUP Slim BK SCSI Disk Device
\\.\PHYSICALDRIVE1 KIOXIA-EXCERIA SATA SSD              1          960194511360  KIOXIA-EXCERIA SATA SSD
\\.\PHYSICALDRIVE2 HS-SSD-C2000Pro 1024G                1          1024203640320 HS-SSD-C2000Pro 1024G
\\.\PHYSICALDRIVE0 KINGSTON RBUSNS8180S3256GJ           3          256052966400  KINGSTON RBUSNS8180S3256GJ
```

打开 Windows 的磁盘管理，选择要挂载到 Linux 的磁盘，点击 Offline。（U 盘可能无法 Offline，但是通过 WSL2 连接 USB 设备可能可行，https://docs.microsoft.com/en-us/windows/wsl/connect-usb）
![](./images/2022-07-27-19-57-33.png)

这里我使用的是一个移动硬盘，路径是`\\.\PHYSICALDRIVE4`，Offline 后
在 PowerShell 中执行（需要管理员权限）

```pwsh
wsl --mount \\.\PHYSICALDRIVE4 --bare
```

在 WSL2 中运行`sudo lsblk`查看是否挂载成功，如果挂载成功，则会输出：

```bash
sheep@sheep-laptop ~> sudo lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda      8:0    0 339.7M  1 disk
sdb      8:16   0   256G  0 disk /
sdc      8:32   0 931.5G  0 disk
├─sdc1   8:33   0 931.5G  0 part
└─sdc9   8:41   0     8M  0 part
```

## 配置 ZFS

这里不会过多讲述如何使用 ZFS，请参考其他文档。

在 Ubuntu 中安装 zfsutils-linux

```bash
sudo apt install zfsutils-linux
```

安装完成后输入`sudo zfs version`查看是否安装成功，成功会输出：

```bash
sheep@sheep-laptop ~> sudo zfs version
zfs-2.1.4-0ubuntu0.1
zfs-kmod-2.1.5-1
```

`zfs-kmod-2.1.5-1`是内核中的 ZFS 模块，在 bzImage 内

`zfs-2.1.4-0ubuntu0.1`是安装的管理工具。版本差别过大可能有 BUG。

创建一个 ZFS。注意把`/dev/sdb`替换成你的硬盘

```bash
root@sheep-laptop /h/sheep# lsblk
NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
sda      8:0    0 339.7M  1 disk
sdb      8:16   0 931.5G  0 disk
├─sdb1   8:17   0 931.5G  0 part
└─sdb2   8:18   0     8M  0 part
sdc      8:32   0   256G  0 disk /
root@sheep-laptop /h/sheep# zpool create new-pool /dev/sdb
cannot label 'sdb': failed to detect device partitions on '/dev/sdb1': 19
root@sheep-laptop /h/sheep [1]#
```

`cannot label 'sdb': failed to detect device partitions on '/dev/sdb1': 19` 这个错误不会影响程序的运行，可以忽略。

创建一个文件测试一下

```bash
root@sheep-laptop /h/sheep [1]# ls /new-pool/
root@sheep-laptop /h/sheep# echo "hello zfs" > /new-pool/hello
root@sheep-laptop /h/sheep# cat /new-pool/hello
hello zfs
root@sheep-laptop /h/sheep# ls /new-pool/
hello
root@sheep-laptop /h/sheep#
```

成功！

然后你可以在 WSL2 里安装 samba 作为 SMB 文件服务器，让 Windows 使用。简单的参考文档https://ubuntu.com/tutorials/install-and-configure-samba

## 重启系统后的重新配置

1. 获取可用的磁盘
   ```pwsh
   GET-CimInstance -query "SELECT * from Win32_DiskDrive"
   ```
2. 挂载磁盘
   ```pwsh
   wsl --mount \\.\PHYSICALDRIVE* --bare
   ```
3. 在 Linux 中导入 zpool（如果你第二步在启动 WSL2 前执行，这步可以省略）
   ```bash
   zpool import <pool-name>
   ```

## 关于 ZFS 的参考文档

ZFS documentation: https://openzfs.github.io/openzfs-docs/  
zfs deduplication https://linuxhint.com/zfs-deduplication/  
zfs compression https://linuxhint.com/enable-zfs-compression/

## 参考文档

https://github.com/alexhaydock/zfs-on-wsl

https://wsl.dev/wsl2-kernel-zfs/

[^1]: https://docs.microsoft.com/en-us/windows/wsl/wsl-config
[^2]: https://docs.microsoft.com/en-us/windows/wsl/wsl2-mount-disk
[^3]: https://docs.microsoft.com/en-us/windows/wsl/connect-usb
