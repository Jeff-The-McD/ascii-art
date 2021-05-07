
const canvas = document.getElementById("preview");
const fileInput = document.querySelector('input[type="file"');
const buttonInput = document.querySelector('button');
const context = canvas.getContext("2d");
var image;

fileInput.onchange = e => {
  // just handling single file upload
  const file = e.target.files[0];

  const reader = new FileReader();
  reader.onload = event => {
    image = new Image();
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;

      context.drawImage(image, 0, 0);
    };

    image.src = event.target.result;
  };

  reader.readAsDataURL(file);
};

buttonInput.onclick = e => {
  console.log('Clicked convert button')
  let myPixelArt = '';
  // Start the first row of "pixels".
  myPixelArt += '<div class="a-row-of-pixels">';
  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      const theImageData = context.getImageData(x, y, 1, 1);
      const theRGBvalues = theImageData.data;

      // Concatenate every column of "pixels" in this row, one after the other.
      myPixelArt += `<div class="a-pixel" style="background: rgb(${ theRGBvalues[0] }, ${ theRGBvalues[1] }, ${ theRGBvalues[2] })"></div>`;

    }
    // Concatenate the end of the row and the beginning of a new one.   
    myPixelArt += '</div><div class="a-row-of-pixels">';
  }
  // The last row will be empty but who cares, let's close it.
  myPixelArt += '</div>';
  document.getElementById("ascii-art").innerHTML += myPixelArt;
}