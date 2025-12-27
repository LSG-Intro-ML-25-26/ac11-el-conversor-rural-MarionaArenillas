@namespace
class SpriteKind:
    sumar = SpriteKind.create()
    restar = SpriteKind.create()
    dropeador = SpriteKind.create()
    cursor = SpriteKind.create()
    confirmar = SpriteKind.create()
    mode = SpriteKind.create()

# Quan el cursor toca el botó de Mode --> canviar entre COMPRAR i VENDRE
def on_overlap_boto_mode(sprite_mode, sprite_cursor):
    global clic_permes, mode_trueque
    if pantalla == "trueque" and clic_permes:
        clic_permes = False
        if mode_trueque == "comprar":
            mode_trueque = "vendre"
        else:
            mode_trueque = "comprar"
        actualitzar_text_mode()
        game.splash("Mode canviat!")
sprites.on_overlap(SpriteKind.mode, SpriteKind.cursor, on_overlap_boto_mode)

# Quan el cursor toca el botó sumar --> augmentar la quantitat
def on_overlap_boto_sumar(sprite_sumar, sprite_cursor):
    global quantitat, clic_permes
    if clic_permes:
        quantitat += 1
        quantitat_seleccionada.set_text(str(quantitat))
        clic_permes = False
sprites.on_overlap(SpriteKind.sumar, SpriteKind.cursor, on_overlap_boto_sumar)

# Quan el cursor toca el botó restar --> disminueix la quantitat
def on_overlap_boto_restar(sprite_restar, sprite_cursor):
    global quantitat, clic_permes
    if clic_permes and quantitat > 1:
        quantitat += 0 - 1
        quantitat_seleccionada.set_text(str(quantitat))
        clic_permes = False
sprites.on_overlap(SpriteKind.restar, SpriteKind.cursor, on_overlap_boto_restar)

# Quan el cursor toca el botó confirmar --> confirmem la Conversió
def on_overlap_boto_confirmar(sprite_confirmar, sprite_cursor):
    global clic_permes
    if pantalla == "trueque" and clic_permes:
        clic_permes = False
        trueque()
sprites.on_overlap(SpriteKind.confirmar, SpriteKind.cursor, on_overlap_boto_confirmar)

def on_overlap_tile(sprite2, location):
    game.game_over(True)
scene.on_overlap_tile(SpriteKind.player,
    sprites.castle.tile_dark_grass2,
    on_overlap_tile)

# Funcions moviments animats de la nena
def on_down_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-down
            """),
        500,
        False)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)
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
def on_up_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-up
            """),
        500,
        False)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

# Funció obrir trueque
def obrir_trueque():
    global pantalla, joc, clic_permes, menu_obert, quantitat, quantitat_seleccionada, sumar_boto, restar_boto, confirmar_boto, mode_boto, mode_text, cursor2
    pantalla = "trueque"
    joc = False
    clic_permes = False
    menu_obert = True
    quantitat = 1
    # Canvi real d'escena
    tiles.set_current_tilemap(tilemap("""
        nivel9
        """))
    scene.center_camera_at(80, 60)
    if nena:
        controller.move_sprite(nena, 0, 0)
    # Quantitats
    quantitat_seleccionada = textsprite.create("1")
    quantitat_seleccionada.set_max_font_height(15)
    quantitat_seleccionada.set_position(80, 29)
    sprites.destroy_all_sprites_of_kind(SpriteKind.enemy)
    # Botons
    sumar_boto = sprites.create(assets.image("""
        sumar
        """), SpriteKind.sumar)
    sumar_boto.set_position(121, 59)
    restar_boto = sprites.create(assets.image("""
        restar
        """), SpriteKind.restar)
    restar_boto.set_position(32, 59)
    confirmar_boto = sprites.create(assets.image("""
            confirmar
            """),
        SpriteKind.confirmar)
    confirmar_boto.set_position(76, 59)
    mode_boto = sprites.create(assets.image("""
        mode
        """), SpriteKind.mode)
    mode_boto.set_position(76, 94)
    mode_text = textsprite.create("Mode: COMPRAR")
    mode_text.set_max_font_height(10)
    mode_text.set_position(80, 12)
    cursor2 = sprites.create(assets.image("""
        cursor
        """), SpriteKind.cursor)
    cursor2.set_position(76, 110)
    controller.move_sprite(cursor2, 100, 100)

# Funció per la gestió del trueque
def trueque():
    global ous, gallines, cavalls, cabres, patates
    if seleccionar_item.includes("Ous"):
        if mode_trueque == "comprar":
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
            guany_arbres = 3 * quantitat
            if ous >= necessari:
                ous += 0 - necessari
                info.change_score_by(guany_arbres)
                game.splash("Conversió feta: +" + ("" + str(guany_arbres)) + " arbres")
            else:
                game.splash("No tens prou ous!")
    elif seleccionar_item.includes("Gallines"):
        if mode_trueque == "comprar":
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
    elif seleccionar_item.includes("Cavalls"):
        if mode_trueque == "comprar":
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
    elif seleccionar_item.includes("Cabres"):
        if mode_trueque == "comprar":
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
    elif seleccionar_item.includes("patates"):
        if mode_trueque == "comprar":
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


# Funció menú inventari
def obrir_menu():
    global pantalla, menu_obert, joc, mapa_anterior, inventari, my_menu
    pantalla = "inventari"
    menu_obert = True
    joc = False
    mapa_anterior = tilemap("""
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
    my_menu = miniMenu.create_menu_from_array(inventari)
    my_menu.set_title("Inventari")
    my_menu.set_frame(assets.image("""
        menu1
        """))
    my_menu.set_position(80, 60)
    my_menu.set_style_property(miniMenu.StyleKind.SELECTED,
        miniMenu.StyleProperty.BACKGROUND,
        50)
    # B: seleccionar item i obrir trueque
    def on_button_pressed(selection, selectedIndex):
        global seleccionar_item, mode_trueque
        seleccionar_item = selection
        mode_trueque = "comprar"
        obrir_trueque()
        actualitzar_text_mode()
        pause(50)
        my_menu.close()
    my_menu.on_button_pressed(controller.B, on_button_pressed)
    
    # A: tancar inventari i tornar al joc
    def on_button_pressed2(selection2, selectedIndex2):
        global pantalla, joc, menu_obert
        pantalla = "joc"
        joc = True
        menu_obert = False
        my_menu.close()
        # Tornar al laberint
        if mapa_anterior:
            tiles.set_current_tilemap(mapa_anterior)
        controller.move_sprite(nena, 100, 100)
        scene.camera_follow_sprite(nena)
    my_menu.on_button_pressed(controller.A, on_button_pressed2)

# Funció per destruir la UI del trueque
def destruir_ui_trueque():
    global sumar_boto, restar_boto, confirmar_boto, mode_boto, mode_text, cursor2, quantitat_seleccionada
    # destruir UI del trueque
    if sumar_boto:
        sprites.destroy(sumar_boto)
        sumar_boto = None
    if restar_boto:
        sprites.destroy(restar_boto)
        restar_boto = None
    if confirmar_boto:
        sprites.destroy(confirmar_boto)
        confirmar_boto = None
    if mode_boto:
        sprites.destroy(mode_boto)
        mode_boto = None
    if mode_text:
        sprites.destroy(mode_text)
        mode_text = None
    if cursor2:
        sprites.destroy(cursor2)
        cursor2 = None
    if quantitat_seleccionada:
        sprites.destroy(quantitat_seleccionada)
        quantitat_seleccionada = None

# Funció per sortir de treque i tornar al laberint
def sortir_trueque():
    global menu_obert, pantalla, joc
    destruir_ui_trueque()
    menu_obert = False
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

# Funció per tancar trueque i tornar a l'inventari
def tancar_trueque():
    global pantalla, menu_obert, joc
    destruir_ui_trueque()
    pantalla = "inventari"
    menu_obert = True
    joc = False
    # tornar al mapa de l'inventari
    tiles.set_current_tilemap(tilemap("""
        nivel1
        """))
    scene.center_camera_at(80, 60)
    if nena:
        controller.move_sprite(nena, 0, 0)

# Funció per actualitzar el text de mode
def actualitzar_text_mode():
    if mode_text:
        if mode_trueque == "comprar":
            mode_text.set_text("Mode: COMPRAR")
        else:
            mode_text.set_text("Mode: VENDRE")

# Funció quan cliques la tecla "A"
def on_a_pressed():
    if pantalla == "trueque":
        sortir_trueque()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)
# Funció quan cliques la tecla "B"
def on_b_pressed():
    global clic_permes
    if pantalla == "trueque":
        clic_permes = True
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

# Quan la nena es posiciona sobre el cofre tancat
def on_overlap_jugador_cofre(sprite22, location2):
    global joc
    if pantalla == "joc":
        joc = False
        obrir_menu()
scene.on_overlap_tile(SpriteKind.player, sprites.dungeon.chest_closed, on_overlap_jugador_cofre)

# Quan la nena recull un arbre --> sumar 1 punt, reprodueir so i eliminar arbre.
def on_overlap_jugador_arbre(player2, enemy):
    info.change_score_by(1)
    music.play(music.melody_playable(music.power_up),
        music.PlaybackMode.IN_BACKGROUND)
    sprites.destroy(enemy, effects.spray, 500)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_overlap_jugador_arbre)

# VARIABLES GLOBALS
nena: Sprite = None
arbre: Sprite = None

my_menu: miniMenu.MenuSprite = None
inventari: List[miniMenu.MenuItem] = []
seleccionar_item = ""

sumar_boto: Sprite = None
restar_boto: Sprite = None
confirmar_boto: Sprite = None
mode_boto: Sprite = None

mode_text: TextSprite = None
quantitat_seleccionada: TextSprite = None

cursor2: Sprite = None

pantalla: str = "joc"
joc = True
menu_obert = False
clic_permes = False
joc_inicialitzat = False

mapa_anterior = tilemap("""
    mapa0
    """)

quantitat = 0
mode_trueque = "comprar"

gallines = 0
cavalls = 0
cabres = 0
ous = 0
patates = 0

info.set_score(0)

# Mantenir la camera centrada quan hi ha algun menú obert
def on_on_update():
    if menu_obert == True:
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