create view public.user_daily_stats as
select
  ss.user_id,
  ss.started_at::date as activity_date,
  count(distinct ss.id) as sessions_count,
  coalesce(sum(ss.words_reviewed), 0) as words_reviewed,
  coalesce(sum(ss.correct_count), 0) as correct_count,
  coalesce(sum(extract(epoch from (ss.ended_at - ss.started_at)))::int, 0) as study_time_seconds,
  count(distinct w.id) as words_added
from study_sessions ss
left join words w on w.user_id = ss.user_id and w.date_added::date = ss.started_at::date
where ss.completed = true
group by ss.user_id, ss.started_at::date;

create view public.user_total_stats as
select
  p.id as user_id,
  count(distinct w.id) as total_words,
  count(distinct w.id) filter (where w.easiness_factor >= 2.5 and w.review_count >= 5) as mastered_words,
  coalesce(sum(extract(epoch from (ss.ended_at - ss.started_at)))::int, 0) as total_study_seconds,
  coalesce(sum(ss.words_reviewed), 0) as total_words_reviewed,
  coalesce(sum(ss.correct_count), 0) as total_correct,
  count(distinct ss.id) as total_sessions
from profiles p
left join words w on w.user_id = p.id
left join study_sessions ss on ss.user_id = p.id and ss.completed = true
group by p.id;

create view public.words_due_today as
select user_id, count(*) as due_count
from words
where next_review_date <= current_date
  and verification_source not in ('pending', 'unverified')
group by user_id;

create view public.word_stage_breakdown as
select
  user_id,
  count(*) filter (where review_count = 0) as planted,
  count(*) filter (where review_count > 0 and easiness_factor < 2.0) as growing,
  count(*) filter (where review_count > 0 and easiness_factor >= 2.0
    and not (easiness_factor >= 2.5 and review_count >= 5)) as almost,
  count(*) filter (where easiness_factor >= 2.5 and review_count >= 5) as mastered
from words
where verification_source not in ('pending', 'unverified')
group by user_id;
