let speed = 25; // ループ感覚ms 25ms以上にしないと描画が追い付かない
let deginc = 25;    // 大きいほど早い(整数のみ)
let num = 20;
let innernum = 10;
let radius = 360;
let CircleArray = [];
let judgeY = 65;
let flag = false;
let cStopCircle;

// Canvas要素を取得
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

class Pos{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class Circle{
    constructor(x, y, r, degree, cInnerCircle){
        this.x = x;
        this.y = y;
        this.r = r;
        this.degree = degree;
        this.color = cInnerCircle.color;
        this.num = cInnerCircle.num;
    }
}

class InnerCircle{
    constructor(color, num){
        this.color = color;
        this.num = num;
    }
}

function showcirlce(cCircle){
    // 円を描画
    ctx.beginPath();
    ctx.arc(cCircle.x, cCircle.y, cCircle.r, 0,  2 * Math.PI);

    // 線のスタイルと色の設定
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'black';

    ctx.stroke();

    // 塗りつぶしの色の設定
    ctx.fillStyle = cCircle.color;

    // 円を塗りつぶす
    ctx.fill();

    // 円の中に数字を表示
    ctx.font = '50px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'black';
    ctx.fillText(cCircle.num.toString(), cCircle.x, cCircle.y);

    // 描画終了
    ctx.closePath();    


}

function getPosition ( angle ) {
	var x1 = canvas.width / 2 ;
	var y1 = canvas.height / 2 ;
	var a = angle ;

	var x2 = x1 + radius * Math.cos( a * (Math.PI / 180) ) ;
	var y2 = y1 + radius * Math.sin( a * (Math.PI / 180) ) ;

    return new Pos(x2 ,y2);
}

function drawCircleRoad(){
    // 中心座標と半径の設定
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    // 描画開始
    ctx.beginPath();

    // 円の描画
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);

    // 線のスタイルと色の設定
    ctx.lineWidth = 150;
    ctx.strokeStyle = 'gray';

    // 線を描画
    ctx.stroke();    

    // 描画終了
    ctx.closePath();    
}

function init(){
    var cInnerCircle = [];
    
    for (let index = 0; index < innernum; index++) {
        var randomNum = Math.floor(Math.random() * 10) * 10 + 10;  // 10の倍数で10から100の範囲の乱数
        var color = getRandomColor();
        for (let i = 0; i < cInnerCircle.length; i++) {
            if(cInnerCircle[i].num == randomNum){
                color = cInnerCircle[i].color;
                break;
            }   
        }        
        cInnerCircle.push(new InnerCircle(color, randomNum));
    } 

    // 配列に20個の連番の値を格納
    for (var i = 0; i < num; i++) {
        var rand = Math.floor(Math.random() * innernum);
        let degree =  (i+1) * (360/num);
        let cCircle = new Circle(0, 0, 55, degree, cInnerCircle[rand]);
        CircleArray.push(cCircle);    
       
    }    
    // Canvasにフォーカスを設定
    canvas.setAttribute('tabindex', '0');
    canvas.focus();


}

// ランダムなRGB値を生成する関数
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function showTriangle(){
    // ここに三角形の描画処理を追加
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, judgeY);  // 初期位置
    ctx.lineTo(canvas.width/2, judgeY+150);
    ctx.stroke(); 
/*
    ctx.lineTo(canvas.width/2+judgeY/2, 10);  // 頂点1
    ctx.lineTo(canvas.width/2-judgeY/2, 10);  // 頂点2
    ctx.closePath();
    // 塗りつぶしの色の設定
    ctx.fillStyle = '#00FF00';
    // 塗りつぶし
    ctx.fill(); 
*/
}

function DoRoulette(index){
    CircleArray[index].degree += deginc;
    let cPos = getPosition(CircleArray[index].degree);
    CircleArray[index].x = cPos.x;
    CircleArray[index].y = cPos.y;
    showcirlce(CircleArray[index]);
 /*       
    if(CircleArray[index].degree > 360){
        CircleArray[index].degree = 0;
    }
    */
}
/*
function handleButtonClick() {
    alert('ボタンがクリックされました！');
}
*/

function Judge(){
    if(flag == false){
        return;
    }
    let index;
    for (index = 0; index < CircleArray.length; index++) {
        if(((canvas.width/2 - CircleArray[0].r) <= CircleArray[index].x) 
        && (CircleArray[index].x <= canvas.width/2 + CircleArray[0].r)
        && (judgeY <= CircleArray[index].y)
        && (CircleArray[index].y <= judgeY+ CircleArray[0].r*3)){
            circleposlog();
            //MakeStopCircle(CircleArray[index]);
            alert(CircleArray[index].x.toString() + " " + CircleArray[index].y.toString() + " " + CircleArray[index].num.toString());   
            break;
        }
    }
    flag = false;
}

function MakeStopCircle(cCircle){
    let cInnerCircle = new InnerCircle(cCircle.color, cCircle.num);
    cStopCircle = new Circle(canvas.width/2, canvas.height/2, cCircle.r, cCircle.degree, cInnerCircle);
}

function circleposlog(){
    console.clear();
    for (let index = 0; index < CircleArray.length; index++) {
        console.log(CircleArray[index].x.toString() + " " + CircleArray[index].y.toString() + " " + CircleArray[index].num.toString());   
    } 
}

// キーが押されたときのイベントリスナー
canvas.addEventListener('keydown', function(event) {
    // キーのコードを取得
    var keyCode = event.code;
    if (keyCode === 'Enter') {
        flag = true;        
    }
});

init();
setInterval( function () {
    Judge();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCircleRoad();
    for (let index = 0; index < CircleArray.length; index++) {    
        DoRoulette(index) ;        
    }
    showTriangle();
}, speed ) ;