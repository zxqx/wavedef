function getParamValue(value, defaultValue) {
  return value !== undefined ? value : defaultValue;
}

export default function applyParams(params, defaults) {
  Object.keys(defaults)
    .forEach((param) => {
      this[param] = getParamValue(params[param], defaults[param]);
    });
}
