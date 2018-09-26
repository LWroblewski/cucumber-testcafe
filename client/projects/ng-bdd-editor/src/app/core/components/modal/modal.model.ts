export interface ModalConfirmConfig {
  title?: string;
  message?: string;
}

export interface ToasterConfig {
  message: string;
  type?: ToasterType;
}

export type ToasterType = 'success' | 'info' | 'warning' | 'error';
