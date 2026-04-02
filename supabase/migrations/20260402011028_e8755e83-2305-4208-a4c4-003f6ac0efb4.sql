
-- Add visible column to section_contents
ALTER TABLE public.section_contents
ADD COLUMN IF NOT EXISTS visible boolean NOT NULL DEFAULT true;

-- Add image_position column to projects for cover image positioning
ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS image_position text NOT NULL DEFAULT 'center';
