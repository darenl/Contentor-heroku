//Original Base Code: https://jsfiddle.net/q1cvvk7x
/* Fetch functions */

let API_URL = 'https://api.shutterstock.com/v2';
let clientId = '3352aeffbd24d33f8859';
//let clientId = '7b101a55038f7ddb1c48e2083a071a';
let clientSecret = '097f832242ad371d9f012770cabdb1e6cebc433a';
//let clientSecret = 'c291c351607b1dd14f8477d5d017db';

// Base 64 encode Client ID and Client Secret for use in the Authorization header
let encodeAuthorization = function() {

    if (!clientId || !clientSecret) {
        $('#collapseAuthentication').collapse('show');
        alert('Client id and/or client secret are missing in the API key section, with out these you wont be able to contact the API.');
        return;
    }
    return 'Basic ' + window.btoa(clientId + ':' + clientSecret);
}

// Search media by type
let search = function(opts, mediaType) {
    var $container = $('#' + mediaType + '-search-results');
    var createComponentFunc = renderImageComponent;

    authorization = encodeAuthorization();
    if (!authorization) return;

    var jqxhr = $.ajax({
        url: API_URL + '/' + mediaType + 's/search',
        data: opts,
        headers: {
            Authorization: authorization
        }
    })
        .done(function (data) {
        if (data.total_count === 0) {
            $container.append('<p>No Results</p>');
            return;
        }
        let imageData = data.data.slice(0, 3);
        var minHeightCSS = /horizontal/.test(opts) ? 'horizontal-image' : 'vertical-image';
        $.each(imageData, function (i, item) {
            var component = createComponentFunc(item, minHeightCSS);
            $container.append(component);
        });

        // Reduce the options area to show the results
        if (window.innerWidth < 700) $('.collapse.in').collapse();
    })
        .fail(function (xhr, status, err) {
        alert('Failed to retrieve ' + mediaType + ' search results:\n' + JSON.stringify(xhr.responseJSON, null, 2));
    });

    return jqxhr;
}

/* Render functions */

// Create image wrapper component
let renderImageComponent = function(image, minHeightCSS) {
    if (!image || !image.assets || !image.assets.large_thumb || !image.assets.large_thumb.url) return;

    var wrapper = $('<div>');
    var thumbWrapper = $('<div>');
    var thumbnail = $('<img>');
    var description = $('<p>');

    $(thumbnail)
        .attr('id', image.id)
        .attr('src', image.assets.large_thumb.url)
        .attr('title', image.description);

    $(thumbWrapper)
        .addClass('thumbnail-crop')
        .css('height', image.assets.large_thumb.height)
        .css('width', image.assets.large_thumb.width)
        .append(thumbnail);

    $(wrapper)
        .addClass('image-float-wrapper image ' + minHeightCSS)
        .append(thumbWrapper);

    return wrapper;
}

let useColorsInNatureIfSearchingOnlyByColor = function(opts) {
    if (/color/.test(opts) & !/category/.test(opts) && !/query/.test(opts)) {
        opts += '&category=Nature';
    }
    return opts;
}

// On Page Load
$(function () {
    $('#search-form').submit(function (e) {
        e.preventDefault();

        // Clear current media results
        $('#image-search-results, #video-search-results').empty();
        // Serialize form options
        var opts = $('input').filter(function () {
            if (this.value === '#999999') return;
            if (this.name === 'client_id') return;
            if (this.name === 'client_secret') return;
            return !!this.value;
        }).serialize();
        console.log(opts);
        opts += '&' + $('select').filter(function () {
            return !!this.value;
        }).serialize();
        opts = useColorsInNatureIfSearchingOnlyByColor(opts);
        console.log('Requesting: ' + opts)

        // Search and display images
        search(opts, 'image');

        // Reduce # videos to better fit on the page
        var perPage = $('select[name=per_page]').val();
        if (perPage > 24) {
            opts = opts.replace('per_page=' + perPage, 'per_page=' + perPage / 2);
        }

        return false;
    });
    $('#search-form').submit();
});