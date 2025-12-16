controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-down`,
    500,
    false
    )
})
function crear_arbres_continuament () {
    while (true) {
        pause(5000)
        // cada 10 segons surt un arbre nou
        arbre = sprites.create(assets.image`arbre`, SpriteKind.Enemy)
        tiles.placeOnRandomTile(arbre, assets.tile`transparency16`)
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-right`,
    500,
    false
    )
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-left`,
    500,
    false
    )
})
info.onCountdownEnd(function () {
    game.gameOver(false)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-up`,
    500,
    false
    )
})
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tileDarkGrass2, function (sprite, location) {
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (player2, enemy) {
    info.changeScoreBy(1)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    sprites.destroy(enemy, effects.spray, 500)
})
let arbre: Sprite = null
let nena: Sprite = null
tiles.setCurrentTilemap(tilemap`mapa0`)
nena = sprites.create(assets.image`nena-front`, SpriteKind.Player)
tiles.placeOnRandomTile(nena, assets.tile`stage`)
controller.moveSprite(nena, 100, 100)
scene.cameraFollowSprite(nena)
info.startCountdown(300)
crear_arbres_continuament()
