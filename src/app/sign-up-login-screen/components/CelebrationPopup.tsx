'use client';

import React, { useEffect, useState } from 'react';
import { Star, X } from 'lucide-react';

type CelebrationPopupProps = {
  name: string;
  message: string;
  subMessage: string;
  onClose: () => void;
};

export default function CelebrationPopup({ name, message, subMessage, onClose }: CelebrationPopupProps) {
  const [stars, setStars] = useState<Array<{ id: string; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const generated = Array.from({ length: 12 }, (_, i) => ({
      id: `star-${i}`,
      x: Math.floor(i * 30 + 10),
      y: Math.floor((i % 4) * 25 + 5),
      delay: i * 0.1,
    }));
    setStars(generated);
  }, []);

  return (
    <div className="popup-overlay fade-in">
      <div className="bounce-in relative max-w-sm w-full mx-4">
        <div className="card-soft p-8 text-center relative overflow-hidden">
          {/* Decorative stars */}
          {stars.map((star) => (
            <div
              key={star.id}
              className="absolute star-pop text-gold"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                fontSize: '1rem',
                animationDelay: `${star.delay}s`,
              }}
            >
              ✦
            </div>
          ))}

          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={18} />
          </button>

          <div className="sparkle-animation text-6xl mb-4">🌙</div>

          <h3 className="text-2xl font-bold text-foreground mb-2">{message}</h3>
          <p className="text-muted-foreground font-medium mb-4">{subMessage}</p>

          <div className="flex justify-center gap-1 mb-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={`popup-star-${i}`}
                size={20}
                className="text-gold fill-gold"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>

          <div className="badge-green inline-block px-4 py-2 text-sm font-bold">
            بَارَكَ اللهُ فِيكَ 🌿
          </div>

          <p className="text-xs text-muted-foreground mt-3">Mengalihkan ke dashboard...</p>
        </div>
      </div>
    </div>
  );
}