-- Templates table for downloadable resources
CREATE TABLE templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    file_url VARCHAR(500) NOT NULL,
    file_path VARCHAR(500),
    format VARCHAR(50) NOT NULL, -- DOCX, PDF, XLSX, etc.
    size VARCHAR(50), -- File size (e.g., "245 KB")
    downloads INTEGER DEFAULT 0,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    tags TEXT[] DEFAULT '{}',
    status content_status NOT NULL DEFAULT 'draft',
    featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES users(id) ON DELETE SET NULL
);

-- Create indexes for templates
CREATE INDEX idx_templates_category ON templates(category_id);
CREATE INDEX idx_templates_status ON templates(status);
CREATE INDEX idx_templates_featured ON templates(featured);
CREATE INDEX idx_templates_downloads ON templates(downloads);
