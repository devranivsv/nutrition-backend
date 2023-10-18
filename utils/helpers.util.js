// Convert object to dot notation
function convertToDotNotation(obj, newObj = {}, prefix = "") {
  Object.keys(obj).forEach((key) => {
    if (!Array.isArray(obj[key]) && typeof obj[key] === "object" && !("$cond" in obj[key])) {
      convertToDotNotation(obj[key], newObj, `${prefix + key}.`);
    } else {
      newObj[prefix + key] = obj[key];
    }
  });

  return newObj;
}

module.exports = {
  convertToDotNotation,
};
