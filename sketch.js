let capture;
let pg; // 宣告繪圖層物件

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);
  // 擷取攝影機影像
  capture = createCapture(VIDEO);
  // 隱藏預設的影片標籤，我們只需要在畫布上顯示
  capture.hide();
  
  // 產生一個與視訊顯示寬高相同的繪圖層
  pg = createGraphics(floor(windowWidth * 0.6), floor(windowHeight * 0.6));
}

function draw() {
  background(220); // 淺灰色背景
  
  // 計算影像寬高為畫布的 60%
  let videoW = width * 0.6;
  let videoH = height * 0.6;
  
  // 在繪圖層 (pg) 上進行繪圖
  pg.clear(); // 清除背景，使其透明
  pg.stroke(255, 0, 0);
  pg.strokeWeight(4);
  pg.noFill();
  pg.rect(0, 0, pg.width, pg.height); // 在邊框畫一個紅框
  pg.fill(255, 0, 0);
  pg.noStroke();
  pg.textAlign(CENTER, CENTER);
  pg.textSize(24);
  pg.text("Graphics Layer Overlaid", pg.width / 2, pg.height / 2);

  // 處理左右顛倒（鏡像）並顯示在畫布中間
  push();
  translate(width, 0); // 將座標原點移至右側
  scale(-1, 1);        // 水平翻轉畫布
  
  let xPos = (width - videoW) / 2;
  let yPos = (height - videoH) / 2;
  
  image(capture, xPos, yPos, videoW, videoH); // 顯示視訊
  image(pg, xPos, yPos, videoW, videoH);      // 將繪圖層疊加在視訊上
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // 視窗縮放時，重新建立對應比例的繪圖層
  pg = createGraphics(floor(windowWidth * 0.6), floor(windowHeight * 0.6));
}
