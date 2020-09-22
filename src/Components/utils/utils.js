const isEmpty = (item) => {
  if (item === Object(item)) {
    return Object.keys(item).length === 0;
  }
  if (typeof item === "string") {
    return item ? item.trim().length === 0 : true;
  }
  if (typeof item === "number") {
    return false;
  }
  return item ? item.length === 0 : true;
};

export { isEmpty };
