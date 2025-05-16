/*
  # Add reactions and comments to complaints

  1. New Tables
    - reactions
      - id (uuid, primary key)
      - complaint_id (uuid, foreign key)
      - user_id (uuid, foreign key)
      - type (text) - 'agree' or 'disagree'
      - created_at (timestamptz)
    
    - comments
      - id (uuid, primary key)
      - complaint_id (uuid, foreign key)
      - user_id (uuid, foreign key)
      - content (text)
      - created_at (timestamptz)
      - parent_id (uuid, foreign key, self-referential) - for nested comments
      
  2. Changes
    - Add weight column to complaints table
    
  3. Security
    - Enable RLS on new tables
    - Add policies for authenticated users
*/

-- Add weight to complaints
ALTER TABLE complaints ADD COLUMN weight integer DEFAULT 0;

-- Create reactions table
CREATE TABLE reactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id uuid REFERENCES complaints(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('agree', 'disagree')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(complaint_id, user_id)
);

-- Create comments table
CREATE TABLE comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id uuid REFERENCES complaints(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  parent_id uuid REFERENCES comments(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Policies for reactions
CREATE POLICY "Users can read all reactions" ON reactions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can create reactions" ON reactions
  FOR INSERT TO authenticated WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own reactions" ON reactions
  FOR UPDATE TO authenticated USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete their own reactions" ON reactions
  FOR DELETE TO authenticated USING (auth.uid()::text = user_id::text);

-- Policies for comments
CREATE POLICY "Users can read all comments" ON comments
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can create comments" ON comments
  FOR INSERT TO authenticated WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own comments" ON comments
  FOR UPDATE TO authenticated USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete their own comments" ON comments
  FOR DELETE TO authenticated USING (auth.uid()::text = user_id::text);

-- Function to update complaint weight
CREATE OR REPLACE FUNCTION update_complaint_weight()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE complaints
  SET weight = (
    SELECT COUNT(CASE WHEN type = 'agree' THEN 1 END) - 
           COUNT(CASE WHEN type = 'disagree' THEN 1 END)
    FROM reactions
    WHERE complaint_id = NEW.complaint_id
  )
  WHERE id = NEW.complaint_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update weight on reaction changes
CREATE TRIGGER update_complaint_weight_trigger
AFTER INSERT OR UPDATE OR DELETE ON reactions
FOR EACH ROW
EXECUTE FUNCTION update_complaint_weight();