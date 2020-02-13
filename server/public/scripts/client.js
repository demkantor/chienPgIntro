$( document ).ready( onReady );

function onReady(){
    $( '#addSongButton' ).on( 'click', addSong );
    $('#songList').on('click', '.delete', deleteClick);
    getSongs();
}

function deleteClick(){
    let selectedId = $(this).parent().data('id');
    console.log(selectedId);
    $.ajax({
        type: 'DELETE',
        url: `/songs/${selectedId}`
    }).then( function( response ){
        console.log( 'back from GET with:', response );
        getSongs();
    }).catch( function( err ){
        console.log( err );
        alert( 'no worky' );
    }) // end ajax
}

function addSong(){
    console.log( 'in addSong' );
    // put user input in an object
    let objectToSend = {
        rank: $( '#rankIn' ).val(),
        artist: $( '#artistIn' ).val(),
        track: $( '#trackIn' ).val(),
        published: $( '#publishedIn' ).val()
    }
    // ajax call to server to POST user input
    $.ajax({
        type: 'POST',
        url: '/songs',
        data: objectToSend
    }).then( function( response ){
        console.log( 'back from POST:', response );
        getSongs();
    }).catch( function( err ){
        alert( 'problem adding song' );
        console.log( err );
    }) //end ajax
} //end addSong

function getSongs(){
    // make an ajax request to GET songs from server (from db)
    $.ajax({
        type: 'GET',
        url: '/songs'
    }).then( function( response ){
        console.log( 'back from GET with:', response );
        displaySongs(response);
    }).catch( function( err ){
        console.log( err );
        alert( 'no worky' );
    }) // end ajax
} // end getSongs


function displaySongs(responseArray){
    // loop through the array
    // append each song to DOM
    console.log(responseArray);
    $('#songList').empty();
    for (let i = 0; i <responseArray.length; i++){
        $('#songList').append(`
        <li data-id="${responseArray[i].id}">(${responseArray[i].id}) ${responseArray[i].artist} : ${responseArray[i].track}
            <button class="delete">Delete</button>
        </li>
        `)
    }
}