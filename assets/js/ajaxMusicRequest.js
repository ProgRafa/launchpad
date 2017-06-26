$(document).ready(function(){
    $.ajax({
        url : "request.php",
        method : "POST",
        dataType : "json",
        
        success : function(resp){
            alert(resp);
        },

        error : function(err){
            alert("ERRO: " + err.status + " " + err.statusText);
        }
    });
});