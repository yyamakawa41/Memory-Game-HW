var moves=0;

$(document).ready(function(){

    //Change grid to use row/col instead of total tiles
    var howManyPerRowCol = 4;
    //Get gridSize
    var gridSize = howManyPerRowCol * howManyPerRowCol;
    var cards = [];
    //Need a var for cardValue so it only incraments every other.
    var x=0;
    for(i=1; i<=gridSize; i++){
        if((i % 2)){
            //Cardvalue is unchanged if isn't even
            cardValue = x;
             x++;
        }
        //Set up our obkect. Title is i, cardvalue is x (everyother), and image
        var theObject = {
            tile: i,
            cardValue: cardValue,
            pic: 'img/default/monsters-0'+x+'.png'

        };
        //Push our object onto the array
        cards.push(theObject);
    }

    // shuffle the element to the back of the div 25 times
    for(i=1;i<25;i++){
        var rand = Math.floor(Math.random() * gridSize);
        var rand2 = Math.floor(Math.random() * gridSize);
        var temp = cards[rand];
        cards[rand] = cards[rand2];
        cards[rand2] = temp;
    }

    for(i=0; i<gridSize; i++){
        var html = '<div class="mg_tile mg_tile-'+cards[i].tile+'"><div class="mg_tile-inner unmatched"><div class="mg_tile-outside"></div><div class="mg_tile-inside" id="mg-tile-'+cards[i].tile+'" cardValue='+cards[i].cardValue+'><img src="'+cards[i].pic+'"></div></div></div>';
        $(html).appendTo($('.mg_contents'));
    }
    //Set height and width of the tiles based on gridsize
    $('.mg_tile').css('height',((1/howManyPerRowCol)*100)+'%');
    $('.mg_tile').css('width',((1/howManyPerRowCol)*100)+'%');


    // //shuffle the element to the back of the div 25 times
    // for(i=1;i<25;i++){
    //     var rand = Math.floor(Math.random() * 8 + 1);
    //     $('.mg_tile-'+rand).appendTo($('.mg_contents'))
    // }

    //Add click listener to each tile
    $('.mg_tile').click(function(){
        //If there are already 2 showing, then hide them all
        if($('.mg_tile-inner.flipped.unmatched').length == 2){
            $('.mg_tile-inner.unmatched').removeClass('flipped');
            moves++;            
            $('#total-moves').text(moves);
        }

        //Show the tile clicked on
        $(this).find('.mg_tile-inner').addClass('flipped');

        //Now that a tile is up, check to see if there is a match
        if($('.mg_tile-inner.flipped.unmatched').length == 2){
            //Grab visible cards and set them in var
            //Use .each in case we change it to more than 2 matches some day
            var card = [];
            var visibleCards = $('.mg_tile-inner.flipped.unmatched .mg_tile-inside').each(function(i) {
                card.push($(this).attr('cardvalue'));
            });
            if(card[0] == card[1]){
                // alert("match!!");
                moves++;
                $('#total-moves').text(moves);

                // $('.mg_tile-inside:visible').parent().parent().addClass('matched');
                $('.mg_tile-inner.flipped.unmatched').addClass('matched');
                $('.mg_tile-inner.unmatched.flipped').removeClass('unmatched');

                // Was checking for non left inner. Now checking to see if all are matched
                if($('.mg_tile-inner.matched').length == gridSize ){
                    youWin();
                }
            }
        }
    });
});

function youWin(){
    alert("You won in " + moves + " moves!");
    $('.mg_tile-inner.matched.flipped').addClass('unmatched');
    $('.mg_tile-inner.matched.flipped').removeClass('matched');
    $('.mg_tile-inner.matched.flipped').removeClass('flipped');
    moves = 0;
}

