var helper = require('../public/helper')
var manager = require('../public/manager')
var utility = require('../public/utility')

var rtlL1Map
var rtlL2Map
var ltrL1Map
var ltrL2Map

module.exports = {
	constructor: function() {
		rtlL1Map = []
		rtlL2Map = []
		ltrL1Map = []
		ltrL2Map = []
		for (var i = manager.getMinSpacePosition(); i <= manager.getMaxSpacePosition(); i++) {
			rtlL1Map.push(helper.getPositionValueOfFree())
			rtlL2Map.push(helper.getPositionValueOfFree())
			ltrL1Map.push(helper.getPositionValueOfFree())
			ltrL2Map.push(helper.getPositionValueOfFree())
		}
	},

	getPositionStatus: function(direction, lineNumber, minLine, maxLine) {
		function validator() {
			if (!utility.checkIfVariableIsNumber(lineNumber))
				return (new Error('Line number is not number.'))
			if (!utility.checkIfVariableIsNumber(minLine))
				return (new Error('min line is not number.'))
			if (!utility.checkIfVariableIsNumber(maxLine))
				return (new Error('max line is not number.'))
			if (!helper.checkExistanceOfDirectionWithKey(direction))
				return (new Error('direction is wrong.'))
			return true
		}
		var validatorStatus = validator()
		if (utility.checkIfVariableIsError(validatorStatus))
			return validatorStatus
		if (helper.compareDirections(helper.getDirectionValueOfLTR(), direction)) {
			var minPosition = minLine - 1
			var maxPosition = maxLine - 1	
			if (manager.isFirstLine(lineNumber)) {
				for (var i = minPosition; i < maxPosition; i++)
					if (helper.comparePosition(ltrL1Map[i % manager.getQReminder()], helper.getPositionValueOfBlock()))
						return helper.getPositionValueOfBlock()
			}
			else {
				for (var i = minPosition; i < maxPosition; i++)
					if (helper.comparePosition(ltrL2Map[i % manager.getQReminder()], helper.getPositionValueOfBlock()))
						return helper.getPositionValueOfBlock()
			}
		}
		else {
			var minPosition = manager.getQReminder() - (minLine % manager.getQReminder())
			var maxPosition = manager.getQReminder() - (maxLine % manager.getQReminder())
			if (manager.isFirstLine(lineNumber)) {
				for (var i = minPosition; i > maxPosition; i--)
					if (helper.comparePosition(rtlL1Map[i % manager.getQReminder()], helper.getPositionValueOfBlock()))
						return helper.getPositionValueOfBlock()
			}
			else {
				for (var i = minPosition; i > maxPosition; i--)
					if (helper.comparePosition(rtlL2Map[i % manager.getQReminder()], helper.getPositionValueOfBlock()))
						return helper.getPositionValueOfBlock()
			}
		}
		return helper.getPositionValueOfFree()
	},

	getPositionDetails: function(direction, lineNumber, minLine, maxLine) {
		function validator() {
			if (!utility.checkIfVariableIsNumber(lineNumber))
				return (new Error('Line number is not number.'))
			if (!utility.checkIfVariableIsNumber(minLine))
				return (new Error('min line is not number.'))
			if (!utility.checkIfVariableIsNumber(maxLine))
				return (new Error('max line is not number.'))
			if (!helper.checkExistanceOfDirectionWithKey(direction))
				return (new Error('direction is wrong.'))
			return true
		}
		var validatorStatus = validator()
		if (utility.checkIfVariableIsError(validatorStatus))
			return validatorStatus
		var detailsArray = []
		if (helper.compareDirections(helper.getDirectionValueOfLTR(), direction)) {
			var minPosition = minLine - 1
			var maxPosition = maxLine - 1	
			if (manager.isFirstLine(lineNumber)) {
				for (var i = minPosition; i < maxPosition; i++)
					detailsArray.push(ltrL1Map[i % manager.getQReminder()])
			}
			else {
				for (var i = minPosition; i < maxPosition; i++)
					detailsArray.push(ltrL2Map[i % manager.getQReminder()])
			}
		}
		else {
			var minPosition = manager.getQReminder() - (minLine % manager.getQReminder())
			var maxPosition = manager.getQReminder() - (maxLine % manager.getQReminder())
			if (manager.isFirstLine(lineNumber)) {
				for (var i = minPosition; i > maxPosition; i--)
					detailsArray.push(rtlL1Map[i])
			}
			else {
				for (var i = minPosition; i > maxPosition; i--)
					detailsArray.push(rtlL2Map[i])
			}
		}
		return detailsArray
	},

	blockPosition: function(direction, lineNumber, minLine, maxLine, identifier) {
		function validator() {
			if (!utility.checkIfVariableIsNumber(lineNumber))
				return (new Error('Line number is not number.'))
			if (!utility.checkIfVariableIsNumber(minLine))
				return (new Error('min line is not number.'))
			if (!utility.checkIfVariableIsNumber(maxLine))
				return (new Error('max line is not number.'))
			if (!helper.checkExistanceOfDirectionWithKey(direction))
				return (new Error('direction is wrong.'))
			if (!identifier)
				return (new Error('identifier is empty.'))
			return true
		}
		var validatorStatus = validator()
		if (utility.checkIfVariableIsError(validatorStatus))
			return validatorStatus
		if (helper.compareDirections(helper.getDirectionValueOfLTR(), direction)) {
			var minPosition = minLine - 1
			var maxPosition = maxLine - 1	
			if (manager.isFirstLine(lineNumber)) {
				for (var i = minPosition; i < maxPosition; i++)
					ltrL1Map[i % manager.getQReminder()] = {
						status: helper.getPositionValueOfBlock(),
						identifier: identifier
					}
			}
			else {
				for (var i = minPosition; i < maxPosition; i++)
					ltrL2Map[i % manager.getQReminder()] = {
						status: helper.getPositionValueOfBlock(),
						identifier: identifier
					}
			}
		}
		else {
			var minPosition = manager.getQReminder() - (minLine % manager.getQReminder())
			var maxPosition = manager.getQReminder() - (maxLine % manager.getQReminder())
			if (manager.isFirstLine(lineNumber)) {
				for (var i = minPosition; i > maxPosition; i--)
					rtlL1Map[i] = {
						status: helper.getPositionValueOfBlock(),
						identifier: identifier
					}
			}
			else {
				for (var i = minPosition; i > maxPosition; i--)
					rtlL2Map[i] = {
						status: helper.getPositionValueOfBlock(),
						identifier: identifier
					}
			}
		}
	},

	freePosition: function(direction, lineNumber, minLine, maxLine) {
		function validator() {
			if (!utility.checkIfVariableIsNumber(lineNumber))
				return (new Error('Line number is not number.'))
			if (!utility.checkIfVariableIsNumber(minLine))
				return (new Error('min line is not number.'))
			if (!utility.checkIfVariableIsNumber(maxLine))
				return (new Error('max line is not number.'))
			if (!helper.checkExistanceOfDirectionWithKey(direction))
				return (new Error('direction is wrong.'))
			return true
		}
		var validatorStatus = validator()
		if (utility.checkIfVariableIsError(validatorStatus))
			return validatorStatus
		if (helper.compareDirections(helper.getDirectionValueOfLTR(), direction)) {
			var minPosition = minLine - 1
			var maxPosition = maxLine - 1	
			if (manager.isFirstLine(lineNumber)) {
				for (var i = minPosition; i < maxPosition; i++)
					ltrL1Map[i % manager.getQReminder()] = helper.getPositionValueOfFree()
			}
			else {
				for (var i = minPosition; i < maxPosition; i++)
					ltrL2Map[i % manager.getQReminder()] = helper.getPositionValueOfFree()
			}
		}
		else {
			var minPosition = manager.getQReminder() - (minLine % manager.getQReminder())
			var maxPosition = manager.getQReminder() - (maxLine % manager.getQReminder())
			if (manager.isFirstLine(lineNumber)) {
				for (var i = minPosition; i > maxPosition; i--)
					rtlL1Map[i] = helper.getPositionValueOfFree()
			}
			else {
				for (var i = minPosition; i > maxPosition; i--)
					rtlL2Map[i] = helper.getPositionValueOfFree()
			}
		}
	},

	getString: function() {
		var L1StrLTR = 'LTRL1: '
		var L2StrLTR = 'LTRL2: '
		var L1StrRTL = 'RTLL1: '
		var L2StrRTL = 'RTLL2: '
		for (var i = manager.getMinSpacePosition(); i <= manager.getMaxSpacePosition(); i++) {
			L1StrLTR += ((helper.comparePosition(ltrL1Map[i], helper.getPositionValueOfFree())) ? 'F ' : 'B ')
			L2StrLTR += ((helper.comparePosition(ltrL2Map[i], helper.getPositionValueOfFree())) ? 'F ' : 'B ')
			L1StrRTL += ((helper.comparePosition(rtlL1Map[i], helper.getPositionValueOfFree())) ? 'F ' : 'B ')
			L2StrRTL += ((helper.comparePosition(rtlL2Map[i], helper.getPositionValueOfFree())) ? 'F ' : 'B ')
		}
		return (L1StrRTL + '\n' + L2StrRTL + '\n' + L2StrLTR + '\n' + L1StrLTR)
	},

	getLineStatus: function(direction, lineNumber) {
		function validator() {
			if (!utility.checkIfVariableIsNumber(lineNumber))
				return (new Error('Line number is not number.'))
			if (!helper.checkExistanceOfDirectionWithKey(direction))
				return (new Error('direction is wrong.'))
			return true
		}
		var validatorStatus = validator()
		if (utility.checkIfVariableIsError(validatorStatus))
			return validatorStatus
		var lineNo = ''
		var statusLine = ''
		for (var i = manager.getMinSpacePosition(); i <= manager.getMaxSpacePosition(); i++) {
			lineNo += (i + '\t')
			if (helper.compareDirections(helper.getDirectionValueOfLTR(), direction)) {
				if (manager.isFirstLine(lineNumber)) {
					statusLine += ((helper.comparePosition(ltrL1Map[i], helper.getPositionValueOfFree())) ? 'F\t' : 'B\t')
				}
				else {
					statusLine += ((helper.comparePosition(ltrL2Map[i], helper.getPositionValueOfFree())) ? 'F\t' : 'B\t')
				}
			}
			else {
				if (manager.isFirstLine(lineNumber)) {
					statusLine += ((helper.comparePosition(rtlL1Map[i], helper.getPositionValueOfFree())) ? 'F\t' : 'B\t')
				}
				else {
					statusLine += ((helper.comparePosition(rtlL2Map[i], helper.getPositionValueOfFree())) ? 'F\t' : 'B\t')	
				}
			}
		}
		return (lineNo + '\n' + statusLine)
	}
}