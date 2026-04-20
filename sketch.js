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
  
  // 在繪圖層 (pg) 上進行運算與繪圖
  pg.clear(); // 清除背景，使其透明

  if (capture.width > 0) {
    capture.loadPixels();
    pg.textAlign(CENTER, CENTER);
    pg.textSize(8);
    pg.fill(0, 255, 0); // 使用綠色文字方便在影像上閱讀
    pg.noStroke();

    // 以 20*20 為一個單位遍歷 pg 的範圍
    for (let y = 0; y < pg.height; y += 20) {
      for (let x = 0; x < pg.width; x += 20) {
        // 將 pg 座標映射回攝影機影像的像素座標
        let camX = floor(map(x, 0, pg.width, 0, capture.width));
        let camY = floor(map(y, 0, pg.height, 0, capture.height));
        let index = (camX + camY * capture.width) * 4;

        let r = capture.pixels[index];
        let g = capture.pixels[index + 1];
        let b = capture.pixels[index + 2];
        
        if (r !== undefined) {
          let avg = floor((r + g + b) / 3);
          // 在該 20*20 單位的中心顯示數值
          pg.text(avg, x + 10, y + 10);
        }
      }
    }
  }

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
