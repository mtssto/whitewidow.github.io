// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Dropdown toggle functionality
  document.querySelectorAll('.dropdown-toggle').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent the default behavior of instant redirection
      
      let parentLi = this.parentElement;
      
      // Toggle the "open" class on the parent <li>
      parentLi.classList.toggle('open');
  
      // Redirect after a small delay to allow the dropdown to show first
      const href = this.getAttribute('href');
      
      // Adding delay before redirection so the user sees the dropdown first
      setTimeout(() => {
        window.location.href = href;
      }, 300); // Adjust delay time as needed (300ms here)
    });
  });

  // Burger menu functionality
  const burgerMenu = document.getElementById('burger-menu');
  const sidebar = document.querySelector('.sidebar');

  burgerMenu.addEventListener('click', function () {
    sidebar.classList.toggle('active');
  });
});


