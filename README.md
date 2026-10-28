# Radar Vinted · n8n

Projet de **Mehdi Farhat** : surveiller Vinted toutes les **2 minutes** et envoyer les nouvelles annonces sélectionnées sur le serveur Discord **Bot Vinted new**, avec une estimation Gemini.

![Workflow Radar Vinted avec fourchette de prix Gemini](https://raw.githubusercontent.com/farhatmehdi2005-droid/Mehdi-Farhat/6d205c0c3c8a3ccdd81f9fd5135c0845c974e24e/capture-radar.png)

*Capture du workflow actuel fournie le 27 octobre 2026, avec le bloc d’estimation de prix Gemini.*

## Fonctionnement

1. Collecter les annonces des recherches de saison sur Vinted.
2. Initialiser la mémoire sans envoyer les annonces déjà présentes, puis écarter les articles connus.
3. Filtrer prix (2–50 €), taille adulte (S/M/L/XL) et état ; classer et conserver **5 articles maximum** par passage.
4. Utiliser **Gemini natif `gemini-flash-lite-latest`**, avec **Google Search désactivé** : fourchette indicative de revente uniquement. Le prompt est du **texte HTML écrit directement dans le champ message du nœud Gemini**, avec trois exemples de prix ; aucun appel à une fonction de prompt.
5. Envoyer dans le salon de marque puis `#toutes-les-annonces`, avec le lien Acheter sur Vinted. Mémoriser après les deux envois réussis.

**Aucun nœud Code** : 36 nœuds de traitement et 5 sticky notes. Discord et Gemini sont natifs ; un HTTP Request reste nécessaire pour lire le catalogue public Vinted.

## Un seul fichier de workflow

[`radar_vinted.workflow.ts`](radar_vinted.workflow.ts) contient toute la définition : recherches, filtres, prompt HTML, mémoire, connexions et notes. Les paramètres communs et profils de saison sont factorisés. Le TypeScript construit le workflow ; il ne s’exécute pas comme un nœud Code dans n8n.

Le fichier passe de **1 026 à 322 lignes** environ. Réduire les nœuds et réduire le fichier source sont deux choses différentes : les paramètres, les recherches et les instructions Gemini doivent toujours être conservés.

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

Un aperçu n8n a préparé **5 messages avec succès, sans envoi Discord ni écriture mémoire**. Le premier article, affiché à 40 €, a reçu une fourchette indicative de 15–30 € avant frais ; les réponses peuvent varier.

La définition factorisée a été compilée et comparée à l’export n8n : mêmes nœuds, paramètres et connexions ; configurations de saison vérifiées sur les 12 mois. La version comporte un seul Gemini natif pour les prix, sans analyse photo.

Les comparables sont des **prix demandés**, pas des ventes conclues. Le workflow ne consulte pas automatiquement chaque page détaillée. Sans informations suffisantes, Gemini peut ne pas donner de prix. En cas d’erreur Gemini, l’alerte indique que l’estimation est indisponible.

La collecte dépend de l’accès public et du HTML de Vinted. Si le second envoi Discord échoue après le premier, une relance peut répéter le premier message.
