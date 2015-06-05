/*t 
    Created on : 
    Author     : MDI Team
*/
$(document).ready(function(){
	
	//Header
	$("#title").text("The Next Entry Deadline is Wednesday, October 22 2015!");
	$("#home").text("Back");
	
	//Promo 1
    $(".promotion").text("Millionaire Madness");
    $(".summary").text("Summary");
    $("#drawing-date").text("Next Drawing Date:");
    $("#drawing-date-value").text("23-05-2015");
    
    //Promo 2
    $(".money").text("Money  Money Millionaire");
    $(".money-summary").text("Summary");
    $("#money-drawing-date").text("Next Drawing Date:");
    $("#money-drawing-date-value").text("28-05-2015");
    
    //Promo 3
    $(".fortunetitle").text("Fortune");
    $(".fortune-summary").text("Fortune Summary");
    $("#fortune-drawing-date").text("Next Drawing Date:");
    $("#fortune-drawing-date-value").text("12-06-2015");


	// headeing

    $('.drawhead').text("Drawing Schedule");
    $('.tickethead').text("Your Total Tickets Entered:2");
    $('.txt').text("All entries are locked in at the time they are submitted and cannot be deleted");
    $(".entrytxt").text ("Entry Info")


    //list view text
     $('.listhead').text("PRIZE");
     $('#listprice').text("$10,000");
     $('#listprice1').text("$8,500");
     $('#listprice2').text("$6,500");
     $('#listprice3').text("$7,500");
     $('#listprice4').text("$5,500");
     $('#listprice5').text("$4,999");


     $('.entryhead').text("ENTRY DEADLINE");
     $('#entrydate').text ('Wednesday, October 22 2015');
     $('#entrydate1').text ('Thursday, October 25, 2015');
     $('#entrydate2').text ("Monday, November 02, 2015");
     $('#entrydate3').text ("Thursday, November 19 2015");
     $('#entrydate4').text ("Wednesday, October 22 2015");
     $('#entrydate5').text ("Sunday, November 29 2015");
     

     $('.drawhead').text("DRAWING DATE");
     $('#drawdate').text ('Thursday, October 23, 2015');
     $('#drawdate1').text ('Friday, October 26, 2015');
     $('#drawdate2').text ("Tuesday, November 03, 2015");
     $('#drawdate3').text ("Friday, November 20 2015");
     $('#drawdate4').text ("Wednesday, October 29 2015");
     $('#drawdate5').text ("Monday, November 30 2015");

     $('.red-alerttext').text("All entries are locked in at the time they are submitted and cannot be deleted");
    
     $('.entrynumberhead').text("ENTRY NUMBER");
     $('#num').text ('564825698534');
     $('#num1').text ('456987123654');
     $('#num2').text ('159263487548');
     $('#num3').text ('985632147981');
     $('#num4').text ('326589471456');
     $('#num5').text ('654879523485');

     $('.ticketdate').text("DATE");
     $('#ticketdate1').text ("Monday, November 02, 2015");
     $('#ticketdate2').text ("Tuesday, November 03 2015");
     $('#ticketdate3').text ("Thursday, November 12, 2015");
     $('#ticketdate4').text ("Friday, November 13 2015");
     $('#ticketdate5').text ("Thursday, November 12, 2015");
     $('#ticketdate6').text ("Friday, November 13 2015");


	

	//Data grid
	$("#jsGrid").jsGrid({
                //height: "70%",
                width: "100%",
                sorting: false,
                paging: false,
                fields: [
                    { name: "PRIZE", type: "text", align : "center" },
                    { name: "ENTRY DEADLINE", type: "number", align : "center" },
                    { name: "DRAWING DATE", type: "text", align : "center"}
                    
                ],
                data: db.clients
            });
            
         $("#jsGrid1").jsGrid({
                //height: "70%",
                width: "100%",
                sorting: false,
                paging: false,
                fields: [
                    { name: "ENTRY NUMBER", type: "text", align : "center", width: "33%" },
                    { name: "DATE", type: "number", align : "center", width: "67%" }

                ],
                data: db.clients1
            });

         $("#jsGrid2").jsGrid({
                //height: "70%",
                width: "100%",
                sorting: false,
                paging: false,
                fields: [
                    { name: "PRIZE", type: "text", align : "center" },
                    { name: "ENTRY DEADLINE", type: "number", align : "center" },
                    { name: "DRAWING DATE", type: "text", align : "center"}

                ],
                data: db.clients2
            });
         $("#jsGrid3").jsGrid({
                //height: "70%",
                width: "100%",
                sorting: false,
                paging: false,
                fields: [
                    { name: "ENTRY NUMBER", type: "text", align : "center", width: "33%" },
                    { name: "DATE", type: "number", align : "center", width: "67%" }

                ],
                data: db.clients3
            });
         $("#jsGrid4").jsGrid({
                //height: "70%",
                width: "100%",
                sorting: false,
                paging: false,
                fields: [
                    { name: "PRIZE", type: "text", align : "center" },
                    { name: "ENTRY DEADLINE", type: "number", align : "center" },
                    { name: "DRAWING DATE", type: "text", align : "center"}

                ],
                data: db.clients4
            });
         $("#jsGrid5").jsGrid({
                //height: "70%",
                width: "100%",
                sorting: false,
                paging: false,
                fields: [

                    { name: "ENTRY NUMBER", type: "text", align : "center", width: "33%" },
                    { name: "DATE", type: "number", align : "center", width: "67%" }

                ],
                data: db.clients5
            });






});


$(function() {
    var myURL = String(document.location).split("?")[0];

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));

    }
    $(".details").hide();
    $(".return_state").hide();
    //$(".next-entry-deadline").hide();
    var res = getParameterByName("promo");
    if (res != "") {
        var ind = res.split("promo")[1] - 1;
        $(".return_state").show();
        $(".holder").hide().eq(ind).show().find(".details").show();
        $(".txtdet").hide();
        $(".head_hide").hide();
        $('body').addClass("bg");
        //$(".holder").css('background', '#ccc');
    }
    $(".content_area > h1").click(function() {
        var ind = $(".content_area").index($(this).parent());
        //$(".content_area").hide().eq(ind).show();
        myURL = String(document.location).split("?")[0];
        document.location = myURL + "?promo=promo" + (ind + 1);
    });
    $(".return_state").click(function() {
        document.location = myURL;
        $("#.promo1").show();

    });

    if(!$('.promotion-less').is(':visible'))
    {
        $(".next-entry-deadline").hide();
    }
});

// $(function(){
// var myURL = String(document.location).split("?")[0];
// function getParameterByName(name) {
// name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
// var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
// results = regex.exec(location.search);
// return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));

// }
// $(".details").hide();
// $(".return_state").hide();
// var res=getParameterByName("promo");
// if(res!=""){
// var ind=res.split("promo")[1]-1;
// $(".return_state").show();
// $(".holder").hide().eq(ind).show().find(".details").show();
// $(".txtdet").hide();
// $(".head_hide").hide();
// $("body").css('background','#eee');
// }
// $(".content_area > h1").click(function(){
// var ind=$(".content_area").index($(this).parent());
// //$(".content_area").hide().eq(ind).show();
//  myURL = String(document.location).split("?")[0];
// document.location = myURL + "?promo=promo"+(ind+1);
// });
// $(".return_state").click(function(){
// document.location = myURL;
// $("#.promo1").show();
// $("body").css('background','#fff');
//  });
// });


