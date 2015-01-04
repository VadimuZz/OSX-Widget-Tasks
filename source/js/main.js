//Author: Vadim Kudriavtcev
//Contacts: vadimuZz@gmail.com

var animating = false;
var height = 60;
var enabledTutorial = true;

$(document).ready(function(){
  init();
});

$(document).keypress(function(e) {
  if(e.which == 13) {
    createTask();
  }
});

function init() {
  $('.drag').css('opacity','0.85');
  

  $('.add').click(function(){
    createTask();
  });

  $('.send').hide();
  $('.send').click(function(){
    sendEmail();
  });

  window.resizeTo($('.wrap').width(), $('.wrap').height() + 20);
  widget.setCloseBoxOffset($('.wrap').width(), 0);
}

function sendEmail() {
  var body = '';
  var counter = 0;

  $.each( $('.task'), function( key, value ) { 
    if( $.trim( $(value).val() ) !== '') {
      counter++;
      body = body + counter + '. ' + $.trim( $(value).val() );
      if( $(value).attr('complete') == 'yes' ) {
        body = body + ' [completed]';
      }
      body = body +'%0D%0A';
    }
  });

  if(body == '') {
    return;
  }

  window.location.href = 'mailto:?subject=List&body='+body;
  
  $('.send').stop().animate({ 
    opacity: 0,
  }, 300, function() {
    $('.send').hide();

    setTimeout(function(){
      $('.send').show();
      $('.send').stop().animate({ 
        opacity: 1
      }, 700);
    }, 5000);

  });
}

function createTask() {
  var li = jQuery('<li/>', { }).appendTo('.container');

  var del = jQuery('<div/>', {
    class: 'delete'
  }).appendTo(li);

  var approve = jQuery('<div/>', {
    class: 'approve'
  }).appendTo(li);

  var line = jQuery('<div/>', {
    class: 'line'
  }).appendTo(li);

  var box = jQuery('<input/>', {
    type: 'text',
      class: 'box task',
      text: ''
  }).appendTo(line);

  box.css('height', height);
  box.attr('complete', 'no');
  box.attr('mode', 'delete-close');
  li.css('height', '0px');

  setCollor();
  window.resizeTo($('.wrap').width(), $('.wrap').height() + 20 + height);

  del.click(function(){
    deleteTask(li);
  });

  $(box).swipe(function( direction, offset, el ) {
      
      //console.log( "Moving", direction.x, "and", direction.y );
      //console.log( "Touch moved by", offset.x, "horizontally and", offset.y, "vertically" );    
    
    if(offset.y > 30 && direction.y == 'up' && animating == false ) {
      swipeUpDown(box, el, 1);
      }

      if(offset.y < -30 && direction.y == 'down' && animating == false ) {
      swipeUpDown(box, el, -1);
      }

      if(offset.x < -10 && direction.x == 'left' && animating == false ) {
      swipeLeftRight(box, el, 1);
      }       
      
      if(offset.x > 10 && direction.x == 'right' && animating == false ) {
      swipeLeftRight(box, el, -1);
      }

  });

  $(box).focus();

  if( $('.task').length == 1 ) {
    $('.send').show();
    $('.send').stop().animate({ 
      opacity: 1,
    }, 600);
    setTimeout(tutorial, 400, 1, 1);
  }
  if( $('.task').length == 2 || $('.task').length == 3 ) { 
    setTimeout(tutorial, 400, $('.task').length, 1);
  }   
}

function tutorial(step, count) {
  if(count == 0 || enabledTutorial == false) {
    return;
  }
  count--;

  var circle;
  var arrow;

  if(step == 1) {
    /*
    circle = jQuery('<img/>', {
      src: 'i/circle.png',
      style: 'position: absolute'
    }).appendTo( $('body') );

    circle.css('top','27px');
    circle.css('left','290px');
    circle.css('opacity','0');

    circle.stop().animate({ 
      opacity: 1
    },600, function() {
      circle.stop().animate({ 
        opacity: 0
      },600, function() {
        circle.remove();
      });
    });
    */

    arrow = jQuery('<img/>', {
      src: 'i/arrow_left.png',
      style: 'position: absolute'
    }).appendTo( $('body') );

    arrow.css('top','30px');
    arrow.css('left','220px');
    arrow.css('opacity','0');

    arrow.stop().animate({ 
      opacity: 1,
      left: 195
    },600, function() {
      arrow.stop().animate({ 
        left: 170,
        opacity: 0
      },600, function() {
        arrow.remove();
        tutorial(step, count);
      });
    });

  }
  if(step == 2) { 
    /*
    circle = jQuery('<img/>', {
      src: 'i/circle.png',
      style: 'position: absolute'
    }).appendTo( $('body') );

    circle.css('top','87px');
    circle.css('left','5px');
    circle.css('opacity','0');

    circle.stop().animate({ 
      opacity: 1
    },600, function() {
      circle.stop().animate({ 
        opacity: 0
      },600, function() {
        circle.remove();
      });
    });
    */

    arrow = jQuery('<img/>', {
      src: 'i/arrow_right.png',
      style: 'position: absolute'
    }).appendTo( $('body') );

    arrow.css('top','90px');
    arrow.css('left','50px');
    arrow.css('opacity','0');

    arrow.stop().animate({ 
      opacity: 1,
      left: 75
    },600, function() {
      arrow.stop().animate({ 
        left: 100,
        opacity: 0
      },600, function() {
        arrow.remove();
        tutorial(step, count);
      });
    });
  }
  if(step == 3) { 
    circle = jQuery('<img/>', {
      src: 'i/arrow_up.png',
      style: 'position: absolute'
    }).appendTo( $('body') );

    circle.css('top','110px');
    circle.css('left','155px');
    circle.css('opacity','0');

    circle.stop().animate({ 
      opacity: 1,
      top: 100
    },600, function() {
      circle.stop().animate({ 
        opacity: 0,
        top: 90
      },600, function() {
        circle.remove();
      });
    });

    arrow = jQuery('<img/>', {
      src: 'i/arrow_down.png',
      style: 'position: absolute'
    }).appendTo( $('body') );

    arrow.css('top','110px');
    arrow.css('left','200px');
    arrow.css('opacity','0');

    arrow.stop().animate({ 
      opacity: 1,
      top: 115
    },600, function() {
      arrow.stop().animate({ 
        top: 120,
        opacity: 0
      },600, function() {
        arrow.remove();
        tutorial(step, count);
        // Tutorial done
        setTimeout(function() {
          enabledTutorial = false;
        },1000)
      });
    });
  }
}

function deleteTask(li) {
  $(li).stop().animate({ 
    height: 0
  }, 300, function() {
    li.remove();
    setCollor();
    if( $('.task').length == 0 ) {
      $('.send').stop().animate({ 
        opacity: 0
      }, 600, function() {
        $('.send').hide();
      });
    }
  });
}

function swipeLeftRight(box, el, direction) {
  if(animating == true) { 
    return;
  }
  // Right
  if(direction == -1) {
    
    if(box.attr('mode') == 'delete-close' && animating == false) {
      animating = true;
      $(el.parent()).stop().animate({ 
        left: height
      }, 300, function() {
        animating = false;
      });
      box.attr('mode', 'delete-open');

    }

  } else { // Left

    if(box.attr('mode') == 'delete-open' && animating == false) {       
      
      animating = true;
      $(el.parent()).stop().animate({ 
        left: 0
      }, 300, function() {
        animating = false;
      });
      box.attr('mode', 'delete-close');

    } else {

      if($(box).attr('complete') == 'no' && animating == false && box.attr('mode') == 'delete-close') {
        
        animating = true;
        $(box).attr('complete', 'yes');
        $(box).stop().animate({ 
          backgroundColor: $(box).attr('approve-color'),
        }, 300, function() {
          animating = false;
        });

        $(box).parent().stop().animate({ 
          left: -60
        }, 300, function() {
          $(box).parent().stop().animate({ 
            left: 0
          }, 300);
        });

      } else {

        if( animating == false ) {
          animating = true;
          $(box).attr('complete', 'no');
          $(box).stop().animate({ 
            backgroundColor: $(box).attr('default-color'),
          }, 300, function() {
            animating = false;
          });

          $(box).parent().stop().animate({ 
            left: -60
          }, 300, function() {
            $(box).parent().stop().animate({ 
              left: 0
            }, 300);
          });
        }

      }

    }

  }
}

function swipeUpDown(box, el, direction) {
  if(animating == true) {
    return;
  } else {
    animating = true;
  }

  var clickedDiv = el.closest('li');
      var prevDiv;
      var distance = clickedDiv.outerHeight();

    if(direction == 1) {
      prevDiv = clickedDiv.prev();
    } else {
      prevDiv = clickedDiv.next();
    }

  if (prevDiv.length) {
    clickedDiv.css('z-index','100');
        prevDiv.css('z-index','99');

        $.when(clickedDiv.stop().animate({
            top: -distance * direction
        }, 300),
        prevDiv.stop().animate({
            top: distance * direction
        }, 300)).done(function () {

            prevDiv.css('top', '0px');
            clickedDiv.css('top', '0px');

            if(direction == 1) {
              clickedDiv.insertBefore(prevDiv);
          } else {
            prevDiv.insertBefore(clickedDiv);
          }

            setTimeout( setCollor, 25);
            animating = false;
        });
    } else {
      animating = false;
    }
}

function setCollor() {
  var counter = 0;
  var step = 10;

  if($('.task').length > 4) {
    step = 8;
  }
  if($('.task').length > 7) {
    step = 6;
  }
  if($('.task').length > 10) {
    step = 4;
  }

  $.each( $('.task'), function( key, value ) {
    
    $(value).attr('default-color',  shadeColor('#f78d63', counter * step) );
    $(value).attr('approve-color', shadeColor('#63f7b3', counter * step-2) );
    // Animate background
    if($(value).attr('complete') == 'no' ) {
      $(value).stop().animate({ 
        backgroundColor: $(value).attr('default-color')
      }, 500);
    } else {
      $(value).stop().animate({ 
        backgroundColor: $(value).attr('approve-color')
      }, 500);
    }
    // Animate height
    if($(value).parent().parent().height() !== height) {
      $(value).parent().parent().stop().animate({ 
        height: height
      }, 300);
    }
    // delete
    $(value).parent().parent().find('.delete').stop().animate({ 
      backgroundColor: shadeColor('#CC0000', counter * 6)
    }, 500);

    counter++;
  });

  $('.add').stop().animate({ 
    backgroundColor: shadeColor('#f78d63', counter * step)
  }, 700);  

  $('.send').stop().animate({ 
    backgroundColor: shadeColor('#963e1b', counter * (step))
  }, 700);
}

function shadeColor(color, percent) {  
    var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}