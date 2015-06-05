var UNDEFINED = "undefined";
$(document).ready(function () {
    
    var filter_promotion = decodeURI(getQueryStringParams("promo"));
    if (filter_promotion == UNDEFINED) {
        buildIndexPage();
    }
    else {
        buildPromotionTable(filter_promotion);
    }

});

 /* 
 *This builds the promotion page
 */
function buildPromotionTable(filter_promotion) {

    $("#promotion_container").empty();
    
    //greater than 480px viewport- Background Gradient 
    $("#promotion_container").addClass("details");
    $("body").addClass("bg");

    //Index URL Promotion 
    var promotion = promotion_data.promotion_objects.filter(function (promo) { return promo.promo_id == filter_promotion; })[0]
    console.log(promotion);
    //Index page 
    var the_promohtml = $("<div>").addClass("landing-page-promo-container").addClass("holder");
	//Back Button
	the_promohtml.append($("<a/>").addClass("return_state").addClass("back").attr("href", "./index.html").attr("id", "home").html("< Back"));
    //Entry Deadline Date 
    the_promohtml.append($("<div/>").addClass("next-entry-deadline").addClass("promotion-less").html("The Next Entry Deadline is " + new Date(promotion.drawings[0].entry_deadline).toLocaleString("en-us", datetime_format) + "!"));
    //Banner Images calling 
    the_promohtml.append($("<figure/>").append($("<img/>").attr("src", promotion.promo_image_url).addClass("millionaire-madness").attr("alt", "Millionaire-Madness")));
    //define greater than 480px viewport and  480px or less viewport
    var promo_content_area = $("<div/>").attr("id", "drawingdate-above480");
    var promo_content_area_less = $("<div/>").attr("id", "drawingdate-less480").addClass("promotion-less");
  
    //Add body-promotion content  
    buildPromoInnerTable(promo_content_area, promotion,false)
    buildPromoInnerTable(promo_content_area_less, promotion,true)
    the_promohtml.append(promo_content_area);
    the_promohtml.append(promo_content_area_less);
    $("#promotion_container").append(the_promohtml);

}

 /* 
 *Helper method to build PromotionTable to style appropriately and build tables as well.
 */
function buildPromoInnerTable(promo_content_area, promotion, is_less) {
    if (is_less == false) {
        //greater than 480px viewport  - Header Part 
        promo_content_area.append($("<div/>").addClass("promotion_name").addClass("promotion-title").html(promotion.promotion_name));
        promo_content_area.append($("<p/>").addClass("summary").addClass("summary-drawing-date").html(promotion.summary));
        promo_content_area.append($("<h1/>").addClass("jsgrid-align-center").addClass("h1drawhead").addClass("promotion-title").html("Drawing Schedule"));
        //greater than 480px viewport - Drawing Schedule Fixed header table
        var schedule_table = $("<table/>").addClass("jsgrid-table");
        schedule_table.append($("<tr/>").addClass("jsgrid-header-row")
                .append($("<th/>").css("width", "100px").html("PRIZE"))
                .append($("<th/>").css("width", "100px").html("ENTRY DEADLINE"))
                .append($("<th/>").css("width", "100px").html("DRAWING DATE")));
        //greater than 480px viewport- Drawing Schedule Table body content 
        $(promotion.drawings).each(function (index, draw) {
            schedule_table.append($("<tr/>").addClass("jsgrid-row")
                .append($("<td/>").addClass("jsgrid-align-center").html(draw.prize))
                .append($("<td/>").addClass("jsgrid-align-center").html(new Date(draw.entry_deadline).toLocaleString("en-us", datetime_format)))
                .append($("<td/>").addClass("jsgrid-align-center").html(new Date(draw.drawing_date).toLocaleString("en-us", datetime_format))));
        });

        promo_content_area.append(schedule_table); 

        promo_content_area.append($("<p/>").addClass("madness_entryinfo").html(promotion.entry_info));
        promo_content_area.append($("<h1/>").addClass("jsgrid-align-center").addClass("h1drawhead").addClass("promotion-title").html("Your Total Tickets Entered: " + promotion.entries.length));
        promo_content_area.append($("<p/>").addClass("jsgrid-align-center").addClass("entry_summary").html("All entries are locked in at the time they are submitted and cannot be deleted"));
        //greater than 480px viewport - Total Tickets Fixed header table
        var entry_table = $("<table/>").addClass("jsgrid-table");
        entry_table.append($("<tr/>").addClass("jsgrid-header-row").append($("<th/>").css("width", "33%").html("ENTRY NUMBER"))
                .append($("<th/>").css("width", "67%").html("DATE")));

        //greater than 480px viewport- Total Tickets Fixed body table
        $(promotion.entries).each(function (index, entry) {
            entry_table.append($("<tr/>").addClass("jsgrid-row")
                .append($("<td/>").addClass("jsgrid-align-center").html(entry.entry_number))
                .append($("<td/>").addClass("jsgrid-align-center").html(new Date(entry.date).toLocaleString("en-us", datetime_format))));
        });

        promo_content_area.append(entry_table);
    }
    else {

        //480px or less viewport - Header Part
        promo_content_area.append($("<p/>").addClass("summary").addClass("summary-drawing-date").html(promotion.summary));

        promo_content_area.append($("<h1/>").addClass("jsgrid-align-center").addClass("h1drawhead").addClass("promotion-title").html("Drawing Schedule"));
        var schedule_table = $("<table/>").addClass("drawview");
      

        //480px or less viewport - Total Tickets Fixed header table
        $(promotion.drawings).each(function (index, draw) {
            schedule_table.append($("<tr/>")
                .append($("<td/>").addClass("entryhead border_white").html("PRIZE")) 
                .append($("<td/>").addClass("drawhead border_white").html(draw.prize)));

            schedule_table.append($("<tr/>")
                .append($("<td/>").addClass("entryhead border_white").html("ENTRY DEADLINE"))
                .append($("<td/>").addClass("drawhead border_white").html(new Date(draw.entry_deadline).toLocaleString("en-us", datetime_format))));

            schedule_table.append($("<tr/>")
               .append($("<td/>").addClass("entryhead border").html("DRAWING DATE"))
               .append($("<td/>").addClass("drawhead border").html(new Date(draw.drawing_date).toLocaleString("en-us", datetime_format))));
        });

        promo_content_area.append(schedule_table);
        //480px or less viewport -Entry info, Ticket Count , Ticket entry alert message
        promo_content_area.append($("<p/>").addClass("madness_entryinfo").html(promotion.entry_info));
        promo_content_area.append($("<h1/>").addClass("jsgrid-align-center").addClass("h1drawhead").addClass("promotion-title").html("Your Total Tickets Entered: " + promotion.entries.length));
        promo_content_area.append($("<p/>").addClass("jsgrid-align-center").addClass("red-alerttext").addClass("entry_summary").html("All entries are locked in at the time they are submitted and cannot be deleted"));

        //480px or less viewport - Total Tickets table
        var entry_table = $("<table/>").addClass("drawview");
        $(promotion.entries).each(function (index, entry) {
            entry_table.append($("<tr/>")
                .append($("<th/>").addClass("entryhead border_white").html("ENTRY NUMBER"))
                .append($("<td/>").addClass("jsgrid-align-center border_white").html(entry.entry_number)));
            entry_table.append($("<tr/>")
                .append($("<th/>").addClass("entryhead border").html("DATE"))
                .append($("<td/>").addClass("jsgrid-align-center border").html(new Date(entry.date).toLocaleString("en-us", datetime_format))));
        });
        promo_content_area.append(entry_table);

    }
};

 /*
 * Takes the feed data and builds index page 
 */
function buildIndexPage() {
    $("#promotion_container").empty();
    $(promotion_data.promotion_objects).each(function (index, promotion) {

        var the_indexhtml = $("<div>").addClass("landing-page-promo-container").addClass("holder");
        the_indexhtml.append($("<figure/>").append($("<img/>").attr("src", promotion.promo_image_url).addClass("millionaire-madness").attr("alt", "Millionaire-Madness")));

        //Index URL Promotion
        var promo_content_area = $("<div/>").addClass("content_area");
        promo_content_area.append($("<h1/>").addClass("promotion").addClass("promotion-title").append($("<a/>").addClass("promotion-title").attr("href", "./index.html?promo=" + promotion.promo_id).html(promotion.promotion_name)));
        promo_content_area.append($("<p/>").addClass("summary").addClass("summary-drawing-date").html(promotion.summary));
        promo_content_area.append($("<p/>").addClass("summary-drawing-date").addClass("promo_drawing_date").html("Next Drawing Date: " + new Date(promotion.drawings[0].drawing_date).toLocaleString("en-us", datetime_format)));
        the_indexhtml.append(promo_content_area);
    
        $("#promotion_container").append(the_indexhtml);
    });

};

 /*
 * The query strings of promo01 , promo02 etc. are added to the feed data.
 * Once the promotion link in the index page is hit this function filters the appropriate query strings back to the caller
 */
function getQueryStringParams(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
    return UNDEFINED;
}

