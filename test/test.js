'use strict'

var tape = require('tape')
var boxIntersect1D = require('../box1d')

function intervalOverlap(a, b) {
  return (a[0] <= b[1] && b[0] <= a[1]) && (a[0] <= a[1]) && (b[0] <= b[1])
}

function compareIntervals(a,b){
  var d = a[0]-b[0]
  if(d) { 
    return d
  }
  return a[1]-b[1]
}

function canonicalizeIntervals(intervals) {
  var r = intervals.map(function(x) {
    return [Math.min(x[0],x[1]), Math.max(x[0], x[1])]
  })
  r.sort(compareIntervals)
  return r
}

function bruteForceIntersect(boxes) {
  var result = []
  for(var i=0; i<boxes.length; ++i) {
    for(var j=0; j<i; ++j) {
      if(intervalOverlap(boxes[i], boxes[j])) {
        result.push([j,i])
      }
    }
  }
  return canonicalizeIntervals(result)
}

function algorithmicIntersect(boxes) {
  var result = []
  boxIntersect1D.full(boxes, function(i,j) {
    result.push([i,j])
  })
  return canonicalizeIntervals(result)
}

function bruteForceRBIntersect(red, blue) {
  var result = []
  for(var i=0; i<red.length; ++i) {
    for(var j=0; j<blue.length; ++j) {
      if(intervalOverlap(red[i], blue[j])) {
        result.push([i,j])
      }
    }
  }
  result.sort(compareIntervals)
  return result
}

function algorithmicRBIntersect(red, blue) {
  var result = []
  boxIntersect1D.bipartite(red, blue, function(i,j) {
    result.push([i,j])
  })
  result.sort(compareIntervals)
  return result
}

tape('box-intersect-1d', function(t) {

  function full(boxes) {
    t.same(algorithmicIntersect(boxes), bruteForceIntersect(boxes))
  }

  function bipartite(red, blue) {
    t.same(algorithmicRBIntersect(red, blue), bruteForceRBIntersect(red, blue))
  }

  full([
      [0,0],
      [1,-1],
      [0,2],
      [1,2],
      [2,3],
      [2,2],
      [-10, 10]
    ])

  bipartite([
      [0,0],
      [1,-1],
      [0,2],
      [1,2],
      [2,3],
      [2,2],
      [-10, 10]
    ],
    [ [0,0],
      [1,1],
      [2,2],
      [-1, 3] ])

  for(var i=0; i<10; ++i) {
    var red = []
    var blue = []
    for(var j=0; j<1000; ++j) {
      red.push([Math.random(), Math.random()])
      blue.push([Math.random(), Math.random()])
    }
    full(red)
    full(blue)
    bipartite(red, blue)
    bipartite(red, red)
    bipartite(blue, blue)
  }

  t.end()
})