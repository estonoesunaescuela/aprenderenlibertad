//To get gravatar
// Hash MD% email, replace on URL (https schema) ash. Query can specify size.

//  https://www.gravatar.com/avatar/039be6ff7c74d24e071a1f6db49cacb6

//To get Google+ user based on email, use this endpoint:

// http://picasaweb.google.com/data/entry/api/user/virguma@gmail.com?a‌​lt=json


//Tests

function getPlusId(email){
  var url = "http://picasaweb.google.com/data/entry/api/user/" + email + "?a‌lt=json";
  var response = UrlFetchApp.fetch(url);
  response = JSON.parse(response);
  var keys = Object.keys(response.entry);
  var id = response.entry.title.$t;
  return id;
}

function getGplus(){
  var email = "****@gmail.com";
  var id = getPlusId(email);
//  var id = "105975207812244435605";
  var profile =  Plus.People.get(id);
  var image = profile.image.url;
  Logger.log(image);
}