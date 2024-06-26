let boxes = document.querySelectorAll(".box");

let turn = "X";
let isGameOver = false;


if (!isGameOver && turn === "X") {
    boxes.forEach(e => {
        e.innerHTML = ""
        e.addEventListener("click", () => {     
            if (!isGameOver && e.innerHTML === "") {
                e.innerHTML = turn;
                index_number = e.getAttribute("index");
                checkWin();
                checkDraw();
                play(index_number);
            }
        })
    })
}
function changeTurn(){
    if(turn === "X"){
        turn = "O";
        document.querySelector(".bg").style.left = "85px";
    }
    else{
        turn = "X";
        document.querySelector(".bg").style.left = "0";
    }
}

function checkWin(){
    let winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    for(let i = 0; i<winConditions.length; i++){
        let v0 = boxes[winConditions[i][0]].innerHTML;
        let v1 = boxes[winConditions[i][1]].innerHTML;
        let v2 = boxes[winConditions[i][2]].innerHTML;

        if(v0 != "" && v0 === v1 && v0 === v2){
            isGameOver = true;
            document.querySelector("#results").innerHTML = turn + " win";
            document.querySelector("#play-again").style.display = "inline"

            for(j = 0; j<3; j++){
                boxes[winConditions[i][j]].style.backgroundColor = "#08D9D6"
                boxes[winConditions[i][j]].style.color = "#000"
            }
        }
    }
}

function checkDraw(){
    if(!isGameOver){
        let isDraw = true;
        boxes.forEach(e =>{
            if(e.innerHTML === "") isDraw = false;
        })

        if(isDraw){
            isGameOver = true;
            document.querySelector("#results").innerHTML = "Nobody won";
            document.querySelector("#play-again").style.display = "inline"
        }
    }
}

function play(index_number) {
    changeTurn();
    let cell_matrix = document.querySelectorAll(".box");
    let backend_matrix = [];
    cell_matrix.forEach(e => {
        if (e.innerHTML === "X") {
            backend_matrix.push(1);
        } else if (e.innerHTML === "O") {
            backend_matrix.push(2);
        } else {
            backend_matrix.push(0);
        }
    })
    axios({
		method: "POST",
		url: '/api/v1/game/',
		data: {
            matrix: JSON.stringify(backend_matrix),
            cell_index: index_number,
		 },
		headers: {
      'Content-Type': 'multipart/form-data'
    },
	})
        .then(function (response) {
            let data = JSON.parse(response.data.new_state);
            if (data) {
                let cell_matrix = document.querySelectorAll(".box");
                data.forEach((res, index) => {
                    if (res === "0") {
                        cell_matrix[index].innerHTML = ""
                    } else if (res === "1") {
                        cell_matrix[index].innerHTML = "X"
                    } else if (res === "2") {
                        cell_matrix[index].innerHTML = "O"
                    }
                })
                console.log(data)
                console.log("success")
                checkWin();
                checkDraw();
                if (!isGameOver) {
                    changeTurn();
                } else {
                    document.querySelector("#results").innerHTML = "You are looser!";
                }
            } else {
                checkWin();
                checkDraw();
            }
            
  })
  .catch(function (response) {
	  //handle error
	  console.log("-------------------------------");

    console.log(response);
  });
}

document.querySelector("#play-again").addEventListener("click", ()=>{
    isGameOver = false;
    turn = "X";
    document.querySelector(".bg").style.left = "0";
    document.querySelector("#results").innerHTML = "";
    document.querySelector("#play-again").style.display = "none";

    boxes.forEach(e =>{
        e.innerHTML = "";
        e.style.removeProperty("background-color");
        e.style.color = "#fff"
    })
})