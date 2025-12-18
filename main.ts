namespace SpriteKind {
    export const sumar = SpriteKind.create()
    export const restar = SpriteKind.create()
    export const dropeador = SpriteKind.create()
}
function obrir_trueque () {
    quantitat = 1
}
function trueque () {
    if (seleccionarItem.includes("Ous") && info.score() >= 3 * quantitat) {
        ous += 12 * quantitat
        info.changeScoreBy(-3 * quantitat)
    } else if (seleccionarItem.includes("Gallines") && info.score() >= 6 * quantitat) {
        gallines += 1 * quantitat
        info.changeScoreBy(-6 * quantitat)
    } else if (seleccionarItem.includes("Cavalls") && info.score() >= 12 * quantitat) {
        cavalls += 1 * quantitat
        info.changeScoreBy(-12 * quantitat)
    } else if (seleccionarItem.includes("Cabres") && info.score() >= 5 * quantitat) {
        cabres += 1 * quantitat
        info.changeScoreBy(-5 * quantitat)
    } else if (seleccionarItem.includes("patates") && info.score() >= 2 * quantitat) {
        cabres += 1 * quantitat
        info.changeScoreBy(-2 * quantitat)
    } else {
        game.splash("No tens suficients arbres per fer un trueque!")
    }
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
    menuObert = true
    joc = false
    controller.moveSprite(nena, 0, 0)
    inventari = [
    miniMenu.createMenuItem("Ous" + ("" + ous), assets.image`ou`),
    miniMenu.createMenuItem("Gallines" + ("" + gallines), assets.image`gallina1`),
    miniMenu.createMenuItem("Cavalls" + ("" + cavalls), assets.image`cavall1`),
    miniMenu.createMenuItem("Cabres" + ("" + cabres), assets.image`cabra1`),
    miniMenu.createMenuItem("1,5kg/patates" + ("" + patates), assets.image`patata1`)
    ]
    myMenu = miniMenu.createMenuFromArray(inventari)
    myMenu.setTitle("Inventari")
    myMenu.setFrame(assets.image`menu1`)
    myMenu.setPosition(80, 60)
    myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 50)
    myMenu.onButtonPressed(controller.A, function (selection, selectedIndex) {
        seleccionarItem = selection
        myMenu.close()
    })
}
// Funció per crear arbres cada 5 segons en llocs aleatoris
function crear_arbres_continuament () {
    while (joc == true) {
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
    tiles.placeOnRandomTile(nena, sprites.dungeon.darkGroundCenter)
    joc = true
    menuObert = false
    controller.moveSprite(nena, 100, 100)
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite, location) {
    joc = false
    obrir_trueque()
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
    joc = false
    tiles.placeOnRandomTile(nena, sprites.dungeon.chestOpen)
    obrir_menu()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (player2, enemy) {
    info.changeScoreBy(1)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    sprites.destroy(enemy, effects.spray, 500)
})
let arbre: Sprite = null
let myMenu: miniMenu.MenuSprite = null
let inventari: miniMenu.MenuItem[] = []
let seleccionarItem = ""
let quantitat = 0
let nena: Sprite = null
let menuObert = false
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
menuObert = false
tiles.setCurrentTilemap(tilemap`mapa0`)
nena = sprites.create(assets.image`nena-front`, SpriteKind.Player)
tiles.placeOnRandomTile(nena, assets.tile`stage`)
game.onUpdate(function () {
    if (menuObert == true) {
        scene.centerCameraAt(80, 60)
    }
})
// Condicions sempre
forever(function () {
    if (joc == true) {
        controller.moveSprite(nena, 100, 100)
        scene.cameraFollowSprite(nena)
        crear_arbres_continuament()
    }
})
