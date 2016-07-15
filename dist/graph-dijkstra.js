(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var hashClear = require('./_hashClear'),
    hashDelete = require('./_hashDelete'),
    hashGet = require('./_hashGet'),
    hashHas = require('./_hashHas'),
    hashSet = require('./_hashSet');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;

},{"./_hashClear":25,"./_hashDelete":26,"./_hashGet":27,"./_hashHas":28,"./_hashSet":29}],2:[function(require,module,exports){
var listCacheClear = require('./_listCacheClear'),
    listCacheDelete = require('./_listCacheDelete'),
    listCacheGet = require('./_listCacheGet'),
    listCacheHas = require('./_listCacheHas'),
    listCacheSet = require('./_listCacheSet');

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;

},{"./_listCacheClear":35,"./_listCacheDelete":36,"./_listCacheGet":37,"./_listCacheHas":38,"./_listCacheSet":39}],3:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;

},{"./_getNative":23,"./_root":46}],4:[function(require,module,exports){
var mapCacheClear = require('./_mapCacheClear'),
    mapCacheDelete = require('./_mapCacheDelete'),
    mapCacheGet = require('./_mapCacheGet'),
    mapCacheHas = require('./_mapCacheHas'),
    mapCacheSet = require('./_mapCacheSet');

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;

},{"./_mapCacheClear":40,"./_mapCacheDelete":41,"./_mapCacheGet":42,"./_mapCacheHas":43,"./_mapCacheSet":44}],5:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;

},{"./_getNative":23,"./_root":46}],6:[function(require,module,exports){
var MapCache = require('./_MapCache'),
    setCacheAdd = require('./_setCacheAdd'),
    setCacheHas = require('./_setCacheHas');

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;

},{"./_MapCache":4,"./_setCacheAdd":47,"./_setCacheHas":48}],7:[function(require,module,exports){
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  var length = args.length;
  switch (length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;

},{}],8:[function(require,module,exports){
var baseIndexOf = require('./_baseIndexOf');

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to search.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array ? array.length : 0;
  return !!length && baseIndexOf(array, value, 0) > -1;
}

module.exports = arrayIncludes;

},{"./_baseIndexOf":13}],9:[function(require,module,exports){
/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to search.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

module.exports = arrayIncludesWith;

},{}],10:[function(require,module,exports){
/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;

},{}],11:[function(require,module,exports){
var eq = require('./eq');

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;

},{"./eq":51}],12:[function(require,module,exports){
var arrayPush = require('./_arrayPush'),
    isFlattenable = require('./_isFlattenable');

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
 * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index = -1,
      length = array.length;

  predicate || (predicate = isFlattenable);
  result || (result = []);

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

},{"./_arrayPush":10,"./_isFlattenable":31}],13:[function(require,module,exports){
var indexOfNaN = require('./_indexOfNaN');

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return indexOfNaN(array, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = baseIndexOf;

},{"./_indexOfNaN":30}],14:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isHostObject = require('./_isHostObject'),
    isMasked = require('./_isMasked'),
    isObject = require('./isObject'),
    toSource = require('./_toSource');

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

},{"./_isHostObject":32,"./_isMasked":34,"./_toSource":50,"./isFunction":56,"./isObject":58}],15:[function(require,module,exports){
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],16:[function(require,module,exports){
var SetCache = require('./_SetCache'),
    arrayIncludes = require('./_arrayIncludes'),
    arrayIncludesWith = require('./_arrayIncludesWith'),
    cacheHas = require('./_cacheHas'),
    createSet = require('./_createSet'),
    setToArray = require('./_setToArray');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    var set = iteratee ? null : createSet(array);
    if (set) {
      return setToArray(set);
    }
    isCommon = false;
    includes = cacheHas;
    seen = new SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

module.exports = baseUniq;

},{"./_SetCache":6,"./_arrayIncludes":8,"./_arrayIncludesWith":9,"./_cacheHas":17,"./_createSet":20,"./_setToArray":49}],17:[function(require,module,exports){
/**
 * Checks if a cache value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;

},{}],18:[function(require,module,exports){
/**
 * Checks if `value` is a global object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
 */
function checkGlobal(value) {
  return (value && value.Object === Object) ? value : null;
}

module.exports = checkGlobal;

},{}],19:[function(require,module,exports){
var root = require('./_root');

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;

},{"./_root":46}],20:[function(require,module,exports){
var Set = require('./_Set'),
    noop = require('./noop'),
    setToArray = require('./_setToArray');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/**
 * Creates a set of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
  return new Set(values);
};

module.exports = createSet;

},{"./_Set":5,"./_setToArray":49,"./noop":61}],21:[function(require,module,exports){
var baseProperty = require('./_baseProperty');

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a
 * [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792) that affects
 * Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

module.exports = getLength;

},{"./_baseProperty":15}],22:[function(require,module,exports){
var isKeyable = require('./_isKeyable');

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;

},{"./_isKeyable":33}],23:[function(require,module,exports){
var baseIsNative = require('./_baseIsNative'),
    getValue = require('./_getValue');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

},{"./_baseIsNative":14,"./_getValue":24}],24:[function(require,module,exports){
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

},{}],25:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

module.exports = hashClear;

},{"./_nativeCreate":45}],26:[function(require,module,exports){
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

module.exports = hashDelete;

},{}],27:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;

},{"./_nativeCreate":45}],28:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

module.exports = hashHas;

},{"./_nativeCreate":45}],29:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;

},{"./_nativeCreate":45}],30:[function(require,module,exports){
/**
 * Gets the index at which the first occurrence of `NaN` is found in `array`.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
 */
function indexOfNaN(array, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    var other = array[index];
    if (other !== other) {
      return index;
    }
  }
  return -1;
}

module.exports = indexOfNaN;

},{}],31:[function(require,module,exports){
var isArguments = require('./isArguments'),
    isArray = require('./isArray');

/**
 * Checks if `value` is a flattenable `arguments` object or array.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
 */
function isFlattenable(value) {
  return isArray(value) || isArguments(value);
}

module.exports = isFlattenable;

},{"./isArguments":52,"./isArray":53}],32:[function(require,module,exports){
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

module.exports = isHostObject;

},{}],33:[function(require,module,exports){
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;

},{}],34:[function(require,module,exports){
var coreJsData = require('./_coreJsData');

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;

},{"./_coreJsData":19}],35:[function(require,module,exports){
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

module.exports = listCacheClear;

},{}],36:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

module.exports = listCacheDelete;

},{"./_assocIndexOf":11}],37:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;

},{"./_assocIndexOf":11}],38:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;

},{"./_assocIndexOf":11}],39:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;

},{"./_assocIndexOf":11}],40:[function(require,module,exports){
var Hash = require('./_Hash'),
    ListCache = require('./_ListCache'),
    Map = require('./_Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;

},{"./_Hash":1,"./_ListCache":2,"./_Map":3}],41:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

module.exports = mapCacheDelete;

},{"./_getMapData":22}],42:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;

},{"./_getMapData":22}],43:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;

},{"./_getMapData":22}],44:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

module.exports = mapCacheSet;

},{"./_getMapData":22}],45:[function(require,module,exports){
var getNative = require('./_getNative');

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;

},{"./_getNative":23}],46:[function(require,module,exports){
(function (global){
var checkGlobal = require('./_checkGlobal');

/** Detect free variable `global` from Node.js. */
var freeGlobal = checkGlobal(typeof global == 'object' && global);

/** Detect free variable `self`. */
var freeSelf = checkGlobal(typeof self == 'object' && self);

/** Detect `this` as the global object. */
var thisGlobal = checkGlobal(typeof this == 'object' && this);

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || thisGlobal || Function('return this')();

module.exports = root;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./_checkGlobal":18}],47:[function(require,module,exports){
/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;

},{}],48:[function(require,module,exports){
/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;

},{}],49:[function(require,module,exports){
/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;

},{}],50:[function(require,module,exports){
/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;

},{}],51:[function(require,module,exports){
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var other = { 'user': 'fred' };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;

},{}],52:[function(require,module,exports){
var isArrayLikeObject = require('./isArrayLikeObject');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

module.exports = isArguments;

},{"./isArrayLikeObject":55}],53:[function(require,module,exports){
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @type {Function}
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

},{}],54:[function(require,module,exports){
var getLength = require('./_getLength'),
    isFunction = require('./isFunction'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value)) && !isFunction(value);
}

module.exports = isArrayLike;

},{"./_getLength":21,"./isFunction":56,"./isLength":57}],55:[function(require,module,exports){
var isArrayLike = require('./isArrayLike'),
    isObjectLike = require('./isObjectLike');

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;

},{"./isArrayLike":54,"./isObjectLike":59}],56:[function(require,module,exports){
var isObject = require('./isObject');

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array and weak map constructors,
  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

module.exports = isFunction;

},{"./isObject":58}],57:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length,
 *  else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],58:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/6.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],59:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],60:[function(require,module,exports){
var isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified,
 *  else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

module.exports = isSymbol;

},{"./isObjectLike":59}],61:[function(require,module,exports){
/**
 * A method that returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */
function noop() {
  // No operation performed.
}

module.exports = noop;

},{}],62:[function(require,module,exports){
var apply = require('./_apply'),
    toInteger = require('./toInteger');

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as
 * an array.
 *
 * **Note:** This method is based on the
 * [rest parameter](https://mdn.io/rest_parameters).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.rest(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function rest(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, array);
      case 1: return func.call(this, args[0], array);
      case 2: return func.call(this, args[0], args[1], array);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

module.exports = rest;

},{"./_apply":7,"./toInteger":64}],63:[function(require,module,exports){
var toNumber = require('./toNumber');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_INTEGER = 1.7976931348623157e+308;

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

module.exports = toFinite;

},{"./toNumber":65}],64:[function(require,module,exports){
var toFinite = require('./toFinite');

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * _.toInteger(3.2);
 * // => 3
 *
 * _.toInteger(Number.MIN_VALUE);
 * // => 0
 *
 * _.toInteger(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toInteger('3.2');
 * // => 3
 */
function toInteger(value) {
  var result = toFinite(value),
      remainder = result % 1;

  return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;

},{"./toFinite":63}],65:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isObject = require('./isObject'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = isFunction(value.valueOf) ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

},{"./isFunction":56,"./isObject":58,"./isSymbol":60}],66:[function(require,module,exports){
var baseFlatten = require('./_baseFlatten'),
    baseUniq = require('./_baseUniq'),
    isArrayLikeObject = require('./isArrayLikeObject'),
    rest = require('./rest');

/**
 * Creates an array of unique values, in order, from all given arrays using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {...Array} [arrays] The arrays to inspect.
 * @returns {Array} Returns the new array of combined values.
 * @example
 *
 * _.union([2], [1, 2]);
 * // => [2, 1]
 */
var union = rest(function(arrays) {
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
});

module.exports = union;

},{"./_baseFlatten":12,"./_baseUniq":16,"./isArrayLikeObject":55,"./rest":62}],67:[function(require,module,exports){
// browserify.js
// needed for browserify to inject required resources
var graphDijkstra = require('./graph-dijkstra.js');
// var Dijkstra = require('./graph-dijkstra.js').Dijkstra;


// // var svgPanZoom = require('./svg-pan-zoom.js');

// UMD module definition
(function(window, document){
  // AMD
  if (typeof define === 'function' && define.amd) {
    define('graph', function () {
      return graphDijkstra.Graph;
    });
    define('dijkstra', function () {
      return graphDijkstra.Dijkstra;
    });
  // CMD
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Graph: graphDijkstra.Graph,
        Dijkstra: graphDijkstra.Dijkstra
    };

    // Browser
    // Keep exporting globally as module.exports is available because of browserify
    window.Graph = graphDijkstra.Graph;
    window.Dijkstra = graphDijkstra.Dijkstra;
  }
})(window, document);
},{"./graph-dijkstra.js":69}],68:[function(require,module,exports){
/**
 * dijkstra.js
 * 06/01/16
 *
 * runs Dijkstra's shortest path algorithm on a graph
 /*---------------------------------------------------------------------------*/
(function() {
    'use strict';

    var MinHeap = require('./min_heap.js');
    var Dijkstra = function() {
        var service = {
            // the previously run search (caching)
            prev: {
                s: null, // previous source
                t: null, // previous target
                r: {} // previous results
            },

            run: run,
            getPath: getPath
        };

        return service;

        //------------------------------------------------//

        /**
         * run: run Dijkstra's shortest path algorithm
         * returns an array of the shortest path from source to target, [] if one DNE
         * @source: the starting point for the path (a node ID)
         * @target: the ending point for the path (a node ID)
         * @graph: the graph on which to run algorithm`
         */
        function run(source, target, graph, pathType) {
            if (source === service.prev.s && target === service.prev.t) {
                service.prev.r.cached = true;
                return service.prev.r;
            } else {
                service.prev.r.cached = false;
                service.prev.s = source;
                service.prev.t = target;
            }

            // binary min heap of the unvisited nodes (on distance)
            var unvisited = new MinHeap(
                function(e) {
                    return e.distance;
                },
                function(e) {
                    return e.id;
                },
                'distance'
            );
            var dist = {}; // distance of the node from source
            var prev = {}; // previous node of the form 'node_id': 'prev_node_id'

            _assert(graph.nodes[source] !== undefined, 'Source does not exist (' +
                source + ')');
            _assert(graph.nodes[target] !== undefined, 'Target does not exist (' +
                target + ')');

            // Initialization
            dist[source] = 0; // source is distance 0 from source
            // for each node in the graph...
            for (var id in graph.nodes) {
                if (!graph.nodes.hasOwnProperty(id)) {
                    continue; // ensure we are getting the right property
                }
                var node = graph.nodes[id];

                if (node.id !== parseInt(source, 10)) {
                    prev[node.id] = null; // set previous to undefined
                    dist[node.id] = Infinity; // set distance to Infinity
                }
                // push node to unvisited with distance Infinity
                unvisited.push({
                    id: node.id,
                    distance: dist[node.id]
                });
            }

            // return if source is the same as target (i.e., already there)
            if (source === target) {
                console.log('Same Spot');
                service.prev.r = {
                    dist: dist,
                    prev: prev
                };
                return service.prev.r;
            }

            return runAlgorithm();

            // Run the loop of the algorithm
            function runAlgorithm() {
                // while there are still unvisited nodes
                while (unvisited.size() > 0) {
                    var min = unvisited.pop(); // get minimum node dist and ID
                    var minNode = graph.nodes[min.id]; // get the minimum node

                    // for each neighbor of minNode that is in the unvisited queue
                    for (var i = 0; i < minNode.neighbors.length; i++) {
                        var n = graph.nodes[minNode.neighbors[i]]; // node for the neighbor

                        // ensure node is in unvisited and it is a PATH
                        if (!unvisited.exists(n) || (n.nType !== pathType && n.id !== parseInt(target, 10))) {
                            continue;
                        }

                        // calculate alternative distance
                        var alt = min.distance + minNode.weight;

                        // use this path instead, if alternative distance is shorter
                        if (alt < dist[n.id]) {
                            dist[n.id] = alt;
                            prev[n.id] = min.id;
                            unvisited.decreaseKey(n.id, alt); // update key
                        }
                    }
                }

                // return distances and previous (and cache)
                service.prev.r = {
                    dist: dist,
                    prev: prev
                };
                return service.prev.r;
            }
        }

        /**
         * getPath: gets the path given the previous array from Dijkstra's algorithm
         * @prev: the previous array generated by a run of Dijkstra's
         * @target: the end of the path
         */
        function getPath(prev, target) {
            var path = []; // the path to return
            var t = target;

            // add a block to path
            while (prev[t] !== undefined && prev[t] !== null) {
                path.unshift(t);
                t = prev[t];
            }
            // TODO: this is not how you do this
            path.unshift(t); // add the source to path

            return path;
        }
    };

    module.exports = Dijkstra;

    /*
     * assert: debugging function that throws an error if condition is true
     * @condition: condition to test for truth
     * @message: error message to display in failure
     */
    function _assert(condition, message) {
        if (!condition) {
            message = message || 'Assertion failed';
            if (typeof Error !== 'undefined') {
                throw new Error(message);
            }
            throw message; // Fallback
        }
    }
})();

},{"./min_heap.js":72}],69:[function(require,module,exports){
/**
 * graph-dijkstra.js
 * example angular implementation of the services
 */
(function() {
    'use strict';

    // var Graphing = require('./graphing.js');
    // var Graph = require('./graph.js');
    // var Dijkstra = require('./dijkstra.js');

    module.exports = {
        Graph: require('./graph.js'),
        Dijkstra: require('./dijkstra.js')
    };

    // /* global angular */
    // angular.module('graphDijkstra', [])
    //     .factory('Graphing', Graphing)
    //     .factory('Dijkstra', Dijkstra);

    // Graphing.$inject = ['$http'];
    // function Graphing($http) {
    //     var service = {
    //         graph: null,

    //         createGraph: createGraph
    //     };

    //     return service;

    //     //------------------------------------------------//

    //     function createGraph(url, debug) {
    //         $http.get(url)
    //             .success(function(data) {
    //                 service.graph = new Graph({
    //                     graph: data,
    //                     debug: debug || false // default to false
    //                 });

    //                 return service.graph;
    //             })
    //             .error(function(error) {
    //                 console.error(error || 'Request failed');
    //             });
    //     }
    // }

})();
},{"./dijkstra.js":68,"./graph.js":71}],70:[function(require,module,exports){
// graph-node.js
(function() {
    'use strict';

    var DEFAULTS = {
        weight: 0,
        nType: 0,
        neighbors: []
    };

    /**
     * Node
     * create a new node with @id @neighbors, @weight, and @nType
     * @props: object of properties for the node (optional), valid keys are:
     *    @weight: the weight of the node to create (i.e., distance in path algorithm)
     *    @nType:  an integer that represents the type of nodes (e.g., an enumeration)
     *    @neighbors: list of node ids that are the neighbors
     */
    var Node = function(id, props) {
        props = props || {};
        this._id = id;
        this._weight = props.weight || DEFAULTS.weight;
        this._nType = props.nType || DEFAULTS.nType;
        this._neighbors = (props.neighbors || DEFAULTS.neighbors).slice();
    };

    /**
     * Node define properties
     */
    Object.defineProperties(Node.prototype, {
        // id
        id: {
            get: function() {
                return this._id;
            },
        },
        // neighbors
        neighbors: {
            get: function() {
                return this._neighbors;
            },
            set: function(value) {
                this._neighbors = value.slice();
            }
        },
        // weight
        weight: {
            get: function() {
                return this._weight;
            },
            set: function(value) {
                this._weight = value;
            }
        },
        // nType
        nType: {
            get: function() {
                return this._nType;
            },
            set: function(value) {
                this._nType = value;
            }
        }
    });

    module.exports = Node;
})();

},{}],71:[function(require,module,exports){
/**
 * graph.js
 * 05/31/16
 *
 * a simple undirected graph to represent the office
 /*---------------------------------------------------------------------------*/
(function() {
    'use strict';

    var Node = require('./graph-node.js');
    var union = require('lodash/union');

    /**
     * Graph
     * @params: (optional) object of parameters for initializing graph, valid keys are:
     *    @debug: only verify if debug is set to true (defaults to false)
     *    @graph: a JSON representation of the graph to initialize
     *    * the graph should an object with two arrays, nodes and edges.
     *    * nodes: an array of objects with integer id and object props (keys: weight, nType, and neighbors)
     *    * edges: an array of length 2 arrays representing the source and target ids for the edge
     * return true if successfully constructed
     */
    var Graph = function(params) {
        params = params || {};
        params.debug = params.debug || false;
        this._nodes = {}; // initialize nodes to empty
        this._nodeCount = 0; // initialize node count to 0
        this._edgeCount = 0; // initialize edge count to 0

        // no graph supplied, skip
        if (!params.graph) {
            return true;
        }

        // handle invalid graph parameter format
        if (!('nodes' in params.graph)) {
            _assert(true, 'Invalid graph format: must specify array \'nodes\' with keys' +
            'id\' and \'props\'\n *\'props\' has keys \'weight\', \'nType\', \'neighbors\'');
        }

        // graph is supplied, initialize to that
        return _initializeGraph(this, params);
    };

    /** initializeGraph: helper function for Graph constructor to handle supplied @params */
    function _initializeGraph(graph, params) {
        var i = 0;

        // add each of the nodes in the supplied graph
        for (i = 0; i < params.graph.nodes.length; i++) {
            var nodeVals = params.graph.nodes[i];
            if (graph.exists(nodeVals.id)) {
                // update node (was created earlier by a neighbor specification)
                var node = graph.find(nodeVals.id);
                nodeVals.props.neighbors = union(node.neighbors, nodeVals.props.neighbors);
                graph.update(nodeVals.id, nodeVals.props);
                _fixConsistency(graph, node);
            }
            else {
                graph.addNode(nodeVals.id, nodeVals.props); // create new
            }
        }

        if ('edges' in params.graph) {
            // add each of the edges in the supplied graph
            for (i = 0; i < params.graph.edges.length; i++) {
                var source = params.graph.edges[i][0];
                var target = params.graph.edges[i][1];
                graph.addEdge(source, target);
            }
        }
        // else {
        //     console.warn('Deprecation Warning: ');
        //     console.warn(' Initializing graph object by only specifying nodes is ' +
        //         'deprecated and will be removed in v1.0.0');
        //     console.warn('  * To solve this please supply both nodes and edges in the graph object');
        //     console.warn('  * To remove this message: add \"edges: []\" to the supplied graph object');
        // }

        // verify the graph if debug is true
        if (params.debug && !!params.graph) {
            _verify(graph);
        }

        return true;
    }

    /**
     * Graph define properties
     */
    Object.defineProperties(Graph.prototype, {
        // nodeCount
        nodeCount: {
            get: function() {
                return this._nodeCount;
            },
            set: function(value) {
                this._nodeCount = value;
            }
        },
        // edgeCount
        edgeCount: {
            get: function() {
                return this._edgeCount;
            },
            set: function(value) {
                this._edgeCount = value;
            }
        },
        // nodes
        nodes: {
            get: function() {
                return this._nodes;
            },
            set: function(value) {
                this._nodes = value;
            }
        },
    });

    /**
     * Graph.find: returns the node specified by ID (or undefined)
     * @id: the ID of the node to find
     * returns the node if found, null otherwise
     */
    Graph.prototype.find = function(id) {
        return this.nodes[id] || null;
    };

    /**
     * Graph.exists: checks if the specified ID already exists in the graph
     * @id: the ID of the node to check
     * returns true if it is a node, false otherwise
     */
    Graph.prototype.exists = function(id) {
        return id in this.nodes;
    };

    /**
     * Graph.addNode: add a new node to the graph
     * @id: the node's ID (a number) (required)
     * @props: object of properties for the node (optional), valid keys are:
     *    @neighbors: the neighbors of the node to add (create node if it does not exist)
     *    @weight: the weight of the node to create
     *    @nType: the type of the node to create
     * return the added (or existing) node with @id
     */
    Graph.prototype.addNode = function(id, props) {
        _assert(!!id, 'Cannot create a node without an id');
        props = props || {};

        // only add node if it does not already exist
        // do not overwrite existing properties (TODO: might change)
        if (!this.exists(id)) {
            // create & add new node
            var node = new Node(id, props);
            this.nodes[id] = node;

            ++this.nodeCount;
            _fixConsistency(this, node); // fix possible inconsistencies
        }
        return this.nodes[id];
    };

    /** _fixConsistency: fixes the inconsistencies in @graph caused by the neighbors
     * of @node by adding the necessary edges
     */
    function _fixConsistency(graph, node) {
        // ensure consistency of graph by adding necessary edges to specified neighbors
        for (var i = 0; i < node.neighbors.length; i++) {
            var neigh = graph.addNode(node.neighbors[i]); // create neighbor (if necessary)

            // fix inconsistent edge between new node and its neighbor
            if (graph.addEdge(node.id, neigh.id)) {
                ++graph.edgeCount; // one more edge! (add edge will not account for it)
            }
        }
    }

    /**
     * Graph.deleteNode: delete a node from the graph. true if successful
     * @id: the ID of the node to delete (required)
     * return the node that was deleted or null if it does not exist
     */
    Graph.prototype.deleteNode = function(id) {
         _assert(!!id, 'Cannot delete a node without an id');

        // only remove if it exists
        if (this.exists(id)) {
            var node = this.nodes[id]; // node to delete

            // remove all incident edges
            for (var i = 0; i < node.neighbors.length; i++) {
                var n = this.nodes[node.neighbors[i]]; // get node
                var index = n.neighbors.indexOf(id); // index n's neighbors w/ id

                if (index > -1) {
                    n.neighbors.splice(index, 1);
                    --this.edgeCount;
                }
            }
            // remove from nodes
            delete this.nodes[id];
            --this.nodeCount;

            return node;
        }

        return null;
    };

    /**
     * Graph.addEdge: connect two nodes (undirected edge) that both exist
     * do not allow self edges (by nature of being a simple graph)
     * @source: ID of one end of the edge
     * @target: ID of the other end of the edge
     * return true if able to add edge, false otherwise (i.e., self edge, invalid, or redundant)
     */
    Graph.prototype.addEdge = function(source, target) {
        // is this a self edge?
        if (source === target) {
            // console.log('Cannot add self edge in simple graph');
            return false;
        }

        // find the source & target nodes
        var s = this.find(source);
        var t = this.find(target);

        // continue if invalid edge (i.e., either source or target does not exist)
        if (!s || !t) {
            // console.log('Unable to add edge (' + source + ',' + target + '): node does not exist');
            return false;
        }

        // do not add redundant edges (but fix edge if inconsistent)
        if (s.neighbors.indexOf(t.id) < 0 && t.neighbors.indexOf(s.id) < 0) {
            // add each node to the other's edge list
            s.neighbors.push(t.id);
            t.neighbors.push(s.id);
            ++this.edgeCount;
        } else if (s.neighbors.indexOf(t.id) < 0) {
            s.neighbors.push(t.id); // fix inconsistency in source
        } else if (t.neighbors.indexOf(s.id) < 0) {
            t.neighbors.push(s.id); // fix inconsistency in target
        } else {
            return false; // return false for redundant edges
        }
        return true; // return true
    };

    /**
     * Graph.deleteEdge: delete an edge from the graph
     * @source: ID of one end of the edge to delete
     * @target: ID of the other end of the edge to delete
     * return true if successful, false otherwise
     */
    Graph.prototype.deleteEdge = function(source, target) {
        var s = this.nodes[source]; // the node corresponding to source ID
        var t = this.nodes[target]; // the node corresponding to target ID

        // ensure the edge exists (i.e., connected)
        if (!this.connected(source, target)) {
            return false;
        }

        // delete from neighbor arrays
        s.neighbors.splice(s.neighbors.indexOf(target), 1);
        t.neighbors.splice(t.neighbors.indexOf(source), 1);
        --this.edgeCount;

        return true;
    };

    /**
     * Graph.connected: return whether there is a consistent edge connecting
     * the @source and @target (note only returns true if it is consistent)
     * return true is yes, false if no
     */
    Graph.prototype.connected = function(source, target) {
        if (!this.exists(source) || !this.exists(target)) {
            return false; // clearly not connected if does not exist
        }
        return this.find(source).neighbors.indexOf(target) >= 0 && this.find(target).neighbors.indexOf(source) >= 0;
    };

    // /**
    //  * Graph.weight: return the weight of the specified edge/node
    //  * the weight of an edge is defined as the weight of the source node
    //  * @source: ID of the node to check
    //  */
    // Graph.prototype.weight = function(source) {
    //     return this.nodes[source].weight;
    // };

    /**
     * Graph.update: set the properties of the node specified by @id
     * @id: id of the node to update
     * @props: object of properties for the node, valid keys are:
     *    @neighbors: the neighbors of the node to add (create node if it does not exist)
     *    @weight: the weight of the node to create
     *    @nType: the type of the node to create
     * return the updated node on success, or null if unable to update/find
     */
    Graph.prototype.update = function(id, props) {
        if (!this.exists(id)) {
            return null;
        }
        var node = this.find(id);

        node.weight = props.weight || node.weight;
        node.nType = props.nType || node.nType;
        node.neighbors = props.neighbors || node.neighbors;

        return node;
    };

    module.exports = Graph;

    /**
     * _verify: ensure that the graph is consistent (debugging)
     * i.e., nodes and edges exist and that all edges are bi-directional
     */
    function _verify(graph) {
        console.info('Verifying Graph');
        // the number of nodes should be the same as the nodeCount
        var numNodes = Object.keys(graph.nodes).length;
        _assert(numNodes === graph.nodeCount, 'Inconsistent nodeCount (' +
            numNodes + ' != ' + graph.nodeCount + ')');

        // verify each node
        var numEdges = 0;
        // var keys = Object.keys(graph.nodes);
        // for (var i = 0; i < keys.length; i++) {
        for (var id in graph.nodes) {
            if (!graph.nodes.hasOwnProperty(id)) {
                continue; // ensure we are getting the right property
            }
            var n = graph.nodes[id];
            // should have non-negative weight and type between 1 and 6
            _assert(n.weight >= 0, 'Negative Weight (' + n.weight + ')');
            _assert(n.nType > 0 && n.nType <= 9, 'Irregular Type (' +
                n.nType + ')');

            // should have consistent edges and no self edges
            for (var j = 0; j < n.neighbors.length; j++) {
                numEdges++; // count number of edges (should be double)
                var k = graph.nodes[n.neighbors[j]];

                _assert(k.id !== n.id, 'Cannot have self edge (' +
                    n.id + ')');

                _assert(k._neighbors.includes(n.id), 'Inconsisent Edge (' +
                    n.id + ',' + k.id + ')');
            }
        }
        // number of edges should be same as the edgeCount
        _assert(numEdges / 2 === graph.edgeCount, 'Inconsistent edgeCount (' +
            numEdges / 2 + ' != ' + graph.edgeCount + ')');

        return true;
    }

    /**
     * _assert: debugging function
     * @condition: condition that should be true
     * @message: error message to display in failure
     */
    function _assert(condition, message) {
        if (!condition) {
            message = message || 'Assertion failed';
            if (typeof Error !== 'undefined') {
                throw new Error(message);
            }
            throw message; // Fallback
        }
    }
})();
/*----------------------------------------------------------------------------*/

},{"./graph-node.js":70,"lodash/union":66}],72:[function(require,module,exports){
/*
 * min_heap.js
 * adapted from https://github.com/rombdn/js-binaryheap-decreasekey
 * 06/01/16
 *
=================================
js-binaryheap-decreasekey - v0.1
https://github.com/rombdn/js-binaryheap-decreasekey

Based on a Binary Heap implementation found in the book
Eloquent Javascript by Marijn Haverbeke
http://eloquentjavascript.net/appendix2.html

(c) 2013 Romain BEAUDON
BinaryHeap code may be freely distributed under the MIT License
=================================
/*----------------------------------------------------------------------------*/

(function() {
    'use strict';

    var MinHeap = function(scoreFunction, idFunction, valueProp) {
        this.content = [];
        this.scoreFunction = scoreFunction;
        this.idFunction = idFunction;
        this.valueProp = valueProp;
        this.map = {};
    };

    MinHeap.prototype = {
        size: function() {
            return this.content.length;
        },

        exists: function(elt) {
            return this.map[this.idFunction(elt)] !== undefined;
        },

        push: function(elt) {
            if (this.map[this.idFunction(elt)] !== undefined) {
                throw 'Error: id "' + this.idFunction(elt) + '" already present in heap';
            }

            this.content.push(elt);
            this.bubbleUp(this.content.length - 1);
            //var index = this.bubbleUp(this.content.length - 1);
            //this.map[this.idFunction(elt)] = index;
        },

        pop: function() {
            var result = this.content[0];
            var end = this.content.pop();

            delete this.map[this.idFunction(result)];

            if (this.content.length > 0) {
                this.content[0] = end;
                this.map[this.idFunction(end)] = 0;
                this.sinkDown(0);
                //var index = this.sinkDown(0);
                //this.map[this.idFunction(end)] = index;
            }

            return result;
        },

        bubbleUp: function(n) {
            var element = this.content[n];
            var score = this.scoreFunction(element);

            while (n > 0) {
                var parentN = Math.floor((n - 1) / 2);
                var parent = this.content[parentN];

                if (this.scoreFunction(parent) < score) {
                    break;
                }

                this.map[this.idFunction(element)] = parentN;
                this.map[this.idFunction(parent)] = n;

                this.content[parentN] = element;
                this.content[n] = parent;
                n = parentN;
            }

            this.map[this.idFunction(element)] = n;

            return n;
        },

        sinkDown: function(n) {
            var element = this.content[n];
            var score = this.scoreFunction(element);

            while (true) {
                var child2N = (n + 1) * 2;
                var child1N = child2N - 1;
                var swap = null;
                var child1score;

                if (child1N < this.content.length) {
                    var child1 = this.content[child1N];
                    child1score = this.scoreFunction(child1);
                    if (score > child1score) {
                        swap = child1N;
                    }
                }

                if (child2N < this.content.length) {
                    var child2 = this.content[child2N];
                    var child2score = this.scoreFunction(child2);
                    if ((swap === null ? score : child1score) > child2score) {
                        swap = child2N;
                    }
                }

                if (swap === null) {
                    break;
                }

                this.map[this.idFunction(this.content[swap])] = n;
                this.map[this.idFunction(element)] = swap;

                this.content[n] = this.content[swap];
                this.content[swap] = element;
                n = swap;
            }

            this.map[this.idFunction(element)] = n;

            return n;
        },

        decreaseKey: function(id, value) {
            var n = this.map[id];
            this.content[n][this.valueProp] = value;
            this.bubbleUp(n);
        }
    };

    module.exports = MinHeap;
})();
},{}]},{},[67]);
