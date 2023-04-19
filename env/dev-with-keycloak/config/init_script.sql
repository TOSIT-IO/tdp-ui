CREATE USER keycloak WITH PASSWORD 'keycloak';
CREATE USER tdp WITH PASSWORD 'tdp';
---
CREATE DATABASE keycloak;
\connect keycloak
CREATE SCHEMA keycloak AUTHORIZATION keycloak;
\connect postgres

CREATE DATABASE tdp;
\connect tdp
CREATE SCHEMA tdp AUTHORIZATION tdp;
\connect postgres
---
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA keycloak TO keycloak;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA keycloak TO keycloak;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA tdp TO tdp;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA tdp TO tdp;
-- set default schema for tdp user
ALTER ROLE tdp SET search_path TO tdp;
