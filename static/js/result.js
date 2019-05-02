//Original Base Code: https://jsfiddle.net/q1cvvk7x
/* Fetch functions */

let API_URL = 'https://api.shutterstock.com/v2';
let clientId = '3352aeffbd24d33f8859';
//let clientId = '7b101a55038f7ddb1c48e2083a071a';
let clientSecret = '097f832242ad371d9f012770cabdb1e6cebc433a';
//let clientSecret = 'c291c351607b1dd14f8477d5d017db';

// Base 64 encode Client ID and Client Secret for use in the Authorization header
let encodeAuthorization = function () {

    if (!clientId || !clientSecret) {
        $('#collapseAuthentication').collapse('show');
        alert('Client id and/or client secret are missing in the API key section, with out these you wont be able to contact the API.');
        return;
    }
    return 'Basic ' + window.btoa(clientId + ':' + clientSecret);
}

// Search media by type
let search = function (opts) {
    let mediaType = 'image';
    let $container = $('#' + mediaType + '-search-results');

    authorization = encodeAuthorization();
    if (!authorization) return;

    let jqxhr = $.ajax({
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
            let imageData = data.data.slice(0, 4);
            let minHeightCSS = /horizontal/.test(opts) ? 'horizontal-image' : 'vertical-image';
            $.each(imageData, function (i, item) {
                let component = renderImageComponent(item, minHeightCSS);
                $('#image-row').append(component);
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
let renderImageComponent = function (image, minHeightCSS) {
    if (!image || !image.assets || !image.assets.large_thumb || !image.assets.large_thumb.url) return;

    let wrapper = $('<td>');
    let thumbnail = $('<img>');

    $(thumbnail)
//        .css('height', 220)
        .css('padding', 30)
        .css('width', 250)
        .attr('id', image.id)
        .attr('src', image.assets.huge_thumb.url)
        .attr('title', image.description);

    $(wrapper)
        .append(thumbnail);

    return wrapper;
}

/*============================End of JSFiddle Code============================*/

$(function () {

    // let keywords = localStorage.getItem('keywords');
    // let keywords = $('#keywords').val();
    let keywords = "query=" + $('#keywords').val().replace(/[, ]+/g, "%20") + "&";
    console.log(keywords);
    search(keywords);

    let item1 = document.getElementById('checkbox1');
    let item2 = document.getElementById('checkbox2');
    let item3 = document.getElementById('checkbox3');
    let facebook1 = document.getElementById("generate-1").value;
    let facebook2 = document.getElementById("generate-2").value;
    let facebook3 = document.getElementById("generate-3").value;
    let twitter1 = facebook1;
    let twitter2 = facebook2;
    let twitter3 = facebook3;

    let pic1 = document.getElementById('checkbox4');
    let pic2 = document.getElementById('checkbox5');
    let pic3 = document.getElementById('checkbox6');
    let pic4 = document.getElementById('checkbox7');

    let checkbox1 = document.getElementById('checkbox-1');
    let checkbox2 = document.getElementById('checkbox-2');
    let checkbox3 = document.getElementById('checkbox-3');
    
    item1.onclick = () => {
        item1.checked = true;
        item2.checked = false;
        item3.checked = false;
    }

    // item2.onclick = () => {
    //     item2.checked = true;
    //     item1.checked = false;
    //     item3.checked = false;
    // }

    // item3.onclick = () => {
    //     item3.checked = true;
    //     item1.checked = false;
    //     item2.checked = false;
    // }

    pic1.onclick = () => {
        pic1.checked = true;
        pic2.checked = false;
        pic3.checked = false;
        pic4.checked = false;
    }

    pic2.onclick = () => {
        pic2.checked = true;
        pic1.checked = false;
        pic3.checked = false;
        pic4.checked = false;
    }

    pic3.onclick = () => {
        pic3.checked = true;
        pic1.checked = false;
        pic2.checked = false;
        pic4.checked = false;
    }

    pic4.onclick = () => {
        pic4.checked = true;
        pic1.checked = false;
        pic2.checked = false;
        pic3.checked = false;
    }


    checkbox1.checked = true;
    // document.getElementById("generate-1").value = "The perfect dress for the perfect fit!";
    // document.getElementById("generate-2").value = "The new collection is here. Shop women's new arrivals!";
    // document.getElementById("generate-3").value = "It's gala time! Shop new dress collection!";

    checkbox1.onclick = () => {
        console.log("Checkbox 1 has been clicked");
        twitter1 = document.getElementById("generate-1").value;
        twitter2 = document.getElementById("generate-2").value;
        twitter3 = document.getElementById("generate-3").value;
        document.getElementById("generate-1").value = facebook1;
        document.getElementById("generate-2").value = facebook2;
        document.getElementById("generate-3").value = facebook3;
        // document.getElementById("generate-1").value = "The perfect dress for the perfect fit!";
        // document.getElementById("generate-2").value = "The new collection is here. Shop women's new arrivals!";
        // document.getElementById("generate-3").value = "It's gala time! Shop new dress collection!";
        checkbox1.setAttribute("checked", "true");
        checkbox2.checked = false;
        checkbox3.checked = false;
    };

    checkbox2.onclick = () => {
        console.log("Checkbox 2 has been clicked");
        facebook1 = document.getElementById("generate-1").value;
        facebook2 = document.getElementById("generate-2").value;
        facebook3 = document.getElementById("generate-3").value;
        document.getElementById("generate-1").value = twitter1;
        document.getElementById("generate-2").value = twitter2;
        document.getElementById("generate-3").value = twitter3;
        // document.getElementById("generate-1").value = "Feeling beautiful today? Check our new collection!";
        // document.getElementById("generate-2").value = "It's GALA TIME!";
        // document.getElementById("generate-3").value = "A look you need to wear for the gala!";
        checkbox1.checked = false;
        checkbox2.setAttribute("checked", "true");
        checkbox3.checked = false;
    };

    checkbox3.onclick = () => {
        console.log("Checkbox 3 has been clicked");
        // document.getElementById("generate-1").value = "Checkbox 3 has been selected";
        // document.getElementById("generate-2").value = "Checkbox 3 has been selected";
        // document.getElementById("generate-3").value = "Checkbox 3 has been selected";
        checkbox1.checked = false;
        checkbox2.checked = false;
        checkbox3.setAttribute("checked", "true");
    };
});