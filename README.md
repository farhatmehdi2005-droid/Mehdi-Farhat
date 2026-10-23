# Suivi boursier avec n8n

Ce dépôt contient un workflow n8n qui suit quatre valeurs, conserve les cours dans une table n8n et envoie des bilans par Gmail. Gemini rédige une courte synthèse à partir des données calculées par le workflow.

Valeurs suivies : Schneider Electric (`SU.PA`), Air Liquide (`AI.PA`), Dassault Systèmes (`DSY.PA`) et l’ETF MSCI World Islamic (`IUSD.DE`). Les cours proviennent de Yahoo Finance.

## Fonctionnement

- **Du lundi au vendredi à 18 h 15 (heure de Paris)** : le workflow récupère les cours, conserve les données valides dans la table `Historique_Bourse_v1`, prépare le bilan quotidien et l’envoie par Gmail.
- **Le vendredi à 18 h 45** : il compare le premier et le dernier cours enregistré depuis le lundi, demande une synthèse hebdomadaire à Gemini, puis envoie le récapitulatif par Gmail.

Le bilan hebdomadaire dépend de l’historique enregistré par les exécutions quotidiennes. S’il y a moins de deux cours dans la semaine pour une valeur, le courriel indique que l’historique est insuffisant.

![Aperçu du workflow de suivi boursier dans n8n](media/Workflow.png)

## Fichiers

- `workflows/suivi-boursier.workflow.ts` : définition TypeScript du workflow.
- `media/Workflow.png` : aperçu du workflow.
- `skills/interview/SKILL.md` : clarifier un besoin avant d’améliorer un projet.
- `skills/doubt-driven-dev/SKILL.md` : vérifier les hypothèses et les résultats.






