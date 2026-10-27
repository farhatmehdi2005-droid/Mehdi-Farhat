# Radar Vinted · n8n

Projet de **Mehdi Farhat** : surveiller Vinted toutes les **2 minutes** et envoyer les nouvelles annonces sélectionnées sur le serveur Discord **Bot Vinted new**, avec une estimation Gemini.

![Workflow Vinted — capture fournie avant ajout de Gemini](https://raw.githubusercontent.com/farhatmehdi2005-droid/Mehdi-Farhat/eee9f9f5a8ee88a4e10d464614c3a9736c5277e7/radar-vinted.png)

*Capture fournie du radar compact, avant ajout du bloc Gemini. Elle est référencée depuis un commit existant afin de garder le README, le fichier TypeScript et le dossier `skills` dans le dépôt.*

## Fonctionnement

1. Collecter les annonces des recherches de saison sur Vinted.
2. Initialiser la mémoire sans envoyer les annonces déjà présentes, puis écarter les articles connus.
3. Filtrer prix (2–50 €), taille adulte (S/M/L/XL) et état ; classer et conserver **5 articles maximum** par passage.
4. Utiliser **Gemini natif `gemini-flash-lite-latest`**, avec **Google Search désactivé** : photo si disponible, fourchette indicative de revente et indices visuels d’authenticité. Le prompt HTML et ses trois exemples sont intégrés au fichier TypeScript.
5. Envoyer dans le salon de marque puis `#toutes-les-annonces`, avec le lien Acheter sur Vinted. Mémoriser après les deux envois réussis.

**Aucun nœud Code** : 38 nœuds de traitement et 5 sticky notes. Discord et Gemini sont natifs ; un HTTP Request reste nécessaire pour lire le catalogue public Vinted.

## Un seul fichier de workflow

[`radar_vinted.workflow.ts`](radar_vinted.workflow.ts) contient toute la définition : recherches, filtres, prompt HTML, mémoire, connexions et notes. Les paramètres communs et profils de saison sont factorisés. Le TypeScript construit le workflow ; il ne s’exécute pas comme un nœud Code dans n8n.

Le fichier passe de **1 026 à 358 lignes** environ. Réduire les nœuds et réduire le fichier source sont deux choses différentes : les paramètres, les recherches et les instructions Gemini doivent toujours être conservés.

## Importer dans n8n

Avec Node.js **22.18+**, dans le dossier contenant `radar_vinted.workflow.ts` :

```sh
npm install --no-save @n8n/workflow-sdk@0.38.1
node --input-type=module -e "import w from './radar_vinted.workflow.ts'; console.log(JSON.stringify(w.toJSON(), null, 2))" > workflow.json
```

Importer le JSON généré dans n8n, puis :

- Créer la table **`Memoire_Radar_Vinted`**, colonnes texte **`cle`** et **`profil`**, et la sélectionner dans les nœuds de mémoire.
- Sélectionner les identifiants **Discord Bot API** et **Google Gemini (PaLM) API** dans leurs nœuds respectifs. **Aucun token n’est inclus** dans le fichier.
- Adapter les salons Discord et les recherches si nécessaire.
- Tester **Aperçu fictif sans envoi** avant publication : il appelle Gemini mais ne publie pas sur Discord et n’écrit pas dans la mémoire.

## Vérifications et limites

Les deux branches Gemini ont été testées dans n8n sur cinq aperçus sans envoi Discord. Sur un sweat Nike photographié affiché à 40 €, Gemini a proposé 25–40 € avant frais, avec une authenticité indéterminée. La version factorisée conserve les mêmes nœuds, paramètres et connexions ; les configurations de saison ont été comparées sur les 12 mois.

Les comparables sont des **prix demandés**, pas des ventes conclues. Le workflow ne consulte pas automatiquement chaque page détaillée et ne certifie pas l’authenticité. Sans informations suffisantes, Gemini peut ne pas donner de prix. En cas d’erreur Gemini, l’alerte indique que l’analyse est indisponible.

La collecte dépend de l’accès public et du HTML de Vinted. Si le second envoi Discord échoue après le premier, une relance peut répéter le premier message.
