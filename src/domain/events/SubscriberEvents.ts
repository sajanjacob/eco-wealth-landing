import { DomainEvent } from './DomainEvent';
import { Subscriber } from '../entities/Subscriber';

export class SubscriberAddedEvent implements DomainEvent {
  public readonly occurredOn: Date;
  
  constructor(public readonly subscriber: Subscriber) {
    this.occurredOn = new Date();
  }
}

export class DuplicateSubscriptionAttemptedEvent implements DomainEvent {
  public readonly occurredOn: Date;
  
  constructor(public readonly email: string) {
    this.occurredOn = new Date();
  }
} 