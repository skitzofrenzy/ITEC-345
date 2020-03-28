xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var JSONobj = JSON.parse(this.responseText);
    // console.log(JSONobj);

  var modal = $(".modal");
  function Currency(currency) {return currency.replace(/[$,]+/g,"");}
  function GetScore() {return parseInt($("#score").text());} 
  function AddToScore(clueAmt) {$("#score").text(GetScore()+clueAmt);}
  function MinusToScore(clueAmt) {$("#score").text(GetScore()-clueAmt);}

  //  var JSONobj = jQuery.parseJSON(JSversion);
  //  console.log(JSONobj);
  
    //Loops through each Catergory and sets the value to that is JSON
   $.each($(".categories-col"),(i,category)=>category.innerHTML = JSONobj.catergories[i]);

  $(".clue").click(function(){
    modal.show();
    //Sets Clue Amounts add modal header
    $("#clue-amount").text($(this).text());

    //removes click event on .clue
    $(this).unbind().addClass("selected");

    let clueAmount = $.trim($(this).text());
    
    // console.log($(this));
    let parent =$(this).parent();
    let parentID = parent.attr('id');
    // console.log(Jeopardy.clueareaCol);

    //finds index matching the id to object key for the catergory
    $.each(JSONobj.clueareaCol,function(index,cluecol){
      // console.log(parentID);
      if (Object.keys(cluecol)[0]==parentID){
        // console.log(index);
        

        // finds object that relates to value selected
        $.each($(this)[0],function(){
          // console.log($(this));
          $.each($(this),function(){
            // console.log($(this)[0].value);
            // console.log(parseInt(Currency(clueAmount)));

            if($(this)[0].value == parseInt(Currency(clueAmount))){
              console.log($(this)[0].answer);
              
            //Sets Question in Modal from JSON
              $("#modal-header-info").text($(this)[0].question);
              let clueAnswers = $(".clue-answers");
              let clueDetails = $(this)[0];
              $.each(clueAnswers,function(i,val){
                //adds Clues to Modal from JSON 
                $(this).text(clueDetails.options[i]);

                //unbind any click events or it disrupts the counting method holding previous events to it still
                $(this).unbind();

                //Adding Click Event Listener
                if(clueDetails.options[i]==clueDetails.answer){
                  $(this).click(function(){
                    AddToScore(clueDetails.value);
                    // $("#modal-header-info").text("CORRECT ANSWER");
                    // console.log("Correct"+clueDetails.value);
                    modal.hide();
                  });
                }
                else{$(this).click(function(){
                    MinusToScore(clueDetails.value);
                    // console.log("Incorrect"+clueDetails.value);
                    // $("#modal-header-info").text("WRONG ANSWER <br>Correct Answer"+clueDetails.answer);
                    modal.hide();
                  });
                }
              });

            }
          })
        });
        // console.log($(this)[0]);
        // console.log(Object.keys($(this)[0]));
        
      }
    })
    // console.log("Clue Amount: "+Currency(clueAmount)+" & Parent: "+parentID);
  });
}
}
xmlhttp.open("GET", "js/clueDetails.json", true);
xmlhttp.send();