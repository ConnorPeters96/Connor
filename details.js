//when the document is ready, this function can be run
$(document).on('ready', function()
{
    //when the user clicks on a link with the class show, run the next bit of code
    $('a.show').on('click', function(event)
    {
        //stop the function from running the default instructions
        event.preventDefault(); 
        //link equals the element
        link = $(this);
        //list_item is the parent of the parent of the element
        list_item = link.parent().parent();
        //details is the list_item with the class details 
        details = list_item.find('.details');
        //show the stuff within this element (shows all of the content)
        details.show();
        //show the siblings of the current element (shows the hide information)
        $(this).siblings().show();
        //hide the current element
        $(this).hide();
    });
    //when the user clicks on the link with the class hide, run the next bit of code
    $('a.hide').on('click', function(ev)
    {
        //stop the function from running the default instructions
        ev.preventDefault();
        //find the parent's parent with the class details and hide it (hides all of the content)
        $(this).parent().parent().find('.details').hide();
        //show the sibling of the current element (shows show information)
        $(this).siblings().show();
        //hide this
        $(this).hide();
    });   
});
//when the document is ready, this function can be run
$(document).on('ready', function()
{
    //when the user clicks on a link with the class show2, run the next bit of code
    $('a.show2').on('click', function(event)
    {
        //stop the function from running the default instructions
        event.preventDefault(); 
        //link equals the element
        link = $(this);
        //list_item is the parent of the parent of the parent of the parent of the element
        list_item = link.parent().parent().parent().parent();
        //details is the list_item with the class details 
        details = list_item.find('.details');
        //show the stuff within this element (shows all of the content)
        details.show();
        //show the siblings of the current element (shows the hide information)
        $(this).siblings().show();
        //hide the current element
        $(this).hide();
    });
    //when the user clicks on a link with the class hide2, run the next bit of code
    $('a.hide2').on('click', function(ev)
    {
        //stop the function from running the default instructions
        ev.preventDefault();
        //finds the parent of the parent of the parent of the parent of the element and hides it
        $(this).parent().parent().parent().parent().find('.details').hide();
        //show the siblings of the current element (shows the hide information)
        $(this).siblings().show();
        //hide the current element
        $(this).hide();
    });   
});