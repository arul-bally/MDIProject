$(document).ready(function(){
    var myURL = String(document.location).split("?")[0];

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));

    }


    var res = getParameterByName("promo");
    if (res == "") {
       
        $("#promotion_container").html('');
        var promotionDataSet = promotions.promotion_objects;

        $(promotionDataSet).each(function (key,value) {
            var output = '<div id="promo'+key+'" class="holder">';
            output +='<figure><img src="'+value.promo_image_url+'" class="millionaire-madness" alt="'+value.promotion_name+'"></figure>';
            output +='<div class="content_area">';
            output +='<a href="index.html?promo='+value.id+'" class="promotion promotion-title head_hide">'+value.promotion_name+'</a>';
            output +='<p class="summary summary-drawing-date head_hide">'+value.summary+'</p>';
            output +='<div class="txtdet"><span id="drawing-date" class="summary-drawing-date">Next Drawing Date:</span>';
            output +='<span id="drawing-date-value" class="summary-drawing-date">'+new Date(value.drawings[0].drawing_date).toLocaleString("en-us")+'</span>';
            output +='</div>';

            $("#promotion_container").append(output);
        });

    } else {
        $("#promotion_container").html('');
        $('body').addClass('bg');
        var promotionDataSet = promotions.promotion_objects.filter(function (promo) { return promo.id == res; })[0];

        var output = '<a class="return_state button back" href="index.html" id="home" style="display: block;">Back</a>';
        output +='<div class="header-position">';
        output +='<h1 id="title" class="next-entry-deadline" style="display: block;">The Next Entry Deadline is '+new Date(promotionDataSet.drawings[0].entry_deadline).toLocaleString("en-us")+'</h1>';
        output +='</div>';

        output +='<div id="promo'+res+'" class="holder">';
            output +='<figure><img src="'+promotionDataSet.promo_image_url+'" class="millionaire-madness" alt="'+promotionDataSet.promotion_name+'"></figure>';
                output +='<div class="details">';
                    output +='<div id="">';
                        output +='<div class="promotion promotion-title">'+promotionDataSet.promotion_name+'</div>';
                            output +='<p class="summary summary-drawing-date">'+promotionDataSet.summary+'</p>';
                            output +='<h1 class="jsgrid-align-center drawhead">DRAWING DATE</h1>';

                             output +='<table class="rwd-table">';
                                    output +='<tr>';
                                        output +='<th>PRIZE</th>';
                                        output +='<th>ENTRY DEADLINE</th>';
                                        output +='<th>DRAWING DATE</th>';
                                    output +='</tr>';
                                   $(promotionDataSet.drawings).each(function (inx,val) {
                                        output +='<tr>';
                                            output +='<td data-th="PRIZE">'+val.prize+'</td>';
                                            output +='<td data-th="ENTRY DEADLINE">'+new Date(val.entry_deadline).toLocaleString("en-us")+'</td>';
                                            output +='<td data-th="DRAWING DATE">'+new Date(val.drawing_date).toLocaleString("en-us")+'</td>';
                                        output +='</tr>';
                                   })
                            output +='</table>';
                        output +='</div>'
                        output +='<p class="entrytxt">Entry Info</p>';
                        output +='<h1 class="jsgrid-align-center tickethead">Your Total Tickets Entered:'+promotionDataSet.entries.length+'</h1>';
                        output +='<p class="jsgrid-align-center txt">All entries are locked in at the time they are submitted and cannot be deleted</p>';


                        output +='<div>';
                            output +='<div>';
                                output +='<table class="rwd-table">';
                                        output +='<tr>';
                                            output +='<th>ENTRY NUMBER</th>';
                                            output +='<th>DATE</th>';
                                        output +='</tr>';
                                        $(promotionDataSet.entries).each(function (inx,val) {
                                            output +='<tr>';
                                            output +='<td data-th="ENTRY NUMBER">'+val.entry_number+'</td>';
                                            output +='<td data-th="DATE">'+new Date(val.date).toLocaleString("en-us")+'</td>';
                                            output +='</tr>';
                                        });
                                output +='</table>';

                    output +='</div>'
                output +='</div>'
        output +='</div>'

         $("#promotion_container").append(output);
    }
});