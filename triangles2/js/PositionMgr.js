
var PositionMgr = function(p, attr) {

  var _self = this;

  var _numReserved;
  var _gridRows;
  var maxRows, maxCols;
  var cellWidth, cellHeight;
  var cellGutter;

  var _scale;
  this.setScale = function( scale ) {
    _scale = scale;
  };

  var _init = function() {

    _scale = 1;

    attr = attr || {};

    // if ( attr.cellWidth ) {
    //   attr.cellHeight = attr.cellWidth;
    // } else if ( attr.cellHeight ) {
    //   attr.cellWidth = attr.cellHeight;
    // }

    var maxWidth = attr.maxWidth
      || (attr.maxWidthFraction ? attr.maxWidthFraction * p.width : undefined)
      || p.width;
    // if ( attr.cellWidth && maxWidth < attr.cellWidth ) {
    //   maxWidth = attr.cellWidth;
    // }
    var maxHeight = attr.maxHeight
      || (attr.maxHeightFraction ? attr.maxHeightFraction * p.height : undefined)
      || p.height;
    // if ( attr.cellHeight && maxHeight < attr.cellHeight ) {
    //   maxHeight = attr.cellHeight;
    // }

    if ( attr.maxCols > attr.maxRows ) {
      maxCols = attr.maxCols;
      cellWidth = p.floor(maxWidth / attr.maxCols);
      cellHeight = cellWidth;
      if ( cellHeight * attr.maxRows > maxHeight ) {
        // truncate rows that will not fit withing the height restriction
        maxRows = p.max(1, p.floor(maxHeight / cellHeight));
      } else {
        maxRows = attr.maxRows;
      }
    } else {
      maxRows = attr.maxRows;
      cellHeight = p.floor(maxHeight / attr.maxRows);
      cellWidth = cellHeight;
      if ( cellWidth * attr.maxCols > maxWidth ) {
        // truncate cols that will not fit withing the width restriction
        maxCols = p.max(1, p.floor(maxWidth / cellWidth));
      } else {
        maxCols = attr.maxCols;
      }
    }

    // if ( maxWidth >= maxHeight ) {
    //   // cellWidth = cellHeight;
    //   if ( !attr.maxCols && !attr.cellWidth ) {
    //     maxCols = 10;
    //   } else {
    //     maxCols = attr.maxCols || p.floor(maxWidth / attr.cellWidth);
    //     if ( maxCols < 1 ) {
    //       maxCols = 1;
    //     }
    //   }
    //   cellWidth = p.floor(maxWidth / maxCols);
    //   cellHeight = cellWidth;
    //   maxRows = attr.maxRows || p.floor(maxHeight / cellHeight);
    //   if ( maxRows < 1 ) {
    //     maxRows = 1;
    //   }
    // } else {
    //   // cellHeight = cellWidth;
    //   if ( !attr.maxRows && !attr.cellHeight ) {
    //     maxRows = 10;
    //   } else {
    //     maxRows = attr.maxRows || p.floor(maxHeight / attr.cellHeight);
    //     if ( maxRows < 1 ) {
    //       maxRows = 1;
    //     }
    //   }
    //   cellHeight = p.floor(maxHeight / maxRows);
    //   cellWidth = cellHeight;
    //   maxCols = attr.maxCols || p.floor(maxWidth / cellWidth);
    //   if ( maxCols < 1 ) {
    //     maxCols = 1;
    //   }
    // }

    cellGutter = attr.cellGutter || 0;

    _self.cellWidthMinusGutter = cellWidth - cellGutter;
    _self.cellHeightMinusGutter = cellHeight - cellGutter;
    _self.cellWidth = cellWidth;
    _self.cellHeight = cellHeight;

    _gridRows = [];
    var i;
    for ( i=0; i<maxRows; i++ ) {
      _gridRows.push( [] );
    }

    _numReserved = 0;
  };
  _init();

  this.getGridWidth = function() {
    return maxCols * cellWidth;
  };

  this.getGridHeight = function() {
    return maxRows * cellHeight;
  };

  this.getNumCells = function() {
    return maxRows * maxCols;
  };

  this.translateToGridPos = function() {
    p.translate( p.width/2, p.height/2 );
    p.scale( _scale );
    p.translate( -maxCols * cellWidth / 2, -maxRows * cellWidth / 2 );
  };

  this.translateToThingPos = function( thing ) {
    // p.translate( (p.width - maxCols*cellWidth )/2, (p.height - maxRows*cellWidth)/2);
    var gridPoint = thing.getGridPoint();
    p.translate(gridPoint.col * cellWidth, gridPoint.row * cellHeight);
  };

  this.reservePos = function( pos, thing ) {
    //var pos = thing.getGridPoint();
    _gridRows[pos.row][pos.col] = thing;
    _numReserved += 1;
  };

  this.clearReservedPos = function( pos ) {
    _gridRows[pos.row][pos.col] = undefined;
    _numReserved -= 1;
  }

  this.clearAllReservedPos = function() {
    var i;
    for ( i=0; i<maxRows; i++ ) {
      _gridRows.push( [] );
    }
  };

  this.reset = function(attrReset) {
    attr = attrReset;
    _init();
  };

  this.isAnyPositionFree = function() {
    return ((maxCols * maxRows) > _numReserved);
  };

  // accepts input col and row as a starting point
  this.getFreePosition = function( i, j ) {
    var r;
    var limitToColumn = false;
    var limitToRow = false;
    if ( i && j ) {
      r = j * maxCols + i;
    } else if ( i ) {
      limitToColumn = true;
      r = p.floor(p.random(maxRows)) * maxCols + i;
    } else if ( j ) {
      limitToRow = true;
      r = j * maxCols + p.floor(p.random(maxCols));
    } else {
      r = p.floor(p.random(maxRows*maxCols));
    }
    var roffset = 0;
    var maxIndex = maxRows * maxCols;
    var maxOffset = maxIndex;
    while ( roffset < maxOffset ) {
      var rIndex = (r + roffset) % maxIndex;
      var rowIndex = p.floor(rIndex / maxCols);
      var colIndex = rIndex % maxCols;
      var row = _gridRows[ rowIndex ];
      var gridElement = row[colIndex];
      if ( !gridElement ) {
        var pos = {row:rowIndex, col:colIndex};
        return pos;
      // } else if ( gridElement.isWaitingBeforeMoveStart() ) {
      //   var freeAngleAtPos = gridElement.getStationaryAngle() + p.PI;
      //   var pos = {row:rowIndex, col:colIndex, freeAngleAtPos: freeAngleAtPos};
      //   return pos;
      }
      if ( limitToColumn ) {
        // check next row since input specified column
        roffset += maxCols;
      } else if ( limitToRow ) {
        roffset += 1;
        if ( p.floor((r + roffset) / maxCols) > j ) {
          // fell off the end of the row
          roffset += (maxOffset - (r % maxCols));
        }
      } else {
        roffset += 1;
      }
    }
    return null;
  };

};

export default PositionMgr;
