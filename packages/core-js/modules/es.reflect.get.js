var getOwnPropertyDescriptorModule = require('./_object-get-own-property-descriptor');
var getPrototypeOf = require('./_object-get-prototype-of');
var has = require('core-js-internals/has');
var isObject = require('core-js-internals/is-object');
var anObject = require('core-js-internals/an-object');

// `Reflect.get` method
// https://tc39.github.io/ecma262/#sec-reflect.get
function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var descriptor, prototype;
  if (anObject(target) === receiver) return target[propertyKey];
  if (descriptor = getOwnPropertyDescriptorModule.f(target, propertyKey)) return has(descriptor, 'value')
    ? descriptor.value
    : descriptor.get !== undefined
      ? descriptor.get.call(receiver)
      : undefined;
  if (isObject(prototype = getPrototypeOf(target))) return get(prototype, propertyKey, receiver);
}

require('./_export')({ target: 'Reflect', stat: true }, { get: get });