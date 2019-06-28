# evtscan-sdk

[![NHibiki](https://img.shields.io/badge/Download-Stable-39c000.svg?style=flat-square)](https://cdn.jsdelivr.net/npm/evtscan@1.0.4/dist/evtscan.js)
[![NHibiki](https://img.shields.io/badge/Download-Lately-edb900.svg?style=flat-square)](https://cdn.jsdelivr.net/npm/evtscan/dist/evtscan.js)
[![Docs](https://img.shields.io/badge/Read-Docs-4da1ff.svg?style=flat-square)](#)
[![NHibiki](https://img.shields.io/badge/Made%20With-%3C3-ff3000.svg?style=flat-square)](#)

## How to use

### For Browser

#### Refer to CDN

```html
<script src="https://cdn.jsdelivr.net/npm/evtscan/dist/evtscan.js"></script>
<!-- OR -->
<script src="https://unpkg.com/evtscan/dist/evtscan.js"></script>
```

#### Write your Code

```html
<script>

    const evtScan = EvtScan.new();
    // Or
    // const evtScan = new EvtScan();
    // Or [with homemade apiCaller]
    // const evtScan = new EvtScan({ endpoint: 'https://some-evtscans.io/api/' });

    const blocks = e.block();

    console.log(await blocks.next()); // it will print the first 10 blocks
    console.log(await blocks.next()); // then next 10-19[included] blocks

    const b = blocks.data[0];    // will return the 10th block since the method is called twice
    console.log(b);              // view the block
    const prev = await b.prev(); // get the previous block
    console.log(prev);           // view the block

    assert(prev instanceof EvtScan.Classes.Block); // they both belones to Block class
    const { Block } = EvtScan.Classes;
    const otherBlock = await (new Block().update(BLOCK_ID)); 
    // Or
    // const otherBlock = new Block();
    // await otherBlock.update(BLOCK_ID));

    // enjoy ...

</script>
```

### For Node(js/ts)

#### Install with yarn/npm

```bash
yarn add evtscan
# or
# npm install --save evtscan
```

#### Write your Code

```js
import EvtScan from 'evtscan';

const evtScan = new EvtScan();
```

Or, if you want to use your own upstream:

```js
import EvtScan, { ApiCaller } from 'evtscan';

const apiCaller = ApiCaller('https://some-evtscans.io/api/');
const evtScan = new EvtScan({ apiCaller });
// or
// const evtScan = new EvtScan({ endpoint: 'https://some-evtscans.io/api/' });
```