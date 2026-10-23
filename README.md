# Suivi boursier n8n

Workflow n8n de suivi quotidien et hebdomadaire des cours, accompagné de trois skills Codex.

## Aperçu du workflow

Le workflow suit les cours chaque jour après la clôture, conserve les observations dans un historique et envoie un bilan quotidien généré avec Gemini. Un second parcours prépare et envoie un récapitulatif hebdomadaire.

![Aperçu du workflow de suivi boursier dans n8n](media/workflow-preview.png)

## Contenu

- `workflows/suivi-boursier.json` : export du workflow, avec une note explicative intégrée.
- `skills/interview/SKILL.md` : clarifier rapidement un besoin et proposer des améliorations utiles.
- `skills/doubt-driven-dev/SKILL.md` : vérifier les hypothèses, outils et résultats pendant le travail.
- `skills/hostile-review/SKILL.md` : chercher activement les défauts d’un résultat livré.
- `media/workflow-preview.png` : capture d’écran du workflow dans n8n.
- `media/` : emplacement prévu pour la vidéo de présentation.

## Importer le workflow

Dans n8n, utiliser l’import de workflow et sélectionner `workflows/suivi-boursier.json`. L’export est volontairement inactif. Après import, reconnecter les credentials Gemini et Gmail, remplacer `EMAIL_A_REMPLACER` par l’adresse voulue dans les deux nœuds Gmail, puis tester le workflow avant de l’activer.

## Données retirées de l’export

Pour partager ce dépôt publiquement, les adresses e-mail personnelles et les références aux credentials de l’instance ont été retirées. Les secrets ne sont pas inclus dans un export n8n. Le workflow importé demandera donc de reconfigurer les credentials et le destinataire Gmail.

Aucun fichier vidéo n’a encore été ajouté.
