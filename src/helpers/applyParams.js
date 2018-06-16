function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getParamValue(value, defaultValue) {
  return value !== undefined ? value : defaultValue;
}

export default function applyParams(params) {
  Object.keys(this.defaults)
    .forEach((param) => {
      const value = getParamValue(params[param], this.defaults[param]);
      const setParamMethodName = `set${capitalize(param)}`;
      this::this[setParamMethodName](value);
    });
}
