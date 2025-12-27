namespace SpriteKind {
    export const sumar = SpriteKind.create()
    export const restar = SpriteKind.create()
    export const dropeador = SpriteKind.create()
    export const cursor = SpriteKind.create()
    export const confirmar = SpriteKind.create()
    export const mode = SpriteKind.create()
}

//  Quan el cursor toca el botó de Mode --> canviar entre COMPRAR i VENDRE
sprites.onOverlap(SpriteKind.mode, SpriteKind.cursor, function on_overlap_boto_mode(sprite_mode: Sprite, sprite_cursor: Sprite) {
    
    if (pantalla == "trueque" && clic_permes) {
        clic_permes = false
        if (mode_trueque == "comprar") {
            mode_trueque = "vendre"
        } else {
            mode_trueque = "comprar"
        }
        
        actualitzar_text_mode()
        game.splash("Mode canviat!")
    }
    
})
//  Quan el cursor toca el botó sumar --> augmentar la quantitat
sprites.onOverlap(SpriteKind.sumar, SpriteKind.cursor, function on_overlap_boto_sumar(sprite_sumar: Sprite, sprite_cursor: Sprite) {
    
    if (clic_permes) {
        quantitat += 1
        quantitat_seleccionada.setText("" + quantitat)
        clic_permes = false
    }
    
})
//  Quan el cursor toca el botó restar --> disminueix la quantitat
sprites.onOverlap(SpriteKind.restar, SpriteKind.cursor, function on_overlap_boto_restar(sprite_restar: Sprite, sprite_cursor: Sprite) {
    
    if (clic_permes && quantitat > 1) {
        quantitat += 0 - 1
        quantitat_seleccionada.setText("" + quantitat)
        clic_permes = false
    }
    
})
//  Quan el cursor toca el botó confirmar --> confirmem la Conversió
sprites.onOverlap(SpriteKind.confirmar, SpriteKind.cursor, function on_overlap_boto_confirmar(sprite_confirmar: Sprite, sprite_cursor: Sprite) {
    
    if (pantalla == "trueque" && clic_permes) {
        clic_permes = false
        trueque()
    }
    
})
scene.onOverlapTile(SpriteKind.Player, sprites.castle.tileDarkGrass2, function on_overlap_tile(sprite2: Sprite, location: tiles.Location) {
    game.gameOver(true)
})
//  Funcions moviments animats de la nena
controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-down
            `, 500, false)
})
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
controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    animation.runImageAnimation(nena, assets.animation`
            nena-animation-up
            `, 500, false)
})
//  Funció obrir trueque
function obrir_trueque() {
    
    pantalla = "trueque"
    joc = false
    clic_permes = false
    menu_obert = true
    quantitat = 1
    //  Canvi real d'escena
    tiles.setCurrentTilemap(tilemap`
        nivel9
        `)
    scene.centerCameraAt(80, 60)
    if (nena) {
        controller.moveSprite(nena, 0, 0)
    }
    
    //  Quantitats
    quantitat_seleccionada = textsprite.create("1")
    quantitat_seleccionada.setMaxFontHeight(15)
    quantitat_seleccionada.setPosition(80, 29)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    //  Botons
    sumar_boto = sprites.create(assets.image`
        sumar
        `, SpriteKind.sumar)
    sumar_boto.setPosition(121, 59)
    restar_boto = sprites.create(assets.image`
        restar
        `, SpriteKind.restar)
    restar_boto.setPosition(32, 59)
    confirmar_boto = sprites.create(assets.image`
            confirmar
            `, SpriteKind.confirmar)
    confirmar_boto.setPosition(76, 59)
    mode_boto = sprites.create(assets.image`
        mode
        `, SpriteKind.mode)
    mode_boto.setPosition(76, 94)
    mode_text = textsprite.create("Mode: COMPRAR")
    mode_text.setMaxFontHeight(10)
    mode_text.setPosition(80, 12)
    cursor2 = sprites.create(assets.image`
        cursor
        `, SpriteKind.cursor)
    cursor2.setPosition(76, 110)
    controller.moveSprite(cursor2, 100, 100)
}

//  Funció per la gestió del trueque
function trueque() {
    let cost: number;
    let guany: number;
    let necessari: number;
    let guany_arbres: number;
    
    if (seleccionar_item.includes("Ous")) {
        if (mode_trueque == "comprar") {
            cost = 3 * quantitat
            guany = 12 * quantitat
            if (info.score() >= cost) {
                ous += guany
                info.changeScoreBy(0 - cost)
                game.splash("Conversió feta: +" + ("" + ("" + guany)) + " ous")
            } else {
                game.splash("No tens prou arbres!")
            }
            
        } else {
            necessari = 12 * quantitat
            guany_arbres = 3 * quantitat
            if (ous >= necessari) {
                ous += 0 - necessari
                info.changeScoreBy(guany_arbres)
                game.splash("Conversió feta: +" + ("" + ("" + guany_arbres)) + " arbres")
            } else {
                game.splash("No tens prou ous!")
            }
            
        }
        
    } else if (seleccionar_item.includes("Gallines")) {
        if (mode_trueque == "comprar") {
            cost = 6 * quantitat
            if (info.score() >= cost) {
                gallines += 1 * quantitat
                info.changeScoreBy(0 - cost)
                game.splash("Conversió feta: +" + ("" + ("" + quantitat)) + " gallina/es")
            } else {
                game.splash("No tens prou arbres!")
            }
            
        } else if (gallines >= quantitat) {
            gallines += 0 - quantitat
            info.changeScoreBy(6 * quantitat)
            game.splash("Conversió feta: +" + ("" + ("" + 6 * quantitat)) + " arbres")
        } else {
            game.splash("No tens prou gallines!")
        }
        
    } else if (seleccionar_item.includes("Cavalls")) {
        if (mode_trueque == "comprar") {
            cost = 12 * quantitat
            if (info.score() >= cost) {
                cavalls += 1 * quantitat
                info.changeScoreBy(0 - cost)
                game.splash("Conversió feta: +" + ("" + ("" + quantitat)) + " cavalls")
            } else {
                game.splash("No tens prou arbres!")
            }
            
        } else if (cavalls >= quantitat) {
            cavalls += 0 - quantitat
            info.changeScoreBy(12 * quantitat)
            game.splash("Conversió feta: +" + ("" + ("" + 12 * quantitat)) + " arbres")
        } else {
            game.splash("No tens prou cavalls!")
        }
        
    } else if (seleccionar_item.includes("Cabres")) {
        if (mode_trueque == "comprar") {
            cost = 5 * quantitat
            if (info.score() >= cost) {
                cabres += 1 * quantitat
                info.changeScoreBy(0 - cost)
                game.splash("Conversió feta: +" + ("" + ("" + quantitat)) + " cabres")
            } else {
                game.splash("No tens prou arbres!")
            }
            
        } else if (cabres >= quantitat) {
            cabres += 0 - quantitat
            info.changeScoreBy(5 * quantitat)
            game.splash("Conversió feta: +" + ("" + ("" + 5 * quantitat)) + " arbres")
        } else {
            game.splash("No tens prou cabres!")
        }
        
    } else if (seleccionar_item.includes("patates")) {
        if (mode_trueque == "comprar") {
            cost = 2 * quantitat
            if (info.score() >= cost) {
                patates += 1 * quantitat
                info.changeScoreBy(0 - cost)
                game.splash("Conversió feta: +" + ("" + ("" + quantitat)) + " patates")
            } else {
                game.splash("No tens prou arbres!")
            }
            
        } else if (patates >= quantitat) {
            patates += 0 - quantitat
            info.changeScoreBy(2 * quantitat)
            game.splash("Conversió feta: +" + ("" + ("" + 2 * quantitat)) + " arbres")
        } else {
            game.splash("No tens prou patates!")
        }
        
    } else {
        game.splash("No hi ha cap item seleccionat!")
    }
    
}

//  Funció menú inventari
function obrir_menu() {
    
    pantalla = "inventari"
    menu_obert = true
    joc = false
    mapa_anterior = tilemap`
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
    my_menu = miniMenu.createMenuFromArray(inventari)
    my_menu.setTitle("Inventari")
    my_menu.setFrame(assets.image`
        menu1
        `)
    my_menu.setPosition(80, 60)
    my_menu.setStyleProperty(miniMenu.StyleKind.Selected, miniMenu.StyleProperty.Background, 50)
    //  B: seleccionar item i obrir trueque
    my_menu.onButtonPressed(controller.B, function on_button_pressed(selection: string, selectedIndex: any) {
        
        seleccionar_item = selection
        mode_trueque = "comprar"
        obrir_trueque()
        actualitzar_text_mode()
        pause(50)
        my_menu.close()
    })
    //  A: tancar inventari i tornar al joc
    my_menu.onButtonPressed(controller.A, function on_button_pressed2(selection2: any, selectedIndex2: any) {
        
        pantalla = "joc"
        joc = true
        menu_obert = false
        my_menu.close()
        //  Tornar al laberint
        if (mapa_anterior) {
            tiles.setCurrentTilemap(mapa_anterior)
        }
        
        controller.moveSprite(nena, 100, 100)
        scene.cameraFollowSprite(nena)
    })
}

//  Funció per destruir la UI del trueque
function destruir_ui_trueque() {
    
    //  destruir UI del trueque
    if (sumar_boto) {
        sprites.destroy(sumar_boto)
        sumar_boto = null
    }
    
    if (restar_boto) {
        sprites.destroy(restar_boto)
        restar_boto = null
    }
    
    if (confirmar_boto) {
        sprites.destroy(confirmar_boto)
        confirmar_boto = null
    }
    
    if (mode_boto) {
        sprites.destroy(mode_boto)
        mode_boto = null
    }
    
    if (mode_text) {
        sprites.destroy(mode_text)
        mode_text = null
    }
    
    if (cursor2) {
        sprites.destroy(cursor2)
        cursor2 = null
    }
    
    if (quantitat_seleccionada) {
        sprites.destroy(quantitat_seleccionada)
        quantitat_seleccionada = null
    }
    
}

//  Funció per sortir de treque i tornar al laberint
function sortir_trueque() {
    
    destruir_ui_trueque()
    menu_obert = false
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

//  Funció per tancar trueque i tornar a l'inventari
function tancar_trueque() {
    
    destruir_ui_trueque()
    pantalla = "inventari"
    menu_obert = true
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

//  Funció per actualitzar el text de mode
function actualitzar_text_mode() {
    if (mode_text) {
        if (mode_trueque == "comprar") {
            mode_text.setText("Mode: COMPRAR")
        } else {
            mode_text.setText("Mode: VENDRE")
        }
        
    }
    
}

//  Funció quan cliques la tecla "A"
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    if (pantalla == "trueque") {
        sortir_trueque()
    }
    
})
//  Funció quan cliques la tecla "B"
controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    
    if (pantalla == "trueque") {
        clic_permes = true
    }
    
})
//  Quan la nena es posiciona sobre el cofre tancat
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function on_overlap_jugador_cofre(sprite22: Sprite, location2: tiles.Location) {
    
    if (pantalla == "joc") {
        joc = false
        obrir_menu()
    }
    
})
//  Quan la nena recull un arbre --> sumar 1 punt, reprodueir so i eliminar arbre.
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_overlap_jugador_arbre(player2: Sprite, enemy: Sprite) {
    info.changeScoreBy(1)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    sprites.destroy(enemy, effects.spray, 500)
})
//  VARIABLES GLOBALS
let nena : Sprite = null
let arbre : Sprite = null
let my_menu : miniMenu.MenuSprite = null
let inventari : miniMenu.MenuItem[] = []
let seleccionar_item = ""
let sumar_boto : Sprite = null
let restar_boto : Sprite = null
let confirmar_boto : Sprite = null
let mode_boto : Sprite = null
let mode_text : TextSprite = null
let quantitat_seleccionada : TextSprite = null
let cursor2 : Sprite = null
let pantalla = "joc"
let joc = true
let menu_obert = false
let clic_permes = false
let joc_inicialitzat = false
let mapa_anterior = tilemap`
    mapa0
    `
let quantitat = 0
let mode_trueque = "comprar"
let gallines = 0
let cavalls = 0
let cabres = 0
let ous = 0
let patates = 0
info.setScore(0)
//  Mantenir la camera centrada quan hi ha algun menú obert
game.onUpdate(function on_on_update() {
    if (menu_obert == true) {
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
