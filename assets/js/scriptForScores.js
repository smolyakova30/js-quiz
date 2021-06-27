
displayScores ();

function displayScores () { 
    let highScores = document.createElement("section");
    highScores.id = "page-content-table"
    document.body.append(highScores);
    
    let scoresHeader = document.createElement("h2");
    scoresHeader.textContent = "High Scores"
    highScores.append(scoresHeader);
    // create list to display high scores
    let scoresList = document.createElement("ol")
    scoresList.id = "scoresList"
    highScores.append(scoresList);
    let addScores = function () {
        let scoreScrnObj = JSON.parse(localStorage.getItem("scoreTable"))
        scoreScrnObj.sort((a, b) => b.score - a.score);
        for (i = 0; i < 3; i++) {
            let scoreItem = document.createElement("li");
            if (scoreScrnObj[i]){
                scoreItem.textContent = (scoreScrnObj[i].player + " " + scoreScrnObj[i].score);
            } else {
                scoreItem.textContent = ""
            }
            scoresList.append(scoreItem);
        }
    }
    addScores();

    // prompt user to take quiz again
    let buttonsDiv = document.createElement("div")
    buttonsDiv.className = "button-container"
    highScores.append(buttonsDiv);
    let clearScoresEl = document.createElement("button")
    clearScoresEl.textContent = "Clear High Scores"
    clearScoresEl.id = "clear-scores-btn"
    buttonsDiv.append(clearScoresEl);

    clearScoresEl.addEventListener("click", () => {
        localStorage.clear();
        scoresList.remove();
        clearScoresEl.remove();
    });
   
}