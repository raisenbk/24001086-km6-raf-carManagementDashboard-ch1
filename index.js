// Add Button Animation
document.getElementsByClassName(".button-add-new-car").addEventListener("click", function() {
    // Add class to trigger animation
    document.body.classList.add("dissolve");
  
    // Navigate to Cars/Add New Car after animation duration
    setTimeout(function() {
      window.location.href = "Cars/Add New Car";
    }, 300); // 300ms is the animation duration
  });

//   ---------------------------------------------------

