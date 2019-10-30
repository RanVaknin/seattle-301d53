

// -------->     Wed OCT 30th RAN AND ELLEN     <--------

function Horn(horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
}

Horn.allHorns = [];

Horn.readJson = () => {
  $.get('page-1.json')
    .then(data => {
      data.forEach(item =>{
        Horn.allHorns.push(new Horn(item))
      });
    })
    .then(Horn.loadHorns);
}

// we loop over every object in json, every iteration 

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

  $('select').append(`<option value=${this.keyword}>${this.keyword}</option>`);
}

$('select').on('change', function(){
  let pickedThing = $(this).val()
  $('div').hide();
  $(`div[data-value=${pickedThing}`).show();
})

Horn.loadHorns = () =>{
  Horn.allHorns.forEach(horn => horn.render())
}
Horn.readJson();







  // let sectionEl = document.getElementById("photo-template");
  // let sectionEl = $('#photo-template')
  // for(let i =0; i < Horn.allHorns.length ; i++){
    // let imgEl = document.createElement('img')
    // imgEl.src = Horn.allHorns[i].image_url
    // sectionEl.appendChild(imgEl);
    // sectionEl.append(`<img src=${Horn.allHorns[i].image_url}></img>`);
    // sectionEl.append(`<p>${Horn.allHorns[i].title}</p>`);

  
  // let imgageSource = Horn.allHorns[0].image_url;
  // $('img').attr('src', imgageSource);

// Horn.readJson()
// Horn.render()
