let qrcode = new QRCode("qrcode" , {
    width: 160,
    height: 160,
    colorLight: "rgb(238, 238, 238)",
    correctLevel : QRCode.CorrectLevel.H
});
let i = 0;
let a = new Array();
$(function(){
    $("#get").click(function(){
        let input = $("#text").val();
        if(!input){
            $("#qrcode").hide();
            $("#error").text("Please insert an address.");
            $("#text").focus();
        }
        else{
            $("#qrcode").show();
            $("#error").empty();
            qrcode.clear();
            qrcode.makeCode(input);
            (function history(){
                a[i] = [JSON.stringify(window.Date()) , input];
                localStorage.setItem("date" , a[i][0] );
                localStorage.setItem("url" , a[i][1] );
                document.getElementById("log").innerHTML += (i+1) +". " + "<b>QRCode generated<br/>Date and time: </b><br/>" +localStorage.getItem("date") + "<br/>" 
                + "<b>Given URL: </b><br/>" + localStorage.getItem("url")  + "<br/>"
                i++;
            })();
        }
    });
    $("#clear").click(function(){
       if(!$("#qrcode").is(":empty")){
       $("#qrcode").hide();
       }
    });
  $("#content").on('DOMSubtreeModified' , function(){
    a[i] = [JSON.stringify(window.Date()) , document.getElementById("content").textContent];
    localStorage.setItem("date" , a[i][0] );
    localStorage.setItem("url" , a[i][1] );
    document.getElementById("log").innerHTML += (i+1) +". "+ "<b>QRCode converted to URL<br/>Date and time: </b><br/>" + localStorage.getItem("date") + "<br/>" 
    + "<b>Output: </b><br/>"+ localStorage.getItem("url")  + "<br/>"
    i++;
  })
});