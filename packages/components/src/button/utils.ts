import type { ButtonSize, ButtonTheme } from '../UnstyledButton/type.js';

export function getBase(): string {
  return 'cursor-pointer transition-colors duration-200 ease-in-out';
}

export function getTheme(theme: ButtonTheme): string {
  const themeData: { [K in ButtonTheme]: string } = {
    basic: 'text-white bg-blue-500 hover:bg-blue-600',
    primary: 'text-white bg-orange-500 hover:bg-orange-600',
    destructive: 'text-white bg-red-500 hover:bg-red-600',
  };

  return themeData[theme];
}

export function getSize(size: ButtonSize): string {
  const sizeData: { [K in ButtonSize]: string } = {
    small: 'px-4 py-2 rounded-lg',
    medium: 'px-6 py-2 rounded-xl',
    large: 'px-8 py-3 rounded-xl',
  };

  return sizeData[size];
}

export function getStatus(loading: boolean): string {
  return `disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed focus:ring focus:ring-offset-1 focus:ring-indigo-300 focus:outline-none ${
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    loading && 'cursor-wait flex items-center'
  }`;
}
