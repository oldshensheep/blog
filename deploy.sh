#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

rm blog -rf

# 生成静态文件
yarn build

# 进入生成的文件夹
cd blog

# 如果是发布到自定义域名
echo 'blog.oldshensheep.com' >CNAME

git init
git add -A
git commit -m 'deploy'

git push -f https://github.com/oldshensheep/oldshensheep.github.io master

cd -
