function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getParamValue(value, defaultValue) {
  return value !== undefined ? value : defaultValue;
}

function getSetParamMethodName(param) {
  return `set${capitalize(param)}`;
}

export default function applyParams(params) {
  Object.keys(this.defaults)
    .forEach((param) => {
      const value = getParamValue(params[param], this.defaults[param]);
      const setParamMethodName = getSetParamMethodName(param);
      this::this[setParamMethodName](value);
    });
}
