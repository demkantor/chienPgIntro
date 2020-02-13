$( document ).ready( onReady );

function onReady(){
    $( '#addSongButton' ).on( 'click', addSong );
    $('#songList').on('click', '.delete', deleteSongs);
    $('#songList').on('click', '.upVote', upVoteSong);
    $('#songList').on('click', '.downVote', downVoteSong);
    getSongs();
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

function deleteSongs(){
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
}//end delete song

function displaySongs(responseArray){
    // loop through the array
    // append each song to DOM
    console.log(responseArray);
    $('#songList').empty();
    for (let i = 0; i <responseArray.length; i++){
        $('#songList').append(`
        <li data-id="${responseArray[i].id}">(${responseArray[i].rank}) ${responseArray[i].artist} : ${responseArray[i].track}  
            <button class="delete">Delete</button>  <button class="upVote">Up Vote</button>  <button class="downVote">Down Vote</button>
        </li>
        `)
    }
}//end displaySongs

function downVoteSong(){
    let selectedId = $(this).parent().data('id');
    let objectToSend = {
        voteDirection: 'down'
    }
    console.log("this song gets an down vote!", selectedId);
    $.ajax({
        type: 'PUT',
        url: `/songs/${selectedId}`,
        data: objectToSend
    }).then(function(response){
        console.log('udownvote', response);
        getSongs();
    }).catch(function(err){
        console.log(err);
        alert("this is broken... by this i mean down vote");
    })
}//end downVoteSong

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

function upVoteSong(){
    let selectedId = $(this).parent().data('id');
    let objectToSend = {
        voteDirection: 'up'
    }
    console.log("this song gets an up vote!", selectedId);
    $.ajax({
        type: 'PUT',
        url: `/songs/${selectedId}`,
        data: objectToSend
    }).then(function(response){
        console.log('upvote', response);
        getSongs();
    }).catch(function(err){
        console.log(err);
        alert("this is broken... by this i mean up vote");
    })
}//end upVoteSong