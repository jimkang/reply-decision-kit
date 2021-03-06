reply-decision-kit
==================

A recordkeeping kit that helps Twitter bots decide whether they should reply to a given tweet or not.

Installation
------------

    npm install reply-decision-kit

Usage
-----

    var ReplyDecisionKit = require('reply-decision-kit');
    var kit = ReplyDecisionKit({
      kitDbPath: __dirname + '/reply-records.db',
      username: 'thegreatbot',
      secondsToWaitBetweenRepliesToSameUser: 60 * 15
    });

    kit.shouldReplyToTweet(tweet, checkAnswer);

    function checkAnswer(error) {        
      if (error) {
        console.log('Did not reply because', error.message);
      }
      else {
        replyToTweet(tweet, 'Hey guy!', tweetDone);
      }
    }

    function tweetDone(error, replyData, done) {
      if (error) {
        console.log(error);
      }
      else {
        kit.recordThatReplyHappened(tweet, done);
      }
    }

By default, it will say that you shouldn't reply to tweets that don't mention you. You can pass the `mustMentionSelf` option with false to change this behavior.

You can also pass a username in the `alwaysRespondToMentionsFrom` opt to have it skip checking how recently it replied to a particular user and always decide it should respond to that user. 

Tests
-----

Run tests with `make test`.

License
-------

The MIT License (MIT)

Copyright (c) 2016 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
