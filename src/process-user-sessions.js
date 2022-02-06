const { getUsersActivities } = require("./get-user-activities");

const getTimeDifferenceInSeconds = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  return (endDate - startDate) / 1000;
};

const createUserSessionActivity = (user) => ({
  ended_at: user.answered_at,
  started_at: user.first_seen_at,
  activity_ids: [user.id],
  duration_seconds: getTimeDifferenceInSeconds(user.first_seen_at, user.answered_at),
});

const isAfter = (timestamp1, timestamp2) => {
  const timeDifferenceInSeconds = getTimeDifferenceInSeconds(timestamp1, timestamp2);
  return timeDifferenceInSeconds > 0;
};

const isInTheSameSession = (timestamp1, timestamp2) => {
  const timeDifferenceInSeconds = getTimeDifferenceInSeconds(timestamp1, timestamp2);
  return Math.abs(timeDifferenceInSeconds) <= 300;
};

const updateActivitySession = (sessionActivity, actualSessionActivity) => {
  const updateSession = { ...sessionActivity };
  updateSession.activity_ids.push(...actualSessionActivity.activity_ids);
  updateSession.duration_seconds = getTimeDifferenceInSeconds(sessionActivity.started_at, sessionActivity.ended_at);
  return updateSession;
};

const updateFirstInSession = (sessionActivity, actualSessionActivity) => {
  const updateSession = { ...updateActivitySession(sessionActivity, actualSessionActivity) };
  updateSession.started_at = actualSessionActivity.started_at;
  return updateSession;
};

const updateLastInSession = (sessionActivity, actualSessionActivity) => {
  const updateSession = { ...updateActivitySession(sessionActivity, actualSessionActivity) };
  updateSession.ended_at = actualSessionActivity.ended_at;
  return updateSession;
};

const processUserSessions = async () => {
  const userActivities = await getUsersActivities();

  const sessions = userActivities.activities.reduce((acc, activity) => {
    if (!acc[activity.user_id]) {
      acc[activity.user_id] = [createUserSessionActivity(activity)];
    } else {
      const actualSessionActivity = createUserSessionActivity(activity);
      let inputIndex;
      let updated = false;

      acc[activity.user_id].forEach((sessionActivity, index) => {
        if (isAfter(sessionActivity.started_at, actualSessionActivity.started_at)) {
          if (isInTheSameSession(sessionActivity.started_at, actualSessionActivity.ended_at)) {
            updateLastInSession(sessionActivity, actualSessionActivity);
            updated = true;
          }
        } else {
          if (isInTheSameSession(sessionActivity.started_at, actualSessionActivity.ended_at)) {
            updateFirstInSession(sessionActivity, actualSessionActivity);
            updated = true;
          } else {
            inputIndex = index;
          }
        }
      });

      if (!updated) {
        if (inputIndex === 0) acc[activity.user_id].unshift(actualSessionActivity);
        else if (inputIndex) acc[activity.user_id].splice(inputIndex, 0, actualSessionActivity);
        else acc[activity.user_id].push(actualSessionActivity);
      }
    }

    return acc;
  }, new Map());

  return { user_sessions: { ...sessions } };
};

module.exports = { processUserSessions };
