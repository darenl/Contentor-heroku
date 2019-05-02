$(function() {
   
    $('#generate').click(() => {
        let keywords = "query=" + $('#keywords').val().replace(/[, ]+/g, "%20") + "&";
        data = JSON.stringify({"keywords": keywords});
        $.ajax({
			url: '/result',
			data: data,
			type: 'POST',
			content_type: 'application/json',
			success: function(res){
				console.log(res);
			},
			error: function(err){
				console.log(err);
			}
        });
        // localStorage.setItem('keywords', keywords)
    });
});