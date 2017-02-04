function createMainTable(load) {

  if(createdMain) document.getElementById('mazeDiv').removeChild(createdMain);

  var echoThis = '<div id="main" style="text-align:center;width:100%;"><table cellpadding="0" cellspacing="0" style="margin-left:auto;margin-right:auto;"><tr><td><table cellpadding="0" cellspacing="0" style="border:0px;">';

  _trail = new Array();
  _backt = new Array();

  

    rows = 21;
  cols = 21;
    path = 20;//ancho camino pixeles
    length = document.getElementById('length').value;//segmentos largos

    
  braid = document.getElementById('braid').value;
  bias = document.getElementById('bias').options[document.getElementById('bias').selectedIndex].value;


  

  var cellStack = new Array();
  var totalCells = (rows*cols);
  var temp = new Array();
  var a = '';
  var currentCell = 1;
  var dir = 0;
  var dirA = 0;
  var visited = 1;
  var borders = new Array();

  left = new Array();
  top = new Array();
  right = new Array();
  bottom = new Array();

  won = 0;
  seconds = 0;
  minutes = 0;
  moves = 0;
  backtrack = 0;
  back = new Array();
  solveStack = new Array();
  hints = 0;

  if(braid>0) {
    for(var a=1;a<=totalCells;a++) borders[a] = 4;
  }

  if(shape=='1') {
    currentCell = Math.ceil(Math.random()*(totalCells+1));
  } else {
    for(a=Math.ceil(Math.random()*(totalCells+1));a<=shape[0].length;a++) {
      if(shape[0].charAt(a-1)=='1') break;
    }
    currentCell = a;
  }

  if(version==3) {
    for(var b=1;b<=totalCells;b++) {
      if(marked[b]!=9) marked[b]=3;
    }
  }

  marked[currentCell] = 1;





  do {

    var biasA = '';

    dirA = 0;
    a = (currentCell-cols);
    if(marked[a]!=1 && a>0 && marked[a]!=9) {
      temp.push('1');
      if(dir=='1') dirA = 1;
        if(bias<0 && Math.ceil(Math.random()*4)<(-1*bias)) biasA = '1';
    }

    a = (currentCell+1);
    if((Math.ceil(currentCell/cols))==(Math.ceil(a/cols)) && a<=totalCells) {
      if(marked[a]!=1 && marked[a]!=9) {
        temp.push('2');
        if(dir=='2') dirA = 1;
        if(bias>0 && Math.ceil(Math.random()*4)<bias) biasA = '2';
      }
    }

    a = (currentCell+cols);
    if(marked[a]!=1 && a<=totalCells && marked[a]!=9) {
      temp.push('3');
      if(dir=='3') dirA = 1;
        if(bias<0 && Math.ceil(Math.random()*4)<(-1*bias)) biasA += '3';
    }

    a = (currentCell-1);
    if((Math.ceil(currentCell/cols))==(Math.ceil(a/cols)) && a>0) {
      if(marked[a]!=1 && marked[a]!=9) {
        temp.push('4');
        if(dir=='4') dirA = 1;
        if(bias>0 && Math.ceil(Math.random()*4)<bias) biasA += '4';
      }
    }

    if(temp!='') {

      if(bias!=0 && biasA!=0) {
        dir = biasA.charAt(Math.floor(Math.random()*biasA.length));
      } else if(dirA==1 && length!=0) {
        if((Math.ceil(Math.random()*100))<(100-length)) { dir = Math.ceil(Math.random()*temp.length)-1; dir = temp[dir]; }
      } else {
        dir = Math.ceil(Math.random()*temp.length)-1;
        dir = temp[dir];
      }

      switch (dir) {
      case '1':
        cellStack.push(currentCell);
        visited++;
        top[currentCell] = 0;
        borders[currentCell]--;
        currentCell = (currentCell-cols);
        bottom[currentCell] = 0;
        borders[currentCell]--;
        marked[currentCell] = 1;
        break;
      case '2':
        cellStack.push(currentCell);
        visited++;
        right[currentCell] = 0;
        borders[currentCell]--;
        currentCell++;
        left[currentCell] = 0;
        borders[currentCell]--;
        marked[currentCell] = 1;
        break;
      case '3':
        cellStack.push(currentCell);
        visited++;
        bottom[currentCell] = 0;
        borders[currentCell]--;
        currentCell = (currentCell+cols);
        top[currentCell] = 0;
        borders[currentCell]--;
        marked[currentCell] = 1;
        break;
      case '4':
        cellStack.push(currentCell);
        visited++;
        left[currentCell] = 0;
        borders[currentCell]--;
        currentCell--;
        right[currentCell] = 0;
        borders[currentCell]--;
        marked[currentCell] = 1;
        break;
      }
    } else {
      if(version==1) {
        a = cellStack.length;
        a = Math.ceil(Math.random()*a)-1;
        currentCell = cellStack[a];
        cellStack.splice(a,1);
      } else {
        currentCell = cellStack.pop();
      }
    }
    temp = new Array();

    if(visited==totalCells) break;

  } while(cellStack.length!=0);




if(braid>0) {
  for(var a=1,currentCell=1;a<=rows;a++) {
    for(var b=1;b<=cols;b++,currentCell++) {
      temp = new Array();
      if(borders[currentCell]==3 && Math.ceil(Math.random()*100)>(100-braid) && marked[currentCell]!=9) {
        if(b!=1 && left[currentCell]!=0 && marked[currentCell-1]!=9) temp.push('1');
        if(a!=1 && top[currentCell]!=0 && marked[currentCell-cols]!=9) temp.push('2');
        if(b!=cols && right[currentCell]!=0 && marked[currentCell+1]!=9) temp.push('3');
        if(a!=rows && bottom[currentCell]!=0 && marked[currentCell+cols]!=9) temp.push('4');
        dir = Math.ceil(Math.random()*temp.length)-1;
        dir = temp[dir];
        switch(dir) {
        case '1':
          left[currentCell] = 0;
          right[currentCell-1] = 0;
          break;
        case '2':
          top[currentCell] = 0;
          bottom[currentCell-cols] = 0;
          break;
        case '3':
          right[currentCell] = 0;
          left[currentCell+1] = 0;
          break;
        case '4':
          bottom[currentCell] = 0;
          top[currentCell+cols] = 0;
          break;
        }
      }
    }
  }
}

  marked = '';
  visited = '';
  cellStack = '';

  if(randomStart=='true' && shape=='1') {
    a = Math.ceil(Math.random()*rows)-1;
    a = (a*cols)+1;
  } else {
    if(shape=='1') {
      a = 1;
    } else {
      if(shape[3]==0) {
        for(a=1;a<=shape[0].length;a++) {
          if(shape[0].charAt(a-1)=='1') break;
        }
      } else { a = shape[3]; }
    }
  }

  cell = startingCell = a;

  if(randomStart=='true' && shape=='1') {
    a = Math.ceil(Math.random()*rows);
    a = (a*cols);
  } else {
    if(shape=='1') {
      a = (rows*cols);
    } else {
      if(shape[4]==0) {
        for(a=shape[0].length;a>0;a--) {
          if(shape[0].charAt(a-1)=='1') break;
        }
      } else { a = shape[4]; }
    }
  }
  finish = a;

  marked = new Array();
  cellStack = new Array();

  dir = 0;

/*******/
    laberinto = new Array();
    for(var k = 0; k<441;k++){
        if(top[k]=='0'&&left[k]=='0'&&right[k]=='0'&&bottom[k]=='0'){
            laberinto[k]=0;
            
        }else if(top[k]=='0'&&left[k]=='0'&&right[k]=='0'&&bottom[k]=='1'){
            laberinto[k]=6;

        }else if(top[k]=='0'&&left[k]=='0'&&right[k]=='1'&&bottom[k]=='0'){
            laberinto[k]=5;

        }else if(top[k]=='0'&&left[k]=='0'&&right[k]=='1'&&bottom[k]=='1'){
            laberinto[k]=9;

        }else if(top[k]=='0'&&left[k]=='1'&&right[k]=='0'&&bottom[k]=='0'){
            laberinto[k]=3;

        }else if(top[k]=='0'&&left[k]=='1'&&right[k]=='0'&&bottom[k]=='1'){
            
            laberinto[k]=10;

            
        }else if(top[k]=='0'&&left[k]=='1'&&right[k]=='1'&&bottom[k]=='0'){
            laberinto[k]=1;

        }else if(top[k]=='0'&&left[k]=='1'&&right[k]=='1'&&bottom[k]=='1'){
            laberinto[k]=13;

            
        }else if(top[k]=='1'&&left[k]=='0'&&right[k]=='0'&&bottom[k]=='0'){
            laberinto[k]=4;
            
        }else if(top[k]=='1'&&left[k]=='0'&&right[k]=='0'&&bottom[k]=='1'){
            
            laberinto[k]=2;

        }else if(top[k]=='1'&&left[k]=='0'&&right[k]=='1'&&bottom[k]=='0'){
            
            laberinto[k]=8;

            
        }else if(top[k]=='1'&&left[k]=='0'&&right[k]=='1'&&bottom[k]=='1'){
            laberinto[k]=12;

        }else if(top[k]=='1'&&left[k]=='1'&&right[k]=='0'&&bottom[k]=='0'){
            laberinto[k]=7;

        }else if(top[k]=='1'&&left[k]=='1'&&right[k]=='0'&&bottom[k]=='1'){
            laberinto[k]=11;

        }else if(top[k]=='1'&&left[k]=='1'&&right[k]=='1'&&bottom[k]=='0'){
            laberinto[k]=14;

        }
    
    
    
    
    }

}




