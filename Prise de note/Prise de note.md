# Introduction

1 way = 10^17 ETH

La blockchain est une technologie de registre distribué et décentralisé, utilisée pour stocker et valider des transactions de manière transparente, sécurisée et immuable. Chaque transaction est enregistrée dans un bloc qui est connecté de manière chronologique à un réseau de blocs, formant ainsi une chaîne de blocs ou "blockchain". Les blocs sont sécurisés par des algorithmes de cryptographie et le consensus est atteint par un processus de validation par les pairs (peer-to-peer).

La blockchain ets une bdd décentralisé et sécurisé qui permet de stocker et partager des informations.

La blockChain fonctionne en P2P (Perre to Peer). C'est à dire que l'information n'est pas centralisé.

![[Pasted image 20230502092735.png]]

Les information stockées sur els blockChaines sont transparente. Disponnible à la lecture mais non disponnible à l'écriture.

L'information stocké est immuable.

Chaque fois que nous interragissons avec la BC, nous réalisons des transactions.

Chaque Transaction sont horodaté et possède un Id.

### Noeuds

**ABI** : L'interface binaire d'application de contrat (ABI) est **le moyen standard d'interagir avec les contrats dans l'écosystème Ethereum, à la fois depuis l'extérieur de la blockchain et pour l'interaction entre les contrats**. de l'extérieur de la blockchain que pour l'interaction entre contrats.
- Json

**INFURA** : Propose des noeuds sur la blocChaine privé et sécurisé.

Avoir son noeud privé est + efficace.

## Consensus 

La validation des blocks ce fait par un mécanisme de consensus.
	POW : Proof of work
	POS : Proof of stake

**POW** : Un système de validation par preuve de travail est un mecanisme utilisé par Bitcoin. Il consiste à résoudre des problèmes mathématiques complexes pour valider des transactions et créeer de nouveaux blocs.
	Ceux qui résolvent les problèmes sont appelés *mineurs*, le 1er mineur qui résoud le problème ets rémunéré en bitcoin.
Ce mécanisme est très couteux en énergie et en puissance de calcule mais offre l'avantage d'être sécurisé.

![[Pasted image 20230502100939.png]]

**POS** : La preuve d'enjeu, utilise par la blockchain Ethereum et consiste 
![[Pasted image 20230502100859.png]]

## Language de programmation utilisé : 
- RUST
- SOLIDITY

**Rust** est un langage de programmation système créé par Mozilla. Il est conçu pour être sûr, rapide et concurrent. Rust est un langage de programmation de bas niveau qui fournit un contrôle précis sur la mémoire, ce qui permet d'éviter les erreurs de segmentation, les fuites de mémoire et les problèmes de sécurité courants dans d'autres langages. Rust est également conçu pour prendre en charge la programmation concurrente et parallèle, ce qui en fait un choix populaire pour les applications de traitement distribué et les infrastructures cloud. En outre, Rust possède une communauté active et un écosystème de bibliothèques en constante expansion, ce qui facilite le développement de logiciels robustes et performants.

**Solidity** est un langage de programmation utilisé pour écrire des contrats intelligents (smart contracts) sur la blockchain Ethereum. Les contrats intelligents sont des programmes informatiques auto-exécutables qui sont stockés sur la blockchain Ethereum et exécutés automatiquement lorsque certaines conditions sont remplies.
Solidity est un langage de haut niveau qui ressemble à JavaScript et C++, mais qui a été conçu spécifiquement pour la blockchain. Il est utilisé pour écrire des contrats intelligents qui contrôlent la distribution de la cryptomonnaie, l'exécution d'applications décentralisées et la mise en œuvre de processus commerciaux complexes.
Solidity est un langage de type statique qui prend en charge les types de données complexes, les fonctions récursives, les héritages de contrat et les bibliothèques externes. Il est également doté d'un système de sécurité robuste qui permet de protéger les contrats contre les attaques de type piratage et de garantir leur exécution sans erreur sur la blockchain Ethereum.

## Domaines d'application

La blockChain ets utilisé dans plusieurs domaines :
- Cryptomonnaie
- Finance
- Santé
- Logistique
- Immobilier

## Type de Wallet

### Wallet Chaud
- Metamask

Wallet Froid
- Clef usb


