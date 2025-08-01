/**
 * Stub per il candidate:
 * Implement the functions required.
 * You can add comments to explain your code.
 * Do not modify the lines after the comment "DO NOT modify the following lines after this comment".
 **/

module.exports.isEven = function isEven(num) {
  // Return true if the number is even, false otherwise
  if (num === undefined || num === null) {
    throw new TypeError('Input cannot be null or undefined');
  }
  if (typeof num !== 'number') {
    throw new TypeError('Input must be a number');
  }

  return num % 2 === 0;
}

/* *********
  *
  *  DO NOT modify the following lines after this comment, otherwise the tests will fail.
  *  If you need to add code, do it before this comment.
  *  If you need to remove code, do it before this comment.
  *  If you need to change code, do it before this comment.
  *  If you need to add comments, do it before this comment.
  *  If you need to change comments, do it before this comment.
  *
********* */

