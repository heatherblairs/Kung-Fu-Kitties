function preload() {

    game.load.spritesheet('charlie', '/images/sprites/charliesprites.png');
    game.load.image('bullet', '/images/sprites/bullet.png');

}

var sprite;
var bullets;

var fireRate = 100;
var nextFire = 0;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#313131';

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);

    sprite = game.add.sprite(400, 300, 'charlie');
    sprite.anchor.set(0.5);

    game.physics.arcade.enable(sprite, Phaser.Physics.ARCADE);

    sprite.body.allowRotation = false;

}

function update() {

    sprite.rotation = game.physics.arcade.angleToPointer(sprite);

    if (game.input.activePointer.isDown)
    {
        fire();
    }

}

function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(sprite.x - 8, sprite.y - 8);

        game.physics.arcade.moveToPointer(bullet, 300);
    }

}

function render() {

    game.debug.text('Active Bullets: ' + bullets.countLiving() + ' / ' + bullets.total, 32, 32);
    game.debug.spriteInfo(sprite, 32, 450);

}
