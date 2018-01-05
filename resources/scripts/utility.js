
var check = function() {
  if (document.getElementById('password').value == document.getElementById('confirm_password').value) {
    document.getElementById('message').style.color = 'green';
    document.getElementById('message').innerHTML = 'Passwords match.';
  } else {
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = 'Passwords must match!';
  }
}

function checkPasswords() {
  if(document.getElementById('password').value == document.getElementById('confirm_password').value) {
    return true;
  } else {
    document.getElementById('message').style.color = 'red';
    document.getElementById('message').innerHTML = 'Passwords must match!';
    return false;
  }
}

function favoriteDog() {
  //this is to tell the server if the dog is already favorited.
  var favorited;

  //color change
  var el =   document.getElementById("heartIconDetail");
  var num =  document.getElementById("numLikes");
  var color = window.getComputedStyle(el,null).getPropertyValue('color');

  //187 == red
  if (color === "rgb(187, 0, 0)") {
      el.classList.add("unselectedHeart");
      el.classList.remove("selectedHeart");
      favorited = "unfavorite";
      num.innerHTML = parseInt(num.innerText) - 1;
  } else {
      el.classList.add("selectedHeart");
      el.classList.remove("unselectedHeart");
      num.innerHTML = parseInt(num.innerText) + 1;
      favorited = "favorite";
  }

  //send http req
  //get params
  var dogFromPage = window.location.pathname.substring(6); // just dog id, not anything else

  $.post('/favoriteDog', { dog: dogFromPage, currentState: favorited }, function(returnedData){
    // TODO
    // could this be it?
    //res.send(returnedData);
  });

  return false;
}

function redirect(){
  alert("You must confirm your account to favorite dogs");

  // $.get('/unverified',function(returnedData){

  // });
  // return false;

}

function deleteComment(selectedID, dogID){
  if(confirm('Are you sure you want to delete this comment?')){
    $.post('/deletecomment', { commentID: selectedID, dog: dogID}, function(returnedData){

    });

    //refresh the page, now without the comment
    document.location.reload();
    
    return true;
  }

}
function checkEmpty(){
  document.write("Checking")
  var valid = false;
  var warning = document.getElementById("submitWarning")
  if(document.forms["submitForm"]["dogName"].value == ""){
    valid = false;
    warning.innerHTML += "Missing name";
    warning.style.visibility='visible';
  }
  else if(document.forms["submitForm"]["dogBreed1"].value == "" && document.forms["submitForm"]["dogBreed2"].value == "")
    valid = false;
      warning.innerHTML += "Must have at least 1 breed";
      warning.style.visibility='visible';

  }
  else if(document.forms["submitForm"]["dogBio"].value == ""){
    valid = false;
      warning.innerHTML += "Missing bio";
      warning.style.visibility='visible';

  }
  else{
    warning.innerHTML += "";
      warning.style.visibility='hidden';
  }
  return valid;


}
