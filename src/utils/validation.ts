  // Validateable interface
  export interface Validateable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  // validate function
  export function validate(input: Validateable): boolean {
    let isValid = true;
    if (input.required) {
      isValid = isValid && input.value.toString().trim().length !== 0;
    }

    if (input.minLength != null && typeof input.value === 'string') {
      isValid = isValid && input.value.length >= input.minLength;
    }

    if (input.maxLength != null && typeof input.value === 'string') {
      isValid = isValid && input.value.length <= input.maxLength;
    }

    if (input.max && typeof input.value === 'number') {
      isValid = isValid && input.value <= input.max;
    }

    if (input.min && typeof input.value === 'number') {
      isValid = isValid && input.value >= input.min;
    }

    return isValid;
  }