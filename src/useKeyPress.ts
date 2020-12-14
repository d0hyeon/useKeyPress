import React from 'react';
import { useHistoryState } from '@odnh/use-history-state';

export type Target<T> = HTMLElement | React.MutableRefObject<T>;
export type EventKey = 'code' | 'keyCode' | 'key' | 'which';

export const useKeyPress = <T = HTMLElement>(
  selector?: EventKey,
  target?: Target<T>,
): string[] => {
  const eventSelector = selector ?? 'code';
  const [
    keyCode,
    setKeyCode,
    { histories, deleteItem },
  ] = useHistoryState<string>('');

  const onKeyDown = React.useCallback(
    (event) => {
      setKeyCode(event[eventSelector]);
    },
    [eventSelector, keyCode, histories],
  );

  const onKeyUp = React.useCallback(
    (event) => {
      deleteItem(event[eventSelector]);
    },
    [eventSelector, histories],
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
    return histories;
  }, [keyCode]);
};
