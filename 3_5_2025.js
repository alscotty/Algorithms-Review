// You are given an array of strings representing
// the results of soccer matches in a season.
// Each string has the form “team1Name team1Score:team2Score team2Name”.

const input = [
    "Barcelona 5:3 RealMadrid",
    "Manchester 2:2 Liverpool",
    "RealMadrid 0:2 Manchester",
  ];
  
  // In a soccer league, a team earns ‘points’ for each match they play.
  // - Win: 3 points
  // - Tie: 1 point
  // - Lose: 0 points
  
  // We’d like to process this array of information at the end of the season
  // to come up with a list of teams and their total points, ranked from
  // highest to lowest.
  
  const expectedOutput = [
    "Manchester: 4",
    "Barcelona: 3",
    "Liverpool: 1",
    "RealMadrid: 0",
  ];
  
  // Notes:
  // Assume the input array is well-formatted
  // Assume all team names have no spaces
  // Feel free to look up syntax as needed
  
  const processMatches = (matches) => {
    const teamToPoints = {};
  
  // - Win: 3 points
  // - Tie: 1 point
  // - Lose: 0 points
  
    matches.forEach(match => {
      let splitTeams = match.split(':');
      let firstTeam = splitTeams[0];
      
      let firstTeamSplit = firstTeam.split(' ');
      let firstTeamName = firstTeamSplit[0];
      let firstTeamScore = Number(firstTeamSplit[1]);
    
      let secondTeam = splitTeams[1];
  
      let secondTeamSplit = secondTeam.split(' ');
      let secondTeamName = secondTeamSplit[1];
      let secondTeamScore = Number(secondTeamSplit[0]);
      let firstTotal;
      let secondTotal;
  
      if (firstTeamScore > secondTeamScore){
        firstTotal = 3;
        secondTotal = 0
      } else if (firstTeamScore < secondTeamScore) {
          firstTotal = 0;
        secondTotal = 3
      } else {
          firstTotal = 1;
        secondTotal = 1
      }
  
      if (teamToPoints[firstTeamName]) {
        teamToPoints[firstTeamName] += firstTotal
      } else {
            teamToPoints[firstTeamName] = firstTotal
      }
      
  
      if (teamToPoints[secondTeamName]) {
        teamToPoints[secondTeamName] += secondTotal
      } else {
            teamToPoints[secondTeamName] = secondTotal
      }
  
    })
  
      console.log({ teamToPoints})
      let teamToPointsArray = []
  
      for (let key of Object.keys(teamToPoints)) {
        teamToPointsArray.push([key, teamToPoints[key]])
      }
  
      teamToPointsArray.sort(function(a, b) {
      return  b[1] - a[1];
  });
  
      return teamToPointsArray
  
  };
  
  const output = processMatches(input);
  
  console.log("---");
  console.log("output:", output);
  console.log("expected:", expectedOutput);
  