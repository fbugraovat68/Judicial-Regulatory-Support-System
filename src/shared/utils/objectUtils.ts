/**
 * Utility static Class for handling object-to-string conversion
 */
export class ObjectUtils {
  /**
   * Converts an object to a displayable string
   * @param obj - The object to convert
   * @param fallback - Fallback value if conversion fails
   * @returns A string representation of the object
   */
  static readonly objectToString = (obj: any, fallback: string = '-'): string => {
    if (obj === null || obj === undefined) {
      return fallback;
    }

    if (typeof obj === 'string') {
      return obj;
    }

    if (typeof obj === 'number') {
      return obj.toString();
    }

    if (typeof obj === 'object') {
      // Handle objects with nameEn, nameAr, code properties
      if (obj.nameEn) return obj.nameEn;
      if (obj.nameAr) return obj.nameAr;
      if (obj.code) return obj.code;
      if (obj.email) return obj.email;

      // Handle objects with name property
      if (obj.name) return obj.name;

      // Handle objects with title property
      if (obj.title) return obj.title;

      // Handle objects with label property
      if (obj.label) return obj.label;

      // If none of the above, try to stringify
      try {
        return JSON.stringify(obj);
      } catch {
        return fallback;
      }
    }

    return fallback;
  };

  /**
   * Safely extracts a display value from an object or primitive
   * @param value - The value to extract display text from
   * @param fallback - Fallback value if extraction fails
   * @returns A string suitable for display
   */
  static readonly getDisplayValue = (value: any, fallback: string = '-'): string => {
    return this.objectToString(value, fallback);
  };

  /**
   * Checks if a value is an object that needs conversion
   * @param value - The value to check
   * @returns True if the value is an object that needs conversion
   */
  static readonly isObjectToConvert = (value: any): boolean => {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  };
}