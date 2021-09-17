const data = {
  f01: {
    name: "Alice",
    age: 15,
    follows: ["f02", "f03", "f04"],
  },
  f02: {
    name: "Bob",
    age: 20,
    follows: ["f05", "f06"],
  },
  f03: {
    name: "Charlie",
    age: 35,
    follows: ["f01", "f04", "f06"],
  },
  f04: {
    name: "Debbie",
    age: 40,
    follows: ["f01", "f02", "f03", "f05", "f06"],
  },
  f05: {
    name: "Elizabeth",
    age: 45,
    follows: ["f04"],
  },
  f06: {
    name: "Finn",
    age: 25,
    follows: ["f05"],
  },
};

// We are going to write a series of functions that solve specific problems

// 1. Biggest Follower
/* 
    This function will find the person who follows the most people 
*/
const findTheBiggestFollower = (socialNetworkData) => {
  const bigggestFollowerObj = {};
  const socialNetworkDataKeys = Object.keys(socialNetworkData);

  for (let key of socialNetworkDataKeys) {
    if (
      !bigggestFollowerObj.followerCount ||
      socialNetworkData[key].follows.length > bigggestFollowerObj.followerCount
    ) {
      bigggestFollowerObj.followerCount = socialNetworkData[key].follows.length;
      bigggestFollowerObj.userName = socialNetworkData[key].name;
      continue;
    }
  }

  return bigggestFollowerObj.userName;
};

console.log(findTheBiggestFollower(data));
/* 
    2. Most Popular
    This function will return the person who is followed by other people the most
*/

const findTheMostPopularUser = (socialNetworkData) => {
  const counterObject = {};

  const socialNetworkDataKeys = Object.keys(socialNetworkData);

  for (let key of socialNetworkDataKeys) {
    for (let user of socialNetworkData[key].follows) {
      counterObject[user] ? counterObject[user]++ : (counterObject[user] = 1);
    }
  }

  const counterObjectKeys = Object.keys(counterObject);
  const highestNumberOfFollowersObj = {};
  for (let userKey of counterObjectKeys) {
    if (
      !highestNumberOfFollowersObj.followersCount ||
      counterObject[userKey] >= highestNumberOfFollowersObj.followersCount
    ) {
      highestNumberOfFollowersObj.user
        ? counterObject[userKey] > highestNumberOfFollowersObj.followersCount
          ? (highestNumberOfFollowersObj.user = [userKey])
          : highestNumberOfFollowersObj.user.push(userKey)
        : (highestNumberOfFollowersObj.user = [userKey]);
      highestNumberOfFollowersObj.followersCount = counterObject[userKey];
      continue;
    }
  }

  let finalString = "The user who have the most followers are:";

  for (let userId of highestNumberOfFollowersObj.user) {
    finalString += ` ${socialNetworkData[userId].name},`;
  }

  return finalString.slice(0, finalString.length - 2);
};

console.log(findTheMostPopularUser(data));
/* 
    3. print All
    This function prints out each person's followers and following list
*/

const printAllFollowsAndFollowers = (socialNetworkData) => {
  const counterObject = {};

  const socialNetworkDataKeys = Object.keys(socialNetworkData);

  for (let key of socialNetworkDataKeys) {
    counterObject[key]
      ? (counterObject[key] = {
          ...counterObject[key],
          follows: "",
        })
      : (counterObject[key] = {
          follows: "",
        });

    for (let userKey of socialNetworkData[key].follows) {
      counterObject[key].follows += `${socialNetworkData[userKey].name}, `;

      if (counterObject[userKey]) {
        counterObject[userKey].followers
          ? (counterObject[
              userKey
            ].followers += `${socialNetworkData[key].name}, `)
          : (counterObject[userKey] = {
              ...counterObject[userKey],
              followers: `${socialNetworkData[key].name}, `,
            });

        continue;
      }

      counterObject[userKey] = {
        followers: `${socialNetworkData[key].name}, `,
      };
    }
  }
  console.log(counterObject);

  for (let userId of socialNetworkDataKeys) {
    counterObject[userId].follows = counterObject[userId].follows
      .trim()
      .slice(0, counterObject[userId].follows.length - 2);
    counterObject[userId].followers = counterObject[userId].followers
      .trim()
      .slice(0, counterObject[userId].followers.length - 2);

    console.log(
      `${socialNetworkData[userId].name} has these followers: ${counterObject[userId].followers} and follows these users: ${counterObject[userId].follows}`
    );
  }
};

printAllFollowsAndFollowers(data);

/* 
    4. Unrequited Followers
    This function will returns a list of people who don't follow each user
*/
const unrequitedFollowers = (socialNetworkData) => {
  // The way we can check for unrequited followers is by first checking who the user follows
  // Then check if the end user follows the source user
  const deepCopyOfData = JSON.parse(JSON.stringify(socialNetworkData));
  const unrequitedObject = {};
  // First loop through the object keys and use the follows list for each user
  const objectKeys = Object.keys(deepCopyOfData);

  for (let userId of objectKeys) {
    // This is the list of users that the current user follows
    const { follows } = deepCopyOfData[userId];
    // Loop over the following list and check if the followed user also follows them back
    for (let followedUserId of follows) {
      console.log(userId, followedUserId, follows);
      // If the followed user also follows them back
      // Delete the user id from both follow list (This is so that we don't check twice)
      if (deepCopyOfData[followedUserId].follows.includes(userId)) {
        deepCopyOfData[userId].follows = deepCopyOfData[userId].follows.filter(
          (item) => item !== followedUserId
        );
        deepCopyOfData[followedUserId].follows = deepCopyOfData[
          followedUserId
        ].follows.filter((item) => item !== userId);
        continue;
      }
      // If they aren't followed back, create an object of the user id and an array of unrequitted followers
      unrequitedObject[userId]
        ? unrequitedObject[userId].unrequitedUsers.push(followedUserId)
        : (unrequitedObject[userId] = { unrequitedUsers: [followedUserId] });
    }
  }

  console.log(unrequitedObject);
  const unrequitedKeys = Object.keys(unrequitedObject);
  for (let unrequitedUser of unrequitedKeys) {
    let listOfUsersThatDontFollowCurrentUser = "";
    for (let userId of unrequitedObject[unrequitedUser].unrequitedUsers) {
      listOfUsersThatDontFollowCurrentUser += `${socialNetworkData[userId].name}, `;
    }

    console.log(
      `User ${
        socialNetworkData[unrequitedUser].name
      } isn't followed by these users: ${listOfUsersThatDontFollowCurrentUser.slice(
        0,
        listOfUsersThatDontFollowCurrentUser.length - 2
      )}`
    );
  }
};
unrequitedFollowers(data);

/* 
    5. Identify who has the most followers over 30
*/
const mostFollowersOver30 = (socialNetworkData) => {
  // Go through each person's follow list
  // Use this information to check if the follewed person is over 30
  // If they aren't ignore it
  // If they are over 30, add a counter to the new object with the user ID key
  // Also check if the new follower count is the biggest or not
  // If it's biggest, assign a new number to the biggestNumber key
  // Create a new key of the biggest counter number and create an array of users

  const biggestFollowersInformationObject = {};

  const userKeys = Object.keys(socialNetworkData);

  // We are going to loop through the keys and go through each follows list
  for (let userId of userKeys) {
    for (let followerId of socialNetworkData[userId].follows) {
      if (socialNetworkData[followerId].age <= 30) {
        // Since this person is under 30, we are going to continue the loops
        continue;
      }

      // We know that the followed user is over 30
      // We are now going to add or update the followed user information to the object
      biggestFollowersInformationObject[followerId]
        ? biggestFollowersInformationObject[followerId]++
        : (biggestFollowersInformationObject[followerId] = 1);

      // If the largest following number doesnt exist yet, create it and assign a new key with the followed user id
      if (!biggestFollowersInformationObject.largestFollowingNumber) {
        biggestFollowersInformationObject.largestFollowingNumber =
          biggestFollowersInformationObject[followerId];

        // Assign the number as a key and add user key as an item in the array
        biggestFollowersInformationObject[
          biggestFollowersInformationObject.largestFollowingNumber
        ] = [followerId];
        continue;
      }

      // Now use this followed user information to check if its the biggest following list
      if (biggestFollowersInformationObject.largestFollowingNumber) {
        const { largestFollowingNumber } = biggestFollowersInformationObject;
        if (
          biggestFollowersInformationObject[followerId] >=
          largestFollowingNumber
        ) {
          // Since the followed user has the most number of followers now, we are going reassign the largest following number
          biggestFollowersInformationObject.largestFollowingNumber =
            biggestFollowersInformationObject[followerId];

          // We are going to use this largest number and create or update key with the user
          biggestFollowersInformationObject[
            biggestFollowersInformationObject.largestFollowingNumber
          ]
            ? biggestFollowersInformationObject[
                biggestFollowersInformationObject.largestFollowingNumber
              ].push(followerId)
            : (biggestFollowersInformationObject[
                biggestFollowersInformationObject.largestFollowingNumber
              ] = [followerId]);
        }
      }
    }
  }

  console.log(
    biggestFollowersInformationObject[
      biggestFollowersInformationObject.largestFollowingNumber
    ]
  );
};
mostFollowersOver30(data);
/* 
    6. Identify who follows the most people over 30
*/
const personWhoFollowsTheMostOver30 = (socialNetworkData) => {
  // Loop through each person
  // Ignore anyone under 30
  // If they are 30 or above, we are going to compare the length of followers to the current highest length
  // If the length of the current user is equal or greater than the listed largest follows, the user will be added to the largest number key
  const mostFollowsInformation = {};

  const userKeys = Object.keys(socialNetworkData);

  for (let userId of userKeys) {
    if (socialNetworkData[userId].age <= 30) {
      continue;
    }

    // Over 30
    if (!mostFollowsInformation.highestFollowsCount) {
      mostFollowsInformation.highestFollowsCount =
        socialNetworkData[userId].follows.length;
      mostFollowsInformation[mostFollowsInformation.highestFollowsCount] = [
        userId,
      ];
      continue;
    }

    // Compare the highest follows count with the length of the follows count
    if (
      socialNetworkData[userId].follows.length >=
      mostFollowsInformation.highestFollowsCount
    ) {
      mostFollowsInformation.highestFollowsCount =
        socialNetworkData[userId].follows.length;
      mostFollowsInformation[mostFollowsInformation.highestFollowsCount]
        ? mostFollowsInformation[
            mostFollowsInformation.highestFollowsCount
          ].push(userId)
        : (mostFollowsInformation[mostFollowsInformation.highestFollowsCount] =
            [userId]);
    }
  }

  console.log(
    mostFollowsInformation[mostFollowsInformation.highestFollowsCount]
  );
};
personWhoFollowsTheMostOver30(data);

/* 
    7. List everyone and their reach (sum of their followers and the sum of their followers of followers)
*/
const sumOfUserReach = (socialNetworkData) => {
  // We are going to create an object that has the number of followers and the list of followers for each user
  // We are going to use this object and calculate total reach for each user afterwards
  const userReachInformationObject = {};

  const userKeys = Object.keys(socialNetworkData);
  for (let userId of userKeys) {
    const { follows } = socialNetworkData[userId];

    for (let followedUserId of follows) {
      // We are going to create or update the followers number and also create or update the list of users that follow this user
      if (!userReachInformationObject[followedUserId]) {
        userReachInformationObject[followedUserId] = {
          numberOfFollowers: 1,
          listOfFollowers: [userId],
        };
        continue;
      }

      // We are going increase the number of follower list and number
      userReachInformationObject[followedUserId].numberOfFollowers++;
      userReachInformationObject[followedUserId].listOfFollowers.push(userId);
    }
  }

  console.log(userReachInformationObject);
  // We are going use this information to calaculate the reach
  // We are going to have a total for each user
  // The total variable will be added each time we loop through the followers list
  // We are also going to create an array of already "Counted users" so that we don't double count

  const test = (
    userKey,
    userReachInformationObject,
    alreadyCheckedArray,
    total
  ) => {
    total += userReachInformationObject[userKey].numberOfFollowers;
    alreadyCheckedArray.push(userKey);

    for (let followerId of userReachInformationObject[userKey]
      .listOfFollowers) {
      if (alreadyCheckedArray.includes(followerId)) {
        continue;
      }

      // call this function again
      return test(
        followerId,
        userReachInformationObject,
        alreadyCheckedArray,
        total
      );
    }

    return total;
  };

  const objectKeys = Object.keys(userReachInformationObject);
  for (let userKey of objectKeys) {
    let total = userReachInformationObject[userKey].numberOfFollowers;
    const alreadyCheckedArray = [userKey];

    for (let followerId of userReachInformationObject[userKey]
      .listOfFollowers) {
      if (alreadyCheckedArray.includes(followerId)) {
        continue;
      }

      // call test
      total = test(
        followerId,
        userReachInformationObject,
        alreadyCheckedArray,
        total
      );
    }
    console.log(userKey, total);
  }
};
sumOfUserReach(data);
