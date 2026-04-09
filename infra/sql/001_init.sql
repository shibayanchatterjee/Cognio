create role web_anon nologin;

create table if not exists public.stem_activities (
  id text primary key,
  title text not null,
  subject text not null check (subject in ('math', 'science', 'engineering', 'technology')),
  type text not null check (type in ('quiz', 'game', 'worksheet')),
  description text not null,
  grades text[] not null,
  duration_minutes integer not null check (duration_minutes > 0),
  skill text not null
);

grant usage on schema public to web_anon;
grant select on public.stem_activities to web_anon;

insert into public.stem_activities (id, title, subject, type, description, grades, duration_minutes, skill)
values
  ('math-pattern-lab', 'Pattern Lab', 'math', 'game', 'Build shape and number patterns to unlock each level.', array['prek', 'k', '1'], 12, 'patterns'),
  ('science-plant-quiz', 'Plant Explorer Quiz', 'science', 'quiz', 'Discover what plants need to grow with interactive questions.', array['1', '2', '3'], 10, 'biology basics'),
  ('engineering-bridge-challenge', 'Bridge Builder Challenge', 'engineering', 'worksheet', 'Design a paper bridge and test load strength step by step.', array['2', '3', '4'], 18, 'design thinking'),
  ('tech-code-logic', 'Code Logic Mission', 'technology', 'game', 'Guide a robot with simple coding blocks and if-then rules.', array['3', '4'], 15, 'computational thinking'),
  ('math-fraction-flight', 'Fraction Flight', 'math', 'quiz', 'Choose the right fractions to fuel your rocket launch.', array['3', '4'], 14, 'fractions')
on conflict (id) do update
set
  title = excluded.title,
  subject = excluded.subject,
  type = excluded.type,
  description = excluded.description,
  grades = excluded.grades,
  duration_minutes = excluded.duration_minutes,
  skill = excluded.skill;
