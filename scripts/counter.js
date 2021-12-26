// TBH, this was really just to practice closures. But a counter
// is genuinely useful.
// The idea is to create a random number corresponding to one of the first 
// 12 images in /public/images. (The 13th image is only used when a search
// returns no results.)

// Obviously, this is a terrible example of tightly-coupled, hard-coded JavaScript.
// But it does at least make the app cycle through the selection of background images.

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