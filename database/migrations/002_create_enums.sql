-- Create ENUM types for consistent data validation
CREATE TYPE user_role AS ENUM ('admin', 'editor', 'viewer');
CREATE TYPE content_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE record_status AS ENUM ('active', 'inactive');
CREATE TYPE regulation_status AS ENUM ('Compliant', 'Review Needed', 'Attention Required');
CREATE TYPE priority_level AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE audit_action AS ENUM ('create', 'update', 'delete', 'restore');
