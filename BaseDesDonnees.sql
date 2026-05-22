-- =============================================================================
-- BASE DE DONNÉES — SIH CHU Andrainjato Fianarantsoa
-- Module : Gestion Patients Bloc Opératoire
-- Version : 1.0 — Mai 2026
-- Moteur : PostgreSQL 15+
-- ORM cible : Prisma (NestJS)
-- =============================================================================

-- Extension UUID obligatoire
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- SECTION 1 — TYPES ÉNUMÉRÉS (ENUM)
-- =============================================================================

CREATE TYPE "Sexe" AS ENUM (
  'MASCULIN',
  'FEMININ',
  'AUTRE'
);

CREATE TYPE "StatutPatient" AS ENUM (
  'ACTIF',
  'HOSPITALISE',
  'SORTI',
  'DECEDE',
  'TRANSFERE'
);

CREATE TYPE "NiveauUrgence" AS ENUM (
  'STAT',
  'URGENTE',
  'NORMALE'
);

CREATE TYPE "StatutRDV" AS ENUM (
  'PLANIFIE',
  'CONFIRME',
  'EN_COURS',
  'TERMINE',
  'ANNULE',
  'REPORTE'
);

CREATE TYPE "TypeRDV" AS ENUM (
  'CPA',
  'VPA',
  'BLOC',
  'SUIVI_POSTOP'
);

CREATE TYPE "ScoreASA" AS ENUM (
  'ASA_1',
  'ASA_2',
  'ASA_3',
  'ASA_4',
  'ASA_5',
  'ASA_6',
  'ASA_E'
);

CREATE TYPE "TypeAnesthesie" AS ENUM (
  'GENERALE',
  'LOCO_REGIONALE',
  'RACHIANESTHESIE',
  'PERIDURALE',
  'SEDATION',
  'LOCALE'
);

CREATE TYPE "StatutOperation" AS ENUM (
  'PROGRAMMEE',
  'EN_COURS',
  'TERMINEE_SUCCES',
  'TERMINEE_COMPLICATION',
  'ANNULEE',
  'REPORTEE'
);

CREATE TYPE "StatutSalleReveil" AS ENUM (
  'EN_SURVEILLANCE',
  'APTE_SORTIE',
  'SORTI',
  'TRANSFERE_USI'
);

CREATE TYPE "StatutChecklist" AS ENUM (
  'NON_COMMENCEE',
  'EN_COURS',
  'VALIDEE',
  'REJETEE'
);

CREATE TYPE "PhaseChecklist" AS ENUM (
  'AVANT_INDUCTION',
  'AVANT_INCISION',
  'SORTIE_BLOC'
);

CREATE TYPE "TypeDrainage" AS ENUM (
  'SONDE_NASO_GASTRIQUE',
  'DRAIN_CRANE',
  'DRAIN_THORAX',
  'DRAIN_ABDOMEN_GAUCHE',
  'DRAIN_ABDOMEN_DROIT',
  'SONDE_URINAIRE',
  'REDON'
);

CREATE TYPE "ModeDrainage" AS ENUM (
  'SIPHON',
  'ASPIRATION',
  'REDON',
  'SANS'
);

CREATE TYPE "RoleEquipe" AS ENUM (
  'CHIRURGIEN_PRINCIPAL',
  'CHIRURGIEN_ASSISTANT',
  'ANESTHESISTE',
  'INFIRMIER_ANESTHESISTE',
  'INFIRMIER_INSTRUMENTISTE',
  'INFIRMIER_CIRCULANT',
  'AIDE_SOIGNANT',
  'TECHNICIEN_BIOMEDICAL',
  'RADIOLOGUE',
  'AUTRE'
);

CREATE TYPE "TypeVentilation" AS ENUM (
  'SPONTANEE',
  'ASSISTEE',
  'CONTROLEE',
  'PEEP',
  'CIRCUIT_FERME',
  'INTUBATION_OT',
  'MASQUE_LARYNGE',
  'SONDE_ARMEE'
);

CREATE TYPE "StatutPatientReveil" AS ENUM (
  'CALME',
  'DETENDU',
  'ANXIEUX',
  'AGITE'
);

CREATE TYPE "TypePrescription" AS ENUM (
  'ANTIBIOTIQUE',
  'ANTALGIQUE',
  'ANTICOAGULANT',
  'CORTICOIDE',
  'ANTIEMETIQUE',
  'AUTRE'
);

CREATE TYPE "VoieAdministration" AS ENUM (
  'ORALE',
  'IV_DIRECT',
  'IV_LENTE',
  'IM',
  'SC',
  'TOPIQUE',
  'RECTALE',
  'SUBLINGUALE'
);

CREATE TYPE "StatutArchive" AS ENUM (
  'BROUILLON',
  'VALIDE',
  'ARCHIVE',
  'SIGNE'
);

CREATE TYPE "OrdreProfessionnel" AS ENUM (
  'ONM',
  'ONIM',
  'ONSFM',
  'ONPM',
  'AUTRE'
);

CREATE TYPE "RoleUtilisateur" AS ENUM (
  'CHIRURGIEN',
  'ANESTHESISTE',
  'INFIRMIER',
  'AIDE_SOIGNANT',
  'TECHNICIEN',
  'ADMIN',
  'DIRECTEUR_MEDICAL'
);

-- =============================================================================
-- SECTION 2 — TABLES PRINCIPALES
-- Ordre de création respectant les dépendances FK
-- =============================================================================

-- -----------------------------------------------------------------------------
-- TABLE 1 : utilisateurs
-- Correspond au modèle Prisma : Utilisateur
-- -----------------------------------------------------------------------------
CREATE TABLE utilisateurs (
  id                    UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  matricule             VARCHAR(50)   UNIQUE,
  nom                   VARCHAR(100)  NOT NULL,
  prenom                VARCHAR(100)  NOT NULL,
  email                 VARCHAR(255)  NOT NULL UNIQUE,
  telephone             VARCHAR(20),
  mot_de_passe_hash     TEXT          NOT NULL,
  role                  "RoleUtilisateur" NOT NULL,
  specialite            VARCHAR(100),
  ordre_professionnel   "OrdreProfessionnel",
  numero_ordre          VARCHAR(100),
  signature_numerique   TEXT,
  actif                 BOOLEAN       NOT NULL DEFAULT TRUE,
  created_at            TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE utilisateurs IS 'Personnel médical et administratif du bloc opératoire';
COMMENT ON COLUMN utilisateurs.numero_ordre IS 'Numéro inscription Ordre professionnel — obligatoire pour signature (R-011)';
COMMENT ON COLUMN utilisateurs.signature_numerique IS 'Clé de signature numérique horodatée — traçabilité 10 ans (R-012)';

-- -----------------------------------------------------------------------------
-- TABLE 2 : patients
-- Correspond au modèle Prisma : Patient
-- -----------------------------------------------------------------------------
CREATE TABLE patients (
  id                UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  id_permanent      VARCHAR(30)   NOT NULL UNIQUE,  -- ex: PAT-2024-00001
  nom               VARCHAR(100)  NOT NULL,
  prenom            VARCHAR(100)  NOT NULL,
  date_naissance    DATE          NOT NULL,
  sexe              "Sexe"        NOT NULL,
  telephone         VARCHAR(20),
  adresse           TEXT,
  groupe_sanguin    VARCHAR(5),
  allergies_connues TEXT,
  antecedents_med   TEXT,
  statut            "StatutPatient" NOT NULL DEFAULT 'ACTIF',
  created_at        TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE patients IS 'Dossier patient unique et permanent — identifiant pérenne';
COMMENT ON COLUMN patients.id_permanent IS 'ID unique permanent ex: PAT-2024-00001 — jamais réattribué';

-- -----------------------------------------------------------------------------
-- TABLE 3 : dossiers_bloc_operatoire
-- Correspond au modèle Prisma : DossierBlocOperatoire
-- Conteneur global par épisode chirurgical
-- -----------------------------------------------------------------------------
CREATE TABLE dossiers_bloc_operatoire (
  id                UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  id_dossier        VARCHAR(30)   NOT NULL UNIQUE,  -- ex: SURG-2024-8842
  patient_id        UUID          NOT NULL REFERENCES patients(id),
  date_creation     TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  date_intervention TIMESTAMPTZ,
  motif             TEXT          NOT NULL,
  niveau_urgence    "NiveauUrgence" NOT NULL DEFAULT 'NORMALE',
  statut            VARCHAR(20)   NOT NULL DEFAULT 'OUVERT',
  notes             TEXT,
  updated_at        TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE dossiers_bloc_operatoire IS 'Conteneur global par épisode — regroupe CPA→VPA→OP→RÉVEIL→ARCHIVE';
COMMENT ON COLUMN dossiers_bloc_operatoire.id_dossier IS 'ex: SURG-2024-8842';

-- -----------------------------------------------------------------------------
-- TABLE 4 : rendez_vous
-- Correspond au modèle Prisma : RendezVous
-- -----------------------------------------------------------------------------
CREATE TABLE rendez_vous (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id      UUID          NOT NULL REFERENCES patients(id),
  dossier_id      UUID          REFERENCES dossiers_bloc_operatoire(id),
  type            "TypeRDV"     NOT NULL,
  date_heure      TIMESTAMPTZ   NOT NULL,
  duree_estimee_min INT,
  niveau_urgence  "NiveauUrgence" NOT NULL DEFAULT 'NORMALE',
  statut          "StatutRDV"   NOT NULL DEFAULT 'PLANIFIE',
  motif           TEXT,
  notes           TEXT,
  gestionnaire_id UUID          REFERENCES utilisateurs(id),
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE rendez_vous IS 'Types : CPA, VPA, BLOC, SUIVI_POSTOP. Niveaux STAT > URGENTE > NORMALE';

-- =============================================================================
-- SECTION 3 — MODULE CPA (Consultation Pré-Anesthésique)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- TABLE 5 : consultations_cpa
-- Correspond au modèle Prisma : ConsultationCPA
-- Prérequis obligatoire avant VPA (R-CPA-VPA du cahier des charges)
-- -----------------------------------------------------------------------------
CREATE TABLE consultations_cpa (
  id                          UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  id_cpa                      VARCHAR(30)   NOT NULL UNIQUE,  -- ex: CPA-2024-00112
  patient_id                  UUID          NOT NULL REFERENCES patients(id),
  dossier_id                  UUID          NOT NULL UNIQUE REFERENCES dossiers_bloc_operatoire(id),
  anesthesiste_id             UUID          NOT NULL REFERENCES utilisateurs(id),
  date_cpa                    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),

  -- Antécédents anesthésiques
  antecedents_anesthesie      BOOLEAN       NOT NULL DEFAULT FALSE,
  notes_incidents             TEXT,

  -- Score ASA
  score_asa                   "ScoreASA",

  -- Constantes vitales
  frequence_cardiaque         INTEGER,      -- BPM
  tension_art_systolique      INTEGER,      -- mmHg
  tension_art_diastolique     INTEGER,      -- mmHg
  taille                      NUMERIC(5,1), -- cm
  poids                       NUMERIC(5,1), -- kg
  imc                         NUMERIC(4,1), -- calculé

  -- Examen systémique
  exam_cardio_vasculaire      TEXT,
  exam_pulmonaire             TEXT,
  exam_neurologique           TEXT,
  coloration_conjonctivale    VARCHAR(50),
  abords_veineux              TEXT,
  rachis                      TEXT,

  -- Voies aériennes (Mallampati)
  score_mallampati            INTEGER CHECK (score_mallampati BETWEEN 1 AND 4),
  ouverture_buccale_cm        NUMERIC(3,1),
  distance_mento_cm           NUMERIC(3,1),
  etat_dents                  VARCHAR(100),
  tabac                       VARCHAR(50),
  alcool                      VARCHAR(50),

  -- Décision
  apte_anesthesie             BOOLEAN,
  date_maintenue              BOOLEAN,
  nouvelle_date               TIMESTAMPTZ,

  -- Protocole retenu
  type_anesthesie             "TypeAnesthesie",
  technique_intubation        VARCHAR(100),

  -- Instructions pré-op
  jejune_solides              TEXT,
  jejune_liquides             TEXT,
  preparation_physique        TEXT,
  taches_soignantes           TEXT,
  soins_infirmiers            TEXT,

  -- Date VPA planifiée
  date_vpa_planifiee          DATE,
  heure_vpa_planifiee         VARCHAR(5),

  -- Signature et statut
  statut                      "StatutArchive" NOT NULL DEFAULT 'BROUILLON',
  signature_anesthesiste      TEXT,
  date_signature              TIMESTAMPTZ,
  created_at                  TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at                  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE consultations_cpa IS 'CPA — Score ASA, Mallampati, protocole anesthésique, instructions pré-op';
COMMENT ON COLUMN consultations_cpa.score_mallampati IS '1=facile → 4=très difficile (intubation)';

-- -----------------------------------------------------------------------------
-- TABLE 6 : premedications
-- Correspond au modèle Prisma : Premedication
-- -----------------------------------------------------------------------------
CREATE TABLE premedications (
  id          UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  cpa_id      UUID          NOT NULL REFERENCES consultations_cpa(id) ON DELETE CASCADE,
  medicament  VARCHAR(100)  NOT NULL,
  dose        VARCHAR(50)   NOT NULL,
  voie_admin  VARCHAR(50)   NOT NULL,
  debut       VARCHAR(50),
  frequence   VARCHAR(50),
  created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE premedications IS 'Médicaments de prémédication prescrits lors de la CPA';

-- =============================================================================
-- SECTION 4 — MODULE VPA (Visite Pré-Anesthésique)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- TABLE 7 : visites_pre_anesthesique
-- Correspond au modèle Prisma : VisitePreAnesthesique
-- Planifiable UNIQUEMENT si CPA = REALISE (règle métier cahier des charges)
-- -----------------------------------------------------------------------------
CREATE TABLE visites_pre_anesthesique (
  id                          UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  id_vpa                      VARCHAR(30)   NOT NULL UNIQUE,  -- ex: VPA-2024-00088
  patient_id                  UUID          NOT NULL REFERENCES patients(id),
  dossier_id                  UUID          NOT NULL UNIQUE REFERENCES dossiers_bloc_operatoire(id),
  anesthesiste_id             UUID          NOT NULL REFERENCES utilisateurs(id),
  date_vpa                    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  heure_depart_bloc           VARCHAR(5),

  -- Vérifications sécurité
  identite_confirmee          BOOLEAN       NOT NULL DEFAULT FALSE,
  jejune_respecte             BOOLEAN       NOT NULL DEFAULT FALSE,
  instructions_respectees     BOOLEAN       NOT NULL DEFAULT FALSE,

  -- Prémédication
  premedication_faite         BOOLEAN       NOT NULL DEFAULT FALSE,
  notes_premedication         TEXT,

  -- Jeûne
  details_jejune              TEXT,
  preparation_physique        TEXT,

  -- Prescription induction
  prescription_induction      TEXT,

  -- Examens complémentaires
  examens_complementaires     TEXT,

  -- Statut et signature
  statut                      "StatutArchive" NOT NULL DEFAULT 'BROUILLON',
  signature_anesthesiste      TEXT,
  date_signature              TIMESTAMPTZ,
  created_at                  TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at                  TIMESTAMPTZ   NOT NULL DEFAULT NOW(),

  -- Contrainte : VPA planifiable uniquement si CPA du même dossier existe
  CONSTRAINT vpa_necessite_dossier CHECK (dossier_id IS NOT NULL)
);

COMMENT ON TABLE visites_pre_anesthesique IS 'VPA — planifiable uniquement après CPA validée. Vérifications identité, jeûne, instructions';

-- -----------------------------------------------------------------------------
-- TABLE 8 : commandes_sang
-- Correspond au modèle Prisma : CommandeSang
-- -----------------------------------------------------------------------------
CREATE TABLE commandes_sang (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  vpa_id          UUID          NOT NULL REFERENCES visites_pre_anesthesique(id) ON DELETE CASCADE,
  type_produit    VARCHAR(50)   NOT NULL, -- Sang total, Culot globulaire, Plasma, Phénotypé
  nombre_poches   INTEGER       NOT NULL DEFAULT 0 CHECK (nombre_poches >= 0),
  groupe_sanguin  VARCHAR(5),
  statut          VARCHAR(30)   NOT NULL DEFAULT 'COMMANDEE',
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE commandes_sang IS 'Commande sang pré-opératoire (lien module Banque de Sang)';

-- =============================================================================
-- SECTION 5 — CHECKLIST OMS (3 phases obligatoires et bloquantes)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- TABLE 9 : checklists_oms
-- Correspond au modèle Prisma : ChecklistOMS
-- Bloquante : aucune incision sans AVANT_INDUCTION validée
-- -----------------------------------------------------------------------------
CREATE TABLE checklists_oms (
  id              UUID              PRIMARY KEY DEFAULT gen_random_uuid(),
  id_checklist    VARCHAR(30)       NOT NULL UNIQUE,
  patient_id      UUID              NOT NULL REFERENCES patients(id),
  dossier_id      UUID              NOT NULL REFERENCES dossiers_bloc_operatoire(id),
  operation_id    UUID,             -- FK ajoutée après création de operations_chirurgicales
  phase           "PhaseChecklist"  NOT NULL,
  statut          "StatutChecklist" NOT NULL DEFAULT 'NON_COMMENCEE',
  validateur_id   UUID              REFERENCES utilisateurs(id),
  date_validation TIMESTAMPTZ,
  observations    TEXT,
  created_at      TIMESTAMPTZ       NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ       NOT NULL DEFAULT NOW(),

  UNIQUE (dossier_id, phase)
);

COMMENT ON TABLE checklists_oms IS '3 phases OMS bloquantes : AVANT_INDUCTION, AVANT_INCISION (Time Out), SORTIE_BLOC (Sign Out)';

-- -----------------------------------------------------------------------------
-- TABLE 10 : items_checklist
-- Correspond au modèle Prisma : ItemChecklist
-- -----------------------------------------------------------------------------
CREATE TABLE items_checklist (
  id            UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  checklist_id  UUID          NOT NULL REFERENCES checklists_oms(id) ON DELETE CASCADE,
  numero_item   INTEGER       NOT NULL,
  description   TEXT          NOT NULL,
  reponse       VARCHAR(5)    CHECK (reponse IN ('OUI','NON','N/A')),
  obligatoire   BOOLEAN       NOT NULL DEFAULT TRUE,
  notes         TEXT,

  UNIQUE (checklist_id, numero_item)
);

COMMENT ON TABLE items_checklist IS 'Items individuels OMS — réponse OUI / NON / N/A';

-- =============================================================================
-- SECTION 6 — OPÉRATION CHIRURGICALE (per-opératoire)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- TABLE 11 : operations_chirurgicales
-- Correspond au modèle Prisma : OperationChirurgicale
-- -----------------------------------------------------------------------------
CREATE TABLE operations_chirurgicales (
  id                        UUID              PRIMARY KEY DEFAULT gen_random_uuid(),
  id_operation              VARCHAR(30)       NOT NULL UNIQUE, -- ex: OP-8842-X
  dossier_id                UUID              NOT NULL UNIQUE REFERENCES dossiers_bloc_operatoire(id),
  patient_id                UUID              NOT NULL REFERENCES patients(id),
  chirurgien_principal_id   UUID              NOT NULL REFERENCES utilisateurs(id),
  chirurgien_assistant_id   UUID              REFERENCES utilisateurs(id),
  anesthesiste_id           UUID              NOT NULL REFERENCES utilisateurs(id),
  salle                     VARCHAR(20),
  date_operation            TIMESTAMPTZ       NOT NULL,
  heure_debut               VARCHAR(5),
  heure_fin                 VARCHAR(5),
  duree_minutes             INTEGER           CHECK (duree_minutes > 0),
  type_intervention         VARCHAR(200)      NOT NULL,
  code_acte                 VARCHAR(20),
  niveau_urgence            "NiveauUrgence"   NOT NULL DEFAULT 'NORMALE',
  statut                    "StatutOperation" NOT NULL DEFAULT 'PROGRAMMEE',
  observations_perop        TEXT,
  complications             TEXT,
  created_at                TIMESTAMPTZ       NOT NULL DEFAULT NOW(),
  updated_at                TIMESTAMPTZ       NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE operations_chirurgicales IS 'Intervention chirurgicale — lien vers équipe, surveillance, protocole post-op';

-- Maintenant on peut ajouter la FK de checklists_oms → operations_chirurgicales
ALTER TABLE checklists_oms
  ADD CONSTRAINT fk_checklist_operation
  FOREIGN KEY (operation_id) REFERENCES operations_chirurgicales(id);

-- -----------------------------------------------------------------------------
-- TABLE 12 : membres_equipe_operatoire
-- Correspond au modèle Prisma : MembreEquipeOperatoire
-- -----------------------------------------------------------------------------
CREATE TABLE membres_equipe_operatoire (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  operation_id    UUID          NOT NULL REFERENCES operations_chirurgicales(id) ON DELETE CASCADE,
  utilisateur_id  UUID          NOT NULL REFERENCES utilisateurs(id),
  role            "RoleEquipe"  NOT NULL,
  notes           TEXT,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),

  UNIQUE (operation_id, utilisateur_id, role)
);

COMMENT ON TABLE membres_equipe_operatoire IS 'Composition complète de l équipe pour chaque opération';

-- -----------------------------------------------------------------------------
-- TABLE 13 : surveillances_per_operatoire
-- Correspond au modèle Prisma : SurveillancePerOperatoire
-- ----------------------------------------------------------------------------
CREATE TABLE surveillances_per_operatoire (
  id                      UUID              PRIMARY KEY DEFAULT gen_random_uuid(),
  operation_id            UUID              NOT NULL UNIQUE REFERENCES operations_chirurgicales(id),

  -- Apports (Entrées)
  details_perfusions      TEXT,
  details_transfusions    TEXT,

  -- Sorties
  journal_sorties         TEXT,

  -- Ventilation
  intubation_ot           BOOLEAN           NOT NULL DEFAULT FALSE,
  notes_intubation        TEXT,
  s_armee                 BOOLEAN           NOT NULL DEFAULT FALSE,
  notes_s_armee           TEXT,
  m_larynge               BOOLEAN           NOT NULL DEFAULT FALSE,
  notes_masque_larynge    TEXT,
  type_ventilation        "TypeVentilation",

  -- Options ventilation
  vent_spontanee          TEXT,
  vent_assistee           TEXT,
  vent_controlee          TEXT,
  peep                    TEXT,
  circuit_ferme           TEXT,

  -- État patient à l'arrivée
  etat_arrivee            "StatutPatientReveil"[],  -- PostgreSQL array d'enum

  created_at              TIMESTAMPTZ       NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ       NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE surveillances_per_operatoire IS 'Surveillance per-op : apports, sorties, ventilation, état patient';

-- -----------------------------------------------------------------------------
-- TABLE 14 : constantes_perop
-- Correspond au modèle Prisma : ConstantePerop
-- Mesures toutes les 5–10 minutes (cahier des charges)
-- -----------------------------------------------------------------------------
CREATE TABLE constantes_perop (
  id                      UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  surveillance_perop_id   UUID          NOT NULL REFERENCES surveillances_per_operatoire(id) ON DELETE CASCADE,
  horodatage              TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  fc                      INTEGER,      -- Fréquence cardiaque (BPM)
  ta_systemique           INTEGER,      -- Tension artérielle systolique (mmHg)
  ta_diastolique          INTEGER,      -- Tension artérielle diastolique (mmHg)
  spo2                    NUMERIC(4,1), -- Saturation O2 (%)
  spo3                    NUMERIC(4,1), -- SpO3 (%)
  score_alerte            INTEGER,
  capnie                  NUMERIC(5,1), -- EtCO2 (mmHg)
  temperature             NUMERIC(4,1)  -- °C
);

COMMENT ON TABLE constantes_perop IS 'Constantes vitales peropératoires — enregistrement toutes les 5-10 min';

-- =============================================================================
-- SECTION 7 — PROTOCOLE POST-OPÉRATOIRE
-- =============================================================================

-- -----------------------------------------------------------------------------
-- TABLE 15 : protocoles_post_operatoires
-- Correspond au modèle Prisma : ProtocolePostOperatoire
-- -----------------------------------------------------------------------------
CREATE TABLE protocoles_post_operatoires (
  id                      UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  operation_id            UUID          NOT NULL UNIQUE REFERENCES operations_chirurgicales(id),
  compte_rendu            TEXT,

  -- Surveillance post-op
  surv_ta                 BOOLEAN       NOT NULL DEFAULT FALSE,
  val_ta                  VARCHAR(20),
  surv_pouls              BOOLEAN       NOT NULL DEFAULT FALSE,
  val_pouls               VARCHAR(20),
  surv_fr                 BOOLEAN       NOT NULL DEFAULT FALSE,
  val_fr                  VARCHAR(20),
  surv_temp               BOOLEAN       NOT NULL DEFAULT FALSE,
  val_temp                VARCHAR(20),
  surv_diurese            BOOLEAN       NOT NULL DEFAULT FALSE,
  val_diurese             VARCHAR(20),
  surv_autres             BOOLEAN       NOT NULL DEFAULT FALSE,
  val_autres              VARCHAR(100),

  -- Perfusions
  perf_bras_gauche        BOOLEAN       NOT NULL DEFAULT FALSE,
  perf_bras_gauche_en_y   BOOLEAN       NOT NULL DEFAULT FALSE,
  perf_bras_droit         BOOLEAN       NOT NULL DEFAULT FALSE,
  perf_bras_droit_en_y    BOOLEAN       NOT NULL DEFAULT FALSE,
  perf_voie_centrale      BOOLEAN       NOT NULL DEFAULT FALSE,
  perf_voie_centrale_en_y BOOLEAN       NOT NULL DEFAULT FALSE,

  created_at              TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE protocoles_post_operatoires IS 'Instructions post-op : surveillance, perfusions, drainages, prescriptions';

-- -----------------------------------------------------------------------------
-- TABLE 16 : drainages_post_op
-- Correspond au modèle Prisma : DrainagePostOp
-- -----------------------------------------------------------------------------
CREATE TABLE drainages_post_op (
  id              UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
  protocole_id    UUID            NOT NULL REFERENCES protocoles_post_operatoires(id) ON DELETE CASCADE,
  type_drainage   "TypeDrainage"  NOT NULL,
  mode            "ModeDrainage"  NOT NULL DEFAULT 'SIPHON',
  notes           TEXT,
  created_at      TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- TABLE 17 : prescriptions_post_operatoires
-- Correspond au modèle Prisma : PrescriptionPostOperatoire
-- -----------------------------------------------------------------------------
CREATE TABLE prescriptions_post_operatoires (
  id                UUID                  PRIMARY KEY DEFAULT gen_random_uuid(),
  protocole_id      UUID                  NOT NULL REFERENCES protocoles_post_operatoires(id) ON DELETE CASCADE,
  prescripteur_id   UUID                  NOT NULL REFERENCES utilisateurs(id),
  type_prescription "TypePrescription"    NOT NULL,
  medicament        VARCHAR(200)          NOT NULL,
  dose              VARCHAR(50),
  voie_admin        "VoieAdministration",
  frequence         VARCHAR(50),
  duree             VARCHAR(50),
  notes             TEXT,
  created_at        TIMESTAMPTZ           NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE prescriptions_post_operatoires IS 'Prescriptions médicamenteuses post-op (antibio, antalgiques, anticoag...)';

-- =============================================================================
-- SECTION 8 — SALLE DE RÉVEIL
-- Score SCCRE >= 9/10 obligatoire pour autoriser la sortie (cahier des charges)
-- =============================================================================

-- -----------------------------------------------------------------------------
-- TABLE 18 : surveillances_salle_reveil
-- Correspond au modèle Prisma : SurveillanceSalleReveil
-- -----------------------------------------------------------------------------
CREATE TABLE surveillances_salle_reveil (
  id                      UUID                  PRIMARY KEY DEFAULT gen_random_uuid(),
  id_surveillance         VARCHAR(30)           NOT NULL UNIQUE,
  patient_id              UUID                  NOT NULL REFERENCES patients(id),
  dossier_id              UUID                  NOT NULL UNIQUE REFERENCES dossiers_bloc_operatoire(id),
  infirmier_id            UUID                  NOT NULL REFERENCES utilisateurs(id),
  heure_arrivee           TIMESTAMPTZ           NOT NULL,
  heure_sortie            TIMESTAMPTZ,

  -- Score SCCRE / Aldrete (max 10 — >= 9 requis pour sortie)
  score_motricite         INTEGER               CHECK (score_motricite BETWEEN 0 AND 2),
  score_respiration       INTEGER               CHECK (score_respiration BETWEEN 0 AND 2),
  score_pression          INTEGER               CHECK (score_pression BETWEEN 0 AND 2),
  score_conscience        INTEGER               CHECK (score_conscience BETWEEN 0 AND 2),
  score_coloration        INTEGER               CHECK (score_coloration BETWEEN 0 AND 2),
  score_sccre             INTEGER               GENERATED ALWAYS AS (
    COALESCE(score_motricite, 0) +
    COALESCE(score_respiration, 0) +
    COALESCE(score_pression, 0) +
    COALESCE(score_conscience, 0) +
    COALESCE(score_coloration, 0)
  ) STORED,

  -- Douleur
  score_evs               INTEGER               CHECK (score_evs BETWEEN 1 AND 3),
  score_eqa               INTEGER               CHECK (score_eqa BETWEEN 1 AND 3),
  score_eva               INTEGER               CHECK (score_eva BETWEEN 0 AND 10),

  -- Respiration neuromusculaire
  intubation_initiale     BOOLEAN               NOT NULL DEFAULT FALSE,
  curarisation_initiale   BOOLEAN               NOT NULL DEFAULT FALSE,
  intubation_reponse      BOOLEAN               NOT NULL DEFAULT FALSE,
  curarisation_reponse    BOOLEAN               NOT NULL DEFAULT FALSE,

  -- Décision et orientation
  statut                  "StatutSalleReveil"   NOT NULL DEFAULT 'EN_SURVEILLANCE',
  retour_service_origine  BOOLEAN               NOT NULL DEFAULT FALSE,
  service_destination     VARCHAR(100),
  notes_decision          TEXT,

  observations            TEXT,
  alertes_cliniques       TEXT,

  created_at              TIMESTAMPTZ           NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ           NOT NULL DEFAULT NOW(),

  -- Règle métier : score_sccre >= 9 pour sortie
  CONSTRAINT check_sccre_sortie CHECK (
    statut != 'APTE_SORTIE' OR score_sccre >= 9
  )
);

COMMENT ON TABLE surveillances_salle_reveil IS 'Score SCCRE calculé automatiquement — sortie bloquée si < 9/10';
COMMENT ON COLUMN surveillances_salle_reveil.score_sccre IS 'Score SCCRE calculé (colonne générée) — >= 9 requis pour APTE_SORTIE';

-- -----------------------------------------------------------------------------
-- TABLE 19 : mesures_salle_reveil
-- Correspond au modèle Prisma : MesureSalleReveil
-- -----------------------------------------------------------------------------
CREATE TABLE mesures_salle_reveil (
  id                UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  surveillance_id   UUID          NOT NULL REFERENCES surveillances_salle_reveil(id) ON DELETE CASCADE,
  horodatage        TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  fc                INTEGER,
  ta_systemique     INTEGER,
  ta_diastolique    INTEGER,
  spo2              NUMERIC(4,1),
  temperature       NUMERIC(4,1),
  frequence_resp    INTEGER,
  eva_instantane    INTEGER       CHECK (eva_instantane BETWEEN 0 AND 10),
  notes             TEXT
);

COMMENT ON TABLE mesures_salle_reveil IS 'Constantes vitales enregistrées en salle de réveil';

-- =============================================================================
-- SECTION 9 — ARCHIVES OPÉRATOIRES
-- =============================================================================

-- -----------------------------------------------------------------------------
-- TABLE 20 : archives_operatoires
-- Correspond au modèle Prisma : ArchiveOperatoire
-- -----------------------------------------------------------------------------
CREATE TABLE archives_operatoires (
  id                    UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
  id_archive            VARCHAR(30)     NOT NULL UNIQUE, -- ex: ARCH-2024-8842
  patient_id            UUID            NOT NULL REFERENCES patients(id),
  dossier_id            UUID            NOT NULL UNIQUE REFERENCES dossiers_bloc_operatoire(id),
  signataire_id         UUID            REFERENCES utilisateurs(id),
  date_archivage        TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  statut                "StatutArchive" NOT NULL DEFAULT 'BROUILLON',

  -- Résumé
  resume_intervention   TEXT,
  observations_post_op  TEXT,
  equipe_chirurgicale   JSONB,          -- Snapshot JSON de l'équipe au moment de l'op
  date_intervention     TIMESTAMPTZ,
  procedure             VARCHAR(200),
  duree_minutes         INTEGER,
  chirurgien_ref        VARCHAR(200),
  statut_operation      VARCHAR(50),

  signature_numerique   TEXT,
  date_signature        TIMESTAMPTZ,

  created_at            TIMESTAMPTZ     NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE archives_operatoires IS 'Archive immuable après signature — traçabilité 10 ans (R-005)';

-- -----------------------------------------------------------------------------
-- TABLE 21 : documents_archive
-- Correspond au modèle Prisma : DocumentArchive
-- -----------------------------------------------------------------------------
CREATE TABLE documents_archive (
  id              UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  archive_id      UUID          NOT NULL REFERENCES archives_operatoires(id) ON DELETE CASCADE,
  nom             VARCHAR(255)  NOT NULL,
  type_document   VARCHAR(50)   NOT NULL, -- 'CPA','VPA','CHECKLIST','PROTOCOLE','COMPTE_RENDU'
  chemin_fichier  TEXT          NOT NULL,
  taille_mo       NUMERIC(6,2),
  mime_type       VARCHAR(100),
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE documents_archive IS 'Documents joints à l archive (PDF, CPA, VPA, compte-rendu opératoire)';

-- =============================================================================
-- SECTION 10 — INDEX POUR PERFORMANCE
-- =============================================================================

-- Patients
CREATE INDEX idx_patients_id_permanent   ON patients(id_permanent);
CREATE INDEX idx_patients_nom            ON patients(nom, prenom);
CREATE INDEX idx_patients_statut         ON patients(statut);

-- Dossiers
CREATE INDEX idx_dossiers_patient        ON dossiers_bloc_operatoire(patient_id);
CREATE INDEX idx_dossiers_date_interv    ON dossiers_bloc_operatoire(date_intervention);
CREATE INDEX idx_dossiers_urgence        ON dossiers_bloc_operatoire(niveau_urgence);
CREATE INDEX idx_dossiers_statut         ON dossiers_bloc_operatoire(statut);

-- Rendez-vous
CREATE INDEX idx_rdv_patient             ON rendez_vous(patient_id);
CREATE INDEX idx_rdv_date               ON rendez_vous(date_heure);
CREATE INDEX idx_rdv_statut             ON rendez_vous(statut);
CREATE INDEX idx_rdv_type               ON rendez_vous(type);
CREATE INDEX idx_rdv_urgence            ON rendez_vous(niveau_urgence);

-- CPA
CREATE INDEX idx_cpa_patient            ON consultations_cpa(patient_id);
CREATE INDEX idx_cpa_anesthesiste       ON consultations_cpa(anesthesiste_id);
CREATE INDEX idx_cpa_statut             ON consultations_cpa(statut);

-- VPA
CREATE INDEX idx_vpa_patient            ON visites_pre_anesthesique(patient_id);
CREATE INDEX idx_vpa_anesthesiste       ON visites_pre_anesthesique(anesthesiste_id);

-- Checklists
CREATE INDEX idx_checklist_dossier      ON checklists_oms(dossier_id);
CREATE INDEX idx_checklist_phase        ON checklists_oms(phase);
CREATE INDEX idx_checklist_statut       ON checklists_oms(statut);

-- Opérations
CREATE INDEX idx_op_patient             ON operations_chirurgicales(patient_id);
CREATE INDEX idx_op_chirurgien          ON operations_chirurgicales(chirurgien_principal_id);
CREATE INDEX idx_op_anesthesiste        ON operations_chirurgicales(anesthesiste_id);
CREATE INDEX idx_op_date                ON operations_chirurgicales(date_operation);
CREATE INDEX idx_op_statut              ON operations_chirurgicales(statut);
CREATE INDEX idx_op_urgence             ON operations_chirurgicales(niveau_urgence);

-- Constantes perop (requêtes temporelles fréquentes)
CREATE INDEX idx_constantes_surveillance ON constantes_perop(surveillance_perop_id);
CREATE INDEX idx_constantes_horodatage   ON constantes_perop(horodatage);

-- Salle de réveil
CREATE INDEX idx_reveil_patient          ON surveillances_salle_reveil(patient_id);
CREATE INDEX idx_reveil_statut           ON surveillances_salle_reveil(statut);
CREATE INDEX idx_reveil_score            ON surveillances_salle_reveil(score_sccre);

-- Archives
CREATE INDEX idx_archive_patient         ON archives_operatoires(patient_id);
CREATE INDEX idx_archive_statut          ON archives_operatoires(statut);
CREATE INDEX idx_archive_date            ON archives_operatoires(date_archivage);

-- =============================================================================
-- SECTION 11 — FONCTIONS ET TRIGGERS
-- =============================================================================

-- Trigger : mise à jour automatique de updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_utilisateurs_updated_at
  BEFORE UPDATE ON utilisateurs
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_patients_updated_at
  BEFORE UPDATE ON patients
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_dossiers_updated_at
  BEFORE UPDATE ON dossiers_bloc_operatoire
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_rdv_updated_at
  BEFORE UPDATE ON rendez_vous
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_cpa_updated_at
  BEFORE UPDATE ON consultations_cpa
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_vpa_updated_at
  BEFORE UPDATE ON visites_pre_anesthesique
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_op_updated_at
  BEFORE UPDATE ON operations_chirurgicales
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_reveil_updated_at
  BEFORE UPDATE ON surveillances_salle_reveil
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_archive_updated_at
  BEFORE UPDATE ON archives_operatoires
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- Trigger : bloquer la VPA si CPA du même dossier non validée
CREATE OR REPLACE FUNCTION check_cpa_before_vpa()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  cpa_statut TEXT;
BEGIN
  SELECT statut INTO cpa_statut
  FROM consultations_cpa
  WHERE dossier_id = NEW.dossier_id;

  IF cpa_statut IS NULL THEN
    RAISE EXCEPTION 'VPA impossible : aucune CPA trouvée pour le dossier %', NEW.dossier_id;
  END IF;

  IF cpa_statut NOT IN ('VALIDE','SIGNE','ARCHIVE') THEN
    RAISE EXCEPTION 'VPA impossible : la CPA du dossier % n est pas encore validée (statut: %)', NEW.dossier_id, cpa_statut;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_vpa_check_cpa
  BEFORE INSERT ON visites_pre_anesthesique
  FOR EACH ROW EXECUTE FUNCTION check_cpa_before_vpa();

-- Trigger : archivage automatique — IMmuabilité après signature (R-005)
CREATE OR REPLACE FUNCTION block_archive_modification()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF OLD.statut IN ('SIGNE','ARCHIVE') THEN
    RAISE EXCEPTION 'Archive immuable : modification interdite après signature (R-005). Dossier: %', OLD.id_archive;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_archive_immutable
  BEFORE UPDATE ON archives_operatoires
  FOR EACH ROW EXECUTE FUNCTION block_archive_modification();

-- =============================================================================
-- SECTION 12 — DONNÉES INITIALES (SEED)
-- =============================================================================

-- Utilisateur admin système
INSERT INTO utilisateurs (
  id, matricule, nom, prenom, email,
  mot_de_passe_hash, role, specialite,
  ordre_professionnel, numero_ordre, actif
) VALUES (
  gen_random_uuid(),
  'ADM-001',
  'RASOANIRINA',
  'Sarah',
  'admin@chu-andrainjato.mg',
  '$2b$12$placeholder_hash_to_replace',
  'DIRECTEUR_MEDICAL',
  'Administration',
  'ONM',
  'ONM-2019-0001',
  TRUE
);

-- Chirurgien exemple
INSERT INTO utilisateurs (
  id, matricule, nom, prenom, email,
  mot_de_passe_hash, role, specialite,
  ordre_professionnel, numero_ordre, actif
) VALUES (
  gen_random_uuid(),
  'CHI-001',
  'RASOARIMALALA',
  'Jean-Pierre',
  'chirurgien@chu-andrainjato.mg',
  '$2b$12$placeholder_hash_to_replace',
  'CHIRURGIEN',
  'Chirurgie Digestive',
  'ONM',
  'ONM-2015-0042',
  TRUE
);

-- Anesthésiste exemple
INSERT INTO utilisateurs (
  id, matricule, nom, prenom, email,
  mot_de_passe_hash, role, specialite,
  ordre_professionnel, numero_ordre, actif
) VALUES (
  gen_random_uuid(),
  'ANE-001',
  'RANDRIA',
  'Martin',
  'anesthesiste@chu-andrainjato.mg',
  '$2b$12$placeholder_hash_to_replace',
  'ANESTHESISTE',
  'Anesthésie-Réanimation',
  'ONM',
  'ONM-2018-0078',
  TRUE
);
