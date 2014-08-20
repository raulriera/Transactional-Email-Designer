(function( $ ) {

    $.fn.transactionalEmailDesigner = function( options ) {
        // By default this plugin was created to work with the wonderful 'transactional email templates' (https://github.com/mailgun/transactional-email-templates) but you can use these variables to customize it to your needs
        var settings = $.extend({
            titleButton: $('#title-button'),
            textButton: $('#text-button'),
            urlButton: $('#url-button'),
            clearAllButton: $('#clear-button'),
            titlePlaceholder: 'Message title',
            textPlaceholder: 'Welcome to the most beautiful and easy way to communicate with others. You can edit any text you see on this screen with a simple click and type.',
            urlPlaceholder: 'Call to action',
            urlPromptMessage: 'Please enter the URL',
            urlPromptExample: 'http://www.google.com'
        }, options );

        var currentItem = 1;
        var list = this;
        var titleButton = settings.titleButton;
        var textButton = settings.textButton;
        var urlButton = settings.urlButton;
        var clearAllButton = settings.clearAllButton;

        // Using the jQuery sortable plugin, let's enable
        // drag and drop sorting
        list.sortable({
            items: "tr",
            revert: true,
            cancel: ':input,button,[contenteditable]',
            helper: function(e, tr)
            {
              var $originals = tr.children();
              var $helper = tr.clone();
              $helper.children().each(function(index)
              {
                // Set helper cell sizes to match the original sizes
                $(this).width($originals.eq(index).width());
                $(this).height($originals.eq(index).height());
              });
              return $helper;
            }
        });

        // Fade In and Fade Out the Remove link on hover
        list.delegate('tr', 'mouseover mouseout', function(event) {
            var $this = $(this).find('a.delete');

            if(event.type === 'mouseover') {
                $this.stop(true, true).fadeIn();
            } else {
                $this.stop(true, true).fadeOut();
            }
        });

        // Title button clicked
        titleButton.click(function(e) {
            e.preventDefault();
            addItem('title');
        });

        // Text button clicked
        textButton.click(function(e) {
            e.preventDefault();
            addItem('text');
        });

        // URL button clicked
        urlButton.click(function(e) {
            e.preventDefault();
            var url = prompt(settings.urlPromptMessage, settings.urlPromptExample);

            if (url != "") {
              addItem('url', url);
            }
        });

        // Delete item button clicked
        list.delegate('a.delete', 'click', function(e) {
            var $this = $(this);

            e.preventDefault();
            removeItem($this);
        });

        // Clear all button clicked
        clearAllButton.click(function(e) {
            e.preventDefault();
            clearList();
        });

        function removeElement() {
          return "<a href='#' class='fa fa-trash-o delete'></a>";
        }

        function titleElement() {
          return "<tr id='item-" + currentItem + "'>"
          + "<td class='content-block'>"
          + "<h1 contenteditable='true'>"
          + settings.titlePlaceholder
          + "</h1>" + removeElement()
          + "</td></tr>";
        }

        function textElement() {
          return "<tr id='item-" + currentItem + "'>"
          + "<td class='content-block'>"
          + "<span contenteditable='true'>"
          + settings.textPlaceholder
          + "</span>" + removeElement()
          + "</td></tr>";
        }

        function buttonElement(url) {
          return "<tr id='item-" + currentItem + "'>"
          + "<td class='content-block'>"
          + "<a href='" + url + "' contenteditable='true' class='btn-primary'>"
          + settings.urlPlaceholder
          + "</a>" + removeElement()
          + "</td></tr>";
        }

        // Add a new item of a given type to the list
        // this method takes any number of params, depending on the
        // type of the item to add, the additional params can be used
        // to send extra information. See 'url' for an example
        function addItem(type) {

          switch (type) {
            case "title":
              list.append( titleElement() );
              break;
            case "text":
              list.append( textElement() );
              break;
            case "url":
              var href = arguments[1];
              list.append( buttonElement(href) );
              break;
            default:
              throw "Type not implemented";
              break;
          }

          // Hide the new item, then fade it in for effects
          $("#item-" + currentItem)
              .css('display', 'none')
              .fadeIn();

          currentItem++;
        };

        function removeItem($this) {
            var parentId = $this.parent().attr('id');

            // Fade out the list item then remove from DOM
            $this.parent().fadeOut(function() {
                $this.parent().remove();
            });
        };

        function clearList() {
            list.children().each(function(key, value) {
                var item = $(value);
                item.fadeOut(function() {
                  item.remove();
                });
            });
        };

      return this;

    };
}( jQuery ));
