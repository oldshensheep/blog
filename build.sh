#!/bin/sh
sed -i '91i     valineConfig: {\n      appId: "YMtbjL3M9vPHQUmdjPMXb86I-MdYXbMMI",\n      appKey: "vlbsVfFyEnSBTtRxF26R53BA",\n      placeholder: "写点什么吧",\n      avatar: "wavatar",\n    },' docs/.vuepress/config.js

yarn install
yarn build
