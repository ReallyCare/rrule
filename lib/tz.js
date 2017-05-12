/*
 * tz.js - TimeZoneDate class copied freely from github.com/aramk/rrule
 */
/*
* On the client side, this file needs to be included
* when timezone functions are used.
*
*/
/* global moment, module, define */

;(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else {
    root._getRRuleTZ = factory()
  }
}(typeof window === 'object' ? window : this, function () {
  return function (RRule) {
    var getTzClass = function () {
      return TimeZoneDate
    }

    var _moment
    var isNode
    var extend = function (child, parent) {
      for (var key in parent) {
        if (hasProp.call(parent, key)) child[key] = parent[key]
      }
      function Ctor () {
        this.constructor = child
      }

      Ctor.prototype = parent.prototype
      child.prototype = new Ctor()
      child.__super__ = parent.prototype
      return child
    }
    var hasProp = {}.hasOwnProperty

    isNode = (typeof module !== 'undefined' && module !== null ? module.exports : void 0) != null

    _moment = isNode ? require('moment-timezone') : moment

    var TimeZoneDate = (function (superClass) {
      extend(TimeZoneDate, superClass)

      function TimeZoneDate () {
        var args, lastArg, timeZone
        args = Array.prototype.slice.call(arguments)
        lastArg = args[args.length - 1]
        timeZone = void 0
        if (args.length > 1 && ((lastArg == null) || typeof lastArg === 'string')) {
          timeZone = args.pop()
        }
        if (args.length === 1) {
          args = args[0]
        }
        if (timeZone) {
          this._moment = _moment.tz(args, timeZone)
          this._timeZone = timeZone
        } else {
          this._moment = _moment(args)
        }
      }

      TimeZoneDate.prototype._fromUtc = function () {
        this._moment = _moment.tz(this._utcMoment, this._timeZone)
        return this._moment
      }

      TimeZoneDate.prototype._fromMomentArg = function (arg) {
        this._moment = _moment.tz(arg, this._timeZone)
        return this._getForSetter()
      }

      TimeZoneDate.prototype._getUtc = function () {
        if (this._utcMoment == null) {
          this._utcMoment = this._moment.clone().utc()
        }
        return this._utcMoment
      }

      TimeZoneDate.prototype._getForSetter = function () {
        this._utcMoment = null
        return this._moment
      }

      TimeZoneDate.prototype.getDate = function () {
        return this._moment.date()
      }

      TimeZoneDate.prototype.getDay = function () {
        return this._moment.day()
      }

      TimeZoneDate.prototype.getFullYear = function () {
        return this._moment.year()
      }

      TimeZoneDate.prototype.getHours = function () {
        return this._moment.hours()
      }

      TimeZoneDate.prototype.getMilliseconds = function () {
        return this._moment.milliseconds()
      }

      TimeZoneDate.prototype.getMinutes = function () {
        return this._moment.minutes()
      }

      TimeZoneDate.prototype.getMonth = function () {
        return this._moment.month()
      }

      TimeZoneDate.prototype.getSeconds = function () {
        return this._moment.seconds()
      }

      TimeZoneDate.prototype.getTime = function () {
        return this._moment.valueOf()
      }

      TimeZoneDate.prototype.getTimezoneOffset = function () {
        return -this._moment.utcOffset()
      }

      TimeZoneDate.prototype.getUTCDate = function () {
        return this._getUtc().date()
      }

      TimeZoneDate.prototype.getUTCDay = function () {
        return this._getUtc().day()
      }

      TimeZoneDate.prototype.getUTCFullYear = function () {
        return this._getUtc().year()
      }

      TimeZoneDate.prototype.getUTCHours = function () {
        return this._getUtc().hours()
      }

      TimeZoneDate.prototype.getUTCMilliseconds = function () {
        return this._getUtc().milliseconds()
      }

      TimeZoneDate.prototype.getUTCMinutes = function () {
        return this._getUtc().minutes()
      }

      TimeZoneDate.prototype.getUTCMonth = function () {
        return this._getUtc().month()
      }

      TimeZoneDate.prototype.getUTCSeconds = function () {
        return this._getUtc().seconds()
      }

      TimeZoneDate.prototype.getYear = function () {
        throw new Error('getYear() is deprecated - use getFullYear() instead.')
      }

      TimeZoneDate.prototype.setDate = function (value) {
        return this._getForSetter().date(value)
      }

      TimeZoneDate.prototype.setFullYear = function (value) {
        return this._getForSetter().year(value)
      }

      TimeZoneDate.prototype.setHours = function (value) {
        return this._getForSetter().hours(value)
      }

      TimeZoneDate.prototype.setMilliseconds = function (value) {
        return this._getForSetter().milliseconds(value)
      }

      TimeZoneDate.prototype.setMinutes = function (value) {
        return this._getForSetter().minutes(value)
      }

      TimeZoneDate.prototype.setMonth = function (value) {
        return this._getForSetter().month(value)
      }

      TimeZoneDate.prototype.setSeconds = function (value) {
        return this._getForSetter().seconds(value)
      }

      TimeZoneDate.prototype.setTime = function (value) {
        return this._fromMomentArg(_moment.unix(value / 1000))
      }

      TimeZoneDate.prototype.setUTCDate = function (value) {
        return this._fromUtc(this._getUtc().date(value))
      }

      TimeZoneDate.prototype.setUTCFullYear = function (value) {
        return this._fromUtc(this._getUtc().year(value))
      }

      TimeZoneDate.prototype.setUTCHours = function (value) {
        return this._fromUtc(this._getUtc().hours(value))
      }

      TimeZoneDate.prototype.setUTCMilliseconds = function (value) {
        return this._fromUtc(this._getUtc().milliseconds(value))
      }

      TimeZoneDate.prototype.setUTCMinutes = function (value) {
        return this._fromUtc(this._getUtc().minutes(value))
      }

      TimeZoneDate.prototype.setUTCMonth = function (value) {
        return this._fromUtc(this._getUtc().month(value))
      }

      TimeZoneDate.prototype.setUTCSeconds = function (value) {
        return this._fromUtc(this._getUtc().seconds(value))
      }

      TimeZoneDate.prototype.setYear = function (value) {
        throw new Error('setYear() is deprecated - use setFullYear() instead.')
      }

      TimeZoneDate.prototype.toString = function () {
        var abbr, str
        if (this._timeZone) {
          str = this._moment.toString()
          abbr = this._moment.zoneAbbr()
          if (abbr) {
            str = str + (' (' + abbr + ')')
          }
          return str
        } else {
          return this._moment.toDate().toString()
        }
      }

      TimeZoneDate.prototype.valueOf = function () {
        return this._moment.toDate().getTime()
      }

      TimeZoneDate.prototype.toJSON = function () {
        return this.toString()
      }

      TimeZoneDate.prototype.getTimeZone = function () {
        return this._timeZone
      }

      TimeZoneDate.prototype.toLocalDate = function () {
        return this._moment.toDate()
      }

      TimeZoneDate.prototype.clone = function () {
        return new TimeZoneDate(this._moment, this._timeZone)
      }

      TimeZoneDate.prototype.equals = function (other) {
        return this._moment.toString() === other.toString()
      }

      return TimeZoneDate
    })(Date)

    return {
      getTzClass: getTzClass
    }
  }
}))
