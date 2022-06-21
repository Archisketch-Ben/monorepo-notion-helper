import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';

import type { unionKey } from '../types/key.js';

export interface GlobalKeypressListenerProps {
  keyCode: unionKey;
  handler(event: KeyboardEvent): void;
  keyEvent?: KeyEvent;
}

type KeyEvent = 'keydown' | 'keyup';

export function GlobalKeypressListener({ keyCode, handler, keyEvent = 'keyup' }: GlobalKeypressListenerProps) {
  const tracked = useRef({ handler, keyCode });

  useLayoutEffect(() => {
    tracked.current = { handler, keyCode };
  }, [handler, keyCode]);

  const handleKeyEvent = useCallback((event: KeyboardEvent) => {
    const { handler, keyCode } = tracked.current;

    // @TODO keyCode 가 아닌 key로 변경하기
    // key property 미지원 브라우저 대응하기 위함
    // 만약 브라우저가 전달해준 event 에 key property가 존재할 경우, 해당 값을 key 변수에 전달
    // key property가 undefined 일 경우, event.keyCode를 바라보도록 설정
    // const key = event.key || event.keyCode;

    if (event.keyCode === keyCode) {
      handler(event);
    }
  }, []);

  useEffect(() => {
    document.addEventListener(keyEvent, handleKeyEvent);
    return () => {
      document.removeEventListener(keyEvent, handleKeyEvent);
    };
  }, [keyEvent, handleKeyEvent]);

  return null;
}
