import { Email } from '../value-objects/Email';
import { Name } from '../value-objects/Name';

export class Subscriber {
  private constructor(
    public readonly id: string,
    private readonly name: Name,
    private readonly email: Email,
    public readonly signupDate: Date
  ) {}

  static create(id: string, name: string, email: string): Subscriber {
    return new Subscriber(
      id,
      new Name(name),
      new Email(email),
      new Date()
    );
  }

  getName(): string {
    return this.name.toString();
  }

  getEmail(): string {
    return this.email.toString();
  }
} 