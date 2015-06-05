$(document).ready(function(){
	var myURL = String(document.location).split("?")[0];
	    /**
    * Return promo id/code
    * @param {String} Get Variables  
    * @return {String} promo id/code
    */

    function getQueryStringParams(sParam) {
    	var sPageURL = window.location.search.substring(1);
    	var sURLVariables = sPageURL.split('?');
    	for (var i = 0; i < sURLVariables.length; i++) {
    		var sParameterName = sURLVariables[i].split('=');
    		if (sParameterName[0] == sParam) {
    			return sParameterName[1];
    		}
    	}
    	return "";
    }
    
	//Get Promo Id/Code
	var res = getQueryStringParams("promo");
	
	//Generate Index Page
	if (res == "") { 
		
	//Hide Details Section
	$('#promotion_details_container').hide();
	
	//Get all Promotions from Promotion Object
	var promotionDataSet = promotions.promotion_objects;
	
	 //For each Promotions Generate Div by clonning Existing Div
	 $(promotionDataSet).each(function (key,value) {
	 	var clonnedDiv;
	 	clonnedDiv = $("#promo-division").clone(true);
	 	clonnedDiv.id = 'promo'+key;
	 	clonnedDiv.attr('class','visible-container');
	 	clonnedDiv.find('img').attr('src',value.promo_image_url);
	 	clonnedDiv.find('#Index_promoTitle').html(value.promotion_name);
	 	clonnedDiv.find('#Index_promoTitle').attr('href','index.html?promo='+value.id);
	 	clonnedDiv.find('#Index_promoInfo').html(value.summary);
	 	clonnedDiv.find('#drawing-date-value').html(new Date(value.drawings[0].drawing_date).toLocaleString("en-us",datetime_format));
	 	$("#promotion_container").append(clonnedDiv);
	 });

	} else {
	//Generate Promotions Details Page
	
	//Get Respective Promo Id Data Set/Object
	
	var promotionDataSet = promotions.promotion_objects.filter(function (promo) { return promo.id == res; })[0];
	
	//Hide Index Section
	$('#promotion_container').hide;
	
	//Change contents based on Promo Id/Code
	$("#title > span").html(new Date(promotionDataSet.drawings[0].entry_deadline).toLocaleString("en-us",datetime_format));
	var promotionDetailsContainer = $("#promotion_details_container");
	promotionDetailsContainer.find('figure > img').attr('src',promotionDataSet.promo_image_url);
	promotionDetailsContainer.find('#Inner_PromoTitle').html(promotionDataSet.promotion_name);
	promotionDetailsContainer.find('#Inner_PromoInfo').html(promotionDataSet.summary);
	promotionDetailsContainer.find('#EntryDetails').html(promotionDataSet.entry_info);
	promotionDetailsContainer.find('#EntryTicket').html(promotionDataSet.entries.length);

	 //Generate Drawing Schedule Table
	 var $table1Body = $('#listTable1').find("tbody");
	 
	 $(promotionDataSet.drawings).each(function (inx,val) {
	 	$trLast = $table1Body.find("tr:last");
	 	$trNew = $trLast.clone();
	 	$trNew.find('td:eq(0) > span').html(val.prize);
	 	$trNew.find('td:eq(1) > span').html(new Date(val.entry_deadline).toLocaleString("en-us",datetime_format));
	 	$trNew.find('td:eq(2) > span').html(new Date(val.drawing_date).toLocaleString("en-us",datetime_format));
	 	$trLast.after($trNew);
	 	$table1Body.find("tr:eq(1)").hide();
	 });
	 
	 
	 //Generate Total Tickets Entered Table
	 var $table2Body = $('#listTable2').find("tbody");
	 
	 $(promotionDataSet.entries).each(function (inx,val2) {
	 	$trLast = $table2Body.find("tr:last");
	 	$trNew = $trLast.clone();
	 	$trNew.find('td:eq(0) > span').html(val2.entry_number);
	 	$trNew.find('td:eq(1) > span').html(new Date(val2.date).toLocaleString("en-us",datetime_format));
	 	$trLast.after($trNew);
	 	$table2Body.find("tr:eq(1)").hide();
	 });
	}
});