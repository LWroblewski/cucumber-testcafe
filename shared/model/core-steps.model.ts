export enum STEPS {
  GIVEN_ON_PAGE             = 'Je suis sur la page "(.*?)"',
  GOTO_HOME                 = 'Je me rends sur la page home',
  GOTO_PAGE                 = 'Je me rends sur la page "(.*?)"',

  BACK_BROWSER              = 'Je fais un back navigateur',

  CLICK_BTN                 = 'Je clique sur le bouton "(.*?)"',
  CLICK_PRIMARY_BTN         = 'Je clique sur le bouton primaire',
  CLICK_SECONDARY_BTN       = 'Je clique sur le bouton secondaire',
  CLICK_BTN_ICON            = 'Je clique sur le bouton Icône "(.*?)"',

  SET_INPUT_VALUE           = 'Je saisis la valeur "(.*?)" dans le champ de saisie "(.*?)"',
  SET_INPUT_VALUE_INDEX     = 'Je saisis la valeur "(.*?)" dans le champ de saisie n°(\d+)',
  SET_EMAIL                 = 'Je saisis le mail "(.*?)"',
  SET_PHONE                 = 'Je saisis le numéro de téléphone "(\d+)"',
  SET_BIRTH_DATE            = 'Je saisis la date de naissance "(.*?)"',
  SELECT_LIST_OPTION        = 'Je sélectionne l\'option "(.*?)" de la liste déroulante',
  SELECT_RADIO_BUTTON       = 'Je sélectionne le radio button "(.*?)"',

  WAIT                      = 'J\'attends (\\d+) secondes',

  SHOULD_GO_TO_URL          = 'Je devrais naviguer sur la page d\'url "(.*?)"',
  SHOULD_GO_TO_PAGE         = 'Je devrais naviguer sur la page "(.*?)"',
  SHOULD_GO_TO_MODAL        = 'Je devrais voir apparaître la modale "(.*?)"',
  SHOULD_INPUT_HAS_VALUE    = 'Le champ de saisie n°(\d+) devrait contenir la valeur "(.*?)"',
  SHOULD_MAIN_BTN_ENABLED   = 'Le bouton de validation principal devrait être (disabled|enabled)',
  SHOULD_SHOW_ERROR         = 'Je devrais voir cette erreur: "(.*?)"',
  SHOULD_SHOW_WARNING       = 'Je devrais voir ce warning: "(.*?)"',
  SHOULD_SEE_BTNS           = 'Je devrais voir les boutons suivantes:',
  SHOULD_SEE_BTN            = 'Je devrais voir le champ de saisie "(.*?)"',
  SHOULD_SEE_SELECT         = 'Je devrais voir une liste de suggestions',
  SHOULD_SEE_OPTION         = 'Je devrais voir la suggestion "(.*?)"'
}
