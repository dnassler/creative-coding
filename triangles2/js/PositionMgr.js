// import {p} from './main.js';

var PositionMgr = function(p, attr) {

  var _self = this;

  var Directions = {UP: 1, DOWN: 2, LEFT: 3, RIGHT: 4};
  this.Directions = Directions;

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

  // thing: may be a Thing instance or else must be a position Object
  // with row and col keys
  this.getAdjacentFreeDirections = function( gridPoint ) {
    if ( !_self.isAnyPositionFree() ) {
      return null;
    }
    var freeAdjacentDirections = [];
    var row;
    if ( gridPoint.row - 1 > 0 ) {
      row = _gridRows[ gridPoint.row -1 ];
      if ( !row[gridPoint.col] ) {
        freeAdjacentDirections.push(Directions.UP);
      }
    }
    if ( gridPoint.row + 1 < maxRows ) {
      row = _gridRows[ gridPoint.row +1 ];
      if ( !row[gridPoint.col] ) {
        freeAdjacentDirections.push(Directions.DOWN);
      }
    }
    if ( gridPoint.col - 1 > 0 ) {
      row = _gridRows[gridPoint.row];
      if ( !row[gridPoint.col -1] ) {
        freeAdjacentDirections.push(Directions.LEFT);
      }
    }
    if ( gridPoint.col + 1 < maxCols ) {
      row = _gridRows[gridPoint.row];
      if ( !row[gridPoint.col +1] ) {
        freeAdjacentDirections.push(Directions.RIGHT);
      }
    }
    if ( freeAdjacentDirections.length > 0 ) {
      return freeAdjacentDirections;
    }
    return null;
  };

  this.getGridPointPlusDirection = function( gridPoint, direction ) {
    var newGridPoint = {row:gridPoint.row, col:gridPoint.col};
    if ( direction === Directions.UP ) {
      newGridPoint.row -= 1;
    } else if ( direction === Directions.DOWN ) {
      newGridPoint.row += 1;
    } else if ( direction === Directions.LEFT ) {
      newGridPoint.col -= 1;
    } else if ( direction === Directions.RIGHT ) {
      newGridPoint.col += 1;
    }
    if ( newGridPoint.row < 0 || newGridPoint.row >= maxRows
      || newGridPoint.col < 0 || newGridPoint.col >= maxCols ) {
        return null;
    }
    return newGridPoint;
  };

  this.getGridPointsNearbyPerpendicularToDirection = function( gridPoint, direction ) {
    var pointsFreeArr = [];
    var testPoint;
    if ( direction === Directions.UP || direction === Directions.DOWN ) {
      testPoint = {row:gridPoint.row, col:gridPoint.col};
      while ( testPoint.col > 0 ) {
        testPoint.col -= 1;
        if ( !_self.isPosFree( testPoint ) ) {
          break;
        }
        pointsFreeArr.push( {row:testPoint.row, col:testPoint.col} );
      }
      testPoint = {row:gridPoint.row, col:gridPoint.col};
      while ( testPoint.col < maxCols-1 ) {
        testPoint.col += 1;
        if ( !_self.isPosFree( testPoint ) ) {
          break;
        }
        pointsFreeArr.push( {row:testPoint.row, col:testPoint.col} );
      }
    } else {
      testPoint = {row:gridPoint.row, col:gridPoint.col};
      while ( testPoint.row > 0 ) {
        testPoint.row -= 1;
        if ( !_self.isPosFree( testPoint ) ) {
          break;
        }
        pointsFreeArr.push( {row:testPoint.row, col:testPoint.col} );
      }
      testPoint = {row:gridPoint.row, col:gridPoint.col};
      while ( testPoint.row < maxRows-1 ) {
        testPoint.row += 1;
        if ( !_self.isPosFree( testPoint ) ) {
          break;
        }
        pointsFreeArr.push( {row:testPoint.row, col:testPoint.col} );
      }
    }
    return pointsFreeArr;
  };

  this.getOtherThingsToMoveInSpecifiedDirection = function( gridPoint, direction, thingsArr ) {
    var otherThingsArr;
    if ( direction === Directions.UP ) {
      otherThingsArr = _self.getThingsBelow( gridPoint, thingsArr );
    } else if ( direction === Directions.DOWN ) {
      otherThingsArr = _self.getThingsAbove( gridPoint, thingsArr );
    } else if ( direction === Directions.LEFT ) {
      otherThingsArr = _self.getThingsRight( gridPoint, thingsArr );
    } else if ( direction === Directions.RIGHT ) {
      otherThingsArr = _self.getThingsLeft( gridPoint, thingsArr );
    }
    return otherThingsArr;
  };

  this.getThingsAbove = function( gridPoint, thingsArr ){
    var tArr = thingsArr.filter( function(tItem){
      var tItemPoint = tItem.getGridPoint();
      return (tItemPoint.col === gridPoint.col && tItemPoint.row < gridPoint.row);
    });
    return tArr;
  };
  this.getThingsBelow = function( gridPoint, thingsArr ){
    var tArr = thingsArr.filter( function(tItem){
      var tItemPoint = tItem.getGridPoint();
      return (tItemPoint.col === gridPoint.col && tItemPoint.row > gridPoint.row);
    });
    return tArr;
  };
  this.getThingsLeft = function( gridPoint, thingsArr ){
    var tArr = thingsArr.filter( function(tItem){
      var tItemPoint = tItem.getGridPoint();
      return (tItemPoint.row === gridPoint.row && tItemPoint.col < gridPoint.col);
    });
    return tArr;
  };
  this.getThingsRight = function( gridPoint, thingsArr ){
    var tArr = thingsArr.filter( function(tItem){
      var tItemPoint = tItem.getGridPoint();
      return (tItemPoint.row === gridPoint.row && tItemPoint.col > gridPoint.col);
    });
    return tArr;
  };


  this.isAnyPositionFree = function() {
    return ((maxCols * maxRows) > _numReserved);
  };

  this.isPosFree = function( pos ) {
    var row = _gridRows[ pos.row ];
    var gridElement = row[ pos.col ];
    return !gridElement;
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
