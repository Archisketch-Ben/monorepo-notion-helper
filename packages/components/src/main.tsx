import type React from 'react';

export interface MainProps {
  children: React.ReactElement;
}

export const Main: React.FC<MainProps> = ({ children }) => <main>{children}</main>;
