var boxIntersect1D = require('../box1d')

var boxes = [
  [0, 1],
  [0, 2],
  [10, 100],
  [5, 8],
  [1.5, 7]
]

boxIntersect1D.full(boxes, function(i,j) {
  console.log('overlap:', boxes[i], boxes[j])
})