/**
 * @description 객체의 값이 Null일 경우 true, 그렇지 않은 경우는 false를 리턴합니다.
 */
export function isNull(value: any): value is null {
  return value == null;
}

/**
 * @description 객체가 undefined일 경우 true, 그렇지 않은 경우는 false를 리턴합니다.
 */
export function isUndefined(value: any): value is undefined {
  return typeof value === 'undefined' || value === undefined;
}

/**
 * @description 지정된 형식의 사용자 지정 특성이 어셈블리, 모듈, 형식 멤버 또는 메서드 매개 변수에 적용되었다면 true, 그렇지 않은 경우는 false를 리턴합니다.
 */
export function isDefined(value: any) {
  return typeof value !== 'undefined' && value !== undefined;
}

/**
 * @description 인자가 null 또는 undefined인 경우 true, 그렇지 않은 경우는 false를 리턴합니다.
 */
export function isNil(value: any): value is null | undefined {
  return isNull(value) || isUndefined(value);
}
/**
 * @description 인자가 nil 또는 빈 문자열일 경우 true, 그렇지 않은 경우는 false를 리턴합니다.
 */
export function isNilOrEmpty(value: any) {
  return isNil(value) || value === '';
}
/**
 * @description 인자가 문자열일 경우 true, 그렇지 않은 경우는 false를 리턴합니다.
 */
export function isString(value: any): value is string {
  return Object.prototype.toString.call(value) === '[object String]';
}
/**
 * @description 인자가 문자열이고 비어있을 경우 true, 그렇지 않은 경우는 false를 리턴합니다.
 */
export function isEmptyString(value: any): boolean {
  return isString(value) && (!value || value.length === 0);
}

/**
 * @description 인자가 숫자인 경우 true, 그렇지 않은 경우는 false를 리턴합니다.
 */
export function isNumber(value: any): value is number {
  return typeof value === 'number';
}
/**
 * @description 인자가 배열인 경우 true, 그렇지 않은 경우는 false를 리턴합니다.
 */
export function isArray<T>(value: any): value is Array<T> {
  return Array.isArray(value);
}
/**
 * @description 인자가 빈 배열일 경우 true, 그렇지 않은 경우는 false를 리턴합니다.
 */
export function isEmptyArray(value: any): boolean {
  return isArray(value) && value.length === 0;
}
/**
 * @description 인자로 두 배열을 받아오고, 두 배열이 다르다면 true, 그렇지 않은 경우는 false를 리턴합니다.
 */
export function isDifferentArray<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) return true;
  for (let i = 0, len = arr1.length; i < len; i++) {
    if (arr1[i] !== arr2[i]) {
      return true;
    }
  }
  return false;
}
/**
 * @description 인자가 함수인 경우 true, 그렇지 않은 경우는 false를 리턴합니다.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value: any): value is Function {
  return typeof value === 'function';
}
/**
 * @description 인자가 object인 경우 true, 그렇지 않은 경우는 false를 리턴합니다.
 */
export function isPlainObject(value: any): value is Record<string, any> {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const prototype = Object.getPrototypeOf(value);

  return prototype === null || prototype === Object.prototype;
}

/**
 * @description 인자가 object이고 비어있을 경우 true, 그렇지 않은 경우는 false를 리턴합니다.
 */
export function isEmptyObject(value: any) {
  return isPlainObject(value) && JSON.stringify(value) === '{}';
}

/**
 * @description 인자가 object이고 key의 value가 하나라도 비어있을 경우 true, 그렇지 않은 경우는 false를 리턴합니다.
 */
export function isEmptyObjectValue(value: any) {
  const hasString = (currentValue: any) => currentValue !== '';
  return isPlainObject(value) && !Object.values(value).every(hasString);
}

/**
 * @description 인자가 Promise 객체인 경우 true, 그렇지 않은 경우는 false를 리턴합니다.
 */
export function isPromise(value: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return !isNil(value) && !isNil(value);
}
