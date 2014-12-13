'use strict'

exports.full      = fullIntersect1D
exports.bipartite = redBlueIntersect1D

function compareEvent(a,b) {
  var d = a[0] - b[0]
  if(d) {
    return d
  }
  return b[1] - a[1]
}

function fullIntersect1D(boxes, visit) {
  var n = boxes.length
  var events = []
  for(var i=0; i<n; ++i) {
    var b = boxes[i]
    if(b[0] <= b[1]) {
      events.push([ b[0], i ],
                  [ b[1], -(i+1) ])
    }
  }
  events.sort(compareEvent)
  var active = []
  for(var i=0, ne=events.length; i<ne; ++i) {
    var e = events[i][1]
    if(e >= 0) {
      for(var j=0, na=active.length; j<na; ++j) {
        var r = visit(e, active[j])
        if(typeof r !== 'undefined') {
          return r
        }
      }
      active.push(e)
    } else {
      e = -e-1
      for(var j=0, na=active.length; j<na; ++j) {
        if(active[j] === e) {
          active[j] = active[na-1]
          active.pop()
          break
        }
      }
    }
  }
}

function redBlueIntersect1D(red, blue, visit) {
  var n = red.length
  var m = blue.length
  var events = []
  for(var i=0; i<n; ++i) {
    var b = red[i]
    if(b[0] <= b[1]) {
      events.push([ b[0], i ],
                  [ b[1], -(i+1) ])
    }
  }
  for(var i=0; i<m; ++i) {
    var b = blue[i]
    if(b[0] <= b[1]) {
      events.push([ b[0], (i+n) ],
                  [ b[1], -(i+n+1) ])
    }
  }
  events.sort(compareEvent)
  var redActive = []
  var blueActive = []
  for(var i=0, ne=events.length; i<ne; ++i) {
    var e = events[i][1]
    if(e >= n) {
      e = e-n
      for(var j=0, nr=redActive.length; j<nr; ++j) {
        var r = visit(redActive[j], e)
        if(typeof r !== 'undefined') {
          return r
        }
      }
      blueActive.push(e)
    } else if(e >= 0) {
      for(var j=0, nb=blueActive.length; j<nb; ++j) {
        var r = visit(e, blueActive[j])
        if(typeof r !== 'undefined') {
          return r
        }
      }
      redActive.push(e)
    } else if(e < -n) {
      e = -e-n-1
      for(var j=0, nb=blueActive.length; j<nb; ++j) {
        if(blueActive[j] === e) {
          blueActive[j] = blueActive[nb-1]
          blueActive.pop()
          break
        }
      }
    } else {
      e = -e-1
      for(var j=0, nr=redActive.length; j<nr; ++j) {
        if(redActive[j] === e) {
          redActive[j] = redActive[nr-1]
          redActive.pop()
          break
        }
      }
    }
  }
}