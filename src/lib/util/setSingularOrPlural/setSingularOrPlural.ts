interface Params {
  /** Value to be used for determining the label's singular or plural form. */
  value: number;
  /** Human-readable label. */
  label: string;
  /** Human-readable singular form of the label. */
  singular?: string;
  /** Human-readable plural form of the label. */
  plural?: string;
}

/**
 * Set a value's label to its singular version if the value is 1, or to its plural version otherwise. `singular` or `plural` can be passed to override the default singular and plural forms.
 * @returns transformed string
 *
 * @example
 * setSingularOrPlural({ value: 1, label: "item" }); // "item"
 * setSingularOrPlural({ value: 2, label: "item" }); // "items"
 * setSingularOrPlural({ value: 1, label: "item", singular: "one" }); // "one"
 * setSingularOrPlural({ value: 2, label: "item", plural: "many" }); // "many"
 */
const setSingularOrPlural = ({
  value,
  label,
  singular,
  plural,
}: Params): string => (value === 1 ? singular || label : plural || `${label}s`);

export default setSingularOrPlural;
