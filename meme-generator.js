/* code base by https://codepen.io/dcode-software/pen/OJgJdQw ----------------------------------------*/

let topTextInput, bottomTextInput, topTextSizeInput, bottomTextSizeInput, imageInput, generateBtn, canvas, ctx, sourceMeme;

topTextInput = document.getElementById('top-text');
bottomTextInput = document.getElementById('bottom-text');
topTextSizeInput = document.getElementById('top-text-size-input');
bottomTextSizeInput = document.getElementById('bottom-text-size-input');
imageInput = document.getElementById('image-input');
generateBtn = document.getElementById('generate-btn');
canvas = document.getElementById('meme-canvas');
ctx = canvas.getContext('2d');
canvas.width = canvas.height = 0;
topTextInput.value = "top text"
bottomTextInput.value = 'bottom text';

imageInput.addEventListener("change", (e) => {
  const imageDataUrl = URL.createObjectURL(e.target.files[0]);

  sourceMeme = new Image();
  sourceMeme.src = imageDataUrl;

  sourceMeme.addEventListener(
    "load",
    () => {
      updateMemeCanvas(canvas, sourceMeme, topTextInput.value, bottomTextInput.value, topTextSizeInput.value, bottomTextSizeInput.value,
      );
    },
    { once: true }
  );
});

topTextInput.addEventListener("change", () => {
    updateMemeCanvas(canvas, sourceMeme, topTextInput.value, bottomTextInput.value, topTextSizeInput.value, bottomTextSizeInput.value);
});

topTextSizeInput.addEventListener("change", () => {
    updateMemeCanvas(canvas, sourceMeme, topTextInput.value, bottomTextInput.value, topTextSizeInput.value, bottomTextSizeInput.value);
});

bottomTextInput.addEventListener("change", () => {
    updateMemeCanvas(canvas, sourceMeme, topTextInput.value, bottomTextInput.value, topTextSizeInput.value, bottomTextSizeInput.value);
});

bottomTextSizeInput.addEventListener("change", () => {
    updateMemeCanvas(canvas, sourceMeme, topTextInput.value, bottomTextInput.value, topTextSizeInput.value, bottomTextSizeInput.value);
});
/* ---------------------------------------- */

/* code base by https://github.com/GeekLaunch/meme-generator/blob/master/meme-generator.js ----------------------------------------*/
function updateMemeCanvas(canvas, img, topText, bottomText, topTextSize, bottomTextSize) {

  if(document.getElementById("canvasText")){ //removes the canvas text instructions because they are no longer needed
    let canvasText = document.getElementById("canvasText");
    canvasText.parentNode. removeChild(canvasText);
  }
 
  let fontSize;

    // Size canvas to image
    canvas.width = img.width;
    canvas.height = img.height;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw main image
    ctx.drawImage(img, 0, 0);

    // Text style: white with black borders
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.textAlign = 'center';
    ctx.lineJoin = "round"; //makes text outline look connected and smooth

    // Top text font size
    fontSize = canvas.width * topTextSize;
    ctx.font = fontSize + 'px Impact';
    ctx.lineWidth = fontSize / 20;

    // Draw top text
    ctx.textBaseline = 'top';
    topText.split('\n').forEach(function (t, i) {
        ctx.fillText(t, canvas.width / 2, i * fontSize, canvas.width);
        ctx.strokeText(t, canvas.width / 2, i * fontSize, canvas.width);
    });

    // Bottom text font size
    fontSize = canvas.width * bottomTextSize;
    ctx.font = fontSize + 'px Impact';
    ctx.lineWidth = fontSize / 20;

    // Draw bottom text
    ctx.textBaseline = 'bottom';
    bottomText.split('\n').reverse().forEach(function (t, i) { // .reverse() because it's drawing the bottom text from the bottom up
        ctx.fillText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
        ctx.strokeText(t, canvas.width / 2, canvas.height - i * fontSize, canvas.width);
    });
} /* ---------------------------------------- */

/* displays all preset images in the grid in card 3 */
var arr = ["sadface.jpg", "hackerman.jpg", "scaredcross.jpeg", "seagulldies.png", "wtf.jpeg", "stonks.png", "thisisfine.jpg", "doggo.jpg", "blankisblank.png", "depresun.jpeg", "cheems.jpg", "sadcat.png", "wat.png", "wojack.png", "pikachu.png", "spiderman.png", "bonk.png"];//future idea: loop through images folder to automatically add presets to the list (can only do with a node thing?)
var template = document.querySelector("template");
for (var i = 0; i < arr.length; i++){
    var meme = "./images/" + arr[i];
    var clone = template.content.cloneNode(true);
    var image = clone.querySelector("img");
    image.src = meme;
    template.parentNode.appendChild(clone);
}

/* loads the preset onto the canvas (onclick function) */
function presetMeme(source){
    let img = new Image;
    img.src = source;
    sourceMeme = img;
    sourceMeme.onload = function () {
        updateMemeCanvas(canvas, sourceMeme, topTextInput.value, bottomTextInput.value, topTextSizeInput.value, bottomTextSizeInput.value);
    };
}

/* download button functionality */
/* code base by https://instructobit.com/tutorial/109/Downloading-and-saving-an-HTML-canvas-as-an-image-using-Javascript ----------------------------------------*/
var d = document.getElementById("download");
d.addEventListener("click",function(){
    var image = canvas.toDataURL("image/png")
    var tmpLink = document.createElement( 'a' );  
    tmpLink.download = 'meme.png'; // set the name of the download file 
    tmpLink.href = image;  
  
    // temporarily add link to body and initiate the download  
    document.body.appendChild( tmpLink );  
    tmpLink.click();  
    document.body.removeChild( tmpLink );  
})
/* ---------------------------------------- */