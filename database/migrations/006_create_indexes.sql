-- Performance indexes for fast queries

-- Users indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_status ON users(status);

-- Countries indexes
CREATE INDEX idx_countries_slug ON countries(slug);
CREATE INDEX idx_countries_status ON countries(status);
CREATE INDEX idx_countries_sort_order ON countries(sort_order);

-- Regions indexes
CREATE INDEX idx_regions_country_id ON country_regions(country_id);
CREATE INDEX idx_regions_status ON country_regions(status);
CREATE INDEX idx_regions_sort_order ON country_regions(sort_order);

-- Regulations indexes
CREATE INDEX idx_regulations_region_id ON regulations(region_id);
CREATE INDEX idx_regulations_status ON regulations(status);
CREATE INDEX idx_regulations_priority ON regulations(priority);
CREATE INDEX idx_regulations_last_updated ON regulations(last_updated);
CREATE INDEX idx_regulations_tags ON regulations USING GIN(tags);

-- Articles indexes
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_author_id ON articles(author_id);
CREATE INDEX idx_articles_category_id ON articles(category_id);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_published_at ON articles(published_at);
CREATE INDEX idx_articles_tags ON articles USING GIN(tags);

-- Full-text search indexes
CREATE INDEX idx_articles_content_search ON articles USING GIN(to_tsvector('english', title || ' ' || COALESCE(excerpt, '')));
CREATE INDEX idx_regulations_search ON regulations USING GIN(to_tsvector('english', title || ' ' || description));

-- Audit log indexes
CREATE INDEX idx_audit_log_table_record ON audit_log(table_name, record_id);
CREATE INDEX idx_audit_log_user_id ON audit_log(user_id);
CREATE INDEX idx_audit_log_created_at ON audit_log(created_at);
