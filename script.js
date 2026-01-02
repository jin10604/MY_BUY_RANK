const modal = document.getElementById("modal");
document.getElementById("openModal").onclick = () => modal.classList.add("show");
document.getElementById("closeModal").onclick = () => modal.classList.remove("show");

document.getElementById("addItem").onclick = () => modal.classList.remove("show");
