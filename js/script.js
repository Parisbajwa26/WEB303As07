$(function () {
  $("#photo-viewer")
    .photoViewer()
    .show()
    .on("click", ".photo-box", function (e) {
      var $content = $(this).clone().find("img").css({
        marginLeft: 0,
        marginTop: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover"
      });
      
      var modal = (function() {
        var $window = $(window);
        var $modal = $('<div class="modal"/>');
        var $content = $('<div class=“modal-content"/>');
        var $close = $('<button role="button" class="modal-close">CLOSE</button>');
        $modal.append($content, $close);


        $close.on('click', function(e) {
            e.preventDefault();
            modal.close();
        });

        return ({
            center: function() {
                
                var top = Math.max($window.height() - $modal.outerHeight(), 0) / 2;
                var left = Math.max($window.width() - $modal.outerWidth(), 0) / 2;
                
                $modal.css({
                top: top + $window.scrollTop(),
                left: left + $window.scrollLeft()
                });
            },
            open: function(settings) {
                $content.empty().append(settings.content);
                $modal.css({ 
                width: settings.width || 'auto',                 height: settings.height || 'auto'
                }).appendTo('body'); 
                modal.center(); 
                $(window).on('resize', modal.center); 
            },
            close: function() {
              
                $content.empty();
                $modal.detach();
                $(window).off('resize', modal.center);
            }
        });
      })();

      modal.open({content: $content, width: "80vw", height: "80vh"});
    });
});