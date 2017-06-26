var dificult;
var qtyButtons;

function verifyChecked(radio)
{
    if(radio.children[1].checked)
        radio.style.background="rgba(192, 71, 0, 1)";
    else
        radio.style.background="none";
}

window.onload = function ()
{
    var choose = document.getElementsByClassName("new-style-radio");
    var start = document.getElementById("start");


    for(var i=0; i < choose.length;i++)
    {
        verifyChecked(choose[i]);
        choose[i].addEventListener("change", function()
        {
            console.log(this.children[1].getAttribute("id"));
            for(var j=0; j<choose.length;j++)
            {
               verifyChecked(choose[j]);
            }
        });
    }
}
