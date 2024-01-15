"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseMq = exports.isWithinTheWidthAndHeight = exports.isValidMq = exports.isUnistylesMq = exports.getKeyForUnistylesMediaQuery = void 0;
const IS_UNISTYLES_REGEX = /:([hw])\[(\d+)(?:,\s*(\d+|Infinity))?]/;
const UNISTYLES_WIDTH_REGEX = /:(w)\[(\d+)(?:,\s*(\d+|Infinity))?]/;
const UNISTYLES_HEIGHT_REGEX = /:(h)\[(\d+)(?:,\s*(\d+|Infinity))?]/;
const parseMq = mq => {
  const [, width, fromW, toW] = UNISTYLES_WIDTH_REGEX.exec(mq) || [];
  const [, height, fromH, toH] = UNISTYLES_HEIGHT_REGEX.exec(mq) || [];
  return {
    width: width ? {
      from: Number(fromW),
      to: Number(toW)
    } : undefined,
    height: height ? {
      from: Number(fromH),
      to: Number(toH)
    } : undefined
  };
};
exports.parseMq = parseMq;
const isUnistylesMq = mq => IS_UNISTYLES_REGEX.test(mq);
exports.isUnistylesMq = isUnistylesMq;
const isValidMq = parsedMq => {
  const {
    width,
    height
  } = parsedMq;
  if (width && height) {
    return width.from <= width.to && height.from <= height.to;
  }
  if (width) {
    return width.from <= width.to;
  }
  if (height) {
    return height.from <= height.to;
  }
  return false;
};
exports.isValidMq = isValidMq;
const isWithinTheWidthAndHeight = (parsedMq, screenSize) => {
  const {
    width,
    height
  } = parsedMq;
  if (width && height) {
    return isWithinTheWidth(width, screenSize.width) && isWithinTheHeight(height, screenSize.height);
  }
  if (width) {
    return isWithinTheWidth(width, screenSize.width);
  }
  if (height) {
    return isWithinTheHeight(height, screenSize.height);
  }
  return false;
};
exports.isWithinTheWidthAndHeight = isWithinTheWidthAndHeight;
const isWithinTheWidth = (width, screenWidth) => {
  const {
    from,
    to
  } = width;
  return screenWidth >= from && screenWidth <= to;
};
const isWithinTheHeight = (height, screenHeight) => {
  const {
    from,
    to
  } = height;
  return screenHeight >= from && screenHeight <= to;
};
const getKeyForUnistylesMediaQuery = (mediaQueries, screenSize) => {
  const mq = mediaQueries.find(([key]) => {
    if (!isUnistylesMq(key)) {
      return false;
    }
    const parsedMq = parseMq(key);
    if (!isValidMq(parsedMq)) {
      return false;
    }
    return isWithinTheWidthAndHeight(parsedMq, screenSize);
  });
  return mq?.at(0);
};
exports.getKeyForUnistylesMediaQuery = getKeyForUnistylesMediaQuery;
//# sourceMappingURL=mqParser.js.map