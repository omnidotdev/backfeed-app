/**
 * Cherrypick properties to make required. Contrast to the TypeScript standard `Required` type, which makes all properties required.
 *
 * @example CherrypickRequired<{ a?: string, b?: number }, "a"> // -> { a: string, b?: number }
 */
type CherrypickRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export default CherrypickRequired;
