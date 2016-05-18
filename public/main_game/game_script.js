var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

function preload() {
    // load spritesheets
    game.load.spritesheet('charlie', '/main_game/images/sprites/charliesprites.png', 32, 32);
    game.load.spritesheet('eva', '/main_game/images/sprites/evasprites1.png', 32, 32);
    game.load.spritesheet('kisa', '/main_game/images/sprites/kisasprites1.png', 32, 32);
    game.load.spritesheet('explosion', '/main_game/images/sprites/explosion.png', 32, 32);
    // load static images
    game.load.image('star', '/main_game/images/star.png');
    game.load.image('background', '/main_game/images/background.jpg');
    game.load.image('ground', '/main_game/images/platform.png');
    game.load.image('couch', '/main_game/images/couch.png', 100, 100);
    game.load.image('lamp', '/main_game/images/lamp.png');
    game.load.image('plant', '/main_game/images/plant.png');
    game.load.image('tv', '/main_game/images/tv.png');
    game.load.image('scroll', '/main_game/images/scroll.png');
    game.load.image('bullet', '/main_game/images/sprites/bullet.png'
    // load font
    // game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js')
  );
}

function create() {
  // enable physics and add background
    game.physics.startSystem(Phaser.Physics.ARCADE);
    start = true;
    game.add.sprite(0, 0, 'background');

    // add platforms, enable physics on them, make them immovable

    platforms = game.add.group();
    platforms.enableBody = true;

    var ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(20, 2);
    ground.body.immovable = true;
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;
    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    // add scroll
    scrollText = game.add.group();
    scrollText.enableBody = true;
    var scroll = scrollText.create(200, 0, 'scroll');
    scroll.body.immovable = true;

    // add player and settings
    player = game.add.sprite(32, game.world.height - 150, 'kisa');
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 400;
    player.body.collideWorldBounds = true;

    //  add left and right animations
    player.animations.add('left', [0, 1, 2], 10, true);
    player.animations.add('right', [4, 5, 6], 10, true);

    // add household items (couch, tv, lamp, plants)
    householdItems = game.add.group();
    householdItems.enableBody = true;

    var couch = householdItems.create(10, 190, 'couch');
    couch.scale.setTo(1.5, 1.5);
    couch.body.immovable = true;

    var tv = householdItems.create(720, 325, 'tv');
    tv.scale.setTo(1, 1);
    tv.body.immovable = true;

    var lamp = householdItems.create(500, 325, 'lamp');
    lamp.scale.setTo(0.5, 0.5);
    lamp.body.immovable = true;

    var plant = householdItems.create(550, 450, 'plant');
    plant.scale.setTo(1, 1);
    plant.body.immovable = true;
    plant = householdItems.create(700, 450, 'plant');
    plant.scale.setTo(1, 1);
    plant.body.immovable = true;
    plant = householdItems.create(650, 450, 'plant');
    plant.scale.setTo(1, 1);
    plant.body.immovable = true;
    plant = householdItems.create(600, 450, 'plant');
    plant.scale.setTo(1, 1);
    plant.body.immovable = true;

    // add stars, sprinkle them randomly throughout (with bounce)

    stars = game.add.group();
    stars.enableBody = true;
    for (var i = 0; i < 12; i++) {
        var star = stars.create(i * 70, 0, 'star');
        star.body.gravity.y = 300;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    // add scorebox
    scoreText = game.add.text(660, 16, 'score: 0', { fontSize: '16px', fill: '#000'});
    cursors = game.input.keyboard.createCursorKeys();

    scroll = game.add.text(250, 25, 'something', { fontSize: '16px', fill: '#000'});

    // add bullets
      bullets = game.add.group();
      bullets.enableBody = true;
      bullets.physicsBodyType = Phaser.Physics.ARCADE;

      //  All 40 of them
      bullets.createMultiple(100, 'bullet');
      bullets.setAll('anchor.x', 0.5);
      bullets.setAll('anchor.y', 0.5);

      // create timer
      game.time.events.add(Phaser.Timer.SECOND * 10, endGame, this);
}

// check if player collides with stars or platforms

function update() {
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(player, householdItems);
    // game.physics.arcade.overlap(bullets, householdItems, destroy, null, this);
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    player.body.velocity.x = 0;

    // set left and right velocities

    if (cursors.left.isDown) {
        player.body.velocity.x = -150;
        player.animations.play('left');
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150;
        player.animations.play('right');
    } else {
        player.animations.stop();
        player.frame = 4;
    }

    // enable jumping if the player is on the ground
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
    }
}

// fire bullets if the enter key is pressed and destroy objects upon contact
  // function destroy(bullets, householdObjects) {
  //   if (game.input.keyboard.isDown(Phaser.Keyboard.ENTER)){
  //       weapons[currentWeapon].fire(player, 45);
  //     }
  //     householdItems.kill();
  //     score += 20;
  //     score.text = 'Score: ' + score;
  //   };

// update total score when stars are collected or items destroyed

function collectStar (player, star) {
  addScore();
  star.kill();
};

function addScore() {
  score += 10;
  scoreText.text = 'Score: ' + score;
  localStorage.setItem("score", score);
  return score;
};

    function endGame() {
      console.log("the game has ended");
      window.location = "/end/end_index.html";
    }

    function render() {
      game.debug.text("Time left: " + game.time.events.duration, 32, 32);
    }
