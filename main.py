# Funcions moviments animats de la nena
def on_down_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-down
            """),
        500,
        False)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def obrir_menu():
    global joc, myMenu
    joc = False
    myMenu = 0
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

def on_overlap_tile(sprite, location):
    game.game_over(True)
scene.on_overlap_tile(SpriteKind.player,
    sprites.castle.tile_dark_grass2,
    on_overlap_tile)

def on_overlap_tile2(sprite2, location2):
    obrir_menu()
scene.on_overlap_tile(SpriteKind.player,
    sprites.dungeon.chest_open,
    on_overlap_tile2)

def on_on_overlap(player2, enemy):
    info.change_score_by(1)
    music.play(music.melody_playable(music.power_up),
        music.PlaybackMode.IN_BACKGROUND)
    sprites.destroy(enemy, effects.spray, 500)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap)

# Condicions inicials
arbre: Sprite = None
myMenu = 0
nena: Sprite = None
joc = False
joc = True
ous = 0
gallines = 0
patates = 0
cavalls = 0

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
