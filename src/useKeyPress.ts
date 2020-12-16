import React from 'react';

export type Target<T> = HTMLElement | React.MutableRefObject<T>;
export type EventKey = 'code' | 'keyCode' | 'key' | 'which';

export const useKeyPress = <T = HTMLElement>(
  selector?: EventKey,
  target?: Target<T>,
): string[] => {
  const eventSelector = selector ?? 'code';
  const [keyCodes, setKeyCodes] = React.useState([]);

  const onKeyDown = React.useCallback(
    (event) => {
      setKeyCodes(prev => ([
        ...prev,
        event[eventSelector]
      ]))
    },
    [eventSelector],
  );

  const onKeyUp = React.useCallback(
    (event) => {
      const keyValue = event[eventSelector];
      setKeyCodes(prev => prev.filter(code => code !== keyValue));
    },
    [eventSelector],
  );

  React.useLayoutEffect(() => {
    const element = target
      ? 'current' in target
        ? target.current
        : target
      : document.body;

    (element as HTMLElement).addEventListener('keydown', onKeyDown);
    (element as HTMLElement).addEventListener('keyup', onKeyUp);

    return () => {
      (element as HTMLElement).removeEventListener('keydown', onKeyDown);
      (element as HTMLElement).removeEventListener('keyup', onKeyUp);
    };
  }, [target]);

  return React.useMemo(() => {
    return [...new Set(keyCodes)];
  }, [keyCodes]);
};
