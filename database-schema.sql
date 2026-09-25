CREATE TABLE IF NOT EXISTS public.submissions (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  inquiry_type VARCHAR(64) NOT NULL,
  name VARCHAR(255),
  email VARCHAR(320),
  payload_json JSONB NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_submissions_submitted_at
  ON public.submissions (submitted_at);

CREATE INDEX IF NOT EXISTS idx_submissions_email
  ON public.submissions (email);

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON TABLE public.submissions TO anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.submissions_id_seq TO anon, authenticated;

DROP POLICY IF EXISTS "Allow website submissions" ON public.submissions;

CREATE POLICY "Allow website submissions"
  ON public.submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
