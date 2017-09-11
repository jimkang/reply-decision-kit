/* global __dirname */

var test = require('tape');
var ReplyDecisionKit = require('../index');
var queue = require('d3-queue').queue;
var rimraf = require('rimraf');

var username = 'testbot';

var testCasesInOrder = [
  {
    name: 'Own tweet',
    tweet: {
      user: {
        screen_name: username,
        id_str: '11111111'
      }
    },
    shouldReply: false
  },
  {
    name: 'Legitimate',
    tweet: {
      user: {
        screen_name: 'someoneElse',
        id_str: '22222222'
      },
      text: '@testbot What is up?'
    },
    shouldReply: true
  },
  {
    name: 'Too soon',
    tweet: {
      user: {
        screen_name: 'someoneElse',
        id_str: '22222222'
      },
      text: '@testbot I have another question!'
    },
    shouldReply: false
  },
  {
    name: 'From special user, message 1',
    tweet: {
      user: {
        screen_name: 'specialuser',
        id_str: '33333333'
      },
      text: '@testbot Hello!'
    },
    shouldReply: true
  },
  {
    name: 'From special user, message 2',
    tweet: {
      user: {
        screen_name: 'specialuser',
        id_str: '33333333'
      },
      text: '@testbot Hello again!'
    },
    shouldReply: true
  },
  {
    name: 'From special user, does not mention bot.',
    tweet: {
      user: {
        screen_name: 'specialuser',
        id_str: '33333333'
      },
      text: 'Just talkin\'.'
    },
    shouldReply: false
  }
];

var kitDbPath = __dirname + '/test.db';
rimraf.sync(kitDbPath);

var kit = ReplyDecisionKit({
  kitDbPath: kitDbPath,
  username: username,
  secondsToWaitBetweenRepliesToSameUser: 60,
  mustMensionSelf: true,
  alwaysRespondToMentionsFrom: 'specialuser'
});

var q = queue(1);
testCasesInOrder.forEach(queueTest);
q.awaitAll(logDone);

function queueTest(testCase) {
  q.defer(runTest);

  function runTest(done) {
    test(testCase.name, basicTest);

    function basicTest(t) {
      kit.shouldReplyToTweet(testCase.tweet, checkAnswer);

      function checkAnswer(error) {        
        t.equal(!error, testCase.shouldReply, 'shouldReply is correct.');
        if (!error) {
          kit.recordThatReplyHappened(testCase.tweet, endTest);
        }
        else {
          endTest();
        }
      }

      function endTest() {
        t.end();
        done();
      }
    }
  }
}

function logDone(error) {
  if (error) {
    console.log(error);
  }
  console.log('Done!');
}
