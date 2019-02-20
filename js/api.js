var base_url = "https://api.football-data.org/v2/";

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);

        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}

function error(error) {
    console.log("Error : " + error);
}

function getCLMatches() {

    if ('caches' in window) {
        caches.match(base_url + "competitions/CL/matches")
            .then(function (response) {
                if (response) {
                    response.json()
                        .then(function (data) {
                            var matchesHTML = "";
                            data.matches.forEach(function (competition) {
                                matchesHTML += `
                                    <div class="row">
                                        <a href="./competition.html?id=${competition.id}">
                                            <div class="waves-effect waves-block waves-light center">
                                                <p>${competition.stage}</p>
                                                <p>${competition.homeTeam.name} (${competition.score.fullTime.homeTeam}) VS (${competition.score.fullTime.awayTeam}) ${competition.awayTeam.name}</p>
                                            </div>
                                        </a>
                                        <hr>
                                    </div>
                                `;
                            });
                            document.getElementById("matches").innerHTML = matchesHTML;
                        }).catch(error);
                }
            })
    } else {
        event.respondWith(
            caches.match(event.request, {ignoreSearch: true})
                .then(function (response) {
                    return response || fetch(event.request);
                })
        )
    }

    fetch(base_url + "competitions/CL/matches", {
        headers : {
            'X-Auth-Token': "b5e1c0925d18437c9d64c2ebd568940c"
        }
    })
        .then(status)
        .then(json)
        .then(function (data) {
            var matchesHTML = "";
            data.matches.forEach(function (competition) {
                matchesHTML += `
                    <div class="row">
                        <a href="./competition.html?id=${competition.id}">
                            <div class="waves-effect waves-block waves-light center">
                                <p>${competition.stage}</p>
                                <p>${competition.homeTeam.name} (${competition.score.fullTime.homeTeam}) VS (${competition.score.fullTime.awayTeam}) ${competition.awayTeam.name}</p>
                            </div>
                        </a>
                        <hr>
                    </div>
                `;
            });
            document.getElementById("matches").innerHTML = matchesHTML;
            // console.log(data);
        })
        .catch(error);
}

function getCLMatchesById() {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    fetch(base_url + "matches/" + idParam, {
        headers : {
            'X-Auth-Token': "b5e1c0925d18437c9d64c2ebd568940c"
        }
    })
        .then(status)
        .then(json)
        .then(function (data) {
            // console.log(data);

            var matchHTML = `    
                <ul class="collection with-header">
                  <li class="collection-item">
                    <div>
                        ${data.match.homeTeam.name}
                        <a href="./team.html?id=${data.match.homeTeam.id}" class="secondary-content">
                            <i class="material-icons">Go to team</i>
                        </a>
                        </div>
                  </li>
                </ul>
                <ul class="collection with-header">
                  <li class="collection-item">
                    <div>
                        ${data.match.awayTeam.name}
                        <a href="./team.html?id=${data.match.awayTeam.id}" class="secondary-content">
                            <i class="material-icons">Go to team</i>
                        </a>
                        </div>
                  </li>
                </ul>
            `;
            document.getElementById("body-content").innerHTML = matchHTML;
        });
}

function getTeamById() {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    fetch(base_url + "teams/" + idParam, {
        headers : {
            'X-Auth-Token': "b5e1c0925d18437c9d64c2ebd568940c"
        }
    })
        .then(status)
        .then(json)
        .then(function (data) {
            // console.log(data);

            var i, playersHTML = "";
            for (i in data.squad) {
                playersHTML += data.squad[i].name + "<br>";
            }

            var teamHTML = `
                <div class="row">
                    <div class="col s12 m6">
                      <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                          <span class="card-title">${data.name}</span>
                          <p>Short name : ${data.shortName}</p>
                          <p>Founded : ${data.founded}</p>
                          <p>Address : ${data.address}</p>
                          <p>Club colors : ${data.clubColors}</p>
                          <p>
                            Players : 
                            <div class="collection">
                                <a href="#!" class="collection-item">${playersHTML}</a>
                            </div>
                          </p>
                        </div>
                        <div class="card-action">
                          <div class="s6">
                            <a href="${data.website}">Website</a> ${data.phone}
                            <a href="../fav-team.html" onclick='addData()'>
                                <i class="material-icons right">favorite_border</i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
            `;
            document.getElementById("body-content").innerHTML = teamHTML;
        });
}

function addData() {
    if (!('indexedDB' in window)) {
        console.log('This browser doesn\\\'t support IndexedDB');
        return;
    }

    var dbPromise = idb.open("mydatabase", 9, function(upgradeDb) {
        console.log('Creating new object store . . . ');
        if (!upgradeDb.objectStoreNames.contains("teams")) {
            upgradeDb.createObjectStore("teams", {keyPath: 'id', autoIncrement: true});
        }
        console.log('Object store created!')
    });

    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");

    fetch(base_url + "teams/" + idParam, {
        headers : {
            'X-Auth-Token': "b5e1c0925d18437c9d64c2ebd568940c"
        }
    })
        .then(status)
        .then(json)
        .then(function (data) {
            dbPromise.then(function (db) {
                if ('PushManager' in window) {
                    navigator.serviceWorker.getRegistration()
                        .then(function (reg) {
                            reg.showNotification(`Team ${data.name} added to your favourite list`);
                        });
                }

                var tx = db.transaction('teams', 'readwrite');
                var store = tx.objectStore('teams');
                var team = {
                    name: `${data.name}`
                };
                store.put(team);
                return tx.complete;
            }).then(function () {
                console.log('Team successfully added');
            }).catch(function (error) {
                console.log('Team failed to added');
                console.log(error);
            });
        });


}