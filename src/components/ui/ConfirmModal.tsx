'use client';

import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

type ConfirmModalProps = {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  danger?: boolean;
};

export default function ConfirmModal({ title, message, onConfirm, onCancel, confirmLabel = 'Konfirmasi', danger = false }: ConfirmModalProps) {
  return (
    <div className="popup-overlay fade-in">
      <div className="bounce-in max-w-sm w-full mx-4">
        <div className="card-soft p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className={`rounded-2xl p-2 ${danger ? 'bg-red-100' : 'bg-gold bg-opacity-20'}`}>
              <AlertTriangle size={20} className={danger ? 'text-red-500' : 'text-gold-dark'} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-foreground text-lg">{title}</h3>
              <p className="text-muted-foreground text-sm mt-1">{message}</p>
            </div>
            <button onClick={onCancel} className="text-muted-foreground hover:text-foreground">
              <X size={18} />
            </button>
          </div>
          <div className="flex gap-3">
            <button onClick={onCancel} className="btn-ghost flex-1">Batal</button>
            <button
              onClick={onConfirm}
              className={`flex-1 rounded-full py-2.5 font-bold text-sm transition-all duration-150 active:scale-95 ${danger ? 'bg-red-500 text-white hover:bg-red-600' : 'btn-primary'}`}
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}