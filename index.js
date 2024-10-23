// Select all sidebar links
const sidebarLinks = document.querySelectorAll('.sidebar ul li a');

// Function to handle link clicks
function setActiveLink(link) {
  // Remove the 'active' class from all links
  sidebarLinks.forEach(link => link.classList.remove('active'));

  // Add the 'active' class to the clicked link
  link.classList.add('active');

  // Store the active link in localStorage
  localStorage.setItem('activeLink', link.getAttribute('href'));
}

// Loop through the links and add click event listeners
sidebarLinks.forEach(link => {
  link.addEventListener('click', function() {
    setActiveLink(this);
  });
});

// On page load, check localStorage and apply the active class
window.addEventListener('load', function() {
  const activeLink = localStorage.getItem('activeLink');

  if (activeLink) {
    // Find the link with the href that matches the stored value and activate it
    const linkToActivate = document.querySelector(`.sidebar ul li a[href="${activeLink}"]`);

    if (linkToActivate) {
      setActiveLink(linkToActivate);
    }
  }
});


// Add toggle functionality with redirection
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

