---
title: "La confidentialité par l'architecture : traiter PDF et images sans passer par des serveurs"
description: "Pourquoi envoyer vos documents sur des convertisseurs cloud est un risque inutile, et comment LS PDF et LS Image Compressor traitent vos fichiers à 100% dans la mémoire de votre navigateur."
pubDate: "2026-10-30"
readingTime: 6
category: "Architecture Web · Sécurité"
slug: "privacy-first-local-file-processing-web"
lang: "fr"
---

Chaque jour, des millions de personnes téléversent relevés bancaires, dossiers médicaux, pièces d'identité, contrats commerciaux confidentiels et photos de famille sur des convertisseurs en ligne dits « gratuits ». Ils le font pour régler des détails du quotidien : fusionner deux pièces jointes PDF, compresser une image pour un portail d'emploi ou faire pivoter une facture numérisée.

La plupart des usagers pensent qu'une fois le fichier téléchargé, leur document disparaît par enchantement. Mais d'un point de vue d'ingénieur, dès qu'un fichier touche le disque d'un serveur distant, toute garantie devient fragile : des sauvegardes automatiques sont créées, les dossiers temporaires mettent du temps à être purgés, les journaux d'accès enregistrent des métadonnées et les infrastructures cloud peuvent être mal configurées ou ciblées par des attaques.

Lorsque j'ai conçu **LS PDF** (`pdf.ladestack.in`) et **LS Image Compressor** (`img.ladestack.in`) au sein de l'écosystème **LadeStack**, j'ai fait un choix architectural sans compromis : **la meilleure façon de protéger les données d'un utilisateur est de ne jamais les recevoir.**

## Le basculement vers le traitement côté client

Historiquement, les navigateurs n'avaient pas la puissance nécessaire pour analyser des formats binaires complexes comme le PDF ou manipuler de lourdes matrices de pixels. Ces opérations devaient obligatoirement être confiées à des outils exécutés côté serveur comme ImageMagick, Ghostscript ou Poppler.

Aujourd'hui, cette architecture est obsolète pour les besoins du quotidien. Avec des moteurs JavaScript optimisant les tableaux typés, WebAssembly exécutant du code à une vitesse quasi native et l'API Canvas HTML5 bénéficiant de l'accélération matérielle, le navigateur est parfaitement capable de manipuler vos documents sur place.

```text
[Approche Traditionnelle en Ligne]
Fichier -> Téléversement Réseau -> Disque Serveur -> Traitement Backend -> Téléchargement Réseau
(Lent, consommateur de bande passante, risque majeur de fuite de données)

[Architecture LadeStack]
Fichier -> ArrayBuffer en RAM locale -> Web Worker / Canvas -> URL Blob Locale
(Aucun téléversement, exécution instantanée, confidentialité totale)
```

## Au cœur de LS PDF : 17 fonctions en mémoire locale

**LS PDF** s'appuie sur deux bibliothèques majeures tournant exclusivement dans le navigateur : **PDF.js** (pour le rendu visuel et l'extraction de texte) et **pdf-lib** (pour modifier, assembler, découper et générer des flux d'octets PDF).

### 1. Fusionner et découper sans toucher à Internet

Lorsque vous assemblez trois fichiers PDF dans LS PDF :
1. Vous sélectionnez vos fichiers via l'API standard HTML5 File.
2. Les documents sont chargés directement dans la RAM sous forme d'instances `ArrayBuffer` via `FileReader.readAsArrayBuffer()`.
3. `PDFDocument.load()` analyse la structure du document dans la mémoire du navigateur.
4. Les pages sélectionnées sont copiées dans un nouveau document via `newDoc.copyPages(sourceDoc, indices)`.
5. Le fichier résultant est sérialisé en un tableau `Uint8Array`, transformé en URL objet via `URL.createObjectURL(new Blob([...]))` et téléchargé immédiatement.

L'opération prend moins de 200 millisecondes sur un ordinateur portable standard. Pas un seul octet ne transite sur le réseau.

### 2. Éviter le gel de l'affichage grâce aux Web Workers

Analyser des fichiers PDF volumineux contenant des centaines de tracés vectoriels peut saturer le fil d'exécution principal du navigateur. Si le fil principal bloque pendant plus de 50 millisecondes, le défilement se met à saccader et des alertes de page inactive peuvent surgir.

Pour conserver une interface d'une fluidité parfaite à 60 images par seconde, LS PDF délègue les tâches lourdes à des **Web Workers** d'arrière-plan :

```typescript
// Envoi direct des octets vers un fil secondaire sans copie mémoire
const worker = new Worker('/workers/pdf-worker.js');
const buffer = await file.arrayBuffer();

worker.postMessage({ action: 'EXTRACT_TEXT', buffer }, [buffer]);
```

En transférant le tampon en tant qu'objet transférable (Transferable Object), la mémoire est transmise sans copie inutile. Une fois le traitement fini, le résultat est renvoyé proprement à l'interface.

## Au cœur de LS Image Compressor : le travail direct sur Canvas

Pour l'optimisation des images dans **LS Image Compressor**, nous évitons les API distantes en exploitant directement l'accélération matérielle de l'**API Canvas HTML5**.

### 1. Redimensionnement et calcul de qualité sur mesure

Lorsqu'une image est déposée dans l'outil :
1. Le fichier est décodé en un `ImageBitmap` en dehors du fil principal.
2. Nous calculons les proportions idéales selon les limites demandées par l'utilisateur.
3. L'image est dessinée sur un `OffscreenCanvas` avec un rééchantillonnage de haute qualité.
4. Le résultat compressé est extrait par `.convertToBlob({ type: 'image/webp', quality })`.

Si vous ciblez un poids précis (par exemple : « réduire cette photo de 4 Mo sous la barre des 200 Ko pour un formulaire »), le compresseur applique une recherche dichotomique rapide. Il ajuste le taux de compression de 0,1 à 1,0 en 3 ou 4 passes successives pour atteindre très exactement la taille souhaitée.

### 2. Zéro fuite d'images confidentielles

De nombreux services commerciaux obligent à coller des URL ou à téléverser vos clichés. En conservant tout en local, vous pouvez coller directement des documents sensibles depuis votre presse-papiers (`Ctrl+V`) sans risquer qu'ils ne soient archivés sur des serveurs distants.

## Avantages économiques et éthiques

Penser les logiciels web pour une exécution locale crée un équilibre vertueux :

- **Aucun coût d'infrastructure de calcul** : Le traitement reposant sur le processeur de l'utilisateur, LadeStack ne paie pas de clusters de serveurs ni de factures astronomiques de bande passante. Cela permet de proposer des outils entièrement gratuits et pérennes.
- **Une confidentialité garantie par les faits** : Nous n'avons pas besoin de rédiger une charte de 40 pages promettant que nous ne regardons pas vos documents. Notre architecture rend toute consultation physiquement et techniquement impossible.
- **Utilisation hors ligne** : Les fichiers de code étant mis en cache dans le navigateur, les outils restent utilisables en déplacement, même sans connexion Internet.

La protection de la vie privée ne devrait pas être une option de luxe vendue sous forme d'abonnement pour grandes entreprises. En s'appuyant sur la puissance réelle des navigateurs web, nous pouvons concevoir des utilitaires plus véloces, plus économiques et infiniment plus sûrs pour tout le monde.

