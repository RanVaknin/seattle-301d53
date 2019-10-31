

// -------->     Wed OCT 30th RAN AND ELLEN     <--------
let dataFiles = ['page-1.json', 'page-2.json']
function Horn(horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
  this.page = 0
}

// function Horn (dataFiles) {
//   for (let key in dataFiles) {
//     this[key] = dataFiles[key];
//   }
// }

Horn.allHorns = [];

Horn.readJson = () => {
  for (let i = 0; i < dataFiles.length; i++) {
    $.get(dataFiles[i])
      .then(data => {
        data.forEach(item => {
          let newHorn = new Horn(item);
          newHorn.page = i;
          Horn.allHorns.push(newHorn)
          console.log('line 30');
        });
      }).then(Horn.loadHorns);
    console.log('line 33');
  }
}

// we loop over every object in json, every iteration 
let hornHtml = [ $('#photo-template').html(), $('#photo-template2').html() ];

Horn.prototype.render = function () {
  $('main').append('<div class="clone"></div>');
  let hornClone = $('div[class="clone"]');

  // let hornHtml = $('#photo-template').html()
  // let hornHtml2 = $('#photo-template2').html()
  // console.log('line 47');

  //Render images based on number of hornHTML elements
  for (let i = 0; i < hornHtml.length; i++) {
    // console.log('line 49');
    // console.log('this.page', this.page)

    if (this.page === i) {
      hornClone.html(hornHtml[i]);
      // hornClone.html(hornHtml);
      // console.log('line 60', 'page: ', this.page, ' ', i);
      hornClone.find('h2').text(this.title);
      hornClone.find('img').attr('src', this.image_url);
      hornClone.find('p').text(this.description);
      hornClone.removeClass();
      hornClone.addClass('hornImages');
      hornClone.attr('data-value', this.keyword);
      $('select').append(`<option value=${this.keyword}>${this.keyword}</option>`);
    }
  }
}



$('select').on('change', function () {
  let pickedThing = $(this).val()
  $('div').hide();
  $(`div[data-value=${pickedThing}`).show();
})

//Render all horns based on each horn image (1 per image)
Horn.loadHorns = () => {
  // for (let i = 0; i<Horn.allHorns)
  Horn.allHorns.forEach(horn => horn.render())
}
Horn.readJson();
