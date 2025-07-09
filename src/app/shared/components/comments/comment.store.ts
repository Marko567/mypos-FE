import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CommentStore {
  private readonly refreshMap = new Map<string, ReturnType<typeof signal<number>>>();

  getRefreshSignal(postId: string) {
    if (!this.refreshMap.has(postId)) {
      this.refreshMap.set(postId, signal(0));
    }
    return computed(() => this.refreshMap.get(postId)!());
  }

  triggerRefresh(postId: string): void {
    const currentSignal = this.refreshMap.get(postId);
    if (currentSignal) {
      currentSignal.update(n => n + 1);
    } else {
      const newSignal = signal(1);
      this.refreshMap.set(postId, newSignal);
    }
  }
}
