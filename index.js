var Chronicler = require('basicset-chronicler');
var ShouldReplyToTweet = require('./should-reply-to-tweet');

function ReplyDecisionKit(opts) {
  var kitDbPath;
  var username;
  var hoursToWaitBetweenRepliesToSameUser;
  var secondsToWaitBetweenRepliesToSameUser;

  if (opts) {
    kitDbPath = opts.kitDbPath;
    username = opts.username;
    hoursToWaitBetweenRepliesToSameUser = opts.hoursToWaitBetweenRepliesToSameUser;    
    secondsToWaitBetweenRepliesToSameUser = opts.secondsToWaitBetweenRepliesToSameUser;
  }

  if (!secondsToWaitBetweenRepliesToSameUser && hoursToWaitBetweenRepliesToSameUser) {
    secondsToWaitBetweenRepliesToSameUser = hoursToWaitBetweenRepliesToSameUser * 3600;
  }

  var chronicler = Chronicler({
    dbLocation: kitDbPath
  });

  function recordThatReplyHappened(tweet, done) {
    var userId = tweet.user.id_str;
    chronicler.recordThatUserWasRepliedTo(userId, done);
  }

  var shouldReplyToTweet = ShouldReplyToTweet({
    username: username,
    secondsToWaitBetweenRepliesToSameUser: secondsToWaitBetweenRepliesToSameUser,
    chronicler: chronicler
  });

  return {
    shouldReplyToTweet: shouldReplyToTweet,
    recordThatReplyHappened: recordThatReplyHappened
  };
}

module.exports = ReplyDecisionKit;
