/**
 * Administrator Panel Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Confirm Deletions
  const deleteForms = document.querySelectorAll('form[data-confirm]');
  deleteForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      const msg = form.getAttribute('data-confirm') || 'Are you sure you want to delete this record? This action cannot be undone.';
      if (!confirm(msg)) {
        e.preventDefault();
      }
    });
  });

  // 2. Image / File Preview
  const imageInputs = document.querySelectorAll('input[type="file"][data-preview]');
  imageInputs.forEach(input => {
    input.addEventListener('change', () => {
      const previewId = input.getAttribute('data-preview');
      const previewContainer = document.getElementById(previewId);
      if (!previewContainer) return;

      previewContainer.innerHTML = '';
      if (input.files && input.files[0]) {
        const file = input.files[0];
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxHeight = '180px';
            img.style.borderRadius = '6px';
            img.style.marginTop = '10px';
            previewContainer.appendChild(img);
          };
          reader.readAsDataURL(file);
        } else if (file.type.startsWith('video/')) {
          const p = document.createElement('p');
          p.style.marginTop = '8px';
          p.style.fontSize = '13px';
          p.style.color = '#198754';
          p.textContent = `Selected video: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)`;
          previewContainer.appendChild(p);
        }
      }
    });
  });
});
