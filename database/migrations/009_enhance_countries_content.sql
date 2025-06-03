-- Add comprehensive content fields to countries table
ALTER TABLE countries ADD COLUMN IF NOT EXISTS content_sections JSONB DEFAULT '{}';

-- Update the content_sections structure to include all regulation page sections
UPDATE countries SET content_sections = '{
  "overview": {
    "title": "Overview",
    "content": "",
    "order": 1
  },
  "key_considerations": {
    "title": "Key Considerations", 
    "content": "",
    "order": 2
  },
  "labor_law_framework": {
    "title": "Labor Law Framework",
    "content": "",
    "order": 3
  },
  "worker_classification": {
    "title": "Worker Classification",
    "content": "",
    "order": 4
  },
  "recent_developments": {
    "title": "Recent Developments",
    "content": "",
    "order": 5
  },
  "best_practices": {
    "title": "Best Practices",
    "content": "",
    "order": 6
  },
  "monitoring_strategy": {
    "title": "Monitoring Strategy",
    "content": "",
    "order": 7
  },
  "quick_facts": {
    "title": "Quick Facts",
    "content": "",
    "order": 8
  },
  "comparison_data": {
    "title": "Comparison Data",
    "content": "",
    "order": 9
  }
}' WHERE content_sections = '{}' OR content_sections IS NULL;

-- Create comparison tables structure
CREATE TABLE IF NOT EXISTS comparison_tables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    columns JSONB NOT NULL DEFAULT '[]',
    data JSONB NOT NULL DEFAULT '{}',
    status record_status NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by UUID REFERENCES users(id) ON DELETE SET NULL
);
