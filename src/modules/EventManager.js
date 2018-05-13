/**
  * Subscribe to an event and invoke a callback when it happens
  * @param {string} eventName
  * @param {AudioNode} instance
  * @param {function} callback
  */
subscribe(eventName, instance, callback) {
  if (eventName === ON_FREQUENCY_CHANGE) {
    if (!Array.isArray(instance.onFrequencyChangeCallbacks)) {
      instance.onFrequencyChangeCallbacks = [];
    }

    instance.onFrequencyChangeCallbacks.push(callback);
  }
}

/**
  * Stop listening to a given event
  * @param {string} eventName
  */
unsubscribe(eventName) {
  if (eventName === ON_FREQUENCY_CHANGE) {
    this.onFrequencyChangeCallbacks = null;
  }
}

/**
  * Call any callback functions that are subscribed to a given event
  * @param {string} eventName
  * @param {*} param
  * @private
  */
executeCallbacks(eventName, param) {
  if (eventName === ON_FREQUENCY_CHANGE) {
    if (this.onFrequencyChangeCallbacks) {
      this.onFrequencyChangeCallbacks.forEach(cb => cb(param));
    }
  }
}
