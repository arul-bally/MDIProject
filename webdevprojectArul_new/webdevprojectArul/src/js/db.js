(function() {

    var db = {

        insertItem: function(insertingClient) {
            this.clients.push(insertingClient);
        },

        updateItem: function(updatingClient) { },

        deleteItem: function(deletingClient) {
            var clientIndex = $.inArray(deletingClient, this.clients);
            this.clients.splice(clientIndex, 1);
        }

    };

    window.db = db;

   
    db.clients = [
        {
            "PRIZE": "$10,000",
            "ENTRY DEADLINE": "Wednesday, October 22 2015",
            "DRAWING DATE": "Thursday, October 23  2015",
               },

          {
            "PRIZE": "$8,500",
            "ENTRY DEADLINE": "Thursday, October 25, 2015",
            "DRAWING DATE": "Friday, October 26, 2015",
  
        }


       

      
    ];


db.clients1 = [
        {
            "ENTRY NUMBER": "564825698534",
            "DATE": "Wednesday, October 22 2015",
           
        },

          {
            "ENTRY NUMBER": "456987123654",
            "DATE": "Thursday, October 23 2015",
            
        }


];
db.clients2 = [
{
            "PRIZE": "$6,500",
            "ENTRY DEADLINE": "Monday, November 02 2015",
            "DRAWING DATE": "Tuesday, November 03 2015",
               },

          {
            "PRIZE": "$7,000",
            "ENTRY DEADLINE": "Thursday, November 19 2015",
            "DRAWING DATE": "Friday, November 20 2015",
  
        }


];
db.clients3 = [
         {
            "ENTRY NUMBER": "159263487548",
            "DATE": "Thursday, November 12, 2015",
           
        },

          {
            "ENTRY NUMBER": "985632147981",
            "DATE": "Friday, November 13 2015",
            
        }


];
db.clients4 = [
        {
            "PRIZE": "$5,500",
            "ENTRY DEADLINE": "Wednesday, October 22 2015",
            "DRAWING DATE": "Wednesday, October 29 2015",
               },

          {
            "PRIZE": "$4,999",
            "ENTRY DEADLINE": "Sunday, November 29 2015",
            "DRAWING DATE": "Monday, November 30 2015",
  
        }


];
db.clients5 = [
        {
            "ENTRY NUMBER": "326589471456",
            "DATE": "Friday, December 11 2015",
           
        },

          {
            "ENTRY NUMBER": "654879523485",
            "DATE": "Friday, December 18 2015",
            
        }


];
  

}());