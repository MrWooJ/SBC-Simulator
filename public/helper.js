var colorConfig = require('../config/colorConfig.json')
var directionConfig = require('../config/directionConfig.json')
var movingAlgorithmConfig = require('../config/movingAlgorithmConfig.json')
var positionConfig = require('../config/positionConfig.json')
var speedTypeConfig = require('../config/speedTypeConfig.json')
var statusConfig = require('../config/statusConfig.json')

module.exports = {
	/**
	 * @func			{getColorDictionary}
	 * @desc 			{Color configuration}
	 * @return 		{!Object.<string, string>} {Returns dictionary of colors}
	 */
	getColorDictionary: function() {
		return colorConfig
	},

	/**
	 * @func			{getColorKeyList}
	 * @desc 			{Color configuration}
	 * @return 		{!string[]} 	{Returns list of colors}
	 */
	 getColorKeyList: function() {
		var colorsList = []
		for (var key in colorConfig) 
			colorsList.push(colorConfig[key])
		return colorsList
	},

	/**
	 * @func			{checkExistanceOfColorWithKey}
	 * @desc 			{Color configuration}
	 * @param  		{!string} 		key 	{Provided key to check}
	 * @returns		{!boolean}		{Checks if key exists in color configuration}
	 */
	checkExistanceOfColorWithKey: function(key) {
		return (this.getColorKeyList().indexOf(key) >= 0)
	},

	/**
	 * @func			{compareColors}
	 * @desc 			{Color configuration}
	 * @param  		{!string} 		key1 	{First key to compare}
	 * @param  		{!string} 		key2	{Second key to compare}
	 * @returns		{!boolean}		{Compares value of two keys in color configuration}
	 */
	compareColors: function(key1, key2) {
		return (colorConfig[key1] === colorConfig[key2])
	},

	/**
	 * @func			{getColorValueOfKey}
	 * @desc 			{Color configuration}
	 * @param  		{!string} 		key 	{Provided key to fetch}
	 * @returns		{?string}			{Returns value of the provided key in color configuration}
	 */
	getColorValueOfKey: function(key) {
		return colorConfig[key]
	},

	/**
	 * @func			{getColorValueOfAmber}
	 * @desc 			{Color configuration}
	 * @return 		{!string} 		{Returns value of the 'amber' key in color configuration}
	 */
	getColorValueOfAmber: function() {
		return colorConfig['amber']
	},

	/**
	 * @func			{getColorValueOfBlack}
	 * @desc 			{Color configuration}
	 * @return 		{!string} 		{Returns value of the 'black' key in color configuration}
	 */
	getColorValueOfBlack: function() {
		return colorConfig['black']
	},

	/**
	 * @func			{getColorValueOfBlue}
	 * @desc 			{Color configuration}
	 * @return 		{!string} 		{Returns value of the 'blue' key in color configuration}
	 */
	getColorValueOfBlue: function() {
		return colorConfig['blue']
	},

	/**
	 * @func			{getColorValueOfGreen}
	 * @desc 			{Color configuration}
	 * @return 		{!string} 		{Returns value of the 'green' key in color configuration}
	 */
	getColorValueOfGreen: function() {
		return colorConfig['green']
	},

	/**
	 * @func			{getColorValueOfGrey}
	 * @desc 			{Color configuration}
	 * @return 		{!string} 		{Returns value of the 'grey' key in color configuration}
	 */
	getColorValueOfGrey: function() {
		return colorConfig['grey']
	},

	/**
	 * @func			{getColorValueOfRed}
	 * @desc 			{Color configuration}
	 * @return 		{!string} 		{Returns value of the 'red' key in color configuration}
	 */
	getColorValueOfRed: function() {
		return colorConfig['red']
	},

	/**
	 * @func			{getDirectionDictionary}
	 * @desc 			{Direction configuration}
	 * @return 		{!Object.<string, string>} {Returns dictionary of directions}
	 */
	getDirectionDictionary: function() {
		return directionConfig
	},

	/**
	 * @func			{getDirectionKeyList}
	 * @desc 			{Direction configuration}
	 * @return 		{!string[]} 	{Returns list of directions}
	 */
	getDirectionKeyList: function() {
		var directionsList = []
		for (var key in directionConfig) 
			directionsList.push(directionConfig[key])
		return directionsList
	},

	/**
	 * @func			{checkExistanceOfDirectionWithKey}
	 * @desc 			{Direction configuration}
	 * @param  		{!string} 		key 	{Provided key to check}
	 * @returns		{!boolean}		{Checks if key exists in direction configuration}
	 */
	checkExistanceOfDirectionWithKey: function(key) {
		return (this.getDirectionKeyList().indexOf(key) >= 0)
	},

	/**
	 * @func			{compareDirections}
	 * @desc 			{Direction configuration}
	 * @param  		{!string} 		key1 	{First key to compare}
	 * @param  		{!string} 		key2	{Second key to compare}
	 * @returns		{!boolean}		{Compares value of two keys in direction configuration}
	 */
	compareDirections: function(key1, key2) {
		return (directionConfig[key1] === directionConfig[key2])
	},

	/**
	 * @func			{getDirectionValueOfKey}
	 * @desc 			{Direction configuration}
	 * @param  		{!string} 		key 	{Provided key to fetch}
	 * @returns		{?string}			{Returns value of the provided key in direction configuration}
	 */
	getDirectionValueOfKey: function(key) {
		return directionConfig[key]
	},

	/**
	 * @func			{getDirectionValueOfRTL}
	 * @desc 			{Direction configuration}
	 * @return 		{!string} 		{Returns value of the 'LTR' key in direction configuration}
	 */
	getDirectionValueOfRTL: function() {
		return directionConfig['LTR']
	},

	/**
	 * @func			{getDirectionValueOfLTR}
	 * @desc 			{Direction configuration}
	 * @return 		{!string} 		{Returns value of the 'RTL' key in direction configuration}
	 */
	getDirectionValueOfLTR: function() {
		return directionConfig['RTL']
	},

	/**
	 * @func			{getMovingAlgorithmDictionary}
	 * @desc 			{Moving Algorithm configuration}
	 * @return 		{!Object.<string, string>} {Returns dictionary of moving algorithms}
	 */
	getMovingAlgorithmDictionary: function() {
		return movingAlgorithmConfig
	},

	/**
	 * @func			{getMovingAlgorithmKeyList}
	 * @desc 			{Moving Algorithm configuration}
	 * @return 		{!string[]} 	{Returns list of moving algorithms}
	 */
	getMovingAlgorithmKeyList: function() {
		var algorithmsList = []
		for (var key in movingAlgorithmConfig) 
			algorithmsList.push(movingAlgorithmConfig[key])
		return algorithmsList
	},

	/**
	 * @func			{checkExistanceOfMovingAlgorithmWithKey}
	 * @desc 			{Moving Algorithm configuration}
	 * @param  		{!string} 		key 	{Provided key to check}
	 * @returns		{!boolean}		{Checks if key exists in moving algorithm configuration}
	 */
	checkExistanceOfMovingAlgorithmWithKey: function(key) {
		return (this.getMovingAlgorithmKeyList().indexOf(key) >= 0)
	},

	/**
	 * @func			{compareMovingAlgorithms}
	 * @desc 			{Moving Algorithm configuration}
	 * @param  		{!string} 		key1 	{First key to compare}
	 * @param  		{!string} 		key2	{Second key to compare}
	 * @returns		{!boolean}		{Compares value of two keys in moving algorithm configuration}
	 */
	compareMovingAlgorithms: function(key1, key2) {
		return (movingAlgorithmConfig[key1] === movingAlgorithmConfig[key2])
	},

	/**
	 * @func			{getMovingAlgorithmValueOfKey}
	 * @desc 			{Moving Algorithm configuration}
	 * @param  		{!string} 		key 	{Provided key to fetch}
	 * @returns		{?string}			{Returns value of the provided key in moving algorithm configuration}
	 */
	getMovingAlgorithmValueOfKey: function(key) {
		return movingAlgorithmConfig[key]
	},

	/**
	 * @func			{getMovingAlgorithmValueOfSequential}
	 * @desc 			{Moving Algorithm configuration}
	 * @return 		{!string} 		{Returns value of the 'sequential' key in moving algorithm configuration}
	 */
	getMovingAlgorithmValueOfSequential: function() {
		return movingAlgorithmConfig['sequential']
	},

	/**
	 * @func			{getMovingAlgorithmValueOfParallel}
	 * @desc 			{Moving Algorithm configuration}
	 * @return 		{!string} 		{Returns value of the 'parallel' key in moving algorithm configuration}
	 */
	getMovingAlgorithmValueOfParallel: function() {
		return movingAlgorithmConfig['parallel']
	},

	/**
	 * @func			{getPositionDictionary}
	 * @desc 			{Position configuration}
	 * @return 		{!Object.<string, string>} {Returns dictionary of positions}
	 */
	getPositionDictionary: function() {
		return positionConfig
	},

	/**
	 * @func			{getPositionKeyList}
	 * @desc 			{Position configuration}
	 * @return 		{!string[]} 	{Returns list of position}
	 */
	getPositionKeyList: function() {
		var positionsList = []
		for (var key in positionConfig) 
			positionsList.push(positionConfig[key])
		return positionsList
	},

	/**
	 * @func			{checkExistanceOfPositionWithKey}
	 * @desc 			{Position configuration}
	 * @param  		{!string} 		key 	{Provided key to check}
	 * @returns		{!boolean}		{Checks if key exists in position configuration}
	 */
	checkExistanceOfPositionWithKey: function(key) {
		return (this.getPositionKeyList().indexOf(key) >= 0)
	},

	/**
	 * @func			{comparePosition}
	 * @desc 			{Position configuration}
	 * @param  		{!string} 		key1 	{First key to compare}
	 * @param  		{!string} 		key2	{Second key to compare}
	 * @returns		{!boolean}		{Compares value of two keys in position configuration}
	 */
	comparePosition: function(key1, key2) {
		return (positionConfig[key1] === positionConfig[key2])
	},

	/**
	 * @func			{getPositionValueOfKey}
	 * @desc 			{Position configuration}
	 * @param  		{!string} 		key 	{Provided key to fetch}
	 * @returns		{?string}			{Returns value of the provided key in position configuration}
	 */
	getPositionValueOfKey: function(key) {
		return positionConfig[key]
	},

	/**
	 * @func			{getPositionValueOfFree}
	 * @desc 			{Position configuration}
	 * @return 		{!string} 		{Returns value of the 'free' key in position configuration}
	 */
	getPositionValueOfFree: function() {
		return positionConfig['free']
	},

	/**
	 * @func			{getPositionValueOfBlock}
	 * @desc 			{Position configuration}
	 * @return 		{!string} 		{Returns value of the 'block' key in position configuration}
	 */
	getPositionValueOfBlock: function() {
		return positionConfig['block']
	},

	/**
	 * @func			{getSpeedTypeDictionary}
	 * @desc 			{Speed Type configuration}
	 * @return 		{!Object.<string, string>} {Returns dictionary of speed types}
	 */
	getSpeedTypeDictionary: function() {
		return speedTypeConfig
	},

	/**
	 * @func			{getSpeedTypeKeyList}
	 * @desc 			{Speed Type configuration}
	 * @return 		{!string[]} 	{Returns list of speed types}
	 */
	getSpeedTypeKeyList: function() {
		var speedTypesList = []
		for (var key in speedTypeConfig) 
			speedTypesList.push(speedTypeConfig[key])
		return speedTypesList
	},

	/**
	 * @func			{checkExistanceOfSpeedTypeWithKey}
	 * @desc 			{Speed Type configuration}
	 * @param  		{!string} 		key 	{Provided key to check}
	 * @returns		{!boolean}		{Checks if key exists in speed type configuration}
	 */
	checkExistanceOfSpeedTypeWithKey: function(key) {
		return (this.getSpeedTypeKeyList().indexOf(key) >= 0)
	},

	/**
	 * @func			{compareSpeedTypes}
	 * @desc 			{Speed Type configuration}
	 * @param  		{!string} 		key1 	{First key to compare}
	 * @param  		{!string} 		key2	{Second key to compare}
	 * @returns		{!boolean}		{Compares value of two keys in speed type configuration}
	 */
	compareSpeedTypes: function(key1, key2) {
		return (speedTypeConfig[key1] === speedTypeConfig[key2])
	},

	/**
	 * @func			{getSpeedTypeValueOfKey}
	 * @desc 			{Speed Type configuration}
	 * @param  		{!string} 		key 	{Provided key to fetch}
	 * @returns		{?string}			{Returns value of the provided key in speed type configuration}
	 */
	getSpeedTypeValueOfKey: function(key) {
		return speedTypeConfig[key]
	},

	/**
	 * @func			{getSpeedTypeValueOfConstant}
	 * @desc 			{Speed Type configuration}
	 * @return 		{!string} 		{Returns value of the 'constant' key in speed type configuration}
	 */
	getSpeedTypeValueOfConstant: function() {
		return speedTypeConfig['constant']
	},

	/**
	 * @func			{getSpeedTypeValueOfVariable}
	 * @desc 			{Speed Type configuration}
	 * @return 		{!string} 		{Returns value of the 'variable' key in speed type configuration}
	 */
	getSpeedTypeValueOfVariable: function() {
		return speedTypeConfig['variable']
	},

	/**
	 * @func			{getStatusDictionary}
	 * @desc 			{Status configuration}
	 * @return 		{!string[]} 	{Returns list of statuses}
	 */
	getStatusDictionary: function() {
		return statusConfig
	},

	/**
	 * @func			{getStatusKeyList}
	 * @desc 			{Status configuration}
	 * @return 		{!string[]} 	{Returns list of statuses}
	 */
	getStatusKeyList: function() {
		var statusesList = []
		for (var key in statusConfig) 
			statusesList.push(statusConfig[key])
		return statusesList
	},

	/**
	 * @func			{checkExistanceOfStatusWithKey}
	 * @desc 			{Status configuration}
	 * @param  		{!string} 		key 	{Provided key to check}
	 * @returns		{!boolean}		{Checks if key exists in status configuration}
	 */
	checkExistanceOfStatusWithKey: function(key) {
		return (this.getStatusKeyList().indexOf(key) >= 0)
	},

	/**
	 * @func			{compareStatuses}
	 * @desc 			{Status configuration}
	 * @param  		{!string} 		key1 	{First key to compare}
	 * @param  		{!string} 		key2	{Second key to compare}
	 * @returns		{!boolean}		{Compares value of two keys in status configuration}
	 */
	compareStatuses: function(key1, key2) {
		return (statusConfig[key1] === statusConfig[key2])
	},

	/**
	 * @func			{getStatusValueOfKey}
	 * @desc 			{Status configuration}
	 * @param  		{!string} 		key 	{Provided key to fetch}
	 * @returns		{?string}			{Returns value of the provided key in status configuration}
	 */
	getStatusValueOfKey: function(key) {
		return statusConfig[key]
	},

	/**
	 * @func			{getStatusValueOfAvailable}
	 * @desc 			{Status configuration}
	 * @return 		{!string} 		{Returns value of the 'available' key in status configuration}
	 */
	getStatusValueOfAvailable: function() {
		return statusConfig['available']
	},

	/**
	 * @func			{getStatusValueOfLocked}
	 * @desc 			{Status configuration}
	 * @return 		{!string} 		{Returns value of the 'locked' key in status configuration}
	 */
	getStatusValueOfLocked: function() {
		return statusConfig['locked']
	}
}