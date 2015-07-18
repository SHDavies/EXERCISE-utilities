/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array1, n) {
    if (n) {
      return array1.splice(0, n);
    }
    else {
      return array1[0];
    }
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array2, n) {
    if (n < array2.length) {
      return array2.splice(array2.length - n);
    } else if (n > array2.length) {
      return array2;
    } else {
      return array2[array2.length -1];
    }

  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    for (var thing in collection) {
      iterator(collection[thing], thing, collection);
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    for (var i = 0; i < array.length; i++) {
      if (array[i] === target) {
        return i;
      }
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var truArray = [];
    for (var i = 0; i < collection.length; i++) {
      if (iterator(collection[i])) {
        truArray.push(collection[i]);
      };
    }
    return truArray;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    var falseArray = [];
    for (var i = 0; i < collection.length; i++) {
      if (!iterator(collection[i])) {
        falseArray.push(collection[i]);
      };
    }
    return falseArray;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
      if (newArray.indexOf(array[i]) === -1) {
        newArray.push(array[i]);
      }
    };
    return newArray
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    for (var i = 0; i < array.length; i++) {
      array[i] = iterator(array[i]);
    }
    return array;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
      newArray.push(array[i][propertyName]);
    }
    return newArray;
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    for (var i = 0; i < list.length; i++) {
      if (typeof methodName === "string") {
        list[i][methodName](args);
      }
      else {
        methodName.apply(list[i]);
      }
    }
    return list;
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
    if (initialValue) {
      var sum = initialValue;
    }
    else {
      sum = 0
    }
    for (var i = 0; i < collection.length; i++) {
      sum = iterator(sum, collection[i])
    }
    return sum;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    for (var item in collection) {
      if (item === target) {
        return true;
      } else if (collection[item] === target) {
        return true;
      };
    };
    return false;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    if (iterator) {
      for (var i = 0; i < collection.length; i++) {
        if (!iterator(collection[i])) {
          return false
        }
      }
    }
    return true;
  };


  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    if (iterator) {
      for (var i = 0; i < collection.length; i++) {
        if (iterator(collection[i])) {
          return true;
        }
      }
      return false;
    } else {
      for (var i = 0; i < collection.length; i++) {
        if (collection[i]) {
          return true;
        }
      }
      return false;
    }
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
    var newObj = {};
    for (var i = 0; i < arguments.length; i++) {
      for (var property in arguments[i]) {
        if (arguments[i][property]) {
          newObj[property] = arguments[i][property];
        }
        else {
          newObj[property] = true;
        }
      }
    }
    return newObj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var result = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
      for (var prop in arguments[i]) {
        if (result[prop] === undefined) {
          result[prop] = arguments[i][prop];
        }
      }
    }
    return result;
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // return function () {
    //   var timesCalled = 0;
    //   timesCalled++;
    //   if (timesCalled === 1) {
    //     var result = func();
    //     return result;
    //   }
    //   else {
    //     return result;
    //   }
    // }
    // var myFunc = function() {
    //   myFunc = function() {};
    //   func();
    // }
    // return myFunc;
    func();
    return function() {};
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var memo = {};
    var fn = func;
    return function(x) {
      var result;
      if (x in memo) {
        result = memo[x];
      } else {
        result = fn(x);
        memo[x] = result;
      }
      return result;
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    setTimeout(function() {
      func.apply(this, args);
    }, wait);
  };



  // Shuffle an array.
  _.shuffle = function(array) {
    var shuf = [];
    shuf[0] = array[1];
    for (var i = 0; i < array.length; i++) {
      if (i < array.length - 1) {
        shuf[i] = array[i + 1];
      } else {
        array[i] = array[0];
      }
    }
    return shuf;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    if (typeof(iterator) === 'function') {
      return collection.sort(function(a, b) {return iterator(a) - iterator(b)});
    } else {
      return collection.sort(function(a, b) {return a[iterator] - b[iterator]});
    }
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var argumentArr = Array.prototype.slice.call(arguments);
    var longArray = argumentArr.sort(function(a,b) {return b.length-a.length})[0].length;

    var zipArray = [];
    var holder = [];
    for (var i = 0; i < longArray; i++) {
      for (var x = 0; x < arguments.length; x++) {
        holder.push(arguments[x][i]);
      }
      zipArray.push(holder);
      holder = [];
    }
    return zipArray;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
    var flat = [];   

    var dig = function(array) {
      array.map(function(item) {
        if (typeof(item) === 'number') {
          flat.push(item);
        } else {
          dig(item);
        }
      });
    };

    dig(nestedArray);
    return flat;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var argumentArr = Array.prototype.slice.call(arguments);
    var result = [];

    argumentArr[0].map(function(item) {
      var intersect = false;
      for (var i = 1; i < argumentArr.length; i++) {
        argumentArr[i].map(function(test) {
          if (item === test) {
            intersect = true;
          }
        })
      }
      if (intersect) {
        result.push(item);
      }
    })
    return result;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var argumentArr = Array.prototype.slice.call(arguments);
    var result = [];
    array.map(function(item) {
      var different = true;
      for (var i = 1; i < argumentArr.length; i++) {
        for (var x = 0; x < argumentArr[i].length; x++) {
          if (item === argumentArr[i][x]) {
            different = false;
          }
        }
      }
      if (different) {
        result.push(item);
      }
    })
    return result;
  };

}).call(this);
