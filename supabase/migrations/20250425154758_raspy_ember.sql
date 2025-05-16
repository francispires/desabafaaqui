/*
  # Initial database schema

  1. New Tables
    - users
      - id (uuid, primary key)
      - clerk_id (text, unique)
      - email (text, unique)
      - name (text)
      - avatar_url (text)
      - created_at (timestamptz)
      
    - companies
      - id (uuid, primary key)
      - name (text)
      - category (text)
      - logo_url (text)
      - average_rating (numeric)
      - total_complaints (integer)
      - response_rate (numeric)
      - created_at (timestamptz)
      
    - complaints
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - company_id (uuid, foreign key)
      - title (text)
      - description (text)
      - rating (integer)
      - status (text)
      - created_at (timestamptz)
      - updated_at (timestamptz)
      
    - responses
      - id (uuid, primary key)
      - complaint_id (uuid, foreign key)
      - author_type (text)
      - author_id (uuid)
      - content (text)
      - created_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- Create companies table
CREATE TABLE companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  logo_url text,
  average_rating numeric DEFAULT 0,
  total_complaints integer DEFAULT 0,
  response_rate numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create complaints table
CREATE TABLE complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  company_id uuid REFERENCES companies(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'resolved', 'ignored')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create responses table
CREATE TABLE responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  complaint_id uuid REFERENCES complaints(id) ON DELETE CASCADE NOT NULL,
  author_type text NOT NULL CHECK (author_type IN ('user', 'company')),
  author_id uuid NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read all users" ON users
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can read all companies" ON companies
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can read all complaints" ON complaints
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can create complaints" ON complaints
  FOR INSERT TO authenticated WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update their own complaints" ON complaints
  FOR UPDATE TO authenticated USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can read all responses" ON responses
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can create responses" ON responses
  FOR INSERT TO authenticated WITH CHECK (
    author_type = 'user' AND auth.uid()::text = author_id::text
  );

-- Insert mock data
INSERT INTO companies (name, category, logo_url, average_rating, total_complaints, response_rate) VALUES
  ('TechNova', 'Eletrônicos', 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg', 2.1, 32, 75),
  ('SuperCompras', 'Varejo', 'https://images.pexels.com/photos/3277808/pexels-photo-3277808.jpeg', 3.4, 48, 62),
  ('BancoSeguro', 'Financeiro', 'https://images.pexels.com/photos/50987/money-card-business-credit-card-50987.jpeg', 1.8, 89, 43),
  ('FonoMax', 'Telecomunicações', 'https://images.pexels.com/photos/163007/phone-old-year-built-1955-bakelite-163007.jpeg', 1.5, 156, 28),
  ('AquaVida', 'Utilidades', 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg', 4.2, 17, 95);