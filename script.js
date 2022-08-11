//adding the sfx and music
var sfx = {
    turn: new Howl({
        src:'./music/turn.mp3'
    }),
    chime: new Howl({
        src:'./music/chime.wav'
    }),
    fail: new Howl({
        src:'./music/fail.wav'
    })
}


//selecting all the li elements
let cards = document.querySelectorAll(".card");

//the 2 cards that will be selected and compared
let cardOne;
let cardTwo;

//will not the user select other cards while the 2 previously selected  are still in animation
let disablePick=false;

//will have the number of matched cards
let counter=0;

//function flipCard (e is element)
function flipCard(e){
    //clickedCard will hold the element clicked (the li selected) (to make it so that the li is the one selected not the img or the span we need to desable the cursor in the CSS)
    let clickedCard = e.target; 
    //preventing the user from selecting the same card and preventing him from selecting multiple card by spam clicking
    if(clickedCard !== cardOne && !disablePick){
        sfx.turn.play()
        clickedCard.classList.add("flip");
        if(!cardOne){
            return cardOne=clickedCard;
        }
        sfx.turn.play()
        cardTwo=clickedCard;
        disablePick=true;
        //we need to compare the 2 imgs and that is by comparing their src
        let cardOneImg = cardOne.querySelector("img").src;
        let cardTwoImg = cardTwo.querySelector("img").src;
        matchCard(cardOneImg, cardTwoImg);
    }    
}

function matchCard(img1, img2){
    if(img1===img2){
        sfx.chime.play()
        counter++;
        if(counter===8){
            setTimeout(()=>{
                return ShuffleCard();
            },800);
        }
        cardOne.removeEventListener('click', flipCard);
        cardTwo.removeEventListener('click', flipCard);
        cardOne = cardTwo ="";
        return disablePick=false;
    }
    setTimeout(()=>{
        sfx.fail.play()
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    },300);

    setTimeout(()=>{
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        //will make them empty again so the cards that will follow will be compared with eachother and not the cards previously selected
        cardOne = cardTwo ="";
        disablePick=false;
    },900);
}

function ShuffleCard(){
    cardOne = cardTwo ="";
    disablePick=false;
    counter=0;
    //array that countain 16 numbers(nb of cards) 1 through 8 twice which wil help us sort the deck randomly
    let array=[1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    //sorted the array randomly
    array.sort(()=>Math.random()>0.5 ? 1 : -1);

    cards.forEach( (card, i)=>{
        card.classList.remove("flip");
        let cardImg = card.querySelector("img");
        cardImg.src=`imgs/img-${array[i]}.png`
        card.addEventListener('click', flipCard);
    });
}

//on refresh shuffle
ShuffleCard();

//iterating through the li elements too add the event listener on click flip the card clicked
cards.forEach( card=>{
    card.addEventListener('click', flipCard);
});