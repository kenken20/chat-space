$(function() {
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="message-contents">
          <div class="message-contents__info">
            <div class="message-name">
              ${message.user_name}
            </div>
            <div class="message-time">
              ${message.created_at}
            </div>
          </div>
          <div class="message-contents__text">
            ${message.body}
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="message-contents">
          <div class="message-contents__info">
            <div class="message-name">
              ${message.user_name}
            </div>
            <div class="message-time">
              ${message.created_at}
            </div>
          </div>
          <div class="message-contents__text">
            ${message.body}
          </div>
        </div>`
      return html;
    };
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__message-list').append(html);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('form')[0].reset();
      $('.input-box__send-btn').prop('disabled', false);

    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
      $('.input-box__send-btn').prop('disabled', false);
    })
  });
});