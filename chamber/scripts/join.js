document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-dialog]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      const dialogId = trigger.getAttribute('data-dialog');
      const dialog = document.getElementById(dialogId);

      if (dialog instanceof HTMLDialogElement) {
        dialog.showModal();
      }
    });
  });

  document.querySelectorAll('.dialog-close').forEach((button) => {
    button.addEventListener('click', () => {
      const dialog = button.closest('dialog');
      dialog?.close();
    });
  });

  document.querySelectorAll('.membership-dialog').forEach((dialog) => {
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });
  });
});
