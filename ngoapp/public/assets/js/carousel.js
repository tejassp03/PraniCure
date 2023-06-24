$(document).ready(function() {
  $('#carouselExampleIndicators').carousel(); 

  $('.carousel-control-prev').click(function() {
    $('#carouselExampleIndicators').carousel('prev'); 
  });

  $('.carousel-control-next').click(function() {
    $('#carouselExampleIndicators').carousel('next'); 
  });
});
