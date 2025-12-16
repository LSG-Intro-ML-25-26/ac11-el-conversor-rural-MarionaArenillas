// Código generado automáticamente. No editar.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile11 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile12 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile8 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "mapa":
            case "level1":return tiles.createTilemap(hex`1000100005050505050505050505050505050707050000000000000500000000000000050400070700050705000700050007000505000707000505050005000500050005050000000705070500050007000500050500050505050007000500000005000505000000000000000005070500050005050007050505050700050505000500050500000005000300000507050005000505000505050005050505000700050005050000000000050000000000000500050500070505050705050505050705000505000000000705070707000000050005050005050505050505050505050700070507050700000000000000000000000105050505050505050505050505050502`, img`
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 . . . . . . 2 . . . . . . . 2 
. . 2 2 . 2 . 2 . . . 2 . . . 2 
2 . 2 2 . 2 2 2 . 2 . 2 . 2 . 2 
2 . . . 2 2 . 2 . 2 . . . 2 . 2 
2 . 2 2 2 2 . . . 2 . . . 2 . 2 
2 . . . . . . . . 2 . 2 . 2 . 2 
2 . . 2 2 2 2 2 . 2 2 2 . 2 . 2 
2 . . . 2 . 2 . . 2 . 2 . 2 . 2 
2 . 2 2 2 . 2 2 2 2 . . . 2 . 2 
2 . . . . . 2 . . . . . . 2 . 2 
2 . . 2 2 2 2 2 2 2 2 2 . 2 . 2 
2 . . . . . 2 . . . . . . 2 . 2 
2 . 2 2 2 2 2 2 2 2 2 2 2 2 . . 
2 . 2 . . . . . . . . . . . . . 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 . 
`, [myTiles.transparency16,myTiles.tile8,sprites.castle.tileGrass2,myTiles.tile4,myTiles.tile11,myTiles.tile12,myTiles.tile12,myTiles.tile16], TileScale.Sixteen);
            case "nivel2":
            case "nivel2":return tiles.createTilemap(hex`1000100003030303030303030303030303030303030000000000000300000000000000030100030500030503000500030005000303000303000303030003000300030003030000000503050300030005000300030300030303030000000300000003000303000000000000000003060300030003030005030303030500030303000300030300000003050200000305030003000303000303030003030303000500030003030000000000030000000000000300030300050303030503030303030503000303000000000003050505000000030003030003030303030303030303030500030305030500000000000000000000000403030303030303030303030303030303`, img`
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
2 . . . . . . 2 . . . . . . . 2 
. . 2 . . 2 . 2 . . . 2 . . . 2 
2 . 2 2 . 2 2 2 . 2 . 2 . 2 . 2 
2 . . . . 2 . 2 . 2 . . . 2 . 2 
2 . 2 2 2 2 . . . 2 . . . 2 . 2 
2 . . . . . . . . 2 . 2 . 2 . 2 
2 . . 2 2 2 2 . . 2 2 2 . 2 . 2 
2 . . . 2 . . . . 2 . 2 . 2 . 2 
2 . 2 2 2 . 2 2 2 2 . . . 2 . 2 
2 . . . . . 2 . . . . . . 2 . 2 
2 . . 2 2 2 . 2 2 2 2 2 . 2 . 2 
2 . . . . . 2 . . . . . . 2 . 2 
2 . 2 2 2 2 2 2 2 2 2 2 2 . . 2 
2 . 2 . . . . . . . . . . . . . 
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,myTiles.tile11,myTiles.tile4,myTiles.tile12,myTiles.tile8,myTiles.tile16,sprites.dungeon.chestClosed,myTiles.tile1], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "stage":
            case "tile11":return tile11;
            case "instrument3":
            case "tile4":return tile4;
            case "wall":
            case "tile12":return tile12;
            case "exit":
            case "tile8":return tile8;
            case "arbre":
            case "tile16":return tile16;
            case "miMosaico":
            case "tile1":return tile1;
        }
        return null;
    })

}
// Código generado automáticamente. No editar.
