import React, { useEffect } from 'react';

const LightboxModal = ({ isOpen, imageSrc, imageAlt, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="lightbox-modal active"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      onClick={onClose}
    >
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="lightbox-close"
          aria-label="Close Preview"
          onClick={onClose}
        >
          &times;
        </button>
        <img src={imageSrc} alt={imageAlt || 'Preview'} id="lightbox-img" />
      </div>
    </div>
  );
};

export default LightboxModal;
