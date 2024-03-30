angular.module('chatApp', []).controller('ChatController', ['$scope', '$interval', function($scope, $interval) {
    var chat = this;

    chat.getUserName = function() {
        localStorage.removeItem('userName');
        let userName = '';
        while(!userName || userName.trim() === ''){
            userName = window.prompt('Enter your username:');
        }
        localStorage.setItem('userName', userName);
        chat.userName = userName;
    };

    chat.getUserName();

    chat.userMessagesKey = 'messages';
    chat.messages = JSON.parse(localStorage.getItem(chat.userMessagesKey)) || [];

    chat.sendMessage = function() {
        let now = new Date();
        if (chat.message) {
            chat.messages.push(
                { sender: chat.userName,
                    text: chat.message,
                    time: `${now.getFullYear()}/${now.getMonth()}/${now.getDay()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}` 
                });
            localStorage.setItem(chat.userMessagesKey, JSON.stringify(chat.messages));
            chat.message = '';
        }
    };

    $interval(function() {
        console.log(chat.userName)
        var storedMessages = JSON.parse(localStorage.getItem(chat.userMessagesKey)) || [];
        if (storedMessages.length > chat.messages.length) {
            chat.messages = storedMessages;
        }
    }, 1000);
}]);