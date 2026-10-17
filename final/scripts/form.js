document.addEventListener("DOMContentLoaded", function () {
  const productArray = [
    { id: 1, name: "Product 1" },
    { id: 2, name: "Product 2" },
    { id: 3, name: "Product 3" },
    { id: 4, name: "Product 4" },
  ];

  const productSelect = document.getElementById("productName");

  productArray.forEach((product) => {
    let option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    productSelect.appendChild(option);
  });
});

if (window.location.pathname.includes("review.html")) {
  let reviewCount = localStorage.getItem("reviewCount");
  reviewCount = reviewCount ? parseInt(reviewCount) + 1 : 1;
  localStorage.setItem("reviewCount", reviewCount);
  document.body.innerHTML = `<h1>Thank you for your review!</h1><p>You have submitted ${reviewCount} reviews.</p>`;
}
