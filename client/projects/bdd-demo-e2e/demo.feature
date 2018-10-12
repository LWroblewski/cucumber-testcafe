@sample
Feature: Authentication

  <h2>Test d'authentification</h2>
  <p>L'utilisateur se connecte à l'application et a accès à ses fonctionnalités</p>

  Scenario Outline: User login

    When Je clique sur le bouton Icône "Connexion"
    Then Je devrais voir apparaître la modale "Authentification"

    When Je saisis la valeur "<login>" dans le champ de saisie "Login"
    And Je saisis la valeur "<password>" dans le champ de saisie "Mot de passe"
    And Je clique sur le bouton "Connexion"
    Then Je devrais naviguer sur la page "Liste des marchés"

    Examples:
    | login | password |
    | spongeBob | 1234 |