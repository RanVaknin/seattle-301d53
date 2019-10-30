
function shout(words) {
  console.log( words.toUpperCase() );
}

var shoutIt = function(words) {
}


// var shoutItOutLoud = (words) => {
//   console.log( words.toUpperCase() );
// }

// var shoutItOutLoud = (words) => console.log( words.toUpperCase() );

// var shoutItOutLoud = words => console.log( words.toUpperCase() );

// const shoutItOutLoud = words => {
//   return words.toUpperCase();
// }

let shoutItOutLoud = (words) => words.toUpperCase();

shoutItOutLoud = (words) => words.toLowerCase();



shout("john is cool");

shoutIt("john is amazing");

console.log( shoutItOutLoud("john is hungry for knowledge") );


for ( var i = 1; i < 3; i++ ) {
  console.log(i);
}

console.log('what is i', i);
