(function( $ ){

  var methods = {
     init : function(rightElements, customOptions ) {
         var $rightElements = $(rightElements);
         var $leftElements = this;
         
         var options = $.extend(true, {
             bidirectional: true,
             events: {
                 ":hover" : ":hover"   
             }
         }, customOptions);

         var addClassSvg = function($el, newClass) {
            var oldClass = $el.attr('class');
            var classToSet = ""; 

            if (oldClass.trim().length < 1)
              classToSet = newClass;
            else
              classToSet = oldClass.trim() + " " + newClass;

            $el.attr('class', classToSet);

            return $el;
         };

         var removeClassSvg = function($el, classToRemove) {
            var existingClass = $el.attr('class');
            var classToSet = existingClass.replace(RegExp(classToRemove, "g"), "").trim();

            classToSet = classToSet.replace("  ", " ");
            $el.attr('class', classToSet);

            return $el;
         };

         var isSvg = function($el) {
            if ($el.closest('svg').length > 0)
              return true;
            else
              return false;
         };

         var addClass = function($el, newClass) {
            if (isSvg($el)) {
              return addClassSvg($el, newClass);
            } else {
              return $el.addClass(newClass)
            }
         };

         var removeClass = function($el, classToRemove) {
            if (isSvg($el)) {
              return removeClassSvg($el, classToRemove);
            } else {
              return $el.removeClass(classToRemove);
            }

         };
        
          return this.each(function(i){

              var $leftEl = $(this);
         
               for (var eventLeft in options.events) {
                   if ($rightElements.length < i) break;
                   
                   var eventRight = options.events[eventLeft];
                   var $rightEl = $($rightElements[i]);

                   if (eventLeft == ":hover" && eventRight == ":hover") {

                      $leftEl.on('mouseenter', function() {
                        addClass($rightEl, 'hover');
                      }).on('mouseleave', function() {
                        removeClass($rightEl, 'hover');
                      });

                      if (options.bidirectional) {
                        $rightEl.on('mouseenter', function() {
                          addClass($leftEl, 'hover');
                        }).on('mouseleave', function() {
                          removeClass($leftEl, 'hover');
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

  $.fn.mutualEvents = function( rightElSelector, options ) {
    return methods.init.apply(this, arguments);
  };

})( jQuery );