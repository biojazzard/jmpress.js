(function( $, document, window, undefined ) {
	'use strict';
	$.jmpress("initStep", function( step, eventData ) {
		for(var name in eventData.data) {
			if(name.indexOf("secondary")==0) {
				eventData.stepData[name] = eventData.data[name];
			}
		}
	});
	function exchangeIf(childStepData, condition, step) {
		if(childStepData.secondary &&
			childStepData.secondary.split(" ").indexOf(condition) != -1) {
			for(var name in childStepData) {
				if(name.length > 9 && name.indexOf("secondary") == 0) {
					var tmp = childStepData[name];
					var normal = name.substr(9);
					normal = normal.substr(0, 1).toLowerCase() + normal.substr(1);
					childStepData[name] = childStepData[normal];
					childStepData[normal] = tmp;
				}
			}
			$(this).jmpress("reapply", $(step));
		}
	}
	$.jmpress("beforeActive", function( step, eventData ) {
		var parent = $(step).parent();
		$(parent)
			.children(eventData.settings.stepSelector)
			.each(function(idx, child) {
				var childStepData = $(child).data("stepData");
				exchangeIf.call(eventData.jmpress, childStepData, "siblings", child);
			});
		for(var i = 1; i < eventData.parents.length; i++) {
			$(eventData.parents[i])
				.children(eventData.settings.stepSelector)
				.each(function(idx, child) {
					var childStepData = $(child).data("stepData");
					exchangeIf.call(eventData.jmpress, childStepData, "grandchildren", child);
				});
		}
	});
	$.jmpress("setInactive", function( step, eventData ) {
		var parent = $(step).parent();
		$(parent)
			.children(eventData.settings.stepSelector)
			.each(function(idx, child) {
				var childStepData = $(child).data("stepData");
				exchangeIf.call(eventData.jmpress, childStepData, "siblings", child);
			});
		for(var i = 1; i < eventData.parents.length; i++) {
			$(eventData.parents[i])
				.children(eventData.settings.stepSelector)
				.each(function(idx, child) {
					var childStepData = $(child).data("stepData");
					exchangeIf.call(eventData.jmpress, childStepData, "grandchildren", child);
				});
		}
	});
})(jQuery, document, window);