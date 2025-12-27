namespace SpriteKind {
    export const sumar = SpriteKind.create()
    export const restar = SpriteKind.create()
    export const dropeador = SpriteKind.create()
    export const cursor = SpriteKind.create()
    export const confirmar = SpriteKind.create()
}

sprites.onOverlap(SpriteKind.restar, SpriteKind.cursor, function on_on_overlap(sprite3: Sprite, otherSprite2: Sprite) {
    
    if (clicPermes && quantitat > 1) {
        quantitat += 0 - 1
        quantitatSeleccionada.setText("" + ("" + quantitat))
        clicPermes = false
    }
    
})
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tileDarkGrass2, function on_overlap_tile(sprite2: Sprite, location: tiles.Location) {
    game.gameOver(true)
})
//  Funció obrir trueque
function obrir_trueque() {
    
    pantalla = "trueque"
    joc = false
    clicPermes = false
    menuObert = true
    quantitat = 1
    //  Canvi real d'escena
    tiles.setCurrentTilemap(tilemap`
        nivel9
        `)
    scene.centerCameraAt(80, 60)
    if (nena) {
        controller.moveSprite(nena, 0, 0)
    }
    
    quantitatSeleccionada = textsprite.create("1")
    quantitatSeleccionada.setMaxFontHeight(15)
    quantitatSeleccionada.setPosition(80, 29)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sumarBoto = sprites.create(assets.image`
        sumar
        `, SpriteKind.sumar)
    sumarBoto.setPosition(121, 59)
    restarBoto = sprites.create(assets.image`
        restar
        `, SpriteKind.restar)
    restarBoto.setPosition(32, 59)
    confirmarBoto = sprites.create(assets.image`
            confirmar
            `, SpriteKind.confirmar)
    confirmarBoto.setPosition(76, 59)
    cursor2 = sprites.create(assets.image`
        cursor
        `, SpriteKind.cursor)
    cursor2.setPosition(76, 94)
    controller.moveSprite(cursor2, 100, 100)
}

function trueque() {
    
    if (seleccionarItem.includes("Ous") && info.score() >= 3 * quantitat) {
        ous += 12 * quantitat
        info.changeScoreBy(-3 * quantitat)
        game.splash("Conversió feta correctament")
    } else if (seleccionarItem.includes("Gallines") && info.score() >= 6 * quantitat) {
        gallines += 1 * quantitat
        info.changeScoreBy(-6 * quantitat)
        game.splash("Conversió feta correctament")
    } else if (seleccionarItem.includes("Cavalls") && info.score() >= 12 * quantitat) {
        cavalls += 1 * quantitat
        info.changeScoreBy(-12 * quantitat)
        game.splash("Conversió feta correctament")
    } else if (seleccionarItem.includes("Cabres") && info.score() >= 5 * quantitat) {
        cabres += 1 * quantitat
        info.changeScoreBy(-5 * quantitat)
        game.splash("Conversió feta correctament")
    } else if (seleccionarItem.includes("patates") && info.score() >= 2 * quantitat) {
        patates += 1 * quantitat
        info.changeScoreBy(-2 * quantitat)
        game.splash("Conversió feta correctament")
    } else {
        game.splash("No tens suficients arbres per fer un trueque!")
    }
    
}

//  Funcions moviments animats de la nena
controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-down
            `, 500, false)
})
sprites.onOverlap(SpriteKind.sumar, SpriteKind.cursor, function on_on_overlap2(sprite4: Sprite, otherSprite3: Sprite) {
    
    if (clicPermes) {
        quantitat += 1
        quantitatSeleccionada.setText("" + ("" + quantitat))
        clicPermes = false
    }
    
})
//  Funció menú inventari
function obrir_menu() {
    
    pantalla = "inventari"
    menuObert = true
    joc = false
    mapaAnterior = tilemap`
        mapa0
        `
    tiles.setCurrentTilemap(tilemap`
        nivel1
        `)
    scene.centerCameraAt(80, 60)
    controller.moveSprite(nena, 0, 0)
    inventari = [miniMenu.createMenuItem("Ous " + ("" + ("" + ous)), assets.image`
            ou
            `), miniMenu.createMenuItem("Gallines " + ("" + ("" + gallines)), assets.image`
                gallina1
                `), miniMenu.createMenuItem("Cavalls " + ("" + ("" + cavalls)), assets.image`
                cavall1
                `), miniMenu.createMenuItem("Cabres " + ("" + ("" + cabres)), assets.image`
                cabra1
                `), miniMenu.createMenuItem("1,5kg/patates " + ("" + ("" + patates)), assets.image`
                patata1
                `)]
    myMenu = miniMenu.createMenuFromArray(inventari)
    myMenu.setTitle("Inventari")
    myMenu.setFrame(assets.image`
        menu1
        `)
    myMenu.setPosition(80, 60)
    myMenu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 50)
    //  B: seleccionar item i obrir trueque
    myMenu.onButtonPressed(controller.B, function on_button_pressed(selection: string, selectedIndex: any) {
        
        seleccionarItem = selection
        obrir_trueque()
        pause(50)
        myMenu.close()
    })
    //  A: tancar inventari i tornar al joc
    myMenu.onButtonPressed(controller.A, function on_button_pressed2(selection2: any, selectedIndex2: any) {
        
        pantalla = "joc"
        joc = true
        menuObert = false
        myMenu.close()
        //  Tornar al laberint
        if (mapaAnterior) {
            tiles.setCurrentTilemap(mapaAnterior)
        }
        
        controller.moveSprite(nena, 100, 100)
        scene.cameraFollowSprite(nena)
    })
}

//  Funció per sortir de treque i tornar al laberint
function sortir_trueque() {
    
    //  destruir UI del trueque
    if (sumarBoto) {
        sprites.destroy(sumarBoto)
    }
    
    if (restarBoto) {
        sprites.destroy(restarBoto)
    }
    
    if (confirmarBoto) {
        sprites.destroy(confirmarBoto)
    }
    
    if (cursor2) {
        sprites.destroy(cursor2)
    }
    
    if (quantitatSeleccionada) {
        sprites.destroy(quantitatSeleccionada)
    }
    
    menuObert = false
    pantalla = "joc"
    joc = true
    //  tornar al laberint
    tiles.setCurrentTilemap(tilemap`
        mapa0
        `)
    scene.cameraFollowSprite(nena)
    //  tornar a activar moviment
    controller.moveSprite(nena, 100, 100)
    tiles.placeOnRandomTile(nena, sprites.dungeon.chestOpen)
}

//  Funció per tancar trueque
function tancar_trueque() {
    
    //  destruir UI trueque
    if (sumarBoto) {
        sprites.destroy(sumarBoto)
    }
    
    if (restarBoto) {
        sprites.destroy(restarBoto)
    }
    
    if (confirmarBoto) {
        sprites.destroy(confirmarBoto)
    }
    
    if (cursor2) {
        sprites.destroy(cursor2)
    }
    
    if (quantitatSeleccionada) {
        sprites.destroy(quantitatSeleccionada)
    }
    
    pantalla = "inventari"
    menuObert = true
    joc = false
    //  tornar al mapa de l'inventari
    tiles.setCurrentTilemap(tilemap`
        nivel1
        `)
    scene.centerCameraAt(80, 60)
    if (nena) {
        controller.moveSprite(nena, 0, 0)
    }
    
}

controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-right
            `, 500, false)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-left
            `, 500, false)
})
//  Funció quan cliques la tecla "A"
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    if (pantalla == "trueque") {
        sortir_trueque()
    }
    
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    
    if (pantalla == "trueque") {
        clicPermes = true
    }
    
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function on_overlap_tile2(sprite22: Sprite, location2: tiles.Location) {
    
    if (pantalla == "joc") {
        joc = false
        obrir_menu()
    }
    
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function on_menu_pressed() {
    if (pantalla == "trueque") {
        tancar_trueque()
    }
    
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-up
            `, 500, false)
})
sprites.onOverlap(SpriteKind.confirmar, SpriteKind.cursor, function on_on_overlap3(sprite: Sprite, otherSprite: Sprite) {
    
    if (pantalla == "trueque" && clicPermes) {
        clicPermes = false
        trueque()
    }
    
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_on_overlap4(player2: Sprite, enemy: Sprite) {
    info.changeScoreBy(1)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    sprites.destroy(enemy, effects.spray, 500)
})
let arbre : Sprite = null
let myMenu : miniMenu.MenuSprite = null
let inventari : miniMenu.MenuItem[] = []
let seleccionarItem = ""
let cursor2 : Sprite = null
let confirmarBoto : Sprite = null
let restarBoto : Sprite = null
let sumarBoto : Sprite = null
let nena : Sprite = null
let quantitatSeleccionada : TextSprite = null
let quantitat = 0
let clicPermes = false
let menuObert = false
let gallines = 0
let cavalls = 0
let cabres = 0
let ous = 0
let patates = 0
let joc = false
let pantalla = ""
let mapaAnterior : tiles.TileMapData = null
let jocInicialitzat = false
mapaAnterior = tilemap`
    mapa0
    `
pantalla = "joc"
info.setScore(0)
joc = true
patates = 0
ous = 0
cabres = 0
cavalls = 0
gallines = 0
menuObert = false
game.onUpdate(function on_on_update() {
    if (menuObert == true) {
        scene.centerCameraAt(80, 60)
    }
    
})
//  Funció per crear arbres cada 5 segons en llocs aleatoris
game.onUpdateInterval(5000, function on_update_interval() {
    
    if (pantalla == "joc" && joc) {
        arbre = sprites.create(assets.image`
            arbre
            `, SpriteKind.Enemy)
        tiles.placeOnRandomTile(arbre, assets.tile`
            transparency16
            `)
    }
    
})
forever(function on_forever() {
    
    if (pantalla == "joc") {
        //  Inicialitza només un cop (si no existeix la nena)
        if (nena == null) {
            tiles.setCurrentTilemap(tilemap`
                mapa0
                `)
            nena = sprites.create(assets.image`
                nena-front
                `, SpriteKind.Player)
            controller.moveSprite(nena, 100, 100)
            scene.cameraFollowSprite(nena)
            tiles.placeOnRandomTile(nena, assets.tile`
                stage
                `)
        }
        
    }
    
    pause(100)
})
