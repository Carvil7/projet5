//page confirmation

// Récupération de l'id du produit passer dans l'URL
const currentUrl = window.location.href;
const url = new URL(currentUrl);
const orderId = url.searchParams.get("orderId");

// affichage de l'order-ID dans l'HTML
document.getElementById('orderId').textContent = orderId;