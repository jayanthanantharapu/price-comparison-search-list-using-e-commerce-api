// var request = require("request")

function fetchData(){


}

function sendFormData(){
            var formData = JSON.stringify($("#searchField").serializeArray());


            console.log(" Client js retrieve val from ui "+formData);


            $.ajax({
                type: "POST",
                url:"http://localhost:3000/fgetData",
                data: formData,
                body: JSON.stringify(formData),
                json: true,
    			headers: {
		        "content-type": "application/json",
    			}
            }).done(function(data){

            	console.log(" data "+JSON.stringify(data));
            	
                $('#ftitle').html(data.ftitle);
                $('#famt').html(data.famt);
                $('#fprodurl').attr("href", data.fprodurl);

            }).fail(function(){

            	alert('text status ' + JSON.stringify(textstatus) + ', err ' + JSON.stringify(errorThrown));

            });

            $.ajax({
                type: "POST",
                url:"http://localhost:3000/egetData",
                data: formData,
                body: JSON.stringify(formData),
                json: true,
                headers: {
                "content-type": "application/json",
                }
            }).done(function(data){

                console.log(" data "+JSON.stringify(data));
                
                $('#etitle').html(data.etitle);
                $('#eamt').html(data.eamt);
                $('#eprodurl').attr("href", data.eprodurl);

            }).fail(function(){

                alert('text status ' + JSON.stringify(textstatus) + ', err ' + JSON.stringify(errorThrown));

            });



            
        } 
