fetch('navBar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-container').innerHTML = data;

        document.dispatchEvent(new Event('navbar:loaded'));
});

function openModalS() {
    document.getElementById('modalSS').style.display = 'flex';
    document.getElementById('modalAS').style.display = 'none';
}
function openModalA() {
    document.getElementById('modalAS').style.display = 'flex';
    document.getElementById('modalSS').style.display = 'none';
}

function closeModal() {
    document.getElementById('modalSS').style.display = 'none';
    document.getElementById('modalAS').style.display = 'none';
}

window.onclick = function(event) {
    var modal = document.getElementById('modalSS');
    var modal2 = document.getElementById('modalAS');
    if (event.target === modal || event.target === modal2) {
        closeModal();
    }
}

document.addEventListener('navbar:loaded', () => {
  const openLinks = document.querySelectorAll('.open-form');
  
  openLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (link.getAttribute('onclick').includes('openModalS()')) {
        openModalS();
      } else if (link.getAttribute('onclick').includes('openModalA()')) {
        openModalA();
      }
    });
  });
});