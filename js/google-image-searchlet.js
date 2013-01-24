
(function($)
{
    var $search_input   = $("#search-input"),
        $search_btn     = $("#search-btn"),
        $result_content = $("#result-content"),
        image_search,
        search_control;

    google.load('search', '1', {'nocss': true});
    google.setOnLoadCallback(googleImageSearchInit);

    $search_input.on("keydown", function(e)
    {
        var $this = $(this);
        if(e.keyCode == 13 && $this.val().trim() !== '')
        {
            executeSearch();
        }
    });

    $search_btn.on("click", function(){ executeSearch() });

    function executeSearch()
    {
        image_search.execute($search_input.val());
    }

    function googleImageSearchInit()
    {
        search_control  = new google.search.SearchControl();
        image_search    = new google.search.ImageSearch();

        search_control.setSearchCompleteCallback(this, searchComplete);

        search_control.addSearcher(image_search);
        search_control.setResultSetSize(8);
        search_control.draw($result_content.get(0));
    }

    function searchComplete(sc, searcher, query)
    {
        if(searcher.results && searcher.results.length > 0)
        {
            var $gsc_cursor     = $(".gsc-cursor"),
                cursor_child    = $gsc_cursor.children(),
                $gsc_unit      = $(".gsc-result");
            $gsc_cursor.addClass('pagination span12').css({'display': 'block'});
            cursor_child.wrapAll('<ul />').wrap('<li />');
            cursor_child.wrap('<a href="#"/>');
            $gsc_unit.addClass('span6');
            //var $gsc_imageResult = $(".gsc-imageResult");
            //$gsc_imageResult.css({'display': 'inline-block'}).addClass('span2');
        }
    }

})(jQuery);

