$(document).ready(function(){

	if(!sessionStorage.getItem('userObj'))
		sessionStorage.setItem('userObj', JSON.stringify(users));
	
	var useradd_inprogress = false;
	
	$(document).on('keyup','input',function () {
		$(this).removeClass('error');
	});

	Array.prototype.insert = function (index, item) {
		this.splice(index, 0, item);
	};

	function list() {
		var table1Body = $('table');
		var allUsers = JSON.parse(sessionStorage.getItem('userObj'));

		console.log(allUsers);

		$.each(allUsers,function (inx,val) {
			var trLast = table1Body.find("tr:last");
			var trNew = trLast.clone();
			var tds = trNew.find('td:eq(0)').html(val.name);
			var tds = trNew.find('td:eq(1)').html(val.phone);
			var tds = trNew.find('td:eq(2)').html(val.title);
			var tds = trNew.find('td:eq(3)').html(val.office);
			trLast.after(trNew);
		});		

		$(".btnEdit").bind("click", Edit);
		$(".btnDelete").bind("click", Delete);
		$("#btnAdd").bind("click", Add);
	}
	
	function Add(){

		if(useradd_inprogress == false)
		{
			useradd_inprogress = true;
			$("table tbody").append(
				"<tr>"+
				"<td><input type='text' placeholder='Name' value='' /></td>"+
				"<td><input type='text' placeholder='Phone Ex(123-456-7890)' value='' /></td>"+
				"<td><input type='text' placeholder='Title' value='' /></td>"+
				"<td><input type='text' placeholder='Office Ex(123-456-7890)' value='' /></td>"+
				"<td><img src='images/Save.png' class='btnSave' alt='Save' title='Save'><img src='images/Delete.png' class='btnDelete' alt='Delete' title='Delete'/></td>"+
				"</tr>");

			$(".btnSave").bind("click", Save);		
			$(".btnDelete").bind("click", Delete);
		}
		else
		{
			alert("Complete/Cancel Existing Process");
		}
	};

	function Edit(){

		if(useradd_inprogress==false)
		{
			var par = $(this).parent().parent(); 
			var tdName = par.children("td:nth-child(1)");
			var tdTelephone = par.children("td:nth-child(2)");
			var tdTitle = par.children("td:nth-child(3)");
			var tdOffice = par.children("td:nth-child(4)");
			var tdActions = par.children("td:nth-child(5)");

			tdName.html("<input type='text' id='txtNome' value='"+tdName.html()+"'/>");
			tdTelephone.html("<input type='text' id='txtTelefone' value='"+tdTelephone.html()+"'/>");
			tdTitle.html("<input type='text' id='txtEmail' value='"+tdTitle.html()+"'/>");
			tdOffice.html("<input type='text' id='txtOffice' value='"+tdOffice.html()+"'/>");
			tdActions.html("<img src='images/Save.png' class='btnSave' alt='Save' title='Save'/>");
			
			$(".btnSave").bind("click",'edit',Save);

		} else {
			alert("Complete/Cancel Existing Process");
		}
	};
	
	function Save(e){
		
		var par 		= $(this).parent().parent();
		var tdName 		= par.children("td:nth-child(1)");
		var tdTelephone = par.children("td:nth-child(2)");
		var tdTitle 	= par.children("td:nth-child(3)");
		var tdOffice 	= par.children("td:nth-child(4)");
		var tdActions 	= par.children("td:nth-child(5)");
		
		var isValid 	= validateNewUserData();

		if(isValid)
		{
			if(e.data == 'edit') {
				console.log("Updating User Data");
				var updatedUserData = {
					name   : tdName.children("input[type=text]").val(),
					phone  : tdTelephone.children("input[type=text]").val(),
					title  : tdTitle.children("input[type=text]").val(),
					office : tdOffice.children("input[type=text]").val(),
				};

				var tableRow = $(this).closest('tr');
				var index = parseInt($(tableRow).index())-1;

				var allUsers = JSON.parse(sessionStorage.getItem('userObj'));
				allUsers.splice(index, 1);
				allUsers.insert(index,updatedUserData);
				sessionStorage.setItem('userObj', JSON.stringify(allUsers));
				console.log(allUsers);
				
			} else {
				console.log("Saving New User Data");
				var newUserData = {
					name   : tdName.children("input[type=text]").val(),
					phone  : tdTelephone.children("input[type=text]").val(),
					title  : tdTitle.children("input[type=text]").val(),
					office : tdOffice.children("input[type=text]").val(),
				};

				var allUsers = JSON.parse(sessionStorage.getItem('userObj'));
				allUsers.push(newUserData);
				sessionStorage.setItem('userObj', JSON.stringify(allUsers));
				console.log(allUsers);
			}

			tdName.html(tdName.children("input[type=text]").val());
			tdTelephone.html(tdTelephone.children("input[type=text]").val());
			tdTitle.html(tdTitle.children("input[type=text]").val());
			tdOffice.html(tdOffice.children("input[type=text]").val());
			tdActions.html("<img src='images/Edit.png' class='btnEdit' alt='Edit' title='Edit'/><img src='images/Delete.png' class='btnDelete' alt='Delete' title='Delete'/>");

			useradd_inprogress = false;	

			$(".btnEdit").bind("click", Edit);
			$(".btnDelete").bind("click", Delete);

		}
	};

	function validateNewUserData () {
		var isValid = true;

		$("table tbody input").each(function (inx) {
			if(!($(this).val())) {
				$(this).addClass('error');
				isValid = false;
			} else if(inx == 1) {
				if(!(validatePhone($.trim($(this).val())))){
					$(this).addClass('error');
					isValid = false;
				}
			} else if(inx == 3) {
				if(!(validatePhone($.trim($(this).val())))){
					$(this).addClass('error');
					isValid = false;
				}
			}
		});

		return isValid;
	}

	function validatePhone(phoneNumber){
		var phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/; 
		return phoneNumberPattern.test(phoneNumber); 
	}

	function Delete(){

		var tableRow = $(this).closest('tr');
		var index = parseInt($(tableRow).index())-1;
		$(tableRow).remove();

		if(index >= 0) {
			var allUsers = JSON.parse(sessionStorage.getItem('userObj'));
			
			allUsers.splice(index, 1);

			console.log("After Deleting");
			console.log(allUsers);

			sessionStorage.setItem('userObj', JSON.stringify(allUsers));
		}
	};
	
	list();
});