window.addEventListener('DOMContentLoaded', function() {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((content) => {
      document.getElementById("navbarContainer").innerHTML = content;
      activate();
    });
});

function activate() {
  var parentDocument = window.parent.document;
  var page = window.location.href.split('/').pop();

  if (page === "user-home.html") {
    console.log("user home clicked!");
    const userHomeLink = parentDocument.getElementById("homelink");
    if (userHomeLink) {
      userHomeLink.classList.add("active");
    }
  }
  else if(page==="indexuser.html"){
    const userHomeLink = parentDocument.getElementById("notiflink");
    userHomeLink.classList.add("active");
  }
  else if(page==="order-list.html"){
      const userHomeLink = parentDocument.getElementById("messagelink");
      userHomeLink.classList.add("active");
  }
  // else if(page==="profile.html"){
  //     const userHomeLink =parentDocument.getElementById("proflink");
  //     userHomeLink.classList.add("active");
  // }
}
