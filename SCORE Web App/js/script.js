function showCreateForm() {
  $('#editform').modal('show');
  $('#editform').addClass('createForm');
  $('.modal-title').text('Add new product');
  $('button.submit').text('Create');
}
$('#add').on('click', function(event){
    showCreateForm();
  });


$(document).on('click', '.number-spinner button', function () {
var btn = $(this),
  oldValue = btn.closest('.number-spinner').find('input').val().trim(),
  newVal = 0;

if (btn.attr('data-dir') == 'up') {
  newVal = parseInt(oldValue) + 1;
} else {
  if (oldValue > 1) {
    newVal = parseInt(oldValue) - 1;
  } else {
    newVal = 1;
  }
}
btn.closest('.number-spinner').find('input').val(newVal);
});

$('#add-to-cart').on('click', function(){
  alert('item added!');
});
