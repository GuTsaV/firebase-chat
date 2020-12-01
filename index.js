const firebase = require('firebase');
const readline = require('readline');

firebase.initializeApp({
  databaseURL: 'https://chatten-88cca.firebaseio.com'
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

const chatRef = firebase.database().ref('chat');

rl.on('line', function(line) {
  chatRef.push({
    text: line,
    name: process.argv[2]
  })
});

chatRef.on('child_added', function(childSnapshot, _) {
  const message = childSnapshot.val();
  if (message.name !== process.argv[2]) {
    console.log(message.name + ': ' + message.text);
  }
});
