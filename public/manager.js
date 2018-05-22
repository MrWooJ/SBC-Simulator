var utility = require('./utility')
var helper = require('./helper')

var minLinePosition
var maxLinePosition

var minSpacePosition
var maxSpacePosition

var firstLine
var secondLine

var qReminder

var vehicleSize

var roundedTrack
var lineOvertaken
var wrongLineOvertaken

var movingAlgorithm

module.exports = {
	constructor: function() {
		minLinePosition = 1
		maxLinePosition = 100
		minSpacePosition = 0
		maxSpacePosition = 98
		firstLine = 1
		secondLine = 2
		qReminder = 99
		vehicleSize = 3
		roundedTrack = false
		lineOvertaken = false
		wrongLineOvertaken = false
		movingAlgorithm = helper.getMovingAlgorithmValueOfSequential()
	},

	setRoundedTrackStatus: function(status) {
		if (!utility.checkIfVariableIsBoolean(status))
			return (new Error('Rounded track status is not boolean.'))
		roundedTrack = status 
	},

	getRoundedTrackStatus: function() {
		return roundedTrack
	},

	isRoundedTrackStatusTrue: function() {
		return (roundedTrack == true)
	},

	isRoundedTrackStatusFalse: function() {
		return (roundedTrack == false)
	},

	setLineOvertakenStatus: function(status) {
		if (!utility.checkIfVariableIsBoolean(status))
			return (new Error('Line overtaken status is not boolean.'))
		lineOvertaken = status 
	},

	getLineOvertakenStatus: function() {
		return lineOvertaken
	},

	isLineOvertakenStatusTrue: function() {
		return (lineOvertaken == true)
	},

	isLineOvertakenStatusFalse: function() {
		return (lineOvertaken == false)
	},

	setWrongLineOvertakenStatus: function(status) {
		if (!utility.checkIfVariableIsBoolean(status))
			return (new Error('Wrong line overtaken status is not boolean.'))
		wrongLineOvertaken = status 
	},

	getWrongLineOvertakenStatus: function() {
		return wrongLineOvertaken
	},

	isWrongLineOvertakenStatusTrue: function() {
		return (wrongLineOvertaken == true)
	},

	isWrongLineOvertakenStatusFalse: function() {
		return (wrongLineOvertaken == false)
	},

	setMovingAlgorithm: function(algorithm) {
		if (!helper.checkExistanceOfMovingAlgorithmWithKey(algorithm))
			return (new Error('Moving algorithm is wrong.'))
		movingAlgorithm = algorithm 
	},

	getMovingAlgorithm: function() {
		return movingAlgorithm
	},

	isMovingAlgorithmSequential: function() {
		return movingAlgorithm
	},

	isMovingAlgorithmParallel: function() {
		return movingAlgorithm
	},

	setMinSpacePosition: function(spacePosition) {
		if (!utility.checkIfVariableIsNumber(spacePosition))
			return (new Error('Space position is not number.'))
		minSpacePosition = spacePosition
	},

	getMinSpacePosition: function() {
		return minSpacePosition
	},

	isMinSpacePosition: function(key) {
		return (minSpacePosition == key)
	},

	setMaxSpacePosition: function(spacePosition) {
		if (!utility.checkIfVariableIsNumber(spacePosition))
			return (new Error('Space position is not number.'))
		maxSpacePosition = spacePosition
	},

	getMaxSpacePosition: function() {
		return maxSpacePosition
	},

	isMaxSpacePosition: function(key) {
		return (maxSpacePosition == key)
	},

	setMinLinePosition: function(linePosition) {
		if (!utility.checkIfVariableIsNumber(linePosition))
			return (new Error('Line position is not number.'))
		minLinePosition = linePosition
	},

	getMinLinePosition: function() {
		return minLinePosition
	},

	isMinLinePosition: function(key) {
		return (minLinePosition == key)
	},

	setMaxLinePosition: function(linePosition) {
		if (!utility.checkIfVariableIsNumber(linePosition))
			return (new Error('Line position is not number.'))
		maxLinePosition = linePosition
	},

	getMaxLinePosition: function() {
		return maxLinePosition
	},

	isMaxLinePosition: function(key) {
		return (maxLinePosition == key)
	},

	getFirstLine: function() {
		return firstLine
	},

	isFirstLine: function(key) {
		return (firstLine == key)
	},

	getSecondLine: function() {
		return secondLine
	},

	isSecondLine: function(key) {
		return (secondLine == key)
	},

	setqReminder: function(q) {
		if (!utility.checkIfVariableIsNumber(q))
			return (new Error('Q reminder is not number.'))
		qReminder = q
	},

	getqReminder: function() {
		return qReminder
	},

	getVehicleSize: function(size) {
		if (!utility.checkIfVariableIsNumber(size))
			return (new Error('Vehicle size is not number.'))
		vehicleSize = size
	},

	getVehicleSize: function() {
		return vehicleSize
	}
}