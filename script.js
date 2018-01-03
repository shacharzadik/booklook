var fetch = function (isbnNum) {
    $.ajax({
      method: "GET",
      url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbnNum,
      success: function(data) {
        console.log(data);
        pullData(data); // take data - title,autor,description and image 
        // append book data to page

      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    }); 
  };


  var fetchTitle = function (title) {
    $.ajax({
      method: "GET",
      url: 'https://www.googleapis.com/books/v1/volumes?q=intitle:' + title,
      success: function(data) {
        console.log(data);
        pullData(data); // take data - title,autor,description and image 
        // append book data to page

      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.log(textStatus);
      }
    }); 
  };
   
  

   function sendInput() {
       // get the isbn number from the input field
     // check if the value is numeric - $.isNumeric(16);     // true
    var input = $("#ISBN").val();
    if ($.isNumeric(input) == true) {
        fetch(input); //  invoke fetch
     } else { // invoke fetchTitle
        fetchTitle(input);
            }
    }

   $('.btn-primary').on('click',sendInput);


  
  function pullData(data) {
     
      var title = data.items[0].volumeInfo.title;
      var author = data.items[0].volumeInfo.authors[0];
      var description = data.items[0].volumeInfo.description;
      var image = data.items[0].volumeInfo.imageLinks.thumbnail;
      publishBook(title,author,description,image); 
 }


 function publishBook(title,author,description,image) {
   
    var source = $('#books-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template({title: title, description: description, author: author, image: image});
    $('.books').append(newHTML);

 }


 // pull input's value 

