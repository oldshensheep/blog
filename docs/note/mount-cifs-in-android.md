---
title: mount-cifs-in-android
date: 2021-01-28 17:23:33
categories:
    - 折腾
tags:
    - Android
---

虽然 Google 在新版本的 android 中提供了新的访问文件的方式
（一些文件管理器可以访问 smb，其他应用程序访问这个文件管理器就可以间接的访问 smb 了），
但是并不是所有的应用程序都支持，所以直接挂载 smb 是一个比较好的解决办法（必须要 Root）。

<!-- more -->

## 前提条件

1. Android 系统获取 Root 权限
2. ~~安装了 BusyBox（不确定）~~

## 折腾的结果

需要快速解决问题的只看这个就行了  
执行下面的程序就可以挂载 smb 了，根据自己实际情况修改 host,user,pass,还有脚本末尾的挂载位置

```bash
host="192.168.1.5"
user="sheep"
pass="123456789"
gid=9997
uid=9997
file_mode=0770
dir_mode=0770
# 挂载前要新建要挂载到的位置的文件夹
# //$host/main 是smb的文件夹 /.../emulated/0/{cifs/main} 是手机存储文件夹
su -mm -c mount -o user=$user,pass=$pass,rw,gid=$gid,uid=$uid,file_mode=$file_mode,dir_mode=$dir_mode -t cifs //$host/main /mnt/runtime/full/emulated/0/cifs/main
```

## 折腾的大致过程

首先打开终端，这里用的是 termux，理论上其他终端也可以。
然后输入下面的命令

```bash
su # 获取root权限
mkdir /mnt/sdcard/cifs # 挂载点
mount -o user=******,pass="*****" -t cifs //192.168.1.5/down /mnt/sdcard/cifs
# 无密码 mount -t cifs -o user=guest //192.168.1.5/down /mnt/sdcard/cifs （未测试）
```

然后查看文件

```bash
ls /mnt/sdcard/cifs
# 可以正常显示文件
```

但是用手机的文件管理器却看不到文件？？？
那可能是权限问题，因为我们挂载的时候没有设置权限（这应该也是挂载命名空间的问题）
果然 cifs 属于 100 这个 uid 的

```bash
ls -al /mnt/sdcard
......
drwxrwsrw- 11 system 100              0 2021-01-25 22:39 cifs
......
```

然后修改挂载参数

```bash
# 9777 是everybody 具体参考 参考2
mount -o user=******,pass="*****" ,rw,gid=9997,uid=9997,file_mode=0770,dir_mode=0770 -t cifs //192.168.1.5/down /mnt/sdcard/cifs
```

还是不行……  
继续 Google，发现高版本的 Android 分离了应用的挂载命名空间，挂载到/mnt/sdcard 只有挂载的程序才能看到。其他程序是看不到的，具体参考 参考 1 挂载命名空间。要想让其他应用程序开到就要挂载到/mnt/runtime/[default|read|write|full]/emulated。  
挂载参数最终修改为

```bash
su -mm -c mount -o user=sheep,pass=12345678,rw,gid=9997,uid=9997,file_mode=0770,dir_mode=0770 -t cifs //192.168.1.5/main /mnt/runtime/full/emulated/0/cifs/main
```

## 参考

1. Google <https://www.google.com/search?q=mount+smb+android>  
2. 挂载命名空间 <https://android.stackexchange.com/questions/217741/how-to-bind-mount-a-folder-inside-sdcard-with-correct-permissions/217936#217936>  
3. 权限 <https://android.stackexchange.com/questions/200867/how-to-mount-nfs-on-android-with-correct-permissions/201191#201191>
