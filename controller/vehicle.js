var utility = require('../public/utility')
var helper = require('../public/helper')
var manager = require('../public/manager')

var map = require('./map')

var vehicles

module.exports = {
	constructor: function() {
		vehicles = []
		map.constructor()
	},

	addOneRandomVehicle: function() {
		var resultModel
		do {
			var model = {
				name: utility.generateRandomString(10),
				plaque: utility.generateRandomString(8),
				capacity: utility.generateRandomNumber(1, 10),
				filled: utility.generateRandomNumber(1, 10),
				speed: utility.generateRandomNumber(1, 10),
				lineNumber: utility.generateRandomNumber(1, 2),
				position: utility.generateRandomNumber(2, 95),
				direction: directionsList[utility.generateRandomNumber(0, helper.getDirectionKeyList().length - 1)],
				speedType: speedTypesList[utility.generateRandomNumber(0, helper.getSpeedTypeKeyList().length - 1)],
				color: colorsList[utility.generateRandomNumber(0, helper.getColorKeyList().length - 1)]
			}
			resultModel = this.addVehicle(model)
			if (!utility.checkIfVariableIsError(resultModel))
				return resultModel
		} while (utility.checkIfVariableIsError(resultModel))
	},

	addRandomVehicles: function(counter) {
		function validator() {
			if (!utility.checkIfVariableIsNumber(counter))
				return (new Error('counter is not number.'))
			return true
		}
		var validatorStatus = validator()
		if (utility.checkIfVariableIsError(validatorStatus))
			return validatorStatus
		this.constructor()
		do {
			var model = this.addRandomVehicle()
			if (!utility.checkIfVariableIsError(model))
				counter--
		} while (counter >= 0)
		return vehicles
	},

	getVehicleModel: function(vehicleId) {
		var loadedVehicleModel
		var loadedVehicleIndex
		for (var i = 0; i < vehicles.length; i++) {
			if (vehicles[i].id === vehicleId) {
				loadedVehicleModel = vehicles[i]
				loadedVehicleIndex = i
			}
		}	
		if (!loadedVehicleModel)
			return (new Error('There is no vehicle with this id.'))
		return vehicles[loadedVehicleIndex]
	},

	getVehicleIndex: function(vehicleId) {
		var loadedVehicleModel
		var loadedVehicleIndex
		for (var i = 0; i < vehicles.length; i++) {
			if (vehicles[i].id === vehicleId) {
				loadedVehicleModel = vehicles[i]
				loadedVehicleIndex = i
			}
		}	
		if (!loadedVehicleModel)
			return (new Error('There is no vehicle with this id.'))
		return loadedVehicleIndex
	},

	getAllVehicles: function() {
		return vehicles
	},

	lockVehicle: function(vehicleId) {
		var loadedVehicleModel = this.getVehicleModel(vehicleId)
		if (utility.checkIfVariableIsError(loadedVehicleModel))
			return loadedVehicleModel
		var loadedVehicleIndex = this.getVehicleIndex(vehicleId)
		loadedVehicleModel.status = helper.getStatusValueOfLocked()
		vehicles[loadedVehicleIndex] = loadedVehicleModel
		return loadedVehicleModel
	},

	unlockVehicle: function(vehicleId) {
		var loadedVehicleModel = this.getVehicleModel(vehicleId)
		if (utility.checkIfVariableIsError(loadedVehicleModel))
			return loadedVehicleModel
		var loadedVehicleIndex = this.getVehicleIndex(vehicleId)
		loadedVehicleModel.status = helper.getStatusValueOfAvailable()
		vehicles[loadedVehicleIndex] = loadedVehicleModel
		return loadedVehicleModel		
	},

	lockAllVehicles: function() {
		for (var i = 0; i < vehicles.length; i++) {
			var loadedVehicleModel = vehicles[i]
			var loadedVehicleIndex = i
			loadedVehicleModel.status = helper.getStatusValueOfLocked()
			vehicles[loadedVehicleIndex] = loadedVehicleModel
		}
		return vehicles
	},

	unlockAllVehicles: function() {
		for (var i = 0; i < vehicles.length; i++) {
			var loadedVehicleModel = vehicles[i]
			var loadedVehicleIndex = i
			loadedVehicleModel.status = helper.getStatusValueOfAvailable()
			vehicles[loadedVehicleIndex] = loadedVehicleModel
		}
		return vehicles
	},

	addVehicle: function(vehicleModel) {
		if (!vehicleModel.name)
			return (new Error('Name is required.'))
		if (!vehicleModel.plaque)
			return (new Error('Plaque is required.'))
		if (!vehicleModel.capacity)
			return (new Error('Capacity is required.'))
		if (!vehicleModel.filled)
			return (new Error('Filled is required.'))
		if (!vehicleModel.speed)
			return (new Error('Speed is required.'))
		if (!vehicleModel.lineNumber)
			return (new Error('Line Number is required.'))
		if (!vehicleModel.position)
			return (new Error('Position is required.'))
		if (!vehicleModel.direction)
			return (new Error('Direction is required.'))
		if (!vehicleModel.color)
			return (new Error('Color is required.'))
		if (!vehicleModel.speedType)
			return (new Error('Speed Type is required.'))

		if (!(Number(vehicleModel.capacity) >= 1 && Number(vehicleModel.capacity) <= 10))
			return (new Error('Capacity must be between 1 to 10.'))
		if (!(Number(vehicleModel.filled) >= 1 && Number(vehicleModel.filled) <= 10))
			return (new Error('Filled must be between 1 to 10.'))
		if (!(Number(vehicleModel.speed) >= 1 && Number(vehicleModel.speed) <= 10))
			return (new Error('Speed must be between 1 to 10.'))
		if (!(Number(vehicleModel.lineNumber) >= 1 && Number(vehicleModel.lineNumber) <= 2))
			return (new Error('Line Number must be between 1 to 2.'))
		if (!(Number(vehicleModel.position) >= 2 && Number(vehicleModel.position) <= 95))
			return (new Error('Position must be between 2 to 95.'))

		if (!(Number(vehicleModel.filled) <= Number(vehicleModel.capacity)))
			return (new Error('Filled must be between lower or equal than capacity.'))

		if (!(colorsList.indexOf(vehicleModel.color) >= 0))
			return (new Error('Color is not valid.'))
		if (!(directionsList.indexOf(vehicleModel.direction) >= 0))
			return (new Error('Direction is not valid.'))
		if (!(speedTypesList.indexOf(vehicleModel.speedType) >= 0))
			return (new Error('Speed Type is not valid.'))

		for (var i = 0; i < vehicles.length; i++)
			if (vehicles[i].plaque === vehicleModel.plaque)
				return (new Error('Plaque must be unique.'))

		if (helper.comparePosition(map.getPositionStatus(vehicleModel.direction, Number(vehicleModel.lineNumber), Number(vehicleModel.position), Number(vehicleModel.position + manager.getVehicleSize())), helper.getPositionValueOfBlock()))
			return (new Error('Position is blocked, try new location.'))

		var xPosition // should be fixed according to main window
		var yPosition // should be fixed according to main window
		if (vehicleModel.direction === directionsConfig.LTR) {
			if (Number(vehicleModel.lineNumber) === 1)
				yPosition = 1
			else
				yPosition = 2
		}
		else {
			if (Number(vehicleModel.lineNumber) === 1)
				yPosition = 1
			else
				yPosition = 2			
		}
		if (vehicleModel.direction === directionsConfig.LTR) {
			xPosition = 1
		}
		else {
			xPosition = 2
		}

		var model = {
			id: utility.generateUniqueId(),
			status: statusConfig.available
			name: vehicleModel.name,
			plaque: vehicleModel.plaque,
			image: (vehicleModel.color + '-' + vehicleModel.direction + '.png'),
			round: 0,
			const: {
				capacity: Number(vehicleModel.capacity),
				speed: Number(vehicleModel.speed),
				direction: vehicleModel.direction,
				color: vehicleModel.color,
				speedType: vehicleModel.speedType
			},
			begin: {
				filled: Number(vehicleModel.filled),
				position: Number(vehicleModel.position),
				speed: 0,
				lineNumber: Number(vehicleModel.lineNumber),
				location: {
					x: xPosition,
					y: yPosition
				}	
			}
			current: {
				filled: Number(vehicleModel.filled),
				position: Number(vehicleModel.position),
				speed: 0,
				lineNumber: Number(vehicleModel.lineNumber),
				location: {
					x: xPosition,
					y: yPosition
				}
				seat: []
			}
		}

		for (var i = 0; i < Number(vehicleModel.capacity); i++) {
			var seatModel = {
				no: i,
				belt: false,
				existance: false
			}
			if (i < Number(vehicleModel.filled))
				seatModel.existance = true
			model.current.seat.push(seatModel)
		}
		
		map.blockPosition(vehicleModel.direction, Number(vehicleModel.lineNumber), Number(vehicleModel.position), Number(vehicleModel.position + 3))

		vehicles.push(model)
		return model
	},

	editVehicle: function(vehicleId, vehicleModel) {
		var loadedVehicleModel = this.getVehicleModel(vehicleId)
		if (loadedVehicleModel instanceof Error)
			return loadedVehicleModel
		var loadedVehicleIndex = this.getVehicleIndex(vehicleId)
		
		if (loadedVehicleModel.status === statusConfig.locked)
			return (new Error('Edit is not possible. Vehicle is locked.'))
		
		if (!vehicleModel.name)
			return (new Error('Name is required.'))
		if (!vehicleModel.capacity)
			return (new Error('Capacity is required.'))
		if (!vehicleModel.filled)
			return (new Error('Filled is required.'))
		if (!vehicleModel.speed)
			return (new Error('Speed is required.'))
		if (!vehicleModel.lineNumber)
			return (new Error('Line Number is required.'))
		if (!vehicleModel.position)
			return (new Error('Position is required.'))
		if (!vehicleModel.direction)
			return (new Error('Direction is required.'))
		if (!vehicleModel.color)
			return (new Error('Color is required.'))
		if (!vehicleModel.speedType)
			return (new Error('Speed Type is required.'))

		if (!(Number(vehicleModel.capacity) >= 1 && Number(vehicleModel.capacity) <= 10))
			return (new Error('Capacity must be between 1 to 10.'))
		if (!(Number(vehicleModel.filled) >= 1 && Number(vehicleModel.filled) <= 10))
			return (new Error('Filled must be between 1 to 10.'))
		if (!(Number(vehicleModel.speed) >= 1 && Number(vehicleModel.speed) <= 10))
			return (new Error('Speed must be between 1 to 10.'))
		if (!(Number(vehicleModel.lineNumber) >= 1 && Number(vehicleModel.lineNumber) <= 2))
			return (new Error('Line Number must be between 1 to 2.'))
		if (!(Number(vehicleModel.position) >= 2 && Number(vehicleModel.position) <= 95))
			return (new Error('Position must be between 2 to 95.'))

		if (!(Number(vehicleModel.filled) <= Number(vehicleModel.capacity)))
			return (new Error('Filled must be between lower or equal than capacity.'))

		if (!(colorsList.indexOf(vehicleModel.color) >= 0))
			return (new Error('Color is not valid.'))
		if (!(directionsList.indexOf(vehicleModel.direction) >= 0))
			return (new Error('Direction is not valid.'))
		if (!(speedTypesList.indexOf(vehicleModel.speedType) >= 0))
			return (new Error('Speed Type is not valid.'))

		if (map.getPositionStatus(vehicleModel.direction, Number(vehicleModel.lineNumber), Number(vehicleModel.position), Number(vehicleModel.position + VEHICLE_SIZE)) === positionConfig.block)
			return (new Error('Position is blocked, try new location.'))

		var xPosition // should be fixed according to main window
		var yPosition // should be fixed according to main window
		if (vehicleModel.direction === directionsConfig.LTR) {
			if (Number(vehicleModel.lineNumber) === 1)
				yPosition = 1
			else
				yPosition = 2
		}
		else {
			if (Number(vehicleModel.lineNumber) === 1)
				yPosition = 1
			else
				yPosition = 2			
		}
		if (vehicleModel.direction === directionsConfig.LTR) {
			xPosition = 1
		}
		else {
			xPosition = 2
		}

		var model = {
			id: loadedVehicleModel.id,
			status: statusConfig.available
			name: vehicleModel.name,
			plaque: loadedVehicleModel.plaque,
			image: (vehicleModel.color + '-' + vehicleModel.direction + '.png'),
			round: Number(loadedVehicleModel.round),
			const: {
				capacity: Number(vehicleModel.capacity),
				speed: Number(vehicleModel.speed),
				direction: vehicleModel.direction,
				color: vehicleModel.color,
				speedType: vehicleModel.speedType
			},
			begin: {
				filled: Number(vehicleModel.filled),
				position: Number(vehicleModel.position),
				speed: 0,
				lineNumber: Number(vehicleModel.lineNumber),
				location: {
					x: xPosition,
					y: yPosition
				}	
			}
			current: {
				filled: Number(vehicleModel.filled),
				position: Number(vehicleModel.position),
				speed: 0,
				lineNumber: Number(vehicleModel.lineNumber),
				location: {
					x: xPosition,
					y: yPosition
				}
				seat: []
			}
		}

		for (var i = 0; i < Number(vehicleModel.capacity); i++) {
			var seatModel = {
				no: i,
				belt: false,
				existance: false
			}
			if (i < Number(vehicleModel.filled))
				seatModel.existance = true
			model.current.seat.push(seatModel)
		}

		map.freePosition(loadedVehicleModel.direction, Number(loadedVehicleModel.lineNumber), Number(loadedVehicleModel.position), Number(loadedVehicleModel.position + 3)))
		map.blockPosition(vehicleModel.direction, Number(vehicleModel.lineNumber), Number(vehicleModel.position), Number(vehicleModel.position + 3))

		vehicles[loadedVehicleIndex] = model
		return model
	},

	deleteVehicle: function(vehicleId) {
		var loadedVehicleModel = this.getVehicleModel(vehicleId)
		if (loadedVehicleModel instanceof Error)
			return loadedVehicleModel
		var loadedVehicleIndex = this.getVehicleIndex(vehicleId)
		vehicles.splice(loadedVehicleIndex, 1)
		map.freePosition(loadedVehicleModel.direction, Number(loadedVehicleModel.lineNumber), Number(loadedVehicleModel.position), Number(loadedVehicleModel.position + 3)))
		return vehicles
	},

	moveOneVehicle: function(vehicleId) {
		var loadedVehicleModel = this.getVehicleModel(vehicleId)
		if (loadedVehicleModel instanceof Error)
			return loadedVehicleModel
		var loadedVehicleIndex = this.getVehicleIndex(vehicleId)
		
		function toggleLine(lineNumber) {
			return ((lineNumber == 1) ? 2 : 1)
		}

		var successfulMove = false
		do {
			var speed = 0
			var line = Number(loadedVehicleModel.lineNumber)
			if (loadedVehicleModel.const.speedType === speedTypeConfig.constant) {
				speed = Number(loadedVehicleModel.const.speed)
				if (map.getPositionStatus(loadedVehicleModel.direction, Number(loadedVehicleModel.lineNumber), Number(vehicleModel.position + VEHICLE_SIZE), Number(vehicleModel.position + VEHICLE_SIZE + speed)) === positionConfig.free) {
					successfulMove = true
					break
				}
				else if (map.getPositionStatus(loadedVehicleModel.direction, Number(toggleLine(loadedVehicleModel.lineNumber)), Number(vehicleModel.position + VEHICLE_SIZE), Number(vehicleModel.position + VEHICLE_SIZE + speed)) === positionConfig.free) {
					line = Number(toggleLine(loadedVehicleModel.lineNumber))
					successfulMove = true
					break
				}
				else {
					successfulMove = true
					break
				}
			}
			else {
				speed = Number(utility.generateRandomNumber(1, Number(loadedVehicleModel.const.speed)))
			}
			var speed = Number(loadedVehicleModel.const.speed)
			if (loadedVehicleModel.const.speedType === speedTypeConfig.variable)
				

			
		} while(successfulMove == false)


		// free previous location from map
		// locate new location on map
		// check and set round
		// check sebghat
		// check wrong sebghat

		varCurrentXPosition
	},

	moveAllVehicles: function() {
		if (manager.)
		for (var i = 0; i < vehicles.length; i++)
			this.moveOneVehicle(vehicles[i].id)
		return vehicles
	}
}