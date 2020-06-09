$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="Main_chat__messages-list" data-message-id=${message.id}>
          <div class="Main_chat__messages-list-info">
            <div class="Main_chat__messages-list-info-name">
              ${message.user_name}
            </div>
            <div class="Main_chat__messages-list-info-time">
              ${message.created_at}
            </div>
          </div>
          <div class="Main_chat__messages-list-message">
            <p>
              ${message.content}
            </p>
            <img src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="Main_chat__messages-list" data-message-id=${message.id}>
        <div class="Main_chat__messages-list-info">
          <div class="Main_chat__messages-list-info-name">
            ${message.user_name}
          </div>
          <div class="Main_chat__messages-list-info-time">
            ${message.created_at}
          </div>
        </div>
        <div class="Main_chat__messages-list-message">
          <p>
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.Main_chat__messages-list:last').data("message-id");

    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.Main_chat__messages').append(insertHTML);
        $('.Main_chat__messages').animate({ scrollTop: $('.Main_chat__messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});