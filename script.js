const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height); //?

const gravity = 0.7;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "./Pictures/background.png",
});

const shop = new Sprite({
  position: {
    x: 670,
    y: 167,
  },
  imageSrc: "./Pictures/shop.png",
  scale: 2.4,
  framesMax: 6,
});

//Player sprite
const player = new Fighters({
  position: {
    x: 0,
    y: 0,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  offset: {
    x: 0,
    y: 0,
  },
  imageSrc: "./Pictures/samurai/Idle.png",
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157,
  },
  sprites: {
    idle: {
      imageSrc: "./Pictures/samurai/Idle.png",
      framesMax: 8,
    },
    run: {
      imageSrc: "./Pictures/samurai/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./Pictures/samurai/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./Pictures/samurai/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./Pictures/samurai/Attack1.png",
      framesMax: 6,
    },
    takeHit: {
      imageSrc: "./Pictures/samurai/Take Hit - white silhouette.png",
      framesMax: 4,
    },
    death: {
      imageSrc: "./Pictures/samurai/Death.png",
      framesMax: 6,
    },
  },
  attackBox: {
    offset: {
      x: 100,
      y: 50,
    },
    width: 160,
    height: 50,
  },
});

//Enemy sprite
const enemy = new Fighters({
  position: {
    x: 400,
    y: 100,
  },
  velocity: {
    x: 0,
    y: 0,
  },
  color: "blue",
  offset: {
    x: -50,
    y: 0,
  },
  imageSrc: "./Pictures/enemy/Idle.png",
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 167,
  },
  sprites: {
    idle: {
      imageSrc: "./Pictures/enemy/Idle.png",
      framesMax: 4,
    },
    run: {
      imageSrc: "./Pictures/enemy/Run.png",
      framesMax: 8,
    },
    jump: {
      imageSrc: "./Pictures/enemy/Jump.png",
      framesMax: 2,
    },
    fall: {
      imageSrc: "./Pictures/enemy/Fall.png",
      framesMax: 2,
    },
    attack1: {
      imageSrc: "./Pictures/enemy/Attack1.png",
      framesMax: 4,
    },
    takeHit: {
      imageSrc: "./Pictures/enemy/Take hit.png",
      framesMax: 3,
    },
    death: {
      imageSrc: "./Pictures/enemy/Death.png",
      framesMax: 7,
    },
  },
  attackBox: {
    offset: {
      x: -170,
      y: 50,
    },
    width: 170, //0,
    height: 50,
  },
});

//Keys
const keys = {
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};
function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}
decreaseTimer();
function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "black";
  c.fillRect(0, 0, canvas.width, canvas.height);
  background.update();
  shop.update();
  c.fillStyle = "rgba(255, 255, 255, 0.15";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;
  //Player movement
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
    player.switchSprite("run");
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
    player.switchSprite("run");
  } else {
    player.switchSprite("idle");
  }
  //Jumping
  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
  }
  //Enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
    enemy.switchSprite("run");
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
    enemy.switchSprite("run");
  } else {
    enemy.switchSprite("idle");
  }
  //Jumping
  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite("fall");
  }

  //Detect of collision & enemy gets hit
  function collisionOnRect(
    rectangle1,
    rectangle2,
    framesCurrent,
    takeHitObject,
    damager,
    healsDamage
  ) {
    if (
      rectangularCollision({
        rectangle1: rectangle1,
        rectangle2: rectangle2,
      }) &&
      damager.isAttacking &&
      damager.framesCurrent === framesCurrent
    ) {
      takeHitObject.takeHit();
      damager.isAttacking = false;

      gsap.to(healsDamage, {
        width: takeHitObject.health + "%",
      });
    }
  }
  collisionOnRect(player, enemy, 4, enemy, player, ".smaller__enemy__damage");

  //If player misses
  if (player.isAttacking && player.framesCurrent === 4) {
    player.isAttacking = false;
  }

  collisionOnRect(enemy, player, 2, player, enemy, ".smaller__player__damage");
  //If enemy misses
  if (enemy.isAttacking && enemy.framesCurrent === 2) {
    enemy.isAttacking = false;
  }
  //Конец игры при потере жизни
  if (enemy.health <= 0 || player.health <= 0) {
    determineWinner({ player, enemy, timerId });
  }
}

animate();

window.addEventListener("keydown", (event) => {
  if (!player.dead) {
    switch (event.key) {
      case "d":
        keys.d.pressed = true;
        player.lastKey = "d";
        break;
      case "a":
        keys.a.pressed = true;
        player.lastKey = "a";
        break;
      case "w":
        player.velocity.y = -20;
        break;
      case " ":
        player.attack();
        break;
    }
  }
  if (!enemy.dead) {
    switch (event.key) {
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        enemy.lastKey = "ArrowRight";
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = "ArrowLeft";
        break;
      case "ArrowUp":
        enemy.velocity.y = -20;
        break;
      case "ArrowDown":
        enemy.attack();
        break;
    }
  }
});
window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }

  //    enemy keys
  switch (event.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
  //console.log(event);
});
