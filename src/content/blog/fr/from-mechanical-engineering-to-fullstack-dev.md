---
title: "Du génie mécanique au développement full-stack : ce que les systèmes physiques m'ont appris du code"
description: "Comment ma formation en génie mécanique, tolérances d'usinage et contraintes physiques à Fabtech et SVERI a forgé ma vision de l'architecture logicielle et de l'ergonomie web."
pubDate: "2026-10-18"
readingTime: 6
category: "Parcours · Pensée Systémique"
slug: "from-mechanical-engineering-to-fullstack-dev"
lang: "fr"
---

Mon apprentissage technique n'a pas commencé avec des frameworks JavaScript ni des modèles de bases de données. En 2018, j'étais dans les ateliers du Fabtech Technical Campus, pied à coulisse et micromètre en main, à mesurer des pièces d'acier avec une précision de quelques centièmes de millimètre. Plus tard, pendant mes études d'ingénierie mécanique au SVERI College of Engineering de Pandharpur, mon quotidien était rythmé par la thermodynamique, la mécanique des fluides et le calcul de résistance des matériaux.

À cette époque, le génie mécanique et l'ingénierie logicielle semblaient être deux univers irréconciliables. L'un manipulait la matière brute, le frottement, la chaleur et les engrenages ; l'autre traitait des fichiers texte, la mémoire virtuelle et l'arbre DOM d'un navigateur.

Pourtant, en me tournant vers le développement full-stack et le design d'interface (UI/UX), j'ai vite compris une vérité essentielle : la mécanique m'avait inculqué la compétence la plus précieuse en informatique : **la pensée systémique sous contraintes physiques réelles**.

## Tolérances d'usinage et gestion d'état

Dans un atelier d'usinage, la perfection mathématique n'existe pas. Pour ajuster un axe de 25,00 mm dans un roulement de 25,02 mm, vous devez impérativement fixer un intervalle de tolérance : par exemple +0,01 mm / -0,00 mm. Si l'artisan retire trop d'acier, l'ensemble prend du jeu et s'endommage sous la charge. S'il n'en retire pas assez, le mécanisme se grippe sous l'effet de la dilatation.

En concevant des applications web avec TypeScript et React, j'ai retrouvé exactement ce principe. En programmation, les « tolérances » sont vos types, vos schémas de validation et les bornes de vos machines à états :

- Si une API renvoie `null` au lieu d'un tableau attendu, votre interface affiche-t-elle un état vide élégant ou l'écran plante-t-il lamentablement ?
- Si un utilisateur saisit un caractère inattendu ou clique deux fois de suite sur un bouton en moins de 100 millisecondes, votre code absorbe-t-il la vibration ou corrompt-il les données ?

L'esprit mécanique m'a appris à ne jamais coder uniquement pour le scénario idéal. Dans le monde physique, les pièces chauffent, se dilatent et vibrent. Sur le web, les réseaux coupent, les serveurs ralentissent et les utilisateurs font des actions imprévues. Penser aux cas limites n'est pas de la paranoïa : c'est le socle élémentaire de tout travail d'ingénieur.

## Concentration de contraintes et goulots d'étranglement

En résistance des matériaux, on étudie très tôt la **concentration de contraintes**. Si vous taillez une entaille à angle droit dans une poutre en acier soumise à une traction, les lignes de force s'accumulent précisément sur cette arête vive, multipliant l'effort interne jusqu'à provoquer une rupture par fatigue. Un bon concepteur adoucit toujours l'angle avec un congé de raccordement pour diffuser harmonieusement les forces.

Le web connaît les mêmes concentrations d'efforts, et elles se situent presque toujours sur le fil d'exécution principal (main thread) du navigateur :

```text
[Fil Principal] -> Analyse Lourde -> Mutation DOM Synchrone -> Reflow Forcé -> Saccades Visuelles
```

Lors de la création de **LS PDF** et **LS Image Compressor**, traiter des fichiers de plusieurs mégaoctets sur le fil principal revenait à entailler brutalement une pièce métallique : le navigateur figeait, les clics n'étaient plus pris en compte et la page devenait instable.

Adoucir cette contrainte a consisté à répartir l'effort de calcul :
1. Dégager les traitements lourds hors du fil d'affichage grâce aux **Web Workers**.
2. Fractionner les boucles synchrones à l'aide de `requestIdleCallback` ou de générateurs asynchrones.
3. Exploiter les tableaux typés (`Uint8Array`) pour soulager le ramasse-miettes lors de la manipulation de fichiers binaires volumineux.

Prendre conscience que les cycles processeur et le temps d'affichage par image sont des grandeurs finies transforme l'optimisation web en une véritable science.

## Assemblages mécaniques et architecture logicielle

Lorsqu'on conçoit une transmission mécanique, on ne sculpte jamais un boîtier d'un seul bloc massif. On assemble des composants autonomes — pignons, arbres, cales, roulements et joints —, chacun doté de points de fixation précis et de tolérances strictes. Si une dent casse, on remplace le pignon, pas l'ensemble de la machine.

J'applique exactement cette rigueur dans mes architectures web, que ce soit pour **LadeStack** ou pour ce portfolio multilingue réalisé avec Astro :

- **Frontières étanches** : Un composant ne doit connaître que le strict nécessaire à son rôle. Propager un état global incontrôlé revient à souder un roulement directement sur son arbre.
- **Modularité saine** : Une fonction ou un bloc d'interface doit pouvoir être remplacé sans déstabiliser le reste du système.
- **Simplicité de maintenance** : Les machines les plus fiables se réparent avec des clés plates ordinaires. Le meilleur code est celui qu'un collègue peut relire et corriger six mois plus tard sans difficulté.

## Réconcilier la rigueur technique et le design

On oppose souvent l'ingénierie et le design d'interface : la première serait rigide et froide, le second subjectif et décoratif. C'est une erreur de perspective.

Un bon design n'est que de l'ingénierie pensée à l'échelle des sens humains. De même qu'un tour mécanique exige des leviers de sécurité accessibles, des graduations visibles et des poignées ergonomiques, une application numérique exige une hiérarchie typographique limpide, une prise en charge exemplaire du clavier, des options par défaut équilibrées et des messages d'erreur sans ambiguïté.

Partir des ateliers de Pandharpur pour concevoir des produits web à Pune m'a confirmé une certitude : la matière change, mais l'exigence reste la même. Il faut comprendre son environnement, respecter les lois de sa plateforme, éliminer les frictions inutiles et fabriquer des outils sur lesquels les gens peuvent compter sans hésiter.

