$('#edit').on('click', function(){
  var form = document.getElementById('formRowTpl');
  if(form.style.display === 'none'){
  form.style.display = 'block';
  } else {
  form.style.display = 'none';
  }
});

var userDetails = document.getElementById('user-details');

$.ajax({
  method: 'GET',
  url: '/user',
}).done(function(data){
  console.log(data)
  handleUserData(data)
  return data;
});

function handleUserData(user){
  console.log(user._id)
  console.log(user.username)
  console.log(user.email)
}
