// Select all sidebar links
const sidebarLinks = document.querySelectorAll('.xul-nav-links li a');

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
    // Handle potential differences in relative paths by checking endsWith
    let linkToActivate = null;
    sidebarLinks.forEach(link => {
        if(link.getAttribute('href') === activeLink) {
            linkToActivate = link;
        }
    });

    if (linkToActivate) {
      setActiveLink(linkToActivate);
    }
  }
});


