-- Articles and best practices
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    content JSONB NOT NULL DEFAULT '{}',
    excerpt TEXT,
    featured_image VARCHAR(500),
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    status content_status NOT NULL DEFAULT 'draft',
    published_at TIMESTAMP WITH TIME ZONE,
    reading_time INTEGER DEFAULT 0, -- Minutes
    view_count INTEGER DEFAULT 0,
    tags TEXT[] DEFAULT '{}',
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    version INTEGER DEFAULT 1
);

-- Infographics
CREATE TABLE infographics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    description TEXT,
    image_url VARCHAR(500) NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    status content_status NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE
);

-- Templates
CREATE TABLE templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(500) NOT NULL,
    slug VARCHAR(500) NOT NULL UNIQUE,
    description TEXT,
    file_url VARCHAR(500) NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    status content_status NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE
);

-- Media files management
CREATE TABLE media_files (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename VARCHAR(500) NOT NULL,
    original_name VARCHAR(500) NOT NULL,
    file_path VARCHAR(1000) NOT NULL,
    file_size BIGINT,
    mime_type VARCHAR(100),
    alt_text TEXT,
    uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'
);
