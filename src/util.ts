const data = require("../data.json");

function generateInterface(
  obj: Record<string, any>,
  interfaceName = "",
  options?: {
    isRoot?: boolean;
    optional?: boolean; // 是否可选
    deep?: boolean; // 是否深层递归对象
  }
) {
  const { optional = false, deep = false, isRoot = false } = options ?? {};

  let result;
  if (isRoot) {
    result = `interface ${interfaceName} {\n`;
  } else {
    result = `{\n`;
  }

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      let type: any = typeof value;

      if (Array.isArray(value)) {
        type = `${typeof value[0]}[]`;
      } else if (value === null) {
        type = "null";
      } else if (type === "object" && value !== null) {
        if (deep) {
          type = generateInterface(value, key, { ...options, isRoot: false });
        } else {
          type = "any";
        }
      } else if (type === "boolean") {
        type = "boolean";
      } else if (type === "number") {
        type = "number";
      } else if (type === "string") {
        type = "string";
      }

      if (key.includes("order")) {
        type = `'asc' | 'desc'`;
      }

      if (optional) {
        result += `  ${key}?: ${type};\n`;
      } else {
        result += `  ${key}: ${type};\n`;
      }
    }
  }

  result += `}`;
  return result;
}

const tsInterface = generateInterface(data, undefined, {
  isRoot: true,
  deep: true,
  optional: true,
});
console.log(tsInterface);

module.exports = generateInterface;
