// window.$ = window.jQuery = require('jquery');
$(document).ready(function () {
	// $('.tabs').tabs()

	// tabHandler({ target: { id: 'nav1' } })
	// $('.nav-tabs a[id="nav1"]').tab('show')

	// ------------------------------ //
	// 				 Tab Controller					//
	// ------------------------------ //	
	// function tabHandler(e) {
	// 	var select = $(e.target).attr('id')
	// 	if (select === 'nav4') {
	// 		if (localStorage.getItem('editablePredictId')) {
	// 			var predictId = localStorage.getItem('editablePredictId')
	// 			fill_section_update(predictId)
	// 			localStorage.removeItem('editablePredictId')
	// 		}
	// 	}
	// 	else if (select === 'nav6') {
	// 		if (localStorage.getItem('estimatePredictId')) {
	// 			var predictId = localStorage.getItem('estimatePredictId')
	// 			fill_section_estimate(predictId)
	// 			localStorage.removeItem('estimatePredictId')
	// 		}
	// 	}
	// 	var no = select.replace("nav", "")
	// 	for (var i = 1; i < 11; i++) {
	// 		if (Number(no) >= 7 && i < 7)
	// 			continue
	// 		var str = '#nav' + i + '_tab'
	// 		if (i == Number(no))
	// 			$(str).fadeIn()
	// 		else 
	// 			$(str).hide()
	// 	}
	// }
	$('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
		console.log(e)
		var select = $(e.target).attr('id')
		$('.tabs a[id="' + select + '"]').tab('show')
	})

	var dynamicTabBar = window.dynamicTabBar = new mdc.tabs.MDCTabBar(document.querySelector('#dynamic-tab-bar'));
	var panels = document.querySelector('.panels');
	
	dynamicTabBar.tabs.forEach(function(tab) {
		tab.preventDefaultOnClick = true;
	});
		
	function updatePanel(index) {
		var activePanel = panels.querySelector('.panel.active');
		if (activePanel) {
			activePanel.classList.remove('active');
		}
		var newActivePanel = panels.querySelector('.panel:nth-child(' + (index + 1) + ')');
		if (newActivePanel) {
			newActivePanel.classList.add('active');
		}
	}
	
	dynamicTabBar.listen('MDCTabBar:change', function ({detail: tabs}) {
		var nthChildIndex = tabs.activeTabIndex;
		console.log(nthChildIndex)
		updatePanel(nthChildIndex);
	});
	
})