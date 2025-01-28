# Stash Stash Backend Development

## Project Overview

Stash Stash is a platform for storing and sharing personal content, inspired by Deepstash. The backend is built using Supabase, which provides a PostgreSQL database, real-time subscriptions, authentication, and storage services. The backend will handle core business logic, data storage, and secure communication with the Flutter frontend.

## Backend Architecture

The backend will follow a modular and scalable architecture with the following core components:

- **Database**: PostgreSQL (via Supabase).
- **Authentication**: Supabase Auth for user management.
- **Storage**: Supabase Storage for handling files (e.g., profile images, attachments).
- **API Layer**: Supabase auto-generated APIs or custom queries.

## Core Backend Features

### User Management

- Handle user authentication using Supabase Auth.
- Manage user profiles, including editable usernames and profile images.

### Content Management

- Manage stashes (content creation, editing, deletion).
- Support tagging and category management for stashes.
- Enable rich-text or markdown support.

### Social Features

- Implement likes and comments on stashes.
- Allow sharing of stashes with specific users.

### File Storage

- Private storage buckets for profile images and stash attachments.
- Public storage for static assets like icons or banners.

### Role-Based Access Control (RBAC)

- Implement RLS policies for secure data access.

## Folder Structure 


## Database Schema (SQL)

### Users Table

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR NOT NULL UNIQUE,
    username VARCHAR NOT NULL UNIQUE,
    profile_image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- Table: stashes
CREATE TABLE stashes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR NOT NULL,
    content TEXT NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: comments
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stash_id UUID REFERENCES stashes(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: likes
CREATE TABLE likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stash_id UUID REFERENCES stashes(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (stash_id, user_id) -- To prevent duplicate likes by the same user on the same stash
);

-- Table: tags
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: stash_tags (many-to-many relationship between stashes and tags)
CREATE TABLE stash_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stash_id UUID REFERENCES stashes(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    UNIQUE (stash_id, tag_id) -- To prevent duplicate associations
);

-- Table: shared_stashes
CREATE TABLE shared_stashes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stash_id UUID REFERENCES stashes(id) ON DELETE CASCADE,
    shared_with_user_id UUID REFERENCES users(id) ON DELETE CASCADE
);

-- Create a private bucket for profile images
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-images', 'profile-images', false);

-- Create a private bucket for stash attachments
INSERT INTO storage.buckets (id, name, public)
VALUES ('stash-attachments', 'stash-attachments', false);

-- Create a private bucket for shared stashes
INSERT INTO storage.buckets (id, name, public)
VALUES ('shared-stashes', 'shared-stashes', false);

-- Create a public bucket for public assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('public-assets', 'public-assets', true);
```
# Development Guidelines

### 1. Database Management

- Use Supabase SQL Editor to manage the schema and run queries.
- Make incremental schema changes using migrations to maintain database versioning.

### 2. API Integration

- Use the Supabase auto-generated RESTful APIs for standard CRUD operations.
- For custom logic, write SQL functions and expose them as RPC endpoints.

### 3. Authentication

- Supabase Auth provides JWT-based authentication.
- Use `auth.uid()` to secure user-specific data with Row-Level Security (RLS) policies.

### 4. Storage Configuration

- Use the created storage buckets for handling files.
    - **Private Buckets**: Use signed URLs for restricted access.
    - **Public Buckets**: Directly access files via public URLs.

### 5. Security

- Enable Row-Level Security (RLS) on all tables.
- Define clear policies for each table. For example:

    CREATE POLICY "Users can manage their own data"
    ON users
    FOR ALL
    USING (auth.uid() = id);

### 6. Testing

- Test database queries in the Supabase SQL Editor or with Postman.
- Write unit tests for custom RPC functions and ensure they handle edge cases.

### 7. Monitoring

- Use Supabase dashboard to monitor database usage, API calls, and errors.

### 8. Version Control

- Keep SQL schema files in the project repository for reference and versioning.
- Use a migration tool (like pg-migrate) for schema updates in production.

# Best Practices

- Optimize indexes for frequently queried fields (e.g., `user_id`, `stash_id`).
- Regularly backup the database using Supabase's built-in tools.
- Minimize large file uploads to keep the storage cost-effective.

# Relevant Documentation

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase Storage Docs](https://supabase.com/docs/guides/storage)





