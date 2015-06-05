/*
* Author MDI Team
*/

$(document).ready(function(){
    var myURL = String(document.location).split("?")[0];

    /**
    * Return promo id/code
    * @param {String} Get Variables  
    * @return {String} promo id/code
    */
    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }

//Get Promo Id/Code
var res = getParameterByName("promo");

//Generate Index Page
if (res == "") {

    //Hide Details Section
    $('#promotion_details_container').hide();

    //Get all Promotions from Promotion Object
    var promotionDataSet = promotions.promotion_objects;

    //For each Promotions Generate Div by clonning Existing Div
    $(promotionDataSet).each(function (key,value) {
        var clonnedDiv;
        clonnedDiv = $("#promo0").clone(true);
        clonnedDiv.id = 'promo'+key;
        clonnedDiv.attr('class','displayBlock');
        clonnedDiv.find('img').attr('src',value.promo_image_url);
        clonnedDiv.find('.promotion-title').html(value.promotion_name);
        clonnedDiv.find('.promotion-title').attr('href','index.html?promo='+value.id);
        clonnedDiv.find('.summary').html(value.summary);
        clonnedDiv.find('#drawing-date-value').html(new Date(value.drawings[0].drawing_date).toLocaleString("en-us",datetime_format));
        $("#promotion_container").append(clonnedDiv);
    });

} else {
        //Generate Promotions Details Page

        //$('body').addClass('bg');
        //Get Respective Promo Id Data Set/Object
        var promotionDataSet = promotions.promotion_objects.filter(function (promo) { return promo.id == res; })[0];

        //Hide Index Section
        $('#promotion_container').hide();
        
        //Change contents based on Promo Id/Code
        $(".next-entry-deadline > span").html(new Date(promotionDataSet.drawings[0].entry_deadline).toLocaleString("en-us",datetime_format));
        var promotionContainer = $("#promotion_details_container");
        promotionContainer.find('figure > img').attr('src',promotionDataSet.promo_image_url);
        promotionContainer.find('div.promotion-title').html(promotionDataSet.promotion_name);
        promotionContainer.find('p.summary-drawing-date').html(promotionDataSet.summary);
        promotionContainer.find('p.madness_entryinfo').html(promotionDataSet.entry_info);
        promotionContainer.find('span.totalTicketsEntered').html(promotionDataSet.entries.length);

        //Generate Drawing Schedule Table
        var $table1Body = $('.table1').find("tbody");
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
        var $table2Body = $('.table2').find("tbody");
        $(promotionDataSet.entries).each(function (inx,val2) {
            $trLast = $table2Body.find("tr:last");
            $trNew = $trLast.clone();
            $trNew.find('td:eq(0) > span').html(val2.entry_number);
            $trNew.find('td:eq(1) > span').html(new Date(val2.date).toLocaleString("en-us",datetime_format));
            $trLast.after($trNew);
            $table2Body.find("tr:eq(1)").hide();
        })
    }
});