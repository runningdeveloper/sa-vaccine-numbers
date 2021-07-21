import { g as getDefaultExportFromCjs, c as createCommonjsModule, r as requiredArgs_1, t as toDate_1 } from '../common/index-2b2e87ce.js';

var isBefore_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isBefore;

var _index = _interopRequireDefault(toDate_1);

var _index2 = _interopRequireDefault(requiredArgs_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @name isBefore
 * @category Common Helpers
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|Number} date - the date that should be before the other one to return true
 * @param {Date|Number} dateToCompare - the date to compare with
 * @returns {Boolean} the first date is before the second date
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * var result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */
function isBefore(dirtyDate, dirtyDateToCompare) {
  (0, _index2.default)(2, arguments);
  var date = (0, _index.default)(dirtyDate);
  var dateToCompare = (0, _index.default)(dirtyDateToCompare);
  return date.getTime() < dateToCompare.getTime();
}

module.exports = exports.default;
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(isBefore_1);

export default __pika_web_default_export_for_treeshaking__;
