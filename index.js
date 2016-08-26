var Chronicler = require('basicset-chronicler');
var ShouldReplyToTweet = require('./should-reply-to-tweet');

function ReplyDecisionKit(opts) {
  var kitDbPath;
  var username;
  var hoursToWaitBetweenRepliesToSameUser;

  if (opts) {
    kitDbPath = opts.kitDbPath;
    username = opts.username;
    hoursToWaitBetweenRepliesToSameUser = opts.hoursToWaitBetweenRepliesToSameUser;    
  }

  var chronicler = Chronicler({
    dbLocation: kitDbPath
  });

  function recordThatReplyHappened(tweetData, response, done) {
    var userId = tweetData.user.id_str;
    chronicler.recordThatUserWasRepliedTo(userId, done);
  }

  var shouldReplyToTweet = ShouldReplyToTweet({
    username: username,
    hoursToWaitBetweenRepliesToSameUser: hoursToWaitBetweenRepliesToSameUser,
    chronicler: chronicler
  });

  return {
    shouldReplyToTweet: shouldReplyToTweet,
    recordThatReplyHappened: recordThatReplyHappened
  };
}

module.exports = ReplyDecisionKit;
