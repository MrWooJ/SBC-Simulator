function successfulOperation() {
	swal("Successful!", "The requested operation finished successfuly.", "success")
}

function failedOperation() {
	swal("Failed!", "Something went wrong, Please try again.", "error")
}

function failedOperationByString(sentence) {
	swal("Failed!", sentence, "error")
}

function warningOperation() {
	swal("Pay Attention!", "In order to operate your request, You should enter all required and neccessary fields.", "warning")
}

function ensuranceOperation(callback) {
	swal({
		title: "Are you sure?",
		text: "After operating this request, It can not become undo.",
		type: "warning",
		showCancelButton: true,
		confirmButtonColor: "#DD6B55",
		confirmButtonText: "Yes, Do it.",
		cancelButtonText: "No! Stop it.",
		closeOnConfirm: false,
		closeOnCancel: true
	}, function (isConfirm) {
		if (isConfirm) {
			callback(1)
		} else {
			callback(0)
		}
	})
}

$(document).ready(function () {
	
	const electron = require('electron')
	const {ipcRenderer} = electron

	var vehicles = []

	doneProgressBar()
	prepareEnv()
	fetchAllVehiclesOperation()
	
	//------------------------------------------------------------
	//	IPC Renderrer Operations
	//------------------------------------------------------------
	ipcRenderer.on('VEHICLE_DELETE', function(e, model)	{
		fetchAllVehiclesOperation()
		clearEditViewFields()
	})

	ipcRenderer.on('VEHICLE_ADD', function(e, model)	{
		fetchAllVehiclesOperation()
		clearAddViewFields()
	})

	ipcRenderer.on('VEHICLE_EDIT', function(e, model)	{
		fetchAllVehiclesOperation()
		clearEditViewFields()
	})

	ipcRenderer.on('VEHICLE_FETCH', function(e, model)	{
		doneLoading()
		doneProgressBar()
		successfulOperation()
		vehicles = []
		vehicles = model
		fill_vehicles_selectors(vehicles)
		fillSearchViewTable(vehicles)
	})

	ipcRenderer.on('VEHICLE_SEARCH', function(e, model)	{
		doneProgressBar()
		clearSearchViewFields()
		fillSearchViewTable(model)
	})

	//------------------------------------------------------------
	//	Environments Control
	//------------------------------------------------------------
	function prepareEnv() {
		Waves.attach('.dropdown-menu li a', ['waves-block'])
		Waves.init()	
	}

	function startProgressBar() {
		$('.cardRainbow').fadeIn()
	}

	function doneProgressBar() {
		$('.cardRainbow').fadeOut()
	}

	function startLoading() {
		$('.page-loader-wrapper').fadeIn()
		$('#rainbow-progress-bar1').fadeIn()
	}

	function doneLoading() {
		$('.page-loader-wrapper').fadeOut()
		$('#rainbow-progress-bar1').fadeOut()
	}

	// ------------------------------ //
	// 			  	Selectors							//
	// ------------------------------ //
	function fill_vehicles_selectors(vehiclesArray) {
		$('#Edit_VehicleId_Select').find('option').remove()
		for (var i = 0; i < vehiclesArray.length; i++) {
			var itemToPush = {
				id: vehiclesArray[i].id,
				name: vehiclesArray[i].name
			}
			$('#Edit_VehicleId_Select').append($('<option>', {
				value: itemToPush.id,
				text: itemToPush.name
			}))
		}
		$('#Edit_VehicleId_Select').selectpicker('refresh')
	}

	//------------------------------------------------------------
	//	Field Properties
	//------------------------------------------------------------	
	function clearSearchViewFields() {
		$("#Search_Min_Capacity").val('1')
		$("#Search_Max_Capacity").val('10')
		$("#Search_Min_Filled").val('1')
		$("#Search_Max_Filled").val('10')
		$("#Search_Min_Speed").val('1')
		$("#Search_Max_Speed").val('10')
		$("#Search_Min_Position").val('2')
		$("#Search_Max_Position").val('95')
		$("#Search_Min_LineNumber").val('1')
		$("#Search_Max_LineNumber").val('2')
		$("#Search_Direction_Select").selectpicker('val', '')
		$("#Search_Color_Select").selectpicker('val', '')
	}

	function clearAddViewFields() {
		$("#Add_VehicleName").val('')
		$("#Add_VehiclePlaque").val('')
		$("#Add_Capacity").val('1')
		$("#Add_Filled").val('1')
		$("#Add_Speed").val('1')
		$("#Add_LineNumber").val('1')
		$("#Add_Position").val('2')
		$("#Add_Direction_Select").selectpicker('val', '')
		$("#Add_Color_Select").selectpicker('val', '')
		$("#Add_SpeedType_Select").selectpicker('val', '')
	}

	function clearEditViewFields() {
		$("#Edit_VehicleId_Select").selectpicker('val', '')
		$("#Edit_VehicleName").val('')
		$("#Edit_Capacity").val('1')
		$("#Edit_Filled").val('1')
		$("#Edit_Speed").val('1')
		$("#Edit_LineNumber").val('1')
		$("#Edit_Position").val('2')
		$("#Edit_Direction_Select").selectpicker('val', '')
		$("#Edit_Color_Select").selectpicker('val', '')
		$("#Edit_SpeedType_Select").selectpicker('val', '')
	}

	function fillEditViewFields(selectedVehicleId) {
		var model
		for (var i = 0; i < vehicles.length; i++) 
			if (vehicles[i].id === selectedVehicleId)
				model = vehicles[i]
		if (model) {
			$("#Edit_VehicleId_Select").selectpicker('val', selectedVehicleId)
			$("#Edit_VehicleName").val(model.vehicleName)
			$("#Edit_Capacity").val(model.capacity)
			$("#Edit_Filled").val(model.filled)
			$("#Edit_Speed").val(model.speed)
			$("#Edit_LineNumber").val(model.lineNumber)
			$("#Edit_Position").val(model.position)
			$("#Edit_Direction_Select").selectpicker('val', model.direction)
			$("#Edit_Color_Select").selectpicker('val', model.color)		
			$("#Edit_SpeedType_Select").selectpicker('val', model.speedType)		
		}
	}

	$('#Edit_VehicleId_Select').on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
		var selectedId = $(this).find('option').eq(clickedIndex).val()
		fillEditViewFields(selectedId)
	})

	//------------------------------------------------------------
	//	Table Construction
	//------------------------------------------------------------	
	function fixUITable() {
		$('table').css({'table-layout': 'fixed;', 'width': '100%;'})
	}

	function emptySearchViewTable() {
		$('#vehicles_table tbody').empty()
		fixUITable()
	}

	function fillSearchViewTable(vehiclesSearchArray) {
		$('#vehicles_table tbody').empty()
		for (var i = 0; i < vehiclesSearchArray.length; i++) {
			var str1 = 'S: ' + vehiclesSearchArray[i].speed + ' D: ' + vehiclesSearchArray[i].direction 
			var str2 = 'C: ' + vehiclesSearchArray[i].capacity + ' F: ' + vehiclesSearchArray[i].filled
			var str3 = 'L: ' + vehiclesSearchArray[i].lineNumber + ' P: ' + vehiclesSearchArray[i].position
			$('#vehicles_table').append('<tr id="spct_addr' + (i) + '"></tr>')
			$('#spct_addr' + i).html(
				'<th align="center" style="vertical-align: middle;" scope="row">' + vehiclesSearchArray[i].id + '<br>' + vehiclesSearchArray[i].plaque + '<br>' + vehiclesSearchArray[i].name + '</th>' +
				'<td align="center" style="vertical-align: middle;">' + str1 + '<br>' + str2 + '<br>' + str3 + '</td>' +
				'<td align="center" style="vertical-align: middle; white-space: nowrap; width: 1%;">' +
				'<button type="button" class="vehicleEdit m-l-5 m-r-5 btn bg-blue waves-effect"><i class="material-icons">mode_edit</i></button>' +
				'<button type="button" class="vehicleDelete m-l-5 m-r-5 btn bg-red waves-effect"><i class="material-icons">clear</i></button>' +
				'</td>'
			)
		}
		fixUITable()
	}

	$(document).on("click", ".vehicleEdit", function (e) {
		e.preventDefault()
		var vehicleSection = $(this).parent().siblings().eq(0).html()
		var parts = vehicleSection.split("<br>")
		var vehicleId = parts[0]
		fillEditViewFields(vehicleId)
		$('.nav-tabs a[id="nav3"]').tab('show')
	})

	$(document).on("click", ".vehicleDelete", function (e) {
		e.preventDefault()
		var vehicleSection = $(this).parent().siblings().eq(0).html()
		var parts = vehicleSection.split("<br>")
		var vehicleId = parts[0]
		deleteVehicleOperation(vehicleId)
	})

	//------------------------------------------------------------
	//	IPC Senders Operations
	//------------------------------------------------------------	
	function fetchAllVehiclesOperation() {
		startProgressBar()
		ipcRenderer.send('VEHICLE_FETCH_REQ')
	}

	function searchVehiclesOperation(searchOptions) {
		startProgressBar()
		ipcRenderer.send('VEHICLE_SEARCH_REQ', searchOptions)
	}

	function deleteVehicleOperation(selectedVehicleId) {
		ensuranceOperation(function(result) {
			if (result) {
				startProgressBar()
				ipcRenderer.send('VEHICLE_DELETE_REQ', vehicleId)
			}
		})	
	}

	function addVehicleOperation(vehicleModel) {
		startProgressBar()
		ipcRenderer.send('VEHICLE_ADD_REQ', vehicleModel)
	}

	function editVehicleOperation(vehicleModel) {
		startProgressBar()
		ipcRenderer.send('VEHICLE_EDIT_REQ', vehicleModel)
	}

	//------------------------------------------------------------
	//	Buttons Actions
	//------------------------------------------------------------	
	$(document).on("click", "#Search_ClearFields_Button", function (e) {
		e.preventDefault()
		clearSearchViewFields()
	})

	$(document).on("click", "#Search_SearchVehicle_Button", function (e) {
		e.preventDefault()
		var colorsSearch = []
		var directionsSearch = []
		if ($('#Search_Color_Select').val())
			colorsSearch = $('#Search_Color_Select').val()
		if ($('#Search_Direction_Select').val())
			directionsSearch = $('#Search_Direction_Select').val()
		var filter = {
			where: {
				and: [
					{capacity: {gte: Number($("#Search_Min_Capacity").val())}},
					{capacity: {lte: Number($("#Search_Max_Capacity").val())}},
					{filled: {gte: Number($("#Search_Min_Filled").val())}},
					{filled: {lte: Number($("#Search_Max_Filled").val())}},
					{speed: {gte: Number($("#Search_Min_Speed").val())}},
					{speed: {lte: Number($("#Search_Max_Speed").val())}},
					{position: {gte: Number($("#Search_Min_Position").val())}},
					{position: {lte: Number($("#Search_Max_Position").val())}},
					{lineNumber: {gte: Number($("#Search_Min_LineNumber").val())}},
					{lineNumber: {lte: Number($("#Search_Max_LineNumber").val())}}
				]
			}
		}
		if (colorsSearch.length > 0) {
			filter.where.and.push({
				'color': {
					'inq': colorsSearch
				}
			})	
		}
		if (directionsSearch.length > 0) {
			filter.where.and.push({
				'direction': {
					'inq': directionsSearch
				}
			})	
		}
		searchVehiclesOperation(filter)
	})

	$(document).on("click", "#Add_ClearFields_Button", function (e) {
		e.preventDefault()
		clearAddViewFields()
	})

	$(document).on("click", "#Add_AddVehicle_Button", function (e) {
		e.preventDefault()
		var model = {
			name: $("#Add_VehicleName").val(),
			plaque: $("#Add_VehiclePlaque").val(),
			capacity: Number($("#Add_Capacity").val()),
			filled: Number($("#Add_Filled").val()),
			speed: Number($("#Add_Speed").val()),
			lineNumber: Number($("#Add_LineNumber").val()),
			position: Number($("#Add_Position").val()),
			direction: $("#Add_Direction_Select").val(),
			color: $("#Add_Color_Select").val(),
			speedType: $("#Add_SpeedType_Select").val()
		}		
		addVehicleOperation(model)
	})

	$(document).on("click", "#Edit_ClearFields_Button", function (e) {
		e.preventDefault()
		clearEditViewFields()
	})

	$(document).on("click", "#Edit_SaveVehicle_Button", function (e) {
		e.preventDefault()
		var model = {
			id: $("#Edit_VehicleId_Select").val(),
			name: $("#Edit_VehicleName").val(),
			capacity: Number($("#Edit_Capacity").val()),
			filled: Number($("#Edit_Filled").val()),
			speed: Number($("#Edit_Speed").val()),
			lineNumber: Number($("#Edit_LineNumber").val()),
			position: Number($("#Edit_Position").val()),
			direction: $("#Edit_Direction_Select").val(),
			color: $("#Edit_Color_Select").val(),
			speedType: $("#Edit_SpeedType_Select").val()
		}		
		editVehicleOperation(model)
	})

	$(document).on("click", "#Edit_Delete_Button", function (e) {
		e.preventDefault()
		var vehicleId = $("#Edit_VehicleId_Select").val()
		deleteVehicleOperation(vehicleId)
	})

})