import { DomainEvent } from './DomainEvent.js';

/**
 * 既存知見がマージされたイベント
 */
export class KnowledgeMergedEvent implements DomainEvent {
  readonly eventType = 'KnowledgeMerged';
  readonly occurredOn: Date;

  constructor(
    readonly title: string,
    readonly newOccurrences: number
  ) {
    this.occurredOn = new Date();
  }
}
