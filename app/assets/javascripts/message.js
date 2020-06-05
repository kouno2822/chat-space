$(function(){
  function buildHTML(message){
    if(message.image){
      let html = `<div class="Main_chat__messages-list">
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
                        <img src = "${message.image}">
                    </div>
                  </div>`
                  return html;
    } else {
      let html = `<div class="Main_chat__messages-list">
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
  $(".Main_chat__messages-form-contents").on('submit',function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data)
      $('.Main_chat__messages').append(html);
      $('.Main_chat__messages').animate({ scrollTop: $('.Main_chat__messages')[0].scrollHeight});
      $('.Main_chat__messages-form-contents')[0].reset();
      $('.Main_chat__messages-form-contents-right').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});