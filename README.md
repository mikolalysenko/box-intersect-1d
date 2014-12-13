box-intersect-1d
================
Find all intersections in a collection of intervals.

# Example

### Full intersection

Here is how you can use this module to detect all intersections in a collection of intervals:

```javascript
var boxIntersect1D = require('box-intersect-1d')

var boxes = [
  [0, 1],
  [0, 2],
  [10, 100],
  [5, 8],
  [1.5, 7]
]

boxIntersect1D.full(boxes, function(i,j) {
  console.log(i,j)
  console.log('overlap:', boxes[i], boxes[j])
})
```

#### Output

```
overlap: [ 0, 1 ] [ 0, 2 ]
overlap: [ 1.5, 7 ] [ 0, 2 ]
overlap: [ 5, 8 ] [ 1.5, 7 ]
```

### Red-blue intersection

If you want to compare intersections between two different sets of intervals you can use the `.bipartite` version of the test:

```javascript
var boxIntersect1D = require('box-intersect-1d')

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
```

#### Output

```
overlap: [ 0, 2 ] [ -1, 5 ]
overlap: [ 0, 2 ] [ 0, 100 ]
overlap: [ 0, 1 ] [ -1, 5 ]
overlap: [ 0, 1 ] [ 0, 100 ]
overlap: [ 0, 2 ] [ 1, 2 ]
overlap: [ 0, 1 ] [ 1, 2 ]
overlap: [ 1.5, 7 ] [ -1, 5 ]
overlap: [ 1.5, 7 ] [ 0, 100 ]
overlap: [ 1.5, 7 ] [ 1, 2 ]
overlap: [ 5, 8 ] [ -1, 5 ]
overlap: [ 5, 8 ] [ 0, 100 ]
overlap: [ 10, 100 ] [ 0, 100 ]
```

# Install

```sh
npm install box-intersect-1d
```

# API

```javascript
var boxIntersect1D = require('box-intersect-1d')
```

#### `boxIntersect1D.full(boxes, visit)`
Find all pairs of boxes which intersect

* `boxes` is an array of intervals represented by `[lo,hi]` value pairs
* `visit(i,j)` is called for every pair over overlapping intervals with the index of the intervals.  If `visit` returns any value other than `undefined`, then this terminates early with that value.

#### `boxIntersect1D.bipartite(red, blue, visit)`
Find all intersections between two sets of intervals

* `red` and `blue` are two collections of intervals as described above
* `visit(r,b)` is called once for every pair of intervals in `red` and `blue` which overlap.  `r` and `b` are the indices of the overlapping boxes.

# Credits

(c) 2014 Mikola Lysenko. MIT License