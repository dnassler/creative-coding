
var PositionMgr = function(p, attr) {

  var _self = this;

  var _gridRows;
  var maxRows, maxCols;
  var cellWidth, cellHeight;
  var cellGutter;

  var _init = function() {

    attr = attr || {};

    var maxWidth = attr.maxWidth || p.width;
    var maxHeight = attr.maxHeight || p.height;
    if ( maxWidth >= maxHeight ) {
      // cellWidth = cellHeight;
      if ( !attr.maxCols && !attr.cellWidth ) {
        maxCols = 10;
      } else {
        maxCols = attr.maxCols || p.floor(maxWidth / attr.cellWidth);
      }
      cellWidth = maxWidth / maxCols;
      cellHeight = cellWidth;
      maxRows = attr.maxRows || p.floor(maxHeight / cellHeight);
    } else {
      // cellHeight = cellWidth;
      if ( !attr.maxRows && !attr.cellHeight ) {
        maxRows = 10;
      } else {
        maxRows = attr.maxRows || p.floor(maxHeight / attr.cellHeight);
      }
      cellHeight = maxHeight / maxRows;
      cellWidth = cellHeight;
      maxRols = attr.maxCols || p.floor(maxWidth / cellWidth);
    }

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
  };
  _init();

  this.getGridWidth = function() {
    return maxCols * cellWidth;
  };

  this.translateToThingPos = function( thing ) {
    p.translate( (p.width - maxCols*cellWidth )/2, (p.height - maxRows*cellWidth)/2);
    var gridPoint = thing.getGridPoint();
    p.translate(gridPoint.col * cellWidth, gridPoint.row * cellHeight);
  };

  this.reservePos = function( pos, thing ) {
    //var pos = thing.getGridPoint();
    _gridRows[pos.row][pos.col] = thing;
  };

  this.clearReservedPos = function( pos ) {
    _gridRows[pos.row][pos.col] = undefined;
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
