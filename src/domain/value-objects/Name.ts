export class Name {
  private readonly value: string;

  constructor(name: string) {
    if (!this.isValidName(name)) {
      throw new Error('Name must be between 2 and 100 characters');
    }
    this.value = name;
  }

  private isValidName(name: string): boolean {
    return name.length >= 2 && name.length <= 100;
  }

  toString(): string {
    return this.value;
  }
} 