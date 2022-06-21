import type { ButtonHTMLAttributes } from 'react';

export interface BaseButton {
  /** 버튼 고유 식별자 */
  id?: string | undefined;
  /** 링크할 대상 (링크의 href 속성으로 렌더링) */
  url?: string | undefined;
  /** URL을 새 탭에서 열기 여부 */
  external?: boolean | undefined;
  /** 브라우저가 URL을 여는 대신 다운로드하도록 지시합니다. 문자열 값인 경우 다운로드한 파일 이름에 대한 힌트를 제공합니다.*/
  download?: string | boolean | undefined;
  /** button 요소의 type 어트리뷰트입니다. */
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'] | undefined;
  /** html button 의 form 어트리뷰트 입니다. */
  form?: string | undefined;
  /** 버튼 비활성화 여부 */
  disabled?: boolean | undefined;
  /** 백그라운드 작업이 수행되는 동안 버튼 텍스트를 스피너로 교체 여부 */
  loading?: boolean | undefined;
  /** 버튼 누른 상태 설정 여부 */
  pressed?: boolean | undefined;
  /** screen reader를 위해 시각적으로 숨겨진 텍스트 */
  accessibilityLabel?: string | undefined;
  /** 이 요소의 semantic value를 정의하기 위한 유효한 WAI-ARIA role을 지정합니다. */
  role?: string | undefined;
  /** 버튼이 제어하는 요소의 ID */
  ariaControls?: string | undefined;
  /** 제어된 요소가 확장되었음을 screen reader에 알릴지 여부입니다. */
  ariaExpanded?: boolean | undefined;
  /** 버튼을 설명하는 요소의 ID를 나타냅니다. */
  ariaDescribedBy?: string | undefined;
  /** 클릭했을 때 콜백되는 함수입니다. */
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  /** 버튼에 포커스가 되었을 때 콜백되는 함수입니다. */
  onFocus?(): void | undefined;
  /** 포커스가 버튼에서 떠날 때 콜백되는 함수입니다. */
  onBlur?(): void | undefined;
  /** 버튼에 keypress 이벤트가 등록되었을 때 콜백되는 함수입니다.*/
  onKeyPress?(event: React.KeyboardEvent<HTMLButtonElement>): void | undefined;
  /** 버튼에 keyup 이벤트 등록 시 콜백되는 함수입니다. */
  onKeyUp?(event: React.KeyboardEvent<HTMLButtonElement>): void | undefined;
  /** 버튼에 keydown 이벤트 등록 시 콜백되는 함수입니다. */
  onKeyDown?(event: React.KeyboardEvent<HTMLButtonElement>): void | undefined;
  /** 마우스 입력 시 콜백되는 함수입니다. */
  onMouseEnter?(): void | undefined;
  /** 요소가 터치되었을 때 콜백되는 함수입니다. */
  onTouchStart?(): void | undefined;
  /** 버튼 안에 표시할 내용 */
  children?: React.ReactElement;
  /** 버튼에 스타일을 적용하기 위한 커스텀 클래스 이름 */
  className?: string | undefined;
}

export type ButtonTheme = 'basic' | 'destructive' | 'primary';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends BaseButton {
  /**
   * 버튼의 테마를 지정합니다.
   * @default 'basic'
   * */
  theme?: ButtonTheme;
  /**
   * 버튼의 크기를 변경합니다. (padding 이용)
   * @default 'medium'
   */
  size?: ButtonSize;
  /** 버튼이 컨테이너의 너비만큼 커지도록 허용 유무 */
  fullWidth?: boolean;
  /** 로딩 여부 */
  loading?: boolean;
  /** 'monochrome'과 'plain'이 true인 경우 버튼 텍스트에서 밑줄 제거 여부입니다. */
  removeUnderline?: boolean;
  /** 버튼 내용의 왼쪽에 표시할 아이콘입니다. */
  icon?: React.ReactElement;
  /** 추가적인 css 스타일을 적용할 때 사용합니다. 해당 컴포넌트의 최상단 div에 적용됩니다. */
}
