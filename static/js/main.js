$(function(){
	$('#test').click(function(){
		let user = $('#my_name').val();
		$.ajax({
			url: '/test_user',
			data: $('#form_test').serialize(),
			type: 'POST',
			content_type: 'application/json',
			success: function(res){
				console.log(res);
				let name = "<h1>" + res['user'] + "</h1>";
				$('#res').append(name);
			},
			error: function(err){
				console.log(err);
			}
		});
	});

	$('#add_input').click(function(){
		let new_input = "<input type='text' name='test_input' class='test_input'><br><br>";
		$('#new_inputs').append(new_input);
	})

	$('#test_new').click(function(){
		let all_inputs = $("input[name='test_input']").map(function(){return $(this).val();}).get();
		all_inputs = JSON.stringify({'items': all_inputs});
		$.ajax({
			url: '/test_inputs',
			data: all_inputs,
			type: 'POST',
			content_type: 'application/json',
			success: function(res){
				console.log(res);
			},
			error: function(err){
				console.log(err);
			}
		});
	});
});