//Player sprite
const player = new Fighters({
  //!
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
