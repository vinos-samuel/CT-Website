-- Insert initial admin user
INSERT INTO users (id, email, name, role, status) VALUES 
(uuid_generate_v4(), 'admin@cthub.com', 'Admin User', 'admin', 'active');

-- Insert default categories
INSERT INTO categories (name, slug, description, color, icon, sort_order) VALUES 
('Best Practices', 'best-practices', 'Industry best practices and guidelines', '#3B82F6', 'lightbulb', 1),
('Risk Management', 'risk-management', 'Risk assessment and mitigation strategies', '#EF4444', 'shield', 2),
('Compliance', 'compliance', 'Regulatory compliance information', '#10B981', 'check-circle', 3),
('Templates', 'templates', 'Document templates and forms', '#8B5CF6', 'document', 4),
('Infographics', 'infographics', 'Visual guides and infographics', '#F59E0B', 'image', 5);

-- Insert sample countries (you can expand this)
INSERT INTO countries (name, slug, summary, status, sort_order) VALUES 
('Australia', 'australia', 'Comprehensive regulations for contingent workforce management in Australia', 'active', 1),
('Singapore', 'singapore', 'Singapore''s regulatory framework for contingent workers', 'active', 2),
('Japan', 'japan', 'Japanese employment regulations and compliance requirements', 'active', 3),
('China', 'china', 'China''s complex regulatory landscape for workforce management', 'active', 4);
