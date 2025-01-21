-- First, drop all existing tables (in correct order due to dependencies)
DROP TABLE IF EXISTS stash_tags CASCADE;
DROP TABLE IF EXISTS shared_stashes CASCADE;
DROP TABLE IF EXISTS likes CASCADE;
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS stashes CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables with TEXT type for user IDs (to work with Clerk)
CREATE TABLE users (
    id TEXT PRIMARY KEY,  -- Changed to TEXT for Clerk compatibility
    email VARCHAR NOT NULL UNIQUE,
    username VARCHAR NOT NULL UNIQUE,
    profile_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stashes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,  -- Changed to TEXT
    title VARCHAR NOT NULL,
    content TEXT NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stash_id UUID REFERENCES stashes(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,  -- Changed to TEXT
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stash_id UUID REFERENCES stashes(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,  -- Changed to TEXT
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (stash_id, user_id)
);

CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stash_tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stash_id UUID REFERENCES stashes(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    UNIQUE (stash_id, tag_id)
);

CREATE TABLE shared_stashes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stash_id UUID REFERENCES stashes(id) ON DELETE CASCADE,
    shared_with_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,  -- Changed to TEXT
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE stashes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE stash_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_stashes ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users policies
CREATE POLICY "Users can view their own data"
ON users FOR SELECT
USING (auth.uid()::text = id);

-- Stashes policies
CREATE POLICY "Users can view public stashes"
ON stashes FOR SELECT
USING (is_public = true);

CREATE POLICY "Users can view their own stashes"
ON stashes FOR SELECT
USING (auth.uid()::text = user_id);

CREATE POLICY "Users can create their own stashes"
ON stashes FOR INSERT
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own stashes"
ON stashes FOR UPDATE
USING (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own stashes"
ON stashes FOR DELETE
USING (auth.uid()::text = user_id);

-- Comments policies
CREATE POLICY "Users can view comments on public stashes"
ON comments FOR SELECT
USING (EXISTS (
    SELECT 1 FROM stashes 
    WHERE stashes.id = comments.stash_id 
    AND (stashes.is_public = true OR stashes.user_id = auth.uid()::text)
));

CREATE POLICY "Users can create comments"
ON comments FOR INSERT
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own comments"
ON comments FOR DELETE
USING (auth.uid()::text = user_id);

-- Likes policies
CREATE POLICY "Users can view likes"
ON likes FOR SELECT
USING (true);

CREATE POLICY "Users can create likes"
ON likes FOR INSERT
WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can delete their own likes"
ON likes FOR DELETE
USING (auth.uid()::text = user_id);

-- Tags policies
CREATE POLICY "Everyone can view tags"
ON tags FOR SELECT
USING (true);

CREATE POLICY "Users can create tags"
ON tags FOR INSERT
WITH CHECK (true);

-- Stash tags policies
CREATE POLICY "Everyone can view stash tags"
ON stash_tags FOR SELECT
USING (true);

CREATE POLICY "Users can manage stash tags on their stashes"
ON stash_tags FOR ALL
USING (EXISTS (
    SELECT 1 FROM stashes 
    WHERE stashes.id = stash_id 
    AND stashes.user_id = auth.uid()::text
));

-- Create indexes for better performance
CREATE INDEX idx_stashes_user_id ON stashes(user_id);
CREATE INDEX idx_comments_stash_id ON comments(stash_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_likes_stash_id ON likes(stash_id);
CREATE INDEX idx_likes_user_id ON likes(user_id);
CREATE INDEX idx_stash_tags_stash_id ON stash_tags(stash_id);
CREATE INDEX idx_stash_tags_tag_id ON stash_tags(tag_id);
CREATE INDEX idx_shared_stashes_stash_id ON shared_stashes(stash_id);
CREATE INDEX idx_shared_stashes_user_id ON shared_stashes(shared_with_user_id); 


-- next updates

-- Drop existing policies for stashes
DROP POLICY IF EXISTS "Users can view public stashes" ON stashes;
DROP POLICY IF EXISTS "Users can view their own stashes" ON stashes;
DROP POLICY IF EXISTS "Users can create their own stashes" ON stashes;
DROP POLICY IF EXISTS "Users can update their own stashes" ON stashes;
DROP POLICY IF EXISTS "Users can delete their own stashes" ON stashes;

-- Create new development policies that don't rely on auth.uid()
CREATE POLICY "Enable read access for all users"
ON stashes FOR SELECT
USING (true);

CREATE POLICY "Enable insert access for all users"
ON stashes FOR INSERT
WITH CHECK (true);

CREATE POLICY "Enable update access for all users"
ON stashes FOR UPDATE
USING (true);

CREATE POLICY "Enable delete access for all users"
ON stashes FOR DELETE
USING (true);