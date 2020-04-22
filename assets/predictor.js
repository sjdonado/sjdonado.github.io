var model;

//get the best bounding box by finding the top left and bottom right cornders    
function getMinBox(coords) {
  var coorX = coords.map((p) => p.x);
  var coorY = coords.map((p) => p.y);
  //find top left corner 
  var min_coords = {
   x : Math.min.apply(null, coorX),
   y : Math.min.apply(null, coorY)
  }
  //find right bottom corner 
  var max_coords = {
   x : Math.max.apply(null, coorX),
   y : Math.max.apply(null, coorY)
  }
  return {
   min : min_coords,
   max : max_coords
  }
}

const preprocess = (image) => {
  let tensor = tf.browser.fromPixels(image)
    .resizeNearestNeighbor([28, 28])
    .mean(2)
    .expandDims(2)
    .expandDims()
    .toFloat();

  return tensor.div(255.0);
}

function predict(image) {
  if (window.model) {
    const scores = window.model.predict(preprocess(image)).dataSync();
    predicted = scores.indexOf(Math.max(...scores));
    console.log('predicted: ', predicted);
  }
}

(async () => {
  window.model = await tf.loadLayersModel('model/model.json');
  console.log('model loaded!');
})()