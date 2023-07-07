function canvas() {
    const canvas = document.getElementById("fireworksCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas, false);

    class Firework {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height;
            this.sx = Math.random() * 3 - 1.5;
            this.sy = Math.random() * -3 - 3;
            this.size = Math.random() * 2 + 1;
            this.shouldExplode = false;

            const colorVal = Math.round(0xffffff * Math.random());
            const r = colorVal >> 16;
            const g = (colorVal >> 8) & 255;
            const b = colorVal & 255;
            this.r = r;
            this.g = g;
            this.b = b;
        }

        update() {
            if (
                this.sy >= -2 ||
                this.y <= 100 ||
                this.x <= 0 ||
                this.x >= canvas.width
            ) {
                this.shouldExplode = true;
            } else {
                this.sy += 0.01;
            }
            this.x += this.sx;
            this.y += this.sy;
        }

        draw() {
            ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    class Particle {
        constructor(x, y, r, g, b) {
            this.x = x;
            this.y = y;
            this.sx = Math.random() * 3 - 1.5;
            this.sy = Math.random() * 3 - 1.5;
            this.size = Math.random() * 2 + 1;
            this.life = 100;
            this.r = r;
            this.g = g;
            this.b = b;
        }

        update() {
            this.x += this.sx;
            this.y += this.sy;
            this.life -= 1;
        }

        draw() {
            ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.life / 100})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    const fireworks = [new Firework()];
    const particles = [];

    function animate() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (Math.random() < 0.05) {
            fireworks.push(new Firework());
        }

        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update();
            fireworks[i].draw();

            if (fireworks[i].shouldExplode) {
                for (let j = 0; j < 50; j++) {
                    particles.push(
                        new Particle(
                            fireworks[i].x,
                            fireworks[i].y,
                            fireworks[i].r,
                            fireworks[i].g,
                            fireworks[i].b
                        )
                    );
                }
                fireworks.splice(i, 1);
            }
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].life <= 0) {
                particles.splice(i, 1);
            }
        }
        requestAnimationFrame(animate);
    }

    animate();
}
canvas()


let wheelDelta = 0;
let browser = 0;

const sections = document.querySelectorAll('.section');
const sectionCount = sections.length;
let currentIndex = 0;

document.addEventListener('wheel', function (e) {


    browser = window.navigator.userAgent.toLowerCase().indexOf('firefox');

    if (browser >= 0) {
        wheelDelta = e.deltaY * 40;
    } else {
        wheelDelta = e.wheelDelta;
    }

    if (wheelDelta < 0 && currentIndex < sectionCount - 1) {
        currentIndex++;
    } else if (wheelDelta > 0 && currentIndex > 0) {
        currentIndex--;
    }

    sections[currentIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* function shuuuu() {
    let box = document.querySelectorAll('.s-box');
    let random = Math.ceil(Math.random() * 10);
    

    


    for (let i = 0; i < box.length; i++) {
        box[i].addEventListener('click', function () {
            random = Math.ceil(Math.random() * 10);
            console.log(random)
            if(random<2){
                box[i].style.top = `${random * random*500}px`;
                box[i].style.left = `${random * random*500}px`;
            }else if(2<random<=4){
                box[i].style.bottom = `${random * random*110}px`;
                box[i].style.left = `-${random * random*150}px`;
            }else if(5<random<=8){
                box[i].style.top = `-${random * random*130}px`;
                box[i].style.right = `-${random * random*102}px`;
            }else{
                random = Math.ceil(Math.random() * 10);
                box[i].style.bottom = `-${random * random*130}px`;
                box[i].style.right = `${random * random*102}px`;
            }
            console.log(i)
            if(i == 0){
                
                for(let w=0;w<box.length;w++){
                    box[w].style.top='25%'
                    box[w].style.left='25%'
                }
            }
        })
    }

}
shuuuu()  */
function shuuuu() {
    let box = document.querySelectorAll('.s-box');
    let isDragging = false;
    let isLastBoxDragged = false;
    let lastBoxIndex = box.length - 1;
    let startX = 0;
    let startY = 0;
    let xOffset = 0;
    let yOffset = 0;
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let isAnimating = false;

    for (let i = 0; i < box.length; i++) {
        box[i].addEventListener('mousedown', dragStart);
        box[i].addEventListener('mousemove', drag);
        box[i].addEventListener('mouseup', dragEnd);
        box[i].addEventListener('mouseleave', dragEnd);
        box[i].addEventListener('click', toggleSelection);
    }

    function dragStart(e) {
        startX = e.clientX;
        startY = e.clientY;
        xOffset = e.target.offsetLeft;
        yOffset = e.target.offsetTop;
        isDragging = true;
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            const x = xOffset + dx;
            const y = yOffset + dy;
            setTranslate(x, y, e.target);
        }
    }

    function dragEnd(e) {
        isDragging = false;

        if (isLastBoxDragged && !isAnimating) {
            const distanceX = e.clientX - startX;
            const distanceY = e.clientY - startY;
            const directionX = Math.sign(distanceX);
            const directionY = Math.sign(distanceY);
            const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
            const maxDistance = Math.min(screenWidth, screenHeight) * 0.8; // 최대 이동 거리를 화면 크기의 80%로 설정
            const normalizedDistance = Math.min(distance, maxDistance);
            const translateX = directionX * normalizedDistance;
            const translateY = directionY * normalizedDistance;

            animateLastBox(translateX, translateY);
            isAnimating = true;
            setTimeout(() => {
                resetLastBoxPosition();
                resetAllBoxesPosition();
                isAnimating = false;
            }, 2000);
        }
    }

    function animateLastBox(translateX, translateY) {
        box[lastBoxIndex].style.transition = 'transform 1s ease';
        box[lastBoxIndex].style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
    }

    function resetLastBoxPosition() {
        box[lastBoxIndex].style.transition = 'none';
        box[lastBoxIndex].style.transform = 'none';
    }

    function resetAllBoxesPosition() {
        for (let i = 0; i < box.length; i++) {
            box[i].style.transition = 'transform 1s ease';
            box[i].style.transform = 'translate3d(0, 0, 0)';
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
        if (el === box[lastBoxIndex]) {
            isLastBoxDragged = true;
        } else {
            isLastBoxDragged = false;
        }
    }

    const container = document.querySelector('.box-container');
    let isMouseOver = false;

    container.addEventListener('mouseenter', () => {
        isMouseOver = true;
    });

    container.addEventListener('mouseleave', () => {
        isMouseOver = false;
    });

    document.addEventListener('mouseup', () => {
        if (isDragging && isMouseOver) {
            isDragging = false;
            const endX = xOffset + (box[lastBoxIndex].offsetLeft - xOffset) * 2;
            const endY = yOffset + (box[lastBoxIndex].offsetTop - yOffset) * 2;
            animateLastBox(endX - xOffset, endY - yOffset);
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const containerRect = container.getBoundingClientRect();
            const containerLeft = containerRect.left;
            const containerTop = containerRect.top;
            const mouseX = e.clientX - containerLeft;
            const mouseY = e.clientY - containerTop;
            box.forEach((item, index) => {
                if (item !== box[lastBoxIndex]) {
                    const boxRect = item.getBoundingClientRect();
                    const boxLeft = boxRect.left;
                    const boxTop = boxRect.top;
                    const dx = mouseX - boxLeft;
                    const dy = mouseY - boxTop;
                    setTranslate(dx, dy, item);
                }
            });
        }
    });

    function toggleSelection(e) {
        if (!isAnimating) {
            e.currentTarget.classList.toggle('selected');
        }
    }
}

function dd() {
    const container = document.querySelector(".box-container");
    const boxes = container.querySelectorAll(".s-box");
    let random = Math.ceil(Math.random() * 10);
    const resetPosition = () => {
      boxes.forEach(box => {
        box.style.transition = 'transform 1s ease';
        
            random = Math.ceil(Math.random() * 2);
            box.style.transform = `translate(0,0) rotate(${random*10}deg)`;
        
        box.style.left = '25%';
        box.style.top = '25%';
      });
    };
  
    boxes.forEach((box, index) => {
      const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect();
      const { width: boxWidth, height: boxHeight } = box.getBoundingClientRect();
      let isDragging = false;
      let originLeft = null;
      let originTop = null;
      let originX = null;
      let originY = null;
      let isAnimating = false;
  
      box.addEventListener("mousedown", (e) => {
        if (!isAnimating) {
          isDragging = true;
          originX = e.clientX;
          originY = e.clientY;
          originLeft = box.offsetLeft;
          originTop = box.offsetTop;
        }
      });
  
      document.addEventListener("mouseup", (e) => {
        if (isDragging) {
          isDragging = false;
          const diffX = e.clientX - originX;
          const diffY = e.clientY - originY;
          const endOfXPoint = containerWidth - boxWidth;
          const endOfYPoint = containerHeight - boxHeight;
          const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
          const maxDistance = Math.min(containerWidth, containerHeight) * 0.8; // 최대 이동 거리를 화면 크기의 80%로 설정
          const normalizedDistance = Math.min(distance, maxDistance);
          const directionX = Math.sign(diffX);
          const directionY = Math.sign(diffY);
          const translateX = directionX * normalizedDistance;
          const translateY = directionY * normalizedDistance;
  
          box.style.transition = 'transform 1s ease';
          box.style.transform = `translate(${translateX}px, ${translateY}px)`;
  
          setTimeout(() => {
            box.style.transition = 'transform 1s ease';
            

            isAnimating = false;
          }, 2000);
        }
      });
      
      document.addEventListener("mousemove", (e) => {
        if (isDragging && !isAnimating) {
          const diffX = e.clientX - originX;
          const diffY = e.clientY - originY;
          const endOfXPoint = containerWidth - boxWidth;
          const endOfYPoint = containerHeight - boxHeight;
          box.style.left = `${Math.min(Math.max(0, originLeft + diffX), endOfXPoint)}px`;
          box.style.top = `${Math.min(Math.max(0, originTop + diffY), endOfYPoint)}px`;
        }
      });
  
      if (index === boxes.length - 1) {
        box.addEventListener("transitionend", () => {
          resetPosition();
          
        });
      }
    });
  }
  
  dd();