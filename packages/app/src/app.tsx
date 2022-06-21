import type React from 'react';
import { Main, Button } from '@notion-helper/components';

export interface AppProps {
  text: string;
}

export const App: React.FC<AppProps> = ({ text }) => (
  <Main>
    <>
      <h1 className="text-slate-500">{text}</h1>
      <Button theme="primary">
        <span>hello</span>
      </Button>
    </>
  </Main>
);
