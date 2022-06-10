'use strict';

// クライアントからサーバーへの接続要求
const socket = io.connect();

// 接続時の処理
socket.on('connect', () => {
    console.log('connect');
});

// 「Send」ボタンを押したときの処理
$('form').submit(() => {
    const $inp = $('#input_message');
    const text = $inp.val();

    console.log('#input_message :', text);

    if (text) {
        // サーバーに、イベント名 'new message' で入力テキストを送信
        socket.emit('new message', text);
        // テキストボックスを空に
        $inp.val('');
    }
    // フォーム送信はしない
    return false;
});

// サーバーからのメッセージ拡散に対する処理
socket.on('spread message', (strMessage) => {
    console.log('spread message :', strMessage);

    // 拡散されたメッセージをメッセージリストに追加
    $('#message_list').prepend($('<li>').text(strMessage));
});
