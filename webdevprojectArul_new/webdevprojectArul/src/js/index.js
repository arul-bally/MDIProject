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

        $('#promotion_details_container').addClass('displayNone');
        var promotionDataSet = promotions.promotion_objects;

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
        $('body').addClass('bg');
        var promotionDataSet = promotions.promotion_objects.filter(function (promo) { return promo.id == res; })[0];
        $('#promotion_container').addClass('displayNone');
        $(".back").removeClass('displayNone').addClass('displayBlock');
        $(".next-entry-deadline").removeClass('displayNone').addClass('displayBlock');
        $(".next-entry-deadline > span").html(new Date(promotionDataSet.drawings[0].entry_deadline).toLocaleString("en-us",datetime_format));

        $("#promotion_details_container").find('figure > img').attr('src',promotionDataSet.promo_image_url);
        $("#promotion_details_container").find('div.promotion-title').html(promotionDataSet.promotion_name);
        $("#promotion_details_container").find('p.summary-drawing-date').html(promotionDataSet.summary);
        $("#promotion_details_container").find('p.madness_entryinfo').html(promotionDataSet.entry_info);
        $("#promotion_details_container").find('span.totalTicketsEntered').html(promotionDataSet.entries.length);


        var $table1Body = $('.table1').find("tbody");
        
        $(promotionDataSet.drawings).each(function (inx,val) {
            $trLast = $table1Body.find("tr:last");
            $trNew = $trLast.clone();
            var tds = $trNew.find('td:eq(0) > span').html(val.prize);
            var tds = $trNew.find('td:eq(1) > span').html(new Date(val.entry_deadline).toLocaleString("en-us",datetime_format));
            var tds = $trNew.find('td:eq(2) > span').html(new Date(val.drawing_date).toLocaleString("en-us",datetime_format));
            $trLast.after($trNew);
            $table1Body.find("tr:eq(1)").hide();
        });

        var $table2Body = $('.table2').find("tbody");
        
        $(promotionDataSet.entries).each(function (inx,val2) {
            $trLast = $table2Body.find("tr:last");
            $trNew = $trLast.clone();
            var tds = $trNew.find('td:eq(0)').html(val2.entry_number);
            var tds = $trNew.find('td:eq(1)').html(new Date(val2.date).toLocaleString("en-us"));
            $trLast.after($trNew);
            $table2Body.find("tr:eq(1)").hide();
        })
    }
});