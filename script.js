const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn =document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');




// get quotes from api

let apiQuotes=[];
// show loading
function loading(){
  loader.hidden =false;
  quoteContainer.hidden=true;
}

// hode loading
function complete(){
  loader.hidden =true;
  quoteContainer.hidden=false;

}
// show new quotes()
function newQuotes(){
  loading();

  const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)];

  // check if author field is blank
  if(!quote.author){
    authorText.textContent="Unknown";
  }else{
    authorText.textContent=quote.author;
    

  }
  // check quote lenght to determine styling
  if(quote.text.length>100){
    quoteText.classList.add("long-quote");
  }else{
    quoteText.classList.remove("long-quote");

  }
  //set quote, hide loader

  quoteText.textContent=quote.text;
  complete();
 
  

}
async function getQuotes(){
  loading();
  const apiUrl='https://type.fit/api/quotes' ;

  try{
    const response=await fetch(apiUrl);
    apiQuotes=await response.json();
    newQuotes();

  }catch(error){
    // catch error here
  }

}

// tweet quote
function tweetQuote(){

  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} -${authorText.textContent}`;
  window.open(twitterUrl,'_blank');

}

//event listner
newQuoteBtn.addEventListener('click',newQuotes);
twitterBtn.addEventListener('click',tweetQuote);


// on load
getQuotes();
