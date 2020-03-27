$(document).ready(function(){
    function Currency(currency) {return currency.replace(/[$,]+/g,"");}
    function GetScore() {return parseInt($("#score").text());} 
    function AddToScore(clueAmount) {$("#score").text(GetScore()+parseInt(Currency(clueAmount)));}

    $(".clue").click(function(){
      $(this).addClass("selected");
        // console.log( $(this).text());
        // console.log(GetScore())
        let clueAmount = $(this).text();
        AddToScore(clueAmount);
    });
  

});