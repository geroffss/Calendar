window.addEventListener('DOMContentLoaded', () => {
  const minimizeButton = document.querySelector('.minimize-button');
  const maximizeButton = document.querySelector('.maximize-button');
  const closeButton = document.querySelector('.close-button');

  minimizeButton.addEventListener('click', () => {
    window.electron.minimize();
  });

  maximizeButton.addEventListener('click', () => {
    window.electron.maximize();
  });

  closeButton.addEventListener('click', () => {
    window.electron.close();
  });
});