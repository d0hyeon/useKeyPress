# useKeyPress

Returns the key value when the key is pressed.

## Install 
```bash
yarn add @odnh/use-keypress
# or 
npm install @odnh/use-keypress
```

## Use
```tsx
  useKeyPress(selector?: Selector, target?: Target) => (string | number)[];
```

### parameters 
|Name|Type|defaultValue|description|
|-----|-------|----|-------------------------|
|selector|`EventKey`|`code`|key name of KeyboardEvent properties (recommend `code` and `key`) [detail](https://developer.mozilla.org/ko/docs/Web/API/KeyboardEvent)|
|target|`HTMLElement` or `React.MutableRefObject`|`body`|event target element|
<br/>

```ts
type EventKey = 'code' | 'keyCode' | 'key' | 'which';
```

---
### returns
`(string | number)[]`

## Example

[demo](https://codesandbox.io/s/usekeypress-4pk5m)

```tsx
import React from 'react';
import {useKeyPress} from '@odnh/use-keypress';

const SENTENCE_LIST = ['hi', 'bye'];

const App = () => {
  const [sentenceIndex, setSentenceIndex] = React.useState(0);
  const pressingCodes = useKeyPress();
  const nextSentence = React.useCallback(() => {
    setSentenceIndex(prev => prev+1);
  }, [setSentenceIndex]);
  React.useEffect(() => {
    if(
      pressingCodes.includes('ControlLeft') &&
      pressingCodes.includes('KeyZ') {
        setSentenceIndex(prev => (
          prev > 0 ? prev-1 : prev;
        ));
      }
    )
  }, [pressingCodes, setSentenceIndex])

  return (
    <>
      <p>{SENTENCE_LIST[sentenceIndex]}</p>
      <button onClick={nextSentence}>next</button>
    </>
  )
}
```
