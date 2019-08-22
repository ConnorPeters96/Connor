//new function called add review. this adds content to the web page and runs the delete handler when the link is clicked
function add_review(list, review) {
  //dt is the information within the brackets. it adds text showing 'name' then the commenters name, then adds a line break. it then adds 'comment' then the comment they made, and another line break. then it adds the link to allow the user to delete the comment.
  //I chose not to display the email address that everyone had used to input their comment because it is personal information that people may not want to be shared
  var dt = $('<dt class="info">' + 'Name: ' + review.name + '</br>' + 'Comment: ' + review.comment + ' <a href="#" class="delete info" data-review-id=" ' + review.id + '">(delete)</a></dt>' + '</br>');
  //if a link with the class delete is clicked, run the delete review click handler
  dt.find('a.delete').on('click', delete_review_click_handler);
  //add the contents of dt inside list
  list.append(dt);
}

//new function called review which loads all of the reviews from the ajax
function load_review(list_item) {
  //list is the dl link that is in the parent
  var list = $(this).parent().find('dl');
  //empty the list
  list.empty();
  //promise is an action being promised to carried out, here it is ajax. it talks to the link and says whether it has got the information from the link
  var promise = $.ajax('https://teaching.computing.edgehill.ac.uk/cis1007/add-my-comment/23281502', {});
  //if ajax has found the content of the link
  promise.done(function(data) {
    //go through each piece of data from the link above
    for(var idx = 0; idx < data.length; idx++) {
      //adds the data to the list
      add_review(list, data[idx])
      //this was used to check if it was working as i wrote it
      console.log(data[idx]);
    }
  });
}
//a new function which submits a new review to the server (link)
function add_review_submit_handler(event) {
  event.preventDefault();
  //the form is now the current html
  var form = $(this);
  //list_item now finds where the form is located in html
  var list_item = form.parent().parent();
  //finds where the list needs to be inserted
  var review_list = list_item.find('dl');
  //creates variable for input of name
  var name = form.find('input[name=name]').val();
  //creates variable for input of email address
  var email = form.find('input[name=email]').val();
  //creates variable for input of comment
  var comment = form.find('textarea').val();
  //promise is an action being promised to carried out, here it is ajax. it talks to the link and says whether it has got the information from the link. it then follows the method post, and posts name email and comment
  var promise = $.ajax({url:'https://teaching.computing.edgehill.ac.uk/cis1007/add-my-comment/23281502', method: 'POST', data:{
    name: name,
    email: email,
    comment: comment
  }});
  //when promise has been done
  promise.done(function(data) {
    //sends the finished data to the add_review function
    add_review(review_list, data);
    //empties all input boxes
    form.find('input[type=text]').val('');
    form.find('input[type=email]').val('');
    form.find('textarea').val('');
  });
  //if it fails
  promise.fail(function() {
    //produce the alert
    alert('you must provide a name and comment');
  });
}
//a new function that deletes the information from the server
function delete_review_click_handler(event) {
  //if the user confirms that they want to delete the review
  if (confirm('Are you sure you wish to delete this review?')) {
    //promises that it will do something with the link and the data
    var promise = $.ajax('https://teaching.computing.edgehill.ac.uk/cis1007/add-my-comment/23281502/' + $(this).data('review-id'), {
      //deletes the data
      method: 'DELETE'
    });
    //when the promise is done
    promise.done(function() { 
      //removes the next dt on the list                   
      dt.next().remove();
      //once there is none to remove next, remove the current one and stop
      dt.remove();
    });
  }
  event.preventDefault();
  //dt is the parent of the current element
  var dt = $(this).parent();
  //list item is the parent's parent's parent of the dt
  var list_item = dt.parent().parent().parent() ;
}
//whwn the document is ready run this function
$(document).on('ready', function() {
  //when a link with showcomments is clicked
  $('a.showComments').on('click', function(event) {
    event.preventDefault();
    var link = $(this);
    //show the hide more
    $(this).siblings().show();
    //hide this
    $(this).hide();
  });
  //when a link with hidecomments is clicked
  $('a.hideComments').on('click', function(ev) {
    ev.preventDefault();
    //hide the information
    $(this).parent().parent().find('.info').hide();
    //show the show more button
    $(this).siblings().show();
    //hide this
    $(this).hide();
  });
  //when the form is submitted run the add review submit handler
  $('form').on('submit', add_review_submit_handler);
  //when the link delete is clicked, run delete review click handler
  $('a.delete').on('click', delete_review_click_handler);
  //when the link showcomments is clicked then run load review 
  $('a.showComments').on('click', load_review);

});