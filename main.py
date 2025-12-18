@namespace
class SpriteKind:
    sumar = SpriteKind.create()
    restar = SpriteKind.create()
# Funcions moviments animats de la nena

def on_down_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-down
            """),
        500,
        False)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

# Funció menú inventari
def obrir_menu():
    global joc, inventari, myMenu
    info.stop_countdown()
    controller.move_sprite(nena, 0, 0)
    joc = False
    inventari = [miniMenu.create_menu_item("Ous" + ("" + str(ous)), assets.image("""
            ou
            """)),
        miniMenu.create_menu_item("Gallines" + ("" + str(gallines)),
            assets.image("""
                gallina1
                """)),
        miniMenu.create_menu_item("Cavalls" + ("" + str(cavalls)),
            assets.image("""
                cavall1
                """)),
        miniMenu.create_menu_item("Cabres" + ("" + str(cabres)),
            assets.image("""
                cabra1
                """)),
        miniMenu.create_menu_item("Arbres" + ("" + str(arbre)),
            assets.image("""
                arbre
                """)),
        miniMenu.create_menu_item("1,5kg/patates" + ("" + str(patates)),
            assets.image("""
                patata1
                """))]
    myMenu = miniMenu.create_menu_from_array(inventari)
    myMenu.set_title("Inventari")
    myMenu.set_frame(assets.image("""
        menu
        """))
    myMenu.set_position(80, 60)
    myMenu.set_style_property(miniMenu.StyleKind.SELECTED,
        miniMenu.StyleProperty.BACKGROUND,
        8)
    
    def on_button_pressed(selection, selectedIndex):
        global seleccionarItem
        seleccionarItem = selection
    myMenu.on_button_pressed(controller.A, on_button_pressed)
    
    myMenu.close()
# Funció per crear arbres cada 5 segons en llocs aleatoris
def crear_arbres_continuament():
    global arbre
    while True:
        pause(5000)
        arbre = sprites.create(assets.image("""
            arbre
            """), SpriteKind.enemy)
        tiles.place_on_random_tile(arbre, assets.tile("""
            transparency16
            """))

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

def on_overlap_tile(sprite2, location2):
    if joc:
        nena.say_text("Clica B per obrir l'inventari")
        if controller.B.is_pressed():
            obrir_menu()
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.chest_closed,
    on_overlap_tile)

# CONDICIONS ACABAR JOC
# Quan s'acaba el temps perds

def on_countdown_end():
    game.game_over(False)
info.on_countdown_end(on_countdown_end)

def on_up_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-up
            """),
        500,
        False)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def on_overlap_tile2(sprite, location):
    game.game_over(True)
scene.on_overlap_tile(SpriteKind.player,
    sprites.castle.tile_dark_grass2,
    on_overlap_tile2)

def on_on_overlap(player2, enemy):
    info.change_score_by(1)
    music.play(music.melody_playable(music.power_up),
        music.PlaybackMode.IN_BACKGROUND)
    sprites.destroy(enemy, effects.spray, 500)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap)

seleccionarItem = ""
myMenu: miniMenu.MenuSprite = None
arbre: Sprite = None
inventari: List[miniMenu.MenuItem] = []
nena: Sprite = None
joc = False
gallines = 0
cavalls = 0
cabres = 0
ous = 0
patates = 0
patates = 0
ous = 0
cabres = 0
cavalls = 0
gallines = 0
enemy2 = 0
joc = True
# Condicions sempre

def on_forever():
    global nena
    if joc == True:
        tiles.set_current_tilemap(tilemap("""
            mapa0
            """))
        nena = sprites.create(assets.image("""
            nena-front
            """), SpriteKind.player)
        tiles.place_on_random_tile(nena, assets.tile("""
            stage
            """))
        controller.move_sprite(nena, 100, 100)
        scene.camera_follow_sprite(nena)
        info.start_countdown(300)
        crear_arbres_continuament()
forever(on_forever)