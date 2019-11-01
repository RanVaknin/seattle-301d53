// -------->     Wed OCT 30th RAN AND ELLEN     <--------

/*array of keywords from instances of the constructor. to be made into an array of unique instances - uniqueArray.*/
let keywordArray = []; 


function Horn(horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
}
Horn.allHorns = [];

Horn.readJson = (JSONfile) => {
  $.get(JSONfile)     // reads a JSON file
    .then(data => {     
      data.forEach(item =>{
        Horn.allHorns.push(new Horn(item)) ///  populates Horn.allHorns array with instances of constructor.
      });
    })
    .then( () => {
      Horn.loadHorns();
      getUniques(); // populates drop down menu only with unique options.
    });
}

Horn.prototype.render = function() {
  $('main').append('<div class="clone"></div>');
  let hornClone = $('div[class="clone"]');

  let hornHtml = $('#photo-template').html()

  hornClone.html(hornHtml);

  hornClone.find('h2').text(this.title);
  hornClone.find('img').attr('src', this.image_url);
  hornClone.find('p').text(this.description);
  hornClone.removeClass();  
  hornClone.addClass('hornImages');
  hornClone.attr('data-value', this.keyword);
}


// Iterates through the keyword property of ALL horns, and returns a unique array with no duplicates,
// and then populates the drop down menu.
let getUniques = () => { 
  for (let i = 0; i < Horn.allHorns.length; i++){
    keywordArray.push(Horn.allHorns[i].keyword)
  }
  let uniqueArray = keywordArray.filter((v, i, a) => a.indexOf(v) === i); 
  uniqueArray.forEach((keyword)=>{
  $('select').append(`<option value=${keyword}>${keyword}</option>`)})
}

// listens to change on on drop down menu and renders the pictures according to their shared KEYWORD property.
$('select').on('change', function(){
  let pickedThing = $(this).val()
  $('div').hide();
  $(`div[data-value=${pickedThing}`).show();
})

Horn.loadHorns = () =>{
  Horn.allHorns.forEach(horn => horn.render())
}
Horn.readJson('page-1.json');
$('#page1').hide();


$('#page2').on('click',()=>{
  $('div').remove();
  Horn.allHorns = [];
  Horn.readJson('page-2.json');
  $('#page2').hide();
  $('#page1').show();
  $( "option" ).not( "option:first-of-type").remove(); 
})

$('#page1').on('click',() =>{
  $('div').remove();
  Horn.allHorns = [];
  Horn.readJson('page-1.json');
  $('#page2').show();
  $('#page1').hide();
  $( "option" ).not("option:first-of-type").remove(); 
})

$('#filter').on('click', () =>{
  Horn.allHorns.sort((a,b) =>{
    return b.horns - a.horns;
  })
  $('div').remove();
  Horn.loadHorns();
});