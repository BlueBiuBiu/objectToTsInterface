var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
function generateInterface(obj, interfaceName, options) {
  if (interfaceName === void 0) {
    interfaceName = "";
  }
  var _a = options !== null && options !== void 0 ? options : {},
    _b = _a.optional,
    optional = _b === void 0 ? false : _b,
    _c = _a.deep,
    deep = _c === void 0 ? false : _c,
    _d = _a.isRoot,
    isRoot = _d === void 0 ? false : _d;
  var result;
  if (isRoot) {
    result = "interface ".concat(interfaceName, " {\n");
  } else {
    result = "{\n";
  }
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var value = obj[key];
      var type = typeof value;
      if (Array.isArray(value)) {
        type = "".concat(typeof value[0], "[]");
      } else if (value === null) {
        type = "null";
      } else if (type === "object" && value !== null) {
        if (deep) {
          type = generateInterface(
            value,
            key,
            __assign(__assign({}, options), { isRoot: false })
          );
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
        type = "'asc' | 'desc'";
      }
      if (optional) {
        result += "  ".concat(key, "?: ").concat(type, ";\n");
      } else {
        result += "  ".concat(key, ": ").concat(type, ";\n");
      }
    }
  }
  result += "}";
  return result;
}
