function showImage(imageId) {
  const selectedImage = document.getElementById(imageId);
  if (selectedImage) {
    selectedImage.style.display = 'block';
  }
}

function hideImage(imageId) {
  const selectedImage = document.getElementById(imageId);
  if (selectedImage) {
    selectedImage.style.display = 'none';
  }
}