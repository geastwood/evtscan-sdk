# evtscan-sdk

[![NHibiki](https://img.shields.io/badge/Download-Stable-39c000.svg?style=flat-square)](https://unpkg.com/evtscan@1.0.2/dist/evtscan.js)
[![NHibiki](https://img.shields.io/badge/Download-Lately-edb900.svg?style=flat-square)](https://unpkg.com/evtscan/dist/evtscan.js)
[![Docs](https://img.shields.io/badge/Read-Docs-4da1ff.svg?style=flat-square)](#)
[![NHibiki](https://img.shields.io/badge/Made%20With-%3C3-ff3000.svg?style=flat-square)](#)

## How to use

### Refer to CDN

```html
<script src="https://unpkg.com/evtscan@1.0.1/dist/evtscan.js"></script>
```

### Write your Code

```html
<script>
const block = EvtScan.new().block();
// Or
// const e = new EvtScan.Evtscan();
// const block = e.block();
console.log(await block.next());
// it will print the first 10 blocks
console.log(await block.next());
// then next 10-19[included] blocks
</script>
```
