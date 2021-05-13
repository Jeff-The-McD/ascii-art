const canvas = document.getElementById('preview');
const fileInput = document.querySelector('input[type="file"');

const asciiImage = document.getElementById('ascii');
const down = document.getElementById('asciidown');
const ctx = down.getContext('2d');
var imwid;
var imhei;
const context = canvas.getContext('2d');

const toGrayScale = (r, g, b) => 0.21 * r + 0.72 * g + 0.07 * b;

const getFontRatio = () => {
    const pre = document.createElement('pre');
    pre.style.display = 'inline';
    pre.textContent = ' ';

    document.body.appendChild(pre);
    const { width, height } = pre.getBoundingClientRect();
    document.body.removeChild(pre);

    return height / width;
};

const fontRatio = getFontRatio();

const convertToGrayScales = (context, width, height) => {
    const imageData = context.getImageData(0, 0, width, height);

    const grayScales = [];

    for (let i = 0 ; i < imageData.data.length ; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];

        const grayScale = toGrayScale(r, g, b);
        imageData.data[i] = imageData.data[i + 1] = imageData.data[i + 2] = grayScale;

        grayScales.push(grayScale);
    }

    context.putImageData(imageData, 0, 0);

const buttonInput = document.querySelector('button');
const context = canvas.getContext("2d");
var image;


    return grayScales;
};


var MAXIMUM_WIDTH = 80;
var MAXIMUM_HEIGHT = 80;

  const reader = new FileReader();
  reader.onload = event => {
    image = new Image();
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;


const clampDimensions = (width, height) => {
    const rectifiedWidth = Math.floor(getFontRatio() * width);

    if (height > MAXIMUM_HEIGHT) {
        const reducedWidth = Math.floor(rectifiedWidth * MAXIMUM_HEIGHT / height);
        return [reducedWidth, MAXIMUM_HEIGHT];
    }

    if (width > MAXIMUM_WIDTH) {
        const reducedHeight = Math.floor(height * MAXIMUM_WIDTH / rectifiedWidth);
        return [MAXIMUM_WIDTH, reducedHeight];
    }

    return [rectifiedWidth, height];
};

fileInput.onchange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
		
        const image = new Image();
        image.onload = () => {
            const [width, height] = clampDimensions(image.width, image.height);
			imwid = width;
			imhei = height;
            canvas.width = width;
            canvas.height = height;
            down.height = height*16;
			down.width = width*10;
            context.drawImage(image, 0, 0, width, height);
            const grayScales = convertToGrayScales(context, width, height);

            fileInput.style.display = 'none';
			drawAscii(grayScales, width);
			// Fill canvas with ascii image text
			var contain = asciiImage.textContent;
			var splittext = contain.split('\n');
			for (var i=0;i<splittext.length;i++){
				ctx.fillText(splittext[i],30,30+(i*15));
			}
        }
        image.src = event.target.result;
    };
    reader.readAsDataURL(file);
};

const grayRamp = '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,"^`\'. ';
const rampLength = grayRamp.length;

const getCharacterForGrayScale = grayScale => grayRamp[Math.ceil((rampLength - 1) * grayScale / 255)];

const drawAscii = (grayScales, width) => {
    const ascii = grayScales.reduce((asciiImage, grayScale, index) => {
        let nextChars = getCharacterForGrayScale(grayScale);
        if ((index + 1) % width === 0) {
            nextChars += '\n';
        }

        return asciiImage + nextChars;
    }, '');

    asciiImage.textContent = ascii;
};
var w = document.getElementById("wid");
var h = document.getElementById("hei");
setInterval(function() {
  MAXIMUM_WIDTH = w.value;
  MAXIMUM_HEIGHT = h.value;
}, 100)

function DownloadCanvasAsImage(){
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'AsciiImage.png');
    let canvas = document.getElementById('asciidown');
    canvas.toBlob(function(blob) {
      let url = URL.createObjectURL(blob);
      downloadLink.setAttribute('href', url);
      downloadLink.click();
	});

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