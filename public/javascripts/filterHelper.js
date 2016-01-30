function getUrlVars()
{
    var vars = [], hash;
    var a = [];
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {   
    	console.log(hashes.length);
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
        a[i] = vars[hash[0]];
        console.log(vars[hash[0]]);
    }
    

    for(var i=0;i<a.length;i++) {
    	console.log(a[i]);
    }

    var s = a[5] * 68;
    if(a[1]<a[5])
    {
    	$('#btitle').html(a[0].replace(/%20/g, " "));
    	$('#bprice').html(Math.round(a[1]));
    	$('#bbn').attr("href",a[2]);
    }
    else {
    	$('#btitle').html(a[4].replace(/%20/g, " "));
    	$('#bbn').attr("href",a[6]);
    	$('#bprice').html(Math.round(s));
    }

    $('#fftitle1,#fftitle2,#fftitle3').html(a[0].replace(/%20/g, " "));
    $('#eftitle1,#eftitle2,#eftitle3').html(a[4].replace(/%20/g, " "));
    $('#ffamt1,#ffamt2,#ffamt3').html(a[1]);
    $('#efamt1,#efamt2,#efamt3').html(Math.round(s));
    $('#ffbn1,#ffbn2,#ffbn3').attr("href" ,a[2]);
    $('#efbn1,#efbn2,#efbn3').attr("href" ,a[6]);
    $('#ffproddesc').html(a[7].replace(/%20/g, " "));
    $('#ffimg').attr("src", a[8]);


    return vars;
}