export function formatNumber(num: number) {
  if (num >= 1e9) {
    // Greater than or equal to 1 billion
    return (num / 1e9).toFixed(1) + "B";
  } else if (num >= 1e6) {
    // Greater than or equal to 1 million
    return (num / 1e6).toFixed(1) + "M";
  } else if (num >= 1e3) {
    // Greater than or equal to 1 thousand
    return (num / 1e3).toFixed(1) + "K";
  } else {
    return num.toString();
  }
}


export function shortenString(str: string, startLength = 4, endLength = 5) {
  if (str.length <= startLength + endLength) {
      return str;
  }

  const start = str.substring(0, startLength);
  const end = str.substring(str.length - endLength);
  return `${start}...${end}`;
}