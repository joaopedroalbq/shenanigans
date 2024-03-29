// Show All cards


let everyCard = function(){
  $.ajax({
        url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards',
        beforeSend: function(xhr) {
             xhr.setRequestHeader('X-Mashape-Key', 'Dwuxeisy5nmshuld0ZffvWUaWCnZp10IzJNjsnWVtoF7u63oYW')
        }, success: function(data){
            console.log('Success!')
        }, complete: function(data){
            showCards(data.responseJSON, 'Classic', 'classic')
            showCards(data.responseJSON, 'Whispers of the Old Gods', 'oldgods')
            showCards(data.responseJSON, 'Mean Streets of Gadgetzan', 'meanstreets')
            showCards(data.responseJSON, "Journey to Un'Goro", 'ungoro')
            showCards(data.responseJSON, 'Knights of the Frozen Throne', 'koft')
        }
      })

 // Modal image script
  let showCards = function(json, cardset, id){
    var modal = document.getElementById('myModal');
    var images = document.getElementsByClassName("imageClass");
    for(var i = 0; i < images.length; i++){
        var img = images[i];
        var modalImg = document.getElementById("img01");
        var captionText = document.getElementById("caption");
        img.onclick = function(){
            modal.style.display = "block";
            modalImg.src = this.src;
            modalImg.alt = this.alt;
            captionText.innerHTML = this.alt;
        }
    }

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }


    // Creating the list
    let minions = json[cardset].filter(x => x.type == 'Minion')
    let list = '<ul class="cardlist"><li>' + minions.map(x => `<img id="myImg" class="imageClass" src="${x.img}">`).join('</li><li>') + '</li></ul>'
    document.getElementById(id).insertAdjacentHTML('beforeend', list)
  }

}

// ------------------------------------------------------------------------------------------------------



// Single card search



let toTitleCase = function(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}



let singleCard = function(){
  document.getElementById('search_button').addEventListener('click', function(){
    let Regexp = /[A-Za-z0-9\']/
    if(Regexp.test(document.getElementById('search_field').value))
      cardSearch(document.getElementById('search_field').value)
    else
      alert('Incorrect card name!')

  })





  let cardSearch = function(name){
    let cardData
    let correctName = toTitleCase(name)
    $.ajax({
          url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/'+correctName,
          beforeSend: function(xhr) {
               xhr.setRequestHeader('X-Mashape-Key', 'Dwuxeisy5nmshuld0ZffvWUaWCnZp10IzJNjsnWVtoF7u63oYW')
          }, success: function(data){
              console.log('Success!')
          }, statusCode: {
              404: function() {
                alert( "Incorrect card name" );
              }
          }, complete: function(data){
              correctCard(correctName, data.responseJSON)
          }
        })

    let correctCard = function(str, json){
      cardData = json.filter(x => x.name == str)
      displayCard(cardData)
    }
  }


  let displayCard = function(data){

      console.log(data)
      document.querySelector('.card_info').style.display = 'block'
      document.getElementById('card_img').src = data[0].img
      document.getElementById('golden_card_img').src = data[0].imgGold
      $('#card_set').html('Card set: ' + data[0].cardSet)
      $('#type').html('Type: ' + data[0].type)
      $('#rarity').html('Rarity: ' + data[0].rarity)
      if(data[0].flavor != null)
        $('#quote').html('"'+ data[0].flavor+'"')
      else
        $('#quote').html('')

      $('#artist').html('Artist: ' + data[0].artist)

  }
}
// ------------------------------------------------------------------------------------------------------
