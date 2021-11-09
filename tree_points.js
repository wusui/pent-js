const compPoints = (x, y) => x['row'] === y['row'] && x['col'] == y['col'];

const getNextPoints = point => getNeighbors(point).filter(isValidLocation);

const getNeighbors = point => [{row: point.row, col: point.col + 1},
  {row: point.row, col: point.col - 1}, {row: point.row + 1, col: point.col},
  {row: point.row - 1, col: point.col}];

const isValidLocation = point => point.col >= 0 && (point.row >= 0 ||
  point.col > 0);

exports.compPoints = compPoints;
exports.getNextPoints = getNextPoints;

