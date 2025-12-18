namespace SpriteKind {
    export const sumar = SpriteKind.create()
    export const restar = SpriteKind.create()
}
// Funcions moviments animats de la nena
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    nena,
    assets.animation`nena-animation-down`,
    500,
    false
    )
})
// Funció menú inventari
function obrir_menu () {
    controller.moveSprite(nena, 0, 0)
    joc = false
    inventari = [
    miniMenu.createMenuItem("Ous" + ("" + ous), assets.image`ou`),
    miniMenu.createMenuItem("Gallines" + ("" + gallines), assets.image`gallina1`),
    miniMenu.createMenuItem("Cavalls" + ("" + cavalls), assets.image`cavall1`),
    miniMenu.createMenuItem("Cabres" + ("" + cabres), assets.image`cabra1`),
    miniMenu.createMenuItem("Arbres" + ("" + arbre), assets.image`arbre`),
    miniMenu.createMenuItem("1,5kg/patates" + ("" + patates), assets.image`patata1`)
    ]
    myMenu = miniMenu.createMenuFromArray(inventari)
    myMenu.setTitle("Inventari")
    myMenu.setFrame(assets.image`menu`)
    myMenu.setPosition(80, 60)
    myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 8)
    myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        seleccionarItem = selection
        myMenu.close()
    })
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
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    tiles.placeOnRandomTile(nena, sprites.dungeon.chestClosed)
    joc = true
    controller.moveSprite(nena, 100, 100)
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (joc == false) {
        obrir_menu()
    }
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
scene.onOverlapTile(SpriteKind.Player, assets.tile`instrument3`, function (sprite2, location2) {
    tiles.placeOnRandomTile(nena, sprites.dungeon.chestOpen)
    joc = false
    nena.sayText("Clica B per entrar a l'Inventari", 2000, false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (player2, enemy) {
    info.changeScoreBy(1)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    sprites.destroy(enemy, effects.spray, 500)
})
let seleccionarItem = ""
let myMenu: miniMenu.MenuSprite = null
let arbre: Sprite = null
let inventari: miniMenu.MenuItem[] = []
let nena: Sprite = null
let gallines = 0
let cavalls = 0
let cabres = 0
let ous = 0
let patates = 0
let joc = false
info.setScore(0)
joc = true
patates = 0
ous = 0
cabres = 0
cavalls = 0
gallines = 0
// Condicions sempre
forever(function () {
    if (joc == true) {
        tiles.setCurrentTilemap(tilemap`mapa0`)
        nena = sprites.create(assets.image`nena-front`, SpriteKind.Player)
        tiles.placeOnRandomTile(nena, assets.tile`stage`)
        controller.moveSprite(nena, 100, 100)
        scene.cameraFollowSprite(nena)
        crear_arbres_continuament()
    }
})
