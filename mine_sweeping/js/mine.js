var start = document.getElementsByTagName('div')[1];
var box = document.getElementsByTagName('div')[2];
var flagBox = document.getElementsByTagName('div')[3];
var alertBox = document.getElementsByTagName('div')[4];
var alertImg = document.getElementsByTagName('div')[5];
var close = document.getElementsByTagName('div')[6];
var score = document.getElementById('score');
var minesNum,mineOver,block,mineMap=[];
//
var startGameBool = true;

bindEvent();
function bindEvent(){
	start.onclick = function(){
//		js中样式的表示dom.style.样式[display] = '值[block]'
//      而css中 样式[display]:值[block]
//  点开始游戏的时候，出现一个棋盘
        if(startGameBool){
        	box.style.display = 'block';
		    flagBox.style.display = 'block';
		    init();
        }
		startGameBool = false;
	}
	box.oncontextmenu = function(e){
		e.preventDefault();
	}
	box.addEventListener('mousedown',function(e){
		var e = e||window.event;
		var target = e.target||e.srcElement;
		if(e.button==0){
			leftClick(target);
		}else if(e.button==2){
			rightClick(target);
		}
	},false);
	close.onclick = function(){
		box.style.display = 'none';
		flagBox.style.display = 'none';
		alertBox.style.display = 'none';
		//置空html内容
		box.innerHTML='';
		startGameBool = true ;
	}
}
   function init(){
// 	雷数15
   	minesNum = 20;
// 	标记数量
   	mineOver = 20;
   	score.innerHTML = mineOver;
   	for(var i = 0;i < 15;i++){
   		for(var j = 0;j < 15;j++){
   			var con = document.createElement('div');
   			//设置每个格子的样式
   			con.classList.add('block');
// 			设置格子不同的id
   			con.setAttribute('id',i+'-'+j);
// 			小格子插入到box中
   			box.appendChild(con);
   			mineMap.push({mine:0});
   		}
   	}
   	//block = document.getElementsByClassName('block')取小格子
   	while(minesNum){
   		block = document.getElementsByClassName('block');
   		var mineIndex = Math.floor(Math.random()*225);
   		if(mineMap[mineIndex].mine === 0){
   			block[mineIndex].classList.add('isLei');
   			mineMap[mineIndex].mine = 1;
   			minesNum--;
   		}
   	}   	
}
     function leftClick(dom){
     	var isLei = document.getElementsByClassName('isLei');
     	if(dom&&dom.classList.contains('isLei')){
     		for(var i = 0;i < isLei.length;i++){
     			isLei[i].classList.add('show');
     		}
     		setTimeout(function(){
     			alertBox.style.display = 'block';
     			alertImg.style.backgroundImage = 'url(img/over.jpg)';
     		},800);
     	}else{
     		var n = 0;
     		var posArr = dom&&dom.getAttribute('id').split('-');
     		var posX = posArr&&+posArr[0];
     		var posY = posArr&&+posArr[1];
     		dom&&dom.classList.add('num');
     		for(var i = posX-1;i<=posX+1;i++){
     			for(var j = posY-1;j<=posY+1;j++){
     				var around = document.getElementById(i+'-'+j);
     				if(around&&around.classList.contains('isLei')){
     					n++;
     				}
     			}
     		}
     		dom&&(dom.innerHTML=n);	
     	    if(n==0){
     	    	for(var i = posX-1;i<=posX+1;i++){
   			        for(var j = posY-1;j<=posY+1;j++){
   				        var near = document.getElementById(i+'-'+j);
   				        if(near&&near.length!=0){
     				       	if(!near.classList.contains('check')){
     				       		near.classList.add('check');
     				       		leftClick(near);
     				       	}
     			        }
       	            }
     	        }
     	    }
        }
    }
    function rightClick(dom){
    	if(dom.classList.contains('num')){
    		return ;
    	}
    	//dom元素添加flag属性。若小格子有flag属性--》变成没有[拔旗]
//  	                     若小格子没有flag属性--》变成有[插旗]
    	dom.classList.toggle('flag');
    	if(dom.classList.contains('isLei')&&dom.classList.contains('flag')){
    		mineOver --;
    	}
    	if(dom.classList.contains('isLei')&&!dom.classList.contains('flag')){
    		mineOver ++;
    	}
    	score.innerHTML = mineOver;
    	if(mineOver == 0)
    	{
    		alertBox.style.display = 'block';
    		alertImg.style.backgroundImage = 'url(img/success.png)'
    	}
    }
