# Funcions moviments animats de la nena
def on_down_pressed():
    animation.run_image_animation(nena,
        assets.animation("""
            nena-animation-down
            """),
        500,
        False)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

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

def on_on_overlap(player2, enemy):
    info.change_score_by(1)
    music.play(music.melody_playable(music.power_up),
        music.PlaybackMode.IN_BACKGROUND)
    sprites.destroy(enemy, effects.spray, 500)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap)

arbre: Sprite = None
nena: Sprite = None
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