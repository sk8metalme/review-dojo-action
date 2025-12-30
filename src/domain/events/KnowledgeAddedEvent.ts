import { DomainEvent } from './DomainEvent.js';

/**
 * 新規知見が追加されたイベント
 */
export class KnowledgeAddedEvent implements DomainEvent {
  readonly eventType = 'KnowledgeAdded';
  readonly occurredOn: Date;

  constructor(
    readonly title: string,
    readonly severity: string
  ) {
    this.occurredOn = new Date();
  }
}
