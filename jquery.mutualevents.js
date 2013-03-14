(function( $ ){

  var methods = {
     init : function($rightElements, customOptions ) {
         var $leftElements = this;
         
         var options = $.extend(true, {
             bidirectional: true,
             events: {
                 "hover" : "hover"   
             }
         }, customOptions);
        
              return this.each(function(i){

                  var $leftEl = $(this);
             
                   for (var eventLeft in options.events) {
                       if ($rightElements.length < i) break;
                       
                       var eventRight = options.events[eventLeft];
                       var $rightEl = $($rightElements[i]);

                       if (eventLeft == "hover" && eventRight == "hover") {

                          $leftEl.on('mouseenter', function() {
                            $rightEl.addClass('hover');
                          }).on('mouseleave', function() {
                            $rightEl.removeClass('hover');
                          });

                          if (options.bidirectional) {
                $rightEl.on('mouseenter', function() {
                              $leftEl.addClass('hover');
                            }).on('mouseleave', function() {
                              $leftEl.removeClass('hover');
                            });
                          }
                       }
                       else {
                         $leftEl.on(eventLeft, function() {
                            $rightEl.trigger(eventRight); 
                         });
                     }
                   }
           });

     }
  };

  $.fn.mutualEvents = function( method ) {
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.mutualEvents' );
    }    
  
  };

})( jQuery );