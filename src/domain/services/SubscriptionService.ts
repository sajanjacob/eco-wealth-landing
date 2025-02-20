import { Subscriber } from '../entities/Subscriber';
import { RecentSignup } from '../entities/RecentSignup';
import { SubscriberAddedEvent, DuplicateSubscriptionAttemptedEvent } from '../events/SubscriberEvents';

export interface SubscriberRepository {
  findByEmail(email: string): Promise<Subscriber | null>;
  save(subscriber: Subscriber): Promise<void>;
  getRecentSignups(hours: number): Promise<RecentSignup[]>;
}

export class SubscriptionService {
  constructor(private readonly subscriberRepository: SubscriberRepository) {}

  async validateAndCreateSubscriber(
    id: string,
    name: string,
    email: string
  ): Promise<SubscriberAddedEvent | DuplicateSubscriptionAttemptedEvent> {
    const isDuplicate = await this.checkForDuplicates(email);
    
    if (isDuplicate) {
      return new DuplicateSubscriptionAttemptedEvent(email);
    }

    const subscriber = Subscriber.create(id, name, email);
    await this.subscriberRepository.save(subscriber);
    return new SubscriberAddedEvent(subscriber);
  }

  async checkForDuplicates(email: string): Promise<boolean> {
    const existingSubscriber = await this.subscriberRepository.findByEmail(email);
    return existingSubscriber !== null;
  }

  async getRecentSignups(hours: number = 24): Promise<RecentSignup[]> {
    return this.subscriberRepository.getRecentSignups(hours);
  }
} 