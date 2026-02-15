
-- Create song suggestions table
CREATE TABLE public.song_suggestions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  song_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.song_suggestions ENABLE ROW LEVEL SECURITY;

-- Anyone can read songs
CREATE POLICY "Anyone can read songs"
  ON public.song_suggestions
  FOR SELECT
  USING (true);

-- Anyone can insert songs
CREATE POLICY "Anyone can insert songs"
  ON public.song_suggestions
  FOR INSERT
  WITH CHECK (true);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.song_suggestions;
