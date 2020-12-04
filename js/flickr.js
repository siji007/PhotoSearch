$(document).ready(function() {
    $('form').submit(function(evt) {
        evt.preventDefault();
        var $searchField = $('#search');
        var $submitButton = $('#submit');

        $searchField.prop("disabled", true);
        $submitButton.attr("disabled", true).text("searching...");
        // $("button").removeClass("selected");
        // $(this).addClass("selected");

        var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

        var animal = $searchField.val();
        var flickrOptions = {
            tags: animal,
            format: "json"
        };

        function displayPhotos(data) {
            var photoHTML = '<div class="row ml-auto mr-auto  mt-4 align-items-center ">';
            $.each(data.items, function(i, photo) {
                photoHTML += '<div class="col-lg-4 col-md-6 col-sm-12 justify-content-center" style="height:300px;">';
                photoHTML += '<a href="' + photo.link + '" class="image">';
                photoHTML += '<img style="height:220px; width:220px;" src=" ' + photo.media.m + ' "></a></div>';
            });

            // var photoHTML = '<div class="flex flex-wrap mt-4 justify-center">';
            // $.each(data.items, function(i, photo) {
            //     photoHTML += '<div class=" align-items-center" style="width:400px;height:300px;">';
            //     photoHTML += '<a href="' + photo.link + '" class="image">';
            //     photoHTML += '<img style="width:200px;height:220px;" src=" ' + photo.media.m + ' "></a></div>';
            // });


            photoHTML += '</div>';
            $('#photos').html(photoHTML);
            $searchField.prop("disabled", false); //here we are enabling the serch field

            $submitButton.attr("disabled", false).text("Search");

        }

        $.getJSON(flickerAPI, flickrOptions, displayPhotos);
    });
});