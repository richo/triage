var Triage = { modules: {}, helpers: {} };


jQuery(function(){
	jQuery('input[name=tzoffset]').val((new Date).getTimezoneOffset())
});