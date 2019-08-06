/* Step 1: using axios, send a GET request to the following URL
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR
   github info! You will need to understand the structure of this
   data in order to use it to build your component function

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function,
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either
          follow this link in your browser https://api.github.com/users/<Your github name>/followers
          , manually find some other users' github handles, or use the list found
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.

          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
    'tetondan',
    'dustinmyers',
    'justsml',
    'luishrd',
    'bigknell',
];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

let cards = document.querySelector('.cards');

async function gitUser(userName) {
    try {
        let response = await axios.get(
            'https://api.github.com/users/' + userName
        );
        console.log(response.data);
        cards.append(createUserCard(response.data));
    } catch (error) {
        console.error(error);
    }
}

function createUserCard(userData) {
    //Card Container
    let cardContainer = document.createElement('div');
    cardContainer.classList.add('card');

    //img
    let img = document.createElement('img');
    img.src = userData.avatar_url;

    //Card Info Container
    let cardInfo = document.createElement('div');
    cardInfo.classList.add('card-info');

    //Name Header
    let name = document.createElement('h3');
    name.classList.add('name');
    name.textContent = userData.name;

    //userName
    let userName = document.createElement('p');
    userName.classList.add('username');
    userName.textContent = userData.login;

    //location
    let location = document.createElement('p');
    location.textContent = `Location: ${userData.location}`;

    //Profile
    let profile = document.createElement('p');
    let profileLink = document.createElement('a');

    profileLink.href = userData.html_url;
    profileLink.textContent = userData.html_url;

    profile.textContent = 'Profile: ';
    profile.append(profileLink);

    //followers / following
    let followers = document.createElement('p');
    let following = document.createElement('p');

    followers.textContent = `Followers: ${userData.followers}`;
    following.textContent = `Following: ${userData.following}`;

    //bio
    let bio = document.createElement('p');
    bio.textContent = userData.bio;

    //append stuff
    cardInfo.append(
        name,
        userName,
        location,
        profile,
        followers,
        following,
        bio
    );
    cardContainer.append(img, cardInfo);

    return cardContainer;
}

//gitUser('lucasbaze');
// followersArray.forEach(user => {
//     gitUser(user);
// });

/* List of LS Instructors Github username's:
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

function recursive(userName) {
    //get the user data

    axios.get('https://api.github.com/users/' + userName).then(response => {
        gitUser(userName);
        let followers = response.data.followers;
        if (followers < 5) {
            axios
                .get('https://api.github.com/users/' + userName + '/followers')
                .then(response => {
                    response.data.forEach(follower => {
                        recursive(follower.login);
                    });
                });
        } else {
            console.log(response.data.login);
        }
    });

    //check to see if the person has any followers.
    //if yes, go get their list of followers with the followers_url
    //get the login info off of that returned response
    //repeat the above steps
    //if NO, then create the card and return it
}

recursive('lucasbaze');
