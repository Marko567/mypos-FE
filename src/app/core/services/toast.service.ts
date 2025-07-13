import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ToastType } from '../../models/toast-type.enum';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly document = inject(DOCUMENT);

  show(message: string, type: ToastType = ToastType.Info, duration = 3000) {
    const containerId = 'toastPlacement';
    let container = this.document.getElementById(containerId);

    if (!container) return;

    const toast = this.document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${this.mapType(type)} border-0 show`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => toast.remove());
    }, duration);
  }

  success(message: string, duration = 3000) {
    this.show(message, ToastType.Success, duration);
  }

  error(message: string, duration = 3000) {
    this.show(message, ToastType.Error, duration);
  }

  info(message: string, duration = 3000) {
    this.show(message, ToastType.Info, duration);
  }

  warning(message: string, duration = 3000) {
    this.show(message, ToastType.Warning, duration);
  }

  private mapType(type: ToastType): string {
    return {
      [ToastType.Success]: 'success',
      [ToastType.Error]: 'danger',
      [ToastType.Info]: 'primary',
      [ToastType.Warning]: 'warning'
    }[type] ?? 'secondary';
  }
}
