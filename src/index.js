module.exports = function solveSudoku(matrix) {
  // your solution

  let detected = [];
  let cont = [];
  let error = [];
  let num = 0;
  
  let possible = [];
  
  function checkSum(matrix) {
    let answer = check(matrix); 
    let sum = 0;
    let sum1 = 0
    let arr = [];

    start:
    for(let i=0; i<9; i++) {
        for(let j=0; j<9; j++) {
          sum+=answer[i][j];
          sum1+=answer[j][i];
        }
        if(num >= 20000) {
            return answer;
        }
       if(sum !== 45 || sum1 !== 45) {
          sum = 0;
          sum1 = 0;
          i=-1;
          answer = check(matrix);
          continue start;
       } else {
          sum = 0;
          sum1 = 0;
          continue;
       }
    }
    return answer;
}


      function check(matrix) {
          let matr = count(matrix);
  
          again:
           for(let i=0; i<9; i++) {
              for(let j=0; j<9; j++) {
                  if(matr[i][j] === undefined){
                      matr = count(matrix);
                      i = 0;
                      continue again;
                  }
              }
          }
          return matr;
      }
  
  function count(matrix) {
             
          while(find(matrix)) {
              calc(matrix);
              matrix = possible;
              possible = [];
              num++
          }
          return matrix;
      }
  
  
  
      function find(matrix) {
      
      
  
      for(let i=0; i<9; i++) {
          for(let j=0; j<9; j++) {
              if(matrix[i][j] === 0) {
                  return true;
              }
          }
      }
      return false;
      } 
   
  
  function calc(matrix) {
  
  let check = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  
  let possibleStr = [];
  let possibleCol = [];
  let possibleSegm = [];
  let checker = 0;
  
  for(let i=0; i<9; i++) {
      findInStr(i);
  }
    
  function findInStr(i) {
      let arr = matrix[i].filter(function (elem) {
        return elem !== 0;
      }).sort(function  (a, b){
        return a-b;
      });
      possibleStr[i] = [];
      for(let k=0; k<9; k++) {
        let point = 0;
      arr.forEach(function (elem) {
        if (check[k] === elem) {
          point++;
        };
      });
        if(point === 0) {
        possibleStr[i].push(check[k]);
        };
      }
    };
  
  
  
  for(let i=0; i<9; i++) {
      findInCol(i);
  }
  
  
  function findInCol(i) {
    let arr = [];
    let arrCol = [];
    for(let k=0; k<9; k++) {
      arrCol.push(matrix[k][i]);
    };
    arr = arrCol.filter(function (elem) {
      return elem !== 0;
    }).sort(function(a, b) {
      return a-b;
    });
    possibleCol[i] = [];
    for(let k=0; k<9; k++) {
      let point = 0;
    arr.forEach(function (elem) {
      if (check[k] === elem) {
        point++;
      };
    });
      if(point === 0) {
      possibleCol[i].push(check[k]);
      };
    };
  };
  
  
  for(let i=0; i<9; i+=3) {
      for(let j=0; j<9; j+=3) {
          findInSegm(i, j);
      }
  }
  
  
  
  function findInSegm(i, j) {
      let arr = [];
      let arrSegm = [];
      for(let k=0; k<3; k++) {
          for(let n=0; n<3; n++) {
              arr.push(matrix[i+k][j+n]);
          };        
      };
      arrSegm = arr.filter(function(elem) {
          return elem !== 0
      }).sort(function(a, b) {
          return a-b;
      });
      arr =[];
      for(let k=0; k<9; k++) {
      let point = 0;
      arrSegm.forEach(function (elem) {
      if (check[k] === elem) {
        point++;
      };
    });
      if(point === 0) {
      arr.push(check[k]);
      };
    };
    possibleSegm.push(arr);
  };
  
      
    for(let i=0; i<9; i++) {
        possible[i] = [];
        cont[i] = [];
      for(let j=0; j<9; j++) {
        if(matrix[i][j] === 0) {
         let x = findSegm(i, j);
         if(i===4 & j === 6) {
             let nj= 0;
         }
         findGeneral(i, j, x); 
          } else {
              possible[i][j] = matrix[i][j];
              cont[i][j] = matrix[i][j];
          }
      }
    }
  
      function findSegm(i, j) {
          if(i<3 && j<3) {
              return 0;
          } else if(i<3 && j>=3 && j<6) {
              return 1;
          } else if(i<3 && j>=6){
              return 2;
          } else if(i>=3 && i<6 && j<3) {
              return 3;
          } else if(i>=3 && i<6 && j>=3 && j<6) {
              return 4;
          } else if(i>=3 && i<6 && j>=6) {
              return 5;
          } else if (i>=6 && j<3) {
              return 6;
          } else if(i>=6 && j>=3 && j<6) {
              return 7;
          } else {
              return 8;
          }
      };
  
  
  function findGeneral(i, j, x) {
      possible[i][j] = [];
      cont[i][j] = [];
      for(let k=0; k<possibleStr[i].length; k++) {
          for(let n=0; n<possibleCol[j].length; n++) {
              if(possibleStr[i][k] === possibleCol[j][n]) {
                  for(let m=0; m<possibleSegm[x].length; m++) {
                      if(possibleStr[i][k] === possibleSegm[x][m]) {
                      possible[i][j].push(possibleStr[i][k]);
                      cont[i][j].push(possibleStr[i][k]);
                      break;
                      }
                  }
                  break;
              }
          }
      }
      if(possible[i][j].length === 0){
          error.push(i);
          error.push(j);
      }
      if(possible[i][j].length === 1) {
          checker++;
          let num = possible[i][j][0];
          possible[i][j] = num;
          cont[i][j] = num;
          let arr = [];
          arr.push(i);
          arr.push(j);        
          detected.push(arr);
      } else {
          possible[i][j] = 0;        
      }
  };
  
  outer:
  if(checker === 0) {
      let y = 0;
      for(let i=0; i<9; i++) {
          for(let j=0; j<9; j++) {
              if(Array.isArray(cont[i][j])) {
                  let x = Math.round(Math.random() * (cont[i][j].length-1));
                  cont[i][j] = cont[i][j][x];
                  possible[i][j] = cont[i][j];
                  break outer;
              }
             
          }
          
      }
  }
  
  
  }
  
  
  
  
  return checkSum(matrix);








}






