var boxIntersect1D = require('../box1d')

var red = [
  [0, 1],
  [0, 2],
  [10, 100],
  [5, 8],
  [1.5, 7]
]

var blue = [
 [0, 100],
 [1, 2], 
 [-1, 5]
]

boxIntersect1D.bipartite(red, blue, function(r, b) {
  console.log('overlap:', red[r], blue[b])
})