export const addDefaultSrc = (e) => {
  e.target.src = '';
};

export const formatAddress = (address) => {
  if (!address) {
    return '';
  }

  const visibleCount = 4;

  const prefixSeven = address.slice(0, visibleCount);
  const suffixSeven = address.slice(address.length - visibleCount - 1);

  return `${prefixSeven}...${suffixSeven}`;
};

export function crop(url, aspectRatio) {
  // we return a Promise that gets resolved with our canvas element
  return new Promise((resolve) => {
    // this image will hold our source image data
    const inputImage = new Image();

    // we want to wait for our image to load
    inputImage.onload = () => {
      // let's store the width and height of our image
      const inputWidth = inputImage.naturalWidth;
      const inputHeight = inputImage.naturalHeight;

      // get the aspect ratio of the input image
      const inputImageAspectRatio = inputWidth / inputHeight;

      // if it's bigger than our target aspect ratio
      let outputWidth = inputWidth;
      let outputHeight = inputHeight;
      if (inputImageAspectRatio > aspectRatio) {
        outputWidth = inputHeight * aspectRatio;
      } else if (inputImageAspectRatio < aspectRatio) {
        outputHeight = inputWidth / aspectRatio;
      }

      // calculate the position to draw the image at
      const outputX = (outputWidth - inputWidth) * 0.5;
      const outputY = (outputHeight - inputHeight) * 0.5;

      // create a canvas that will present the output image
      const outputImage = document.createElement('canvas');

      // set it to the same size as the image
      outputImage.width = outputWidth;
      outputImage.height = outputHeight;

      // draw our image at position 0, 0 on the canvas
      const ctx = outputImage.getContext('2d');
      ctx.drawImage(inputImage, outputX, outputY);
      resolve(outputImage);
    };

    // start loading our image
    inputImage.src = url;
  });
}

export const imgToSquare = async (img) => {
  const newImg = await crop(img, 1);

  // cconvert canvas to blob then to png
  const blob = await new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = newImg.width;
    canvas.height = newImg.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(newImg, 0, 0, newImg.width, newImg.height);
    canvas.toBlob(resolve, 'image/png');
  });

  // convert blob to png
  const png = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });

  return png;
};

export const copyToClipboard = (a) => {
  try {
    const copyText = document.createElement('input');
    copyText.setAttribute('value', a);

    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
    return true;
  } catch {
    return false;
  }
};
