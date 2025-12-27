@namespace
class SpriteKind:
    sumar = SpriteKind.create()
    restar = SpriteKind.create()
    dropeador = SpriteKind.create()
    cursor = SpriteKind.create()
    confirmar = SpriteKind.create()
    mode = SpriteKind.create()

def on_on_overlap(sprite, otherSprite):
    global clicPermes, modeTrueque
    if pantalla == "trueque" and clicPermes:
        clicPermes = False
        if modeTrueque == "comprar":
            modeTrueque = "vendre"
        else:
            modeTrueque = "comprar"
        actualitzar_text_mode()
        game.splash("Mode canviat!")
sprites.on_overlap(SpriteKind.mode, SpriteKind.cursor, on_on_overlap)

def on_on_overlap2(sprite3, otherSprite2):
    global quantitat, clicPermes
    if clicPermes and quantitat > 1:
        quantitat += 0 - 1
        quantitatSeleccionada.set_text("" + str(quantitat))
        clicPermes = False
sprites.on_overlap(SpriteKind.restar, SpriteKind.cursor, on_on_overlap2)

def on_overlap_tile(sprite2, location):
    game.game_over(True)
scene.on_overlap_tile(SpriteKind.player,
    sprites.castle.tile_dark_grass2,
    on_overlap_tile)

# Funció obrir trueque
def obrir_trueque():
    global pantalla, joc, clicPermes, menuObert, quantitat, quantitatSeleccionada, sumarBoto, restarBoto, confirmarBoto, modeBoto, modeText, cursor2
    pantalla = "trueque"
    joc = False
    clicPermes = False
    menuObert = True
    quantitat = 1
    # Canvi real d'escena
    tiles.set_current_tilemap(tilemap("""
        nivel9
        """))
    scene.center_camera_at(80, 60)
    if nena:
        controller.move_sprite(nena, 0, 0)
    # Quantitats
    quantitatSeleccionada = textsprite.create("1")
    quantitatSeleccionada.set_max_font_height(15)
    quantitatSeleccionada.set_position(80, 29)
    sprites.destroy_all_sprites_of_kind(SpriteKind.enemy)
    # Botons
    sumarBoto = sprites.create(assets.image("""
        sumar
        """), SpriteKind.sumar)
    sumarBoto.set_position(121, 59)
    restarBoto = sprites.create(assets.image("""
        restar
        """), SpriteKind.restar)
    restarBoto.set_position(32, 59)
    confirmarBoto = sprites.create(assets.image("""
            confirmar
            """),
        SpriteKind.confirmar)
    confirmarBoto.set_position(76, 59)
    modeBoto = sprites.create(assets.image("""
        mode
        """), SpriteKind.mode)
    modeBoto.set_position(76, 94)
    modeText = textsprite.create("Mode: COMPRAR")
    modeText.set_max_font_height(10)
    modeText.set_position(80, 12)
    cursor2 = sprites.create(assets.image("""
        cursor
        """), SpriteKind.cursor)
    cursor2.set_position(76, 110)
    controller.move_sprite(cursor2, 100, 100)
# Funció per la gestió del trueque
def trueque():
    global ous, gallines, cavalls, cabres, patates
    if seleccionarItem.includes("Ous"):
        if modeTrueque == "comprar":
            cost = 3 * quantitat
            guany = 12 * quantitat
            if info.score() >= cost:
                ous += guany
                info.change_score_by(0 - cost)
                game.splash("Conversió feta: +" + ("" + str(guany)) + " ous")
            else:
                game.splash("No tens prou arbres!")
        else:
            necessari = 12 * quantitat
            guanyArbres = 3 * quantitat
            if ous >= necessari:
                ous += 0 - necessari
                info.change_score_by(guanyArbres)
                game.splash("Conversió feta: +" + ("" + str(guanyArbres)) + " arbres")
            else:
                game.splash("No tens prou ous!")
    elif seleccionarItem.includes("Gallines"):
        if modeTrueque == "comprar":
            cost = 6 * quantitat
            if info.score() >= cost:
                gallines += 1 * quantitat
                info.change_score_by(0 - cost)
                game.splash("Conversió feta: +" + ("" + str(quantitat)) + " gallina/es")
            else:
                game.splash("No tens prou arbres!")
        elif gallines >= quantitat:
            gallines += 0 - quantitat
            info.change_score_by(6 * quantitat)
            game.splash("Conversió feta: +" + ("" + str(6 * quantitat)) + " arbres")
        else:
            game.splash("No tens prou gallines!")
    elif seleccionarItem.includes("Cavalls"):
        if modeTrueque == "comprar":
            cost = 12 * quantitat
            if info.score() >= cost:
                cavalls += 1 * quantitat
                info.change_score_by(0 - cost)
                game.splash("Conversió feta: +" + ("" + str(quantitat)) + " cavalls")
            else:
                game.splash("No tens prou arbres!")
        elif cavalls >= quantitat:
            cavalls += 0 - quantitat
            info.change_score_by(12 * quantitat)
            game.splash("Conversió feta: +" + ("" + str(12 * quantitat)) + " arbres")
        else:
            game.splash("No tens prou cavalls!")
    elif seleccionarItem.includes("Cabres"):
        if modeTrueque == "comprar":
            cost = 5 * quantitat
            if info.score() >= cost:
                cabres += 1 * quantitat
                info.change_score_by(0 - cost)
                game.splash("Conversió feta: +" + ("" + str(quantitat)) + " cabres")
            else:
                game.splash("No tens prou arbres!")
        elif cabres >= quantitat:
            cabres += 0 - quantitat
            info.change_score_by(5 * quantitat)
            game.splash("Conversió feta: +" + ("" + str(5 * quantitat)) + " arbres")
        else:
            game.splash("No tens prou cabres!")
    elif seleccionarItem.includes("Patates"):
        if modeTrueque == "comprar":
            cost = 2 * quantitat
            if info.score() >= cost:
                patates += 1 * quantitat
                info.change_score_by(0 - cost)
                game.splash("Conversió feta: +" + ("" + str(quantitat)) + " patates")
            else:
                game.splash("No tens prou arbres!")
        elif patates >= quantitat:
            patates += 0 - quantitat
            info.change_score_by(2 * quantitat)
            game.splash("Conversió feta: +" + ("" + str(2 * quantitat)) + " arbres")
        else:
            game.splash("No tens prou patates!")
    else:
        game.splash("No hi ha cap item seleccionat!")
# Funcions moviments animats de la nena

def on_down_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-down
            """),
        500,
        False)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def on_on_overlap3(sprite4, otherSprite3):
    global quantitat, clicPermes
    if clicPermes:
        quantitat += 1
        quantitatSeleccionada.set_text("" + str(quantitat))
        clicPermes = False
sprites.on_overlap(SpriteKind.sumar, SpriteKind.cursor, on_on_overlap3)

# Funció menú inventari
def obrir_menu():
    global pantalla, menuObert, joc, mapaAnterior, inventari, myMenu
    pantalla = "inventari"
    menuObert = True
    joc = False
    mapaAnterior = tilemap("""
        mapa0
        """)
    tiles.set_current_tilemap(tilemap("""
        nivel1
        """))
    scene.center_camera_at(80, 60)
    controller.move_sprite(nena, 0, 0)
    inventari = [miniMenu.create_menu_item("Ous " + ("" + str(ous)), assets.image("""
            ou
            """)),
        miniMenu.create_menu_item("Gallines " + ("" + str(gallines)),
            assets.image("""
                gallina1
                """)),
        miniMenu.create_menu_item("Cavalls " + ("" + str(cavalls)),
            assets.image("""
                cavall1
                """)),
        miniMenu.create_menu_item("Cabres " + ("" + str(cabres)),
            assets.image("""
                cabra1
                """)),
        miniMenu.create_menu_item("1,5kg/patates " + ("" + str(patates)),
            assets.image("""
                patata1
                """))]
    myMenu = miniMenu.create_menu_from_array(inventari)
    myMenu.set_title("Inventari")
    myMenu.set_frame(assets.image("""
        menu1
        """))
    myMenu.set_position(80, 60)
    myMenu.set_style_property(miniMenu.StyleKind.SELECTED,
        miniMenu.StyleProperty.BACKGROUND,
        50)
    # B: seleccionar item i obrir trueque
    
    def on_button_pressed(selection, selectedIndex):
        global seleccionarItem, modeTrueque
        seleccionarItem = selection
        modeTrueque = "comprar"
        obrir_trueque()
        actualitzar_text_mode()
        pause(50)
        myMenu.close()
    myMenu.on_button_pressed(controller.B, on_button_pressed)
    
    # A: tancar inventari i tornar al joc
    
    def on_button_pressed2(selection2, selectedIndex2):
        global pantalla, joc, menuObert
        pantalla = "joc"
        joc = True
        menuObert = False
        myMenu.close()
        # Tornar al laberint
        if mapaAnterior:
            tiles.set_current_tilemap(mapaAnterior)
        controller.move_sprite(nena, 100, 100)
        scene.camera_follow_sprite(nena)
    myMenu.on_button_pressed(controller.A, on_button_pressed2)
    
# Funció per sortir de treque i tornar al laberint
def sortir_trueque():
    global menuObert, pantalla, joc
    # destruir UI del trueque
    if sumarBoto:
        sprites.destroy(sumarBoto)
    if restarBoto:
        sprites.destroy(restarBoto)
    if confirmarBoto:
        sprites.destroy(confirmarBoto)
    if modeBoto:
        sprites.destroy(modeBoto)
    if modeText:
        sprites.destroy(modeText)
    if cursor2:
        sprites.destroy(cursor2)
    if quantitatSeleccionada:
        sprites.destroy(quantitatSeleccionada)
    menuObert = False
    pantalla = "joc"
    joc = True
    # tornar al laberint
    tiles.set_current_tilemap(tilemap("""
        mapa0
        """))
    scene.camera_follow_sprite(nena)
    # tornar a activar moviment
    controller.move_sprite(nena, 100, 100)
    tiles.place_on_random_tile(nena, sprites.dungeon.chest_open)
# Funció per tancar trueque
def tancar_trueque():
    global pantalla, menuObert, joc
    # destruir UI trueque
    if sumarBoto:
        sprites.destroy(sumarBoto)
    if restarBoto:
        sprites.destroy(restarBoto)
    if confirmarBoto:
        sprites.destroy(confirmarBoto)
    if modeBoto:
        sprites.destroy(modeBoto)
    if modeText:
        sprites.destroy(modeText)
    if cursor2:
        sprites.destroy(cursor2)
    if quantitatSeleccionada:
        sprites.destroy(quantitatSeleccionada)
    pantalla = "inventari"
    menuObert = True
    joc = False
    # tornar al mapa de l'inventari
    tiles.set_current_tilemap(tilemap("""
        nivel1
        """))
    scene.center_camera_at(80, 60)
    if nena:
        controller.move_sprite(nena, 0, 0)

def on_right_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-right
            """),
        500,
        False)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def on_left_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-left
            """),
        500,
        False)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

# Funció per actualitzar el text de mode
def actualitzar_text_mode():
    if modeText:
        if modeTrueque == "comprar":
            modeText.set_text("Mode: COMPRAR")
        else:
            modeText.set_text("Mode: VENDRE")
# Funció quan cliques la tecla "A"

def on_a_pressed():
    if pantalla == "trueque":
        sortir_trueque()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_b_pressed():
    global clicPermes
    if pantalla == "trueque":
        clicPermes = True
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_overlap_tile2(sprite22, location2):
    global joc
    if pantalla == "joc":
        joc = False
        obrir_menu()
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.chest_closed,
    on_overlap_tile2)

def on_menu_pressed():
    if pantalla == "trueque":
        tancar_trueque()
controller.menu.on_event(ControllerButtonEvent.PRESSED, on_menu_pressed)

def on_up_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-up
            """),
        500,
        False)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_on_overlap4(sprite5, otherSprite4):
    global clicPermes
    if pantalla == "trueque" and clicPermes:
        clicPermes = False
        trueque()
sprites.on_overlap(SpriteKind.confirmar, SpriteKind.cursor, on_on_overlap4)

def on_on_overlap5(player2, enemy):
    info.change_score_by(1)
    music.play(music.melody_playable(music.power_up),
        music.PlaybackMode.IN_BACKGROUND)
    sprites.destroy(enemy, effects.spray, 500)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap5)

arbre: Sprite = None
myMenu: miniMenu.MenuSprite = None
inventari: List[miniMenu.MenuItem] = []
seleccionarItem = ""
cursor2: Sprite = None
modeText: TextSprite = None
modeBoto: Sprite = None
confirmarBoto: Sprite = None
restarBoto: Sprite = None
sumarBoto: Sprite = None
nena: Sprite = None
quantitatSeleccionada: TextSprite = None
quantitat = 0
clicPermes = False
modeTrueque = ""
menuObert = False
gallines = 0
cavalls = 0
cabres = 0
ous = 0
patates = 0
joc = False
pantalla = ""
mapaAnterior: tiles.TileMapData = None
jocInicialitzat = False
mapaAnterior = tilemap("""
    mapa0
    """)
pantalla = "joc"
info.set_score(0)
joc = True
patates = 0
ous = 0
cabres = 0
cavalls = 0
gallines = 0
menuObert = False
modeTrueque = "comprar"

def on_on_update():
    if menuObert == True:
        scene.center_camera_at(80, 60)
game.on_update(on_on_update)

# Funció per crear arbres cada 5 segons en llocs aleatoris

def on_update_interval():
    global arbre
    if pantalla == "joc" and joc:
        arbre = sprites.create(assets.image("""
            arbre
            """), SpriteKind.enemy)
        tiles.place_on_random_tile(arbre, assets.tile("""
            transparency16
            """))
game.on_update_interval(5000, on_update_interval)

def on_forever():
    global nena
    if pantalla == "joc":
        # Inicialitza només un cop (si no existeix la nena)
        if nena == None:
            tiles.set_current_tilemap(tilemap("""
                mapa0
                """))
            nena = sprites.create(assets.image("""
                nena-front
                """), SpriteKind.player)
            controller.move_sprite(nena, 100, 100)
            scene.camera_follow_sprite(nena)
            tiles.place_on_random_tile(nena, assets.tile("""
                stage
                """))
    pause(100)
forever(on_forever)
