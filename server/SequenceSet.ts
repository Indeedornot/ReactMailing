export type SequenceSet = { from: number | "*"; to: number | "*" };

/**
 *  all possible cases
 *  1. from: 1, to: 5  (from first email to 5th email)
 *
 *  2. from: 1, to: -1 (from first email to last email)
 *  3. from: 1, to: -5 (from first email to 5th last email)
 *
 *  4. from: -5, to: -1 (from 5th latest email to latest email)
 *  5. from: -5, to: -3 (from 5th latest email to 3rd latest)
 *
 *  6. from: -5, to: 5 (from 5th latest email to 5th email)
 *  7. from: -5, to: 3 (from 5th latest email to 3rd email)
 *
 *  8. from: 5, to: 3 (from 5th email to 3rd email)
 *  9. from  5, to: 1 (from 5th email to first email)
 *
 *  10. from  * to: 1 (from latest email to first email)
 *  11. from: 5 to: * (from 5th email to latest email)
 *
 *  12. from * to: -1 (first and second email from latest)
 *  13. from * to: -5 (5 emails from latest)
 *
 *  14. from -5 to: * (from 5th latest email to latest email)
 *  15. from -3 to: * (from 3rd latest email to latest email)
 */
//handles *:*, 1:1, -1:-1

export const expandSequenceSet = (
  sequenceSet: SequenceSet,
  maxValue: number
) => {
  const { from, to } = sequenceSet;

  if (from == "*" && to == "*") {
    return `${maxValue}`;
  }

  if (from == "*" || to == "*") {
    const notStar = (from == "*" ? to : from) as number;

    if (notStar > 0) {
      return `${notStar}:${maxValue}`;
    }

    return `${maxValue + notStar}:${maxValue}`;
  }

  //1:1, -1:-1, 0:0
  if (from == to) {
    if (from < 0) {
      return `${maxValue + from}`;
    }

    return `${from}`;
  }

  //1:1, -1:-1
  if (from * to > 0) {
    const min = Math.min(from, to);
    const max = Math.max(from, to);

    if (min < 0) {
      return `${maxValue + min}:${maxValue + max}`;
    }

    return `${min}:${max}`;
  }

  //1:-1, -1:1
  if (from * to < 0) {
    const min = Math.min(from, to); //min is always negative
    const max = Math.max(from, to); //max is always positive

    if (maxValue + min == max) {
      return `${max}`;
    }

    return `${max}:${maxValue + min}`;
  }

  //0:1, 0:-1
  if (from * to == 0) {
    const notZero = from == 0 ? to : from;

    if (notZero > 0) {
      return `0:${notZero}`;
    }

    return `0:${maxValue + notZero}`;
  }
};
