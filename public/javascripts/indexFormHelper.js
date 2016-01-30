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

            	console.log(" data from Client js "+JSON.stringify(data));

                $('#ftitle1').html(data[0].productBaseInfo.productAttributes.title);
                $('#famt1').html(data[0].productBaseInfo.productAttributes.sellingPrice.amount);
                $('#fprodurl1').attr("href", data[0].productBaseInfo.productAttributes.productUrl);
                $('#fimgurl1,#fimgurl6').attr("src", data[0].productBaseInfo.productAttributes.imageUrls.unknown); 

                $('#ftitle2').html(data[1].productBaseInfo.productAttributes.title);
                $('#famt2').html(data[1].productBaseInfo.productAttributes.sellingPrice.amount);
                $('#fprodurl2').attr("href", data[1].productBaseInfo.productAttributes.productUrl);
                $('#fimgurl2,#fimgurl7').attr("src", data[1].productBaseInfo.productAttributes.imageUrls.unknown);

                $('#ftitle3').html(data[2].productBaseInfo.productAttributes.title);
                $('#famt3').html(data[2].productBaseInfo.productAttributes.sellingPrice.amount);
                $('#fprodurl3').attr("href", data[2].productBaseInfo.productAttributes.productUrl);
                $('#fimgurl3,#fimgurl8').attr("src", data[2].productBaseInfo.productAttributes.imageUrls.unknown);

                $('#ftitle4').html(data[3].productBaseInfo.productAttributes.title);
                $('#famt4').html(data[3].productBaseInfo.productAttributes.sellingPrice.amount);
                $('#fprodurl4').attr("href", data[3].productBaseInfo.productAttributes.productUrl);
                $('#fimgurl4,#fimgurl9').attr("src", data[3].productBaseInfo.productAttributes.imageUrls.unknown);

                $('#ftitle5').html(data[4].productBaseInfo.productAttributes.title);
                $('#famt5').html(data[4].productBaseInfo.productAttributes.sellingPrice.amount);
                $('#fprodurl5').attr("href", data[4].productBaseInfo.productAttributes.productUrl);
                $('#fimgurl5,#fimgurl10').attr("src", data[4].productBaseInfo.productAttributes.imageUrls.unknown);


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
                
                $('#eamt1').html(data[0].ConvertedCurrentPrice.Value);
                $('#etitle1').html( data[0].Title);

                $('#eamt2').html(data[1].ConvertedCurrentPrice.Value);
                $('#etitle2').html( data[1].Title);

                $('#eamt3').html(data[2].ConvertedCurrentPrice.Value);
                $('#etitle3').html( data[2].Title);

                $('#eamt4').html(data[3].ConvertedCurrentPrice.Value);
                $('#etitle4').html( data[3].Title);

                $('#eamt5').html(data[4].ConvertedCurrentPrice.Value);
                $('#etitle5').html( data[4].Title);

            }).fail(function(){

                alert('text status ' + JSON.stringify(textstatus) + ', err ' + JSON.stringify(errorThrown));

            });
            
} 

function sendFilterData(){
    console.log('filter req');
    var filtertext = JSON.stringify($("#ftitle1").text());
    var filterData ={value:filtertext};
    var dataSend = JSON.stringify(filterData) ;

    var fftitle , ffamt , ffprodurl , ffproddesc;

     // JSON.stringify($("#ftitle1").text());


    console.log(" Client  sendFilterData()  retrieve val from ui "+dataSend);
     $.ajax({
                type: "POST",
                url:"http://localhost:3000/fuser",
                data: dataSend ,
                body: JSON.stringify(dataSend ),
                json: true,
                headers: {
                "content-type": "application/json",
                }
            }).done(function(data){
                console.log("flip data "+JSON.stringify(data));
                fftitle=data[0].productBaseInfo.productAttributes.title;
                ffamt = data[0].productBaseInfo.productAttributes.sellingPrice.amount;
                ffprodurl = data[0].productBaseInfo.productAttributes.productUrl;
                ffimg = data[0].productBaseInfo.productAttributes.imageUrls.unknown;
                ffproddesc = data[0].productBaseInfo.productAttributes.productDescription;
                console.log(ffproddesc);
                //location.assign("http://localhost:3000/users?ffdata="+data);
                /*$('#fftitle').html(data[0].productBaseInfo.productAttributes.title);
                $('#ffamt1').html(data[0].productBaseInfo.productAttributes.sellingPrice.amount);
                $('#ffprodurl1').attr("href", data[0].productBaseInfo.productAttributes.productUrl);*/
            }).fail(function(errorThrown){
                console.log('text status ' +  ', err ' + JSON.stringify(errorThrown));
            });

    $.ajax({
                type: "POST",
                url:"http://localhost:3000/euser",
                data: dataSend ,
                body: JSON.stringify(dataSend),
                json: true,
                headers: {
                "content-type": "application/json",
                }
            }).done(function(data){
                console.log("ebay data "+JSON.stringify(data));
                eftitle = data[0].Title;
                efamt=data[0].ConvertedCurrentPrice.Value;
                
                efprodurl = data[0].ViewItemURLForNaturalSearch;
                location.assign("http://localhost:3000/users?fftitle="+fftitle+"&ffamt="+ffamt+"&ffprodurl="+ffprodurl+"&eftitle="+eftitle+"&efamt="+efamt+"&efprodurl="+efprodurl+"&ffproddesc="+ffproddesc+"&ffimg="+ffimg);

            }).fail(function(errorThrown){
                console.log('text status ' +  ', err ' + JSON.stringify(errorThrown));
            });
}