-- Enable RLS
ALTER TABLE stashes ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Stashes policies
CREATE POLICY "Users can view public stashes"
ON stashes FOR SELECT
USING (is_public = true);

CREATE POLICY "Users can view their own stashes"
ON stashes FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own stashes"
ON stashes FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stashes"
ON stashes FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stashes"
ON stashes FOR DELETE
USING (auth.uid() = user_id);

-- Likes policies
CREATE POLICY "Users can view likes on public stashes"
ON likes FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM stashes 
    WHERE stashes.id = likes.stash_id 
    AND (stashes.is_public = true OR stashes.user_id = auth.uid())
  )
);

CREATE POLICY "Users can create likes"
ON likes FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM stashes 
    WHERE stashes.id = likes.stash_id 
    AND (stashes.is_public = true OR stashes.user_id = auth.uid())
  )
);

CREATE POLICY "Users can delete their own likes"
ON likes FOR DELETE
USING (auth.uid() = user_id);

-- Comments policies
CREATE POLICY "Users can view comments on public stashes"
ON comments FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM stashes 
    WHERE stashes.id = comments.stash_id 
    AND (stashes.is_public = true OR stashes.user_id = auth.uid())
  )
);

CREATE POLICY "Users can create comments"
ON comments FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM stashes 
    WHERE stashes.id = comments.stash_id 
    AND (stashes.is_public = true OR stashes.user_id = auth.uid())
  )
);

CREATE POLICY "Users can delete their own comments"
ON comments FOR DELETE
USING (auth.uid() = user_id); 