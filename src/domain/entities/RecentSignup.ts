export class RecentSignup {
  constructor(
    public readonly id: string,
    public readonly subscriberId: string,
    public readonly signupTimestamp: Date
  ) {}

  isRecent(withinHours: number = 24): boolean {
    const hoursDifference = (new Date().getTime() - this.signupTimestamp.getTime()) / (1000 * 60 * 60);
    return hoursDifference <= withinHours;
  }
} 