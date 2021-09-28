// TBH, this was really just to practice closures. But a counter
// is genuinely useful.

const counter = () => {
  let count = 0;
  return function () {
    if (count < 12) {
      count++;
    } else {
      count = 1;
    }
    return count;
  }
}

module.exports.counter = counter;