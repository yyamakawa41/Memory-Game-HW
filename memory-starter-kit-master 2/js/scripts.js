// function toggle(theElement){
//     var theElement = document.getElementById(theElement);
    
//     //Show the element or hide it
//     // if ( theElement.style.display != 'block' ) {
//     //     theElement.style.display = 'block';
//     // }else{
//     //     theElement.style.display = 'none';
//     // }

//     //Hide all elements, then show the one we clicked on
//     var elementsToHide = document.getElementsByClassName('mg_tile-inside');
//     for(i=0; i<elementsToHide.length; i++){
//         elementsToHide[i].style.display = 'none';
//     }

//     //Show the element or hide it
//         theElement.style.display = 'block';
// }

var moves=0;

$(document).ready(function(){

    var gridSize = 16;
    var gridArray = [];
    for(i=1; i<=gridSize; i++){
        gridArray.push(i);
    }

    //shuffle the element to the back of the div 25 times
    for(i=1;i<25;i++){
        var rand = Math.floor(Math.random() * 8);
        var rand2 = Math.floor(Math.random() * 8);
        console.log(rand + ' - ' + rand2);
        var temp = gridArray[rand];
        gridArray[rand] = gridArray[rand2];
        gridArray[rand2] = temp;
    }

    console.log(gridArray);

    for(i=1; i<=gridSize; i++){
        var html = '<div class="mg_tile mg_tile-'+i+'"><div class="mg_tile-inner"><div class="mg_tile-outside"></div><div class="mg_tile-inside" id="mg-tile-'+i+'"><img src="img/default/monsters-04.png"></div></div></div>';
        $(html).appendTo($('.mg_contents'));
    }

    // //shuffle the element to the back of the div 25 times
    // for(i=1;i<25;i++){
    //     var rand = Math.floor(Math.random() * 8 + 1);
    //     $('.mg_tile-'+rand).appendTo($('.mg_contents'))
    // }

    //Add click listener to each tile
    $('.mg_tile').click(function(){
        //If there are already 2 showing, then hide them all
        if($('.mg_tile-inside:visible').length == 2){
            $('.mg_tile-inside').hide();
            moves++;            
        }

        //Show the tile clicked on
        $(this).find('.mg_tile-inside').show();

        //Now that a tile is up, check to see if there is a match
        if($('.mg_tile-inside:visible').length == 2){
            //Grab visible cards and set them in var
            //Use loop in case we change it to more than 2 matches some day
            var card = [];
            var visibleCards = $('.mg_tile-inside:visible').each(function(i) {
                card.push($(this).attr('card'));
            });
            if(card[0] == card[1]){
                alert("match!!");
                moves++;
                // $('.mg_tile-inside:visible').parent().parent().addClass('matched');
                $('.mg_tile-inside:visible').addClass('mg_tile-inside-matched');
                $('.mg_tile-inside:visible').removeClass('mg_tile-inside');
                if($('.mg_tile-inside').length == 0 ){
                    youWin();
                }
            }
        }
    });
});


function youWin(){
    alert("You won in " + moves + " moves!");
    $('.mg_tile-inside-matched').addClass('mg_tile-inside');
    $('.mg_tile-inside').removeClass('mg_tile-inside-matched');
    $('.mg_tile-inside').hide();
    moves = 0;
}

