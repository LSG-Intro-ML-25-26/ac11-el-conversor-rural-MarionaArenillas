# El conversor rural – MakeCode Arcade 🐓🌲

## 📌 Descripció del projecte
**El conversor rural** és un joc desenvolupat amb **MakeCode Arcade (Python)** en què la jugadora controla una nena que es mou per un entorn rural, recull arbres (que actuen com a moneda) i pot intercanviar-los per diferents productes mitjançant un sistema de **trueque**.

El projecte implementa:
- moviment del personatge
- recollida de recursos
- inventari interactiu
- sistema de compra i venda (trueque)
- control de quantitats
- interfície gràfica amb botons i cursor
- gestió d’estats (joc, inventari i trueque)

---

## 🎮 Funcionament del joc (laberint)

El joc està gestionat en tres pantalles (joc, inventari, trueque)

### 🧍‍♀️ Personatge
- Moviment amb les fletxes del comandament.
- En recollir un arbre → **+1 punt** (arbres).

### 🌳 Recursos
- Els arbres apareixen automàticament cada 5 segons.
- Els arbres funcionen com a **moneda del joc**.

#### Mapa de la pantalla "joc"
<img width="1032" height="890" alt="laberint" src="https://github.com/user-attachments/assets/9621e851-95ba-4537-9993-634cf10cb9cb" />

#### Inici del joc:  
<img width="1414" height="645" alt="nena_laberint" src="https://github.com/user-attachments/assets/ed519061-5658-423c-8f3e-6d36cc18e926" />

#### Final del joc: 
En posicionar la nena sobre la casella exit, el joc finalitza.
<img width="1429" height="647" alt="final" src="https://github.com/user-attachments/assets/495113b3-7adf-4911-b448-b60e39869ea1" />

---

## 📦 Inventari
- Quan la nena es col·loca sobre el **cofre tancat**, s’obre l’inventari.
- Productes disponibles:
  - Ous
  - Gallines
  - Cavalls
  - Cabres
  - Patates

### Controls
- **B** → Seleccionar producte i entrar al trueque  
- **A** → Tancar inventari i tornar al joc  

#### Mapa de la pantalla "inventari"
<img width="1413" height="644" alt="inventari" src="https://github.com/user-attachments/assets/145941d0-b6f0-47f8-9d0e-2be0607784ae" />

#### Actualització inventari
Quan fem un trueque i tornem a l'inventari s'haurà actualitzat la quantitat del producte que hem comprat o vengut:

<img width="1422" height="648" alt="inventari_actualitzat" src="https://github.com/user-attachments/assets/336d9bcf-b4cc-4cad-a4c1-9584692f4491" />

---

## 🔄 Sistema de trueque
- Modes disponibles:
  - **COMPRAR** (arbres → productes)
  - **VENDRE** (productes → arbres)
- Es pot modificar la quantitat amb botons **+ / −**
- El sistema comprova si hi ha recursos suficients abans de fer la conversió.

### Controls del trueque
- **+** → Augmentar quantitat  
- **−** → Disminuir quantitat  
- **Confirmar** → Executar conversió  
- **A** → Tornar al joc  
- **Menu** → Tornar a l’inventari

#### Mapa de la pantalla "trueque"
<img width="1420" height="656" alt="trueque" src="https://github.com/user-attachments/assets/47ddba2c-1a55-46d0-ab09-92082693183d" />

#### Mode Comprar
Al estar en mode comprar, dir la quantitat que vols i clicar el OK apareix el missatge.
<img width="1412" height="647" alt="mode_comprar" src="https://github.com/user-attachments/assets/da4d085f-0e14-4c90-9c86-5c857e8590e5" />

#### Mode Vendre
Al clicar sobre el botó Mode es canvia de Comprar a Vendre
<img width="1415" height="643" alt="mode_vendre" src="https://github.com/user-attachments/assets/5fc3efbe-a42d-4b66-9fec-b9a27c14fefb" />

Quan seleccionem la quantitat que volem Vendre i cliquem sobre el botó OK ens surt el següent missatge. 
<img width="1423" height="653" alt="canvi_per_arbres" src="https://github.com/user-attachments/assets/e4730ac7-b4b7-4eae-9fda-9e4cdd7c9ea0" />

Al sortir del trueque i inventari ens col·loca automàticament a la nena sobre el cofre obert per poder seguir recollint arbres i fent més conversions.
<img width="1416" height="653" alt="cofre_obert" src="https://github.com/user-attachments/assets/e72cee07-30f7-42c2-b46a-c593f30fb803" />

---

## 🧠 Estructura del codi
El codi està:
- ordenat per blocs funcionals
- comentat amb explicacions clares
- optimitzat evitant duplicacions
- amb noms de funcions descriptius (`on_overlap_boto_sumar`, `on_overlap_jugador_cofre`, etc.)

S’utilitzen funcions específiques per:
- gestionar pantalles
- destruir la UI del trueque
- controlar la càmera
- gestionar el sistema de trueque

---

## MakeCode Arcade – Informació tècnica

[![Work in MakeCode](https://classroom.github.com/assets/work-in-make-code-8824cc13a1a3f34ffcd245c82f0ae96fdae6b7d554b6539aec3a03a70825519c.svg)](https://classroom.github.com/online_ide?assignment_repo_id=22030601&assignment_repo_type=AssignmentRepo)
 


> Open this page at [https://raimonizard.github.io/makecode-arcade-template-nena-mov/](https://raimonizard.github.io/makecode-arcade-template-nena-mov/)

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/raimonizard/makecode-arcade-template-nena-mov** and import

## Edit this project

To edit this repository in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/raimonizard/makecode-arcade-template-nena-mov** and click import

#### Metadata (used for search, rendering)

* for PXT/arcade
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>

