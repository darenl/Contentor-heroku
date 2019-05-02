$(function() {
   
    $('#generate').click(() => {
        let keywords = "query=" + $('#keywords').val().replace(/[, ]+/g, "%20") + "&";
        // let keywords = $('#keywords').val();
        // data = JSON.stringify({"keywords": keywords});
        // $.ajax({
		// 	url: '/test_inputs',
		// 	data: data,
		// 	type: 'POST',
		// 	content_type: 'application/json',
        // });
        localStorage.setItem('keywords', keywords)
    });
});