//Enemy sprite
const enemy = new Fighters({
  //!
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
