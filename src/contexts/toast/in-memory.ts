import { ToastData, ToastStore } from ".";

export const defaultToast: ToastData = {
  id: "",
  title: "",
  message: "",
  type: "info",
  timeout: 5000,
};

export default class InMemoryToastStore implements ToastStore {
  public toasts: ToastData[] = [];

  public addToast(toast: Partial<ToastData>): string {
    const id = Math.random().toString(36);
    this.toasts = [...this.toasts, { ...defaultToast, ...toast, id }];

    if (toast.timeout && toast.timeout > 0) {
      setTimeout(() => {
        this.removeToast(id);
      }, toast.timeout);
    }

    return id;
  }

  public removeToast(id: string): void {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
  }

  public clearToasts(): void {
    this.toasts = [];
  }
}
