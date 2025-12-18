// Funcions moviments animats de la nena
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-down`,
    500,
    false
    )
})
function obrir_menu () {
    let cabres = 0
    info.stopCountdown()
    joc = false
    inventari = miniMenu.createMenuFromArray([
    miniMenu.createMenuItem("ous" + ("" + ous), assets.image`ou`),
    miniMenu.createMenuItem("gallines" + ("" + gallines), assets.image`gallina1`),
    miniMenu.createMenuItem("cavalls" + ("" + cavalls), assets.image`cavall1`),
    miniMenu.createMenuItem("cabres" + ("" + cabres), assets.image`cabra1`),
    miniMenu.createMenuItem("arbres" + ("" + arbre), assets.image`arbre`),
    miniMenu.createMenuItem("1,5kg/patates" + ("" + patates), assets.image`patata1`)
    ])
    myMenu = miniMenu.createMenuFromArray(inventari)
    myMenu.setTitle("Inventari")
}
// Funció per crear arbres cada 5 segons en llocs aleatoris
function crear_arbres_continuament () {
    while (true) {
        pause(5000)
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
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite2, location2) {
    if (joc) {
        obrir_menu()
    }
})
// Quan s'acaba el temps perds
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
let myMenu: miniMenu.MenuSprite = null
let arbre: Sprite = null
let inventari: miniMenu.MenuSprite = null
let nena: Sprite = null
let joc = false
let ous = 0
let gallines = 0
let cavalls = 0
let patates = 0
patates = 0
// Imatge gallina
cavalls = 0
gallines = 0
ous = 0
joc = true
// Condicions sempre
forever(function () {
    if (joc == true) {
        tiles.setCurrentTilemap(tilemap`mapa0`)
        nena = sprites.create(assets.image`nena-front`, SpriteKind.Player)
        tiles.placeOnRandomTile(nena, assets.tile`stage`)
        controller.moveSprite(nena, 100, 100)
        scene.cameraFollowSprite(nena)
        info.startCountdown(300)
        crear_arbres_continuament()
    }
})
