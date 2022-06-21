/* eslint-disable @typescript-eslint/no-unused-vars */
import { handleMouseUpByBlurring } from '../types/focus.js';
import type { BaseButton } from './type.js';

export function UnstyledButton({
  id,
  children,
  className,
  url,
  external,
  download,
  type,
  disabled,
  loading,
  pressed,
  accessibilityLabel,
  role,
  ariaControls,
  ariaExpanded,
  ariaDescribedBy,
  onClick,
  onFocus,
  onBlur,
  onKeyDown,
  onKeyPress,
  onKeyUp,
  onMouseEnter,
  onTouchStart,
  ...rest
}: BaseButton) {
  const commonProps = {
    id,
    className,
    'aria-label': accessibilityLabel,
  };
  const interactiveProps = {
    ...commonProps,
    role,
    onClick,
    onFocus,
    onBlur,
    onMouseUp: handleMouseUpByBlurring,
    onMouseEnter,
    onTouchStart,
  };

  const buttonMarkup = (
    <button
      {...interactiveProps}
      type={type ?? 'button'}
      disabled={disabled || loading}
      aria-controls={ariaControls}
      aria-expanded={ariaExpanded}
      aria-describedby={ariaDescribedBy}
      aria-pressed={pressed}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onKeyPress={onKeyPress}
      {...rest}
    >
      {children}
    </button>
  );

  return buttonMarkup;
}
