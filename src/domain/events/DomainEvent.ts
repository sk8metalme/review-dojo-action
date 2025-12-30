/**
 * ドメインイベントの基底インターフェース
 */
export interface DomainEvent {
  readonly occurredOn: Date;
  readonly eventType: string;
}
