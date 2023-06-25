window.addEventListener('DOMContentLoaded', function() {
  fetch("navbar1.html")
    .then((response) => response.text())
    .then((content) => {
      document.getElementById("navbarContainer").innerHTML = content;
      activate();
    });
});

function activate() {
  var parentDocument = window.parent.document;
  var page = window.location.href.split('/').pop();

  if (page === "indexngo.html") {
    console.log("ngo home clicked!");
    const userHomeLink = parentDocument.getElementById("homelink");
    if (userHomeLink) {
      userHomeLink.classList.add("active");
    }
  }
  else if(page==="indexuser.html"){
    const userHomeLink = parentDocument.getElementById("order-lisr");
    userHomeLink.classList.add("active");
  }
  // else if(page==="profile.html"){
  //     const userHomeLink =parentDocument.getElementById("proflink");
  //     userHomeLink.classList.add("active");
  // }
}
