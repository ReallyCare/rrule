/* global describe, it, beforeEach */

  var TimeZoneDate = require('../lib/tz')
// TODO Remove underscore dependency
  var _ = require('underscore')
  var assert = require('assert')

  describe('A TimeZoneDate', function () {
    it('can be constructed', function () {
      var date
      date = new TimeZoneDate()
      assert.notEqual(date, null)
      assert.notEqual(date.toString(), null)
    })

    it('can be constructed from a string with a timezone', function () {
      assert.equal(new TimeZoneDate('2015-06-12T11:14:42+00:00', 'UTC').toString(), 'Fri Jun 12 2015 11:14:42 GMT+0000 (UTC)')
      assert.equal(new TimeZoneDate('2015-06-12T11:14:42+10:00', 'Australia/Melbourne').toString(), 'Fri Jun 12 2015 11:14:42 GMT+1000 (AEST)')
    })

    describe('processing sample data', function () {
      var createSampleDates = function () {
        var commonGetters, commonSetters, dateStr, samples
        dateStr = '2015-05-02T18:15:14'
        commonGetters = {
          getDate: 2,
          getDay: 6,
          getFullYear: 2015,
          getHours: 18,
          getMilliseconds: 0,
          getMinutes: 15,
          getMonth: 4,
          getSeconds: 14,
          getUTCFullYear: 2015,
          getUTCMilliseconds: 0,
          getUTCMinutes: 15,
          getUTCMonth: 4,
          getUTCSeconds: 14
        }
        commonSetters = {
          setDate: 5,
          setFullYear: 2016,
          setHours: 20,
          setMilliseconds: 10,
          setMinutes: 20,
          setMonth: 5,
          setSeconds: 16,
          setTime: 1430550000000,
          setUTCDate: 5,
          setUTCFullYear: 2016,
          setUTCHours: 20,
          setUTCMilliseconds: 10,
          setUTCMinutes: 20,
          setUTCMonth: 5,
          setUTCSeconds: 16
        }
        samples = [
          {
            date: new TimeZoneDate(dateStr, 'Australia/Melbourne'),
            getters: {
              toString: 'Sat May 02 2015 18:15:14 GMT+1000 (AEST)',
              getTime: 1430554514000,
              getTimezoneOffset: -600,
              getUTCDate: 2,
              getUTCDay: 6,
              getUTCHours: 8
            }
          }, {
            date: new TimeZoneDate(dateStr, 'America/New_York'),
            getters: {
              toString: 'Sat May 02 2015 18:15:14 GMT-0400 (EDT)',
              getTime: 1430604914000,
              getTimezoneOffset: 240,
              getUTCDate: 2,
              getUTCDay: 6,
              getUTCHours: 22
            }
          }
        ]
        _.each(samples, function (sample) {
          sample.getters = _.extend({}, commonGetters, sample.getters)
          sample.setters = _.extend({}, commonSetters, sample.setters)
        })
        return samples
      }

      var samples

      beforeEach(function () {
        samples = createSampleDates()
      })

      it('creates sample data', function () {
        assert(samples.length > 0)
      })

      it('can be constructed with a timezone', function () {
        _.each(samples, function (sample) {
          assert.equal(sample.date.toString(), sample.getters.toString)
        })
      })

      it('can be cloned', function () {
        var clone, date
        date = samples[0].date
        clone = date.clone()
        assert.equal(date.toString(), clone.toString())
      })

      it('can be queried', function () {
        _.each(samples, function (sample) {
          var date
          date = sample.date
          assert(_.keys(sample.getters).length > 0)
          _.each(sample.getters, function (value, getter) {
            var actual, e
            actual = date[getter]()
            try {
              assert.equal(actual, value)
            } catch (error) {
              e = error
              console.error('Failed for getter ' + getter + ' and date ' + date.toString())
              throw e
            }
          })
        })
      })

      return it('can be modified', function () {
        _.each(samples, function (sample) {
          var date
          date = sample.date.clone()
          assert(_.keys(sample.setters).length > 0)
          _.each(sample.setters, function (value, setter) {
            var e, existing, getter
            try {
              getter = setter.replace(/^s/, 'g')
              existing = date[getter]()
              assert.notEqual(existing, value)
              date[setter](value)
              assert.equal(date[getter](), value)
            } catch (error) {
              e = error
              console.error('Failed for setter ' + setter + ' and date ' + date.toString())
              throw e
            }
          })
        })
      })
    })
  })
