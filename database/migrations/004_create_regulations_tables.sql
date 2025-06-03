-- Countries (master data)
CREATE TABLE countries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    slug VARCHAR(255) NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    key_considerations JSONB DEFAULT '[]',
    metadata JSONB DEFAULT '{}',
    status record_status NOT NULL DEFAULT 'active',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id) ON DELETE SET NULL
);

-- Regions within countries
CREATE TABLE country_regions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    status record_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE(country_id, name)
);

-- Regulations within regions
CREATE TABLE regulations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    region_id UUID NOT NULL REFERENCES country_regions(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    details JSONB DEFAULT '{}',
    status regulation_status NOT NULL DEFAULT 'Review Needed',
    priority priority_level NOT NULL DEFAULT 'medium',
    last_updated DATE NOT NULL DEFAULT CURRENT_DATE,
    effective_date DATE,
    review_date DATE,
    tags TEXT[] DEFAULT '{}',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id) ON DELETE SET NULL
);

-- Country resources (PDFs, documents)
CREATE TABLE country_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    type VARCHAR(100) NOT NULL,
    size VARCHAR(50),
    url VARCHAR(500) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
